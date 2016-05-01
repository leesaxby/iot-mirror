var app = angular.module( "mirror-app" );

app.factory("WebSocket", function() {


	var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");

  ws.addEventListener("message", function(e) {
		console.log( JSON.parse( e.data ) );
	});


  function sendMessage( data ) {
    ws.send( data );
  }

  return {
    sendMessage: sendMessage
  };

});
