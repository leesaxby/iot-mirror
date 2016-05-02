var app = angular.module( "mirror-app" );

app.factory("WebSocket", [ '$q' , function( $q ) {

  var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");
  var initialItems = [];
  var initialItemsDeferred = $q.defer();
  var initialItemsPromise = initialItemsDeferred.promise;
  var events = {
    add: [],
    update: []
  };


  function addCallback( type, callback ) {
    if ( type === "add" ) {
      events.add.push( callback );
    }

    if ( type === "update" ) {
      events.update.push( callback );
    }
  }

  ws.addEventListener("message", function(e) {
    var data = JSON.parse( e.data );
    if ( data.type === "add" ) {
      for ( var i = 0; i < events.add.length; i++ ) {
        events.add[ i ]( data );
      }
    }

    if ( data.type === "update" ) {
      for ( var i = 0; i < events.update.length; i++ ) {
        events.update[ i ]( data );
      }
    }

    if ( data.type === "connect" ) {
      initialItemsDeferred.resolve( data );
    }
  });

  function sendMessage( data ) {
    ws.send( data );
  }

  return {
    initialItemsPromise: initialItemsPromise,
    initialItems: initialItems,
    sendMessage: sendMessage,
    addCallback: addCallback
  };

}]);
