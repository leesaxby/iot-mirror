  var todoList = angular.module( "todo-list", [] );

  todoList.directive( "todoList", [ 'WebSocket', function(  webSocket ) {
    return {
      retrict: "E",
      templateUrl: "./views/todo-list.html",
      controller: function() {

        var self = this;
        this.items = [];
        this.newItem = "";

        this.addItem = function() {
          var obj = {
                type: "add",
                data: {
                  text: this.newItem,
                  done: false
                }
              };

          webSocket.sendMessage( JSON.stringify( obj ) )
          this.newItem = "";
        };

        this.toggleDone = function( item ) {
          item.done = !item.done;

          var obj = {
                type: "update",
                data: item
              };

          webSocket.sendMessage( JSON.stringify( obj ) )
        };

        webSocket.initialItemsPromise.then(function( data ) {
          for ( var i = 0; i < data.data.length; i++ ) {
            self.items.push( data.data[ i ] );
          }
        }, function( err ) {
          console.log(err)
        })

        webSocket.addItemPromise.then(function( data ) {
          self.items.push( data.data );
        }, function( err ) {
          console.log(err)
        })

        webSocket.updateItemPromise.then(function( data ) {
          for (var i = 0; i < self.items.length; i++) {
            if ( self.items[i].id === data.data.id ) {
              self.items[i].done = data.data.done;
              break;
            }
          }
        }, function( err ) {
          console.log(err)
        })
      },
      controllerAs: "todo"
    };
  }]);

  export default todoList;
