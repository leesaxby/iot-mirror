

  var todoList = angular.module( "todo-list", [] );

  todoList.directive( "todoList", [ 'WebSocket', function(  webSocket ) {
    return {
      retrict: "E",
      templateUrl: "./views/todo-list.html",
      controller: function( $scope ) {
        var self = this;

        webSocket.initialItemsPromise.then(function( data ) {
          for ( var i = 0; i < data.data.length; i++ ) {
            self.items.push( data.data[ i ] );
          }
        }, function( err ) {
          console.log(err)
        })


        webSocket.addCallback( "add", function( data ) {
          $scope.$apply(function() {
            $scope.todo.items.push( data.data );
          });
        });

        webSocket.addCallback( "update", function( data ) {
          $scope.$apply(function() {
            for (var i = 0; i < $scope.todo.items.length; i++) {
              if ( $scope.todo.items[i].id === data.data.id ) {
                $scope.todo.items[i].done = data.data.done;
                break;
              }
            }
          });
        });

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
      },
      controllerAs: "todo"
    };
  }]);

  export default todoList;
