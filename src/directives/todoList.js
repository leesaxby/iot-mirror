
	var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");
	ws.addEventListener("message", function(e) {
		console.log( JSON.parse( e.data ) );

	});


	var todoList = angular.module( "todo-list", [] );

	todoList.directive( "todoList", [ '$http', function( $http ) {
		return {
			retrict: "E",
			templateUrl: "./views/todo-list.html",
			controller: function() {

				var items = [{
							id: "01",
							text: "first item",
							done: false
						},
						{
							id: "02",
							text: "second item",
							done: true
						}];

				this.items = items;
				this.newItem = "";
				this.addItem = function() {
					var obj = {
								type: "todo_item",
								data: {
									text: this.newItem,
									done: false
								}
							};

					ws.send( JSON.stringify( obj ) );
					this.newItem = "";
				};
				this.toggleDone = function( item ) {
					item.done = !item.done;

					var obj = {
								type: "todo_item",
								data: item
							};

					ws.send( JSON.stringify( obj ) )	;
				};
			},
			controllerAs: "todoList"
		};
	}]);

	export default todoList;
