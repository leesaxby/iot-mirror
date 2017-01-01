angular.module( "mirror-app" ).controller("TodoListCtrl", [ "$timeout", "WebSocket", function( $timeout, webSocket ) {

  this.items = [];
  this.newItem = "";

  this.addItem = () => {
    let obj = {
          type: "add",
          data: {
            text: this.newItem,
            done: false
          }
        };

    webSocket.sendMessage( JSON.stringify( obj ) )
    this.newItem = "";
  };

  this.toggleDone = ( item ) => {
    item.done = !item.done;

    let obj = {
          type: "update",
          data: item
        };

    webSocket.sendMessage( JSON.stringify( obj ) );
  };

  webSocket.createSocket( "ws://178.62.117.150:9999", "echo-protocol" );

  webSocket.initialItemsPromise.then( ( data ) => {
    for ( let i = 0; i < data.data.length; i++ ) {
      this.items.push( data.data[ i ] );
    }
  }, ( err ) => console.log( err ) );

  webSocket.addMsgHandler( ( data ) => {
    if ( data.type === "add" ) {
      $timeout( () => this.items.push( data.data ) );
    }

    if ( data.type === "update" ) {
      $timeout( () => {
        for ( let i = 0; i < this.items.length; i++ ) {
          if ( this.items[i].id === data.data.id ) {
            this.items[i].done = data.data.done;
            break;
          }
        }
      });
    }

  });

}]);
