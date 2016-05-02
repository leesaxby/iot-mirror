

	var todoList = angular.module( "todo-list", [] );

	todoList.directive( "todoList", [ 'WebSocket', function(  webSocket ) {
		return {
			retrict: "E",
			templateUrl: "./views/todo-list.html",
			controller: function( $scope ) {

				webSocket.addCallback( "add", function( data ) {
					$scope.$apply(function() {
						$scope.todo.items.push( data.data );
					});
				});

				this.items = webSocket.initialItems;
				this.newItem = "";
				this.addItem = function() {
					var obj = {
								type: "todo_item",
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
								type: "todo_item",
								data: item
							};

					webSocket.sendMessage( JSON.stringify( obj ) )
				};
			},
			controllerAs: "todo"
		};
	}]);

	export default todoList;
