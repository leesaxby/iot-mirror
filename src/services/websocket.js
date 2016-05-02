var app = angular.module( "mirror-app" );

app.factory("WebSocket", function() {

	var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");
  var initialItems = [];
  var events = {
    add: []
  };

  function addCallback( type, callback ) {
      if ( type === "add" ) {
        events.add.push( callback );
      }
  }

  ws.addEventListener("message", function(e) {
    var data = JSON.parse( e.data );
    if ( data.type == "add" ) {
        for ( var i = 0; i < events.add.length; i++ ) {
          events.add[ i ]( data );
        }
    }

    if ( data.type == "connect" ) {
      for ( var i = 0; i < data.data.length; i++ ) {
        initialItems.push( data.data[ i ] );
      }
    }
	});

  function sendMessage( data ) {
    ws.send( data );
  }

  return {
    initialItems: initialItems,
    sendMessage: sendMessage,
    addCallback: addCallback
  };

});
