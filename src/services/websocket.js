var app = angular.module( "mirror-app" );

app.factory("WebSocket", [ '$q' , function( $q ) {

  var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");
  var initialItemsDeferred = $q.defer();
  var initialItemsPromise = initialItemsDeferred.promise;
  var addItemDeferred = $q.defer();
  var addItemPromise = addItemDeferred.promise;
  var updateItemDeferred = $q.defer();
  var updateItemPromise = updateItemDeferred.promise;

  ws.addEventListener("message", function(e) {
    var data = JSON.parse( e.data );

    switch ( data.type ) {
      case "add":
        addItemDeferred.resolve( data );
        break;
      case "update":
        updateItemDeferred.resolve( data );
        break;
      case "connect":
        initialItemsDeferred.resolve( data );
        break;
    };
  });

  function sendMessage( data ) {
    ws.send( data );
  }

  return {
    initialItemsPromise: initialItemsPromise,
    addItemPromise: addItemPromise,
    updateItemPromise: updateItemPromise,
    sendMessage: sendMessage,
  };

}]);
