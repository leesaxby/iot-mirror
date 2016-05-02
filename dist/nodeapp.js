var server = require( "./server.js" ).startServer();
var WebSocketServer = require( "websocket" ).server;
var wsServer = new WebSocketServer({
	httpServer: server,
	autoAcceptConnections: false
});

var clients = {
	connections: []
};

var todoItems = [{
			id: '01',
			text: "first item",
			done: false
		},
		{
			id: '02',
			text: "second item",
			done: true
		}]

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

	connection.sendUTF( JSON.stringify( { type: "connect", data: todoItems } ) );

	connection.on( "message", function( message ) {
		if ( message.type === "utf8" ) {
			var msgData = JSON.parse( message.utf8Data );
			if ( msgData.type === "todo_item" ) {
				if ( msgData.data.id ) {
					updateTodo( msgData, this );
				} else {
					addTodo( msgData );
				}
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
