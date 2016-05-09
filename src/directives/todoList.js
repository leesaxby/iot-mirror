  var todoList = angular.module( "todo-list", [] );

  todoList.directive( "todoList", [ "$timeout", "WebSocket", function( $timeout, webSocket ) {
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

        webSocket.createSocket( "ws://178.62.117.150:9999", "echo-protocol" );

        webSocket.initialItemsPromise.then(function( data ) {
          for ( var i = 0; i < data.data.length; i++ ) {
            self.items.push( data.data[ i ] );
          }
        }, function( err ) {
          console.log(err)
        })

        webSocket.addMsgHandler(function( data ) {
          if ( data.type === "add" ) {
            $timeout(function() {
              self.items.push( data.data );
            })
          }

          if ( data.type === "update" ) {
            $timeout(function() {
              for (var i = 0; i < self.items.length; i++) {
                if ( self.items[i].id === data.data.id ) {
                  self.items[i].done = data.data.done;
                  break;
                }
              }
            })
          }

        })

      },
      controllerAs: "todo"
    };
  }]);

  export default todoList;
