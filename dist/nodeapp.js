var server = require( "./server.js" ).startServer();
var WebSocketServer = require( "websocket" ).server;
var fs = require("fs");
var wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false
});

var todoItems = null;

var clients = {
  connections: []
};

function getTodoItems( callback ) {
  fs.readFile("app/data/todoItems.json", 'utf8', function( err, items ) {
    todoItems = JSON.parse( items );
    callback();
  });
}

function setTodoItems() {
  var items = JSON.stringify( todoItems );
  fs.writeFile("app/data/todoItems.json", items, function( err ) {
    if ( err ) {
      console.log( err );
    } else {
      console.log("Todo list saved");
    }
  })
}

function updateTodo( msgData, conn ) {
  for ( var i = 0, todoLen = todoItems.length; i < todoLen; i++ ) {
    if ( todoItems[ i ].id === msgData.data.id ) {
      todoItems[ i ].done = msgData.data.done;
      for ( var x = 0, clientsLen = clients.connections.length; x < clientsLen; x++ ) {
        if ( clients.connections[ x ] !== conn ) {
          clients.connections[ x ].sendUTF( JSON.stringify( { type: "update", data: todoItems[ i ] } ) );
        }
      }
      break;
    }
  }
  setTodoItems();
};

function addTodo( msgData ) {
  var idArr = [];
  for ( var i = 0, todoLen = todoItems.length; i < todoLen; i++ ) {
    idArr.push( todoItems[ i ].id );
  }
  idArr.sort();
  var idNum = ( parseFloat( idArr[ idArr.length - 1 ] ) + 1 ) + "";
  msgData.data.id = idNum.length === 1 ? '0' + idNum : idNum;
  todoItems.push( msgData.data );
  for ( var x = 0, clientsLen = clients.connections.length; x < clientsLen; x++ ) {
    clients.connections[ x ].sendUTF( JSON.stringify( { type: "add", data: todoItems[ todoItems.length - 1 ] } ) );
  }
  setTodoItems();
};

function checkOrigin( origin ) {
  var ip = "http://178.62.117.150";
  return origin === ip + ":8888";
}

wsServer.on( "request", function( req ) {
  if ( !checkOrigin( req.origin ) ) {
    req.reject();
    console.log( "Invalid origin: Connection refused" );
    return false;
  };

  var connection = req.accept("echo-protocol", req.origin);
  clients.connections.push( connection );
  console.log( ( new Date() ) + " Connection accepted [" + req.remoteAddress + "] count: " + clients.connections.length );

  if ( todoItems ) {
    connection.sendUTF( JSON.stringify( { type: "connect", data: todoItems } ) );
  } else {
    getTodoItems(function() {
      connection.sendUTF( JSON.stringify( { type: "connect", data: todoItems } ) );
    })
  }

  connection.on( "message", function( message ) {
    if ( message.type === "utf8" ) {
      var msgData = JSON.parse( message.utf8Data );

      if ( msgData.type === "add" ) {
        addTodo( msgData );
      }
      if ( msgData.type === "update" ) {
        updateTodo( msgData, this );
      }
    }
  });

  connection.on("close", function(reasonCode, description) {
    for (var i = 0, clientsLen = clients.connections.length; i < clientsLen; i++) {
      if ( clients.connections[ i ] === this ) {
        clients.connections.splice( i, 1 );
        console.log( ( new Date() ) + " Peer " + connection.remoteAddress + " disconnected. count: " + clients.connections.length );
      }
    }
  });

});
