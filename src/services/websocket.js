let app = angular.module( "mirror-app" );

app.factory("WebSocket", [ '$q' , function( $q ) {

  let ws = null;
  let initialItemsDeferred = $q.defer();
  let msgHandlers = [];
  let addMsgHandler = ( fn ) => msgHandlers.push( fn );
  let sendMessage = ( data ) => ws.send( data );

  let createSocket = ( url, protocal ) => {
    ws = new WebSocket( url, protocal );

    ws.addEventListener("message", function(e) {
      let data = JSON.parse( e.data );
      for ( let i = 0; i < msgHandlers.length; i++ ) {
        msgHandlers[i]( data );
      }

      if ( data.type === "connect" ) {
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
