var app = angular.module( "mirror-app" );

app.factory("WebSocket", [ '$q' , function( $q ) {

  var ws = null;
  var initialItemsDeferred = $q.defer();
  var msgHandlers = [];
  var addMsgHandler = ( fn ) => msgHandlers.push( fn );
  var sendMessage = ( data ) => ws.send( data );

  var createSocket = ( url, protocal ) => {
    ws = new WebSocket( url, protocal );

    ws.addEventListener("message", function(e) {
      var data = JSON.parse( e.data );
      for ( var i = 0; i < msgHandlers.length; i++ ) {
        msgHandlers[i]( data );
      }

      if( data.type === "connect" ) {
        initialItemsDeferred.resolve( data );
      }

    });
  }

  return {
    initialItemsPromise: initialItemsDeferred.promise,
    createSocket: createSocket,
    addMsgHandler: addMsgHandler,
    sendMessage: sendMessage
  };

}]);
