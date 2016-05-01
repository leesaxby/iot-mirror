(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var _todoList = require("./directives/todoList.js");

var _todoList2 = _interopRequireDefault(_todoList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = angular.module("mirror-app", ["todo-list"]);

},{"./directives/todoList.js":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var todoList = angular.module("todo-list", []);

todoList.directive("todoList", ['WebSocket', function (webSocket) {
	return {
		retrict: "E",
		templateUrl: "./views/todo-list.html",
		controller: function () {

			var items = [{
				id: "01",
				text: "first item",
				done: false
			}, {
				id: "02",
				text: "second item",
				done: true
			}];

			this.items = items;
			this.newItem = "";
			this.addItem = function () {
				var obj = {
					type: "todo_item",
					data: {
						text: this.newItem,
						done: false
					}
				};

				webSocket.sendMessage(JSON.stringify(obj));
				this.newItem = "";
			};
			this.toggleDone = function (item) {
				item.done = !item.done;

				var obj = {
					type: "todo_item",
					data: item
				};

				webSocket.sendMessage(JSON.stringify(obj));
			};
		},
		controllerAs: "todoList"
	};
}]);

exports.default = todoList;

},{}],3:[function(require,module,exports){
"use strict";

var app = angular.module("mirror-app");

app.factory("WebSocket", function () {

  var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");

  ws.addEventListener("message", function (e) {
    console.log(JSON.parse(e.data));
  });

  function sendMessage(data) {
    ws.send(data);
  }

  return {
    sendMessage: sendMessage
  };
});

},{}]},{},[1,2,3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2RpcmVjdGl2ZXMvdG9kb0xpc3QuanMiLCJzcmMvc2VydmljZXMvd2Vic29ja2V0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7QUNFQSxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFFLFlBQVksRUFBRSxDQUFFLFdBQVcsQ0FBRSxDQUFFLENBQUM7Ozs7Ozs7OztBQ0F6RCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFFLFdBQVcsRUFBRSxFQUFFLENBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFNBQVMsQ0FBRSxVQUFVLEVBQUUsQ0FBRSxXQUFXLEVBQUUsVUFBVSxTQUFTLEVBQUc7QUFDcEUsUUFBTztBQUNOLFNBQU8sRUFBRSxHQUFHO0FBQ1osYUFBVyxFQUFFLHdCQUF3QjtBQUNyQyxZQUFVLEVBQUUsWUFBVzs7QUFFdEIsT0FBSSxLQUFLLEdBQUcsQ0FBQztBQUNWLE1BQUUsRUFBRSxJQUFJO0FBQ1IsUUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBSSxFQUFFLEtBQUs7SUFDWCxFQUNEO0FBQ0MsTUFBRSxFQUFFLElBQUk7QUFDUixRQUFJLEVBQUUsYUFBYTtBQUNuQixRQUFJLEVBQUUsSUFBSTtJQUNWLENBQUMsQ0FBQzs7QUFFTCxPQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixPQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFJLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDekIsUUFBSSxHQUFHLEdBQUc7QUFDUCxTQUFJLEVBQUUsV0FBVztBQUNqQixTQUFJLEVBQUU7QUFDTCxVQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDbEIsVUFBSSxFQUFFLEtBQUs7TUFDWDtLQUNELENBQUM7O0FBR0osYUFBUyxDQUFDLFdBQVcsQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFFLENBQUE7QUFDOUMsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztBQUNGLE9BQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUc7QUFDbEMsUUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBRXZCLFFBQUksR0FBRyxHQUFHO0FBQ1AsU0FBSSxFQUFFLFdBQVc7QUFDakIsU0FBSSxFQUFFLElBQUk7S0FDVixDQUFDOztBQUVKLGFBQVMsQ0FBQyxXQUFXLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBRSxDQUFBO0lBQzlDLENBQUM7R0FDRjtBQUNELGNBQVksRUFBRSxVQUFVO0VBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMsQ0FBQzs7a0JBRVcsUUFBUTs7Ozs7QUNuRHhCLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUUsWUFBWSxDQUFFLENBQUM7O0FBRXpDLEdBQUcsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLFlBQVc7O0FBR25DLE1BQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLDBCQUEwQixFQUFFLGVBQWUsQ0FBQyxDQUFDOztBQUVuRSxJQUFFLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQVMsQ0FBQyxFQUFFO0FBQzNDLFdBQU8sQ0FBQyxHQUFHLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBRSxDQUFDLENBQUMsSUFBSSxDQUFFLENBQUUsQ0FBQztHQUNwQyxDQUFDLENBQUM7O0FBR0YsV0FBUyxXQUFXLENBQUUsSUFBSSxFQUFHO0FBQzNCLE1BQUUsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFFLENBQUM7R0FDakI7O0FBRUQsU0FBTztBQUNMLGVBQVcsRUFBRSxXQUFXO0dBQ3pCLENBQUM7Q0FFSCxDQUFDLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IHRvZG9MaXN0IGZyb20gXCIuL2RpcmVjdGl2ZXMvdG9kb0xpc3QuanNcIjtcblxudmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCBcIm1pcnJvci1hcHBcIiwgWyBcInRvZG8tbGlzdFwiIF0gKTtcbiIsIlxuXG5cdHZhciB0b2RvTGlzdCA9IGFuZ3VsYXIubW9kdWxlKCBcInRvZG8tbGlzdFwiLCBbXSApO1xuXG5cdHRvZG9MaXN0LmRpcmVjdGl2ZSggXCJ0b2RvTGlzdFwiLCBbICdXZWJTb2NrZXQnLCBmdW5jdGlvbiggd2ViU29ja2V0ICkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRyZXRyaWN0OiBcIkVcIixcblx0XHRcdHRlbXBsYXRlVXJsOiBcIi4vdmlld3MvdG9kby1saXN0Lmh0bWxcIixcblx0XHRcdGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCkge1xuXG5cdFx0XHRcdHZhciBpdGVtcyA9IFt7XG5cdFx0XHRcdFx0XHRcdGlkOiBcIjAxXCIsXG5cdFx0XHRcdFx0XHRcdHRleHQ6IFwiZmlyc3QgaXRlbVwiLFxuXHRcdFx0XHRcdFx0XHRkb25lOiBmYWxzZVxuXHRcdFx0XHRcdFx0fSxcblx0XHRcdFx0XHRcdHtcblx0XHRcdFx0XHRcdFx0aWQ6IFwiMDJcIixcblx0XHRcdFx0XHRcdFx0dGV4dDogXCJzZWNvbmQgaXRlbVwiLFxuXHRcdFx0XHRcdFx0XHRkb25lOiB0cnVlXG5cdFx0XHRcdFx0XHR9XTtcblxuXHRcdFx0XHR0aGlzLml0ZW1zID0gaXRlbXM7XG5cdFx0XHRcdHRoaXMubmV3SXRlbSA9IFwiXCI7XG5cdFx0XHRcdHRoaXMuYWRkSXRlbSA9IGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdHZhciBvYmogPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0b2RvX2l0ZW1cIixcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0ZXh0OiB0aGlzLm5ld0l0ZW0sXG5cdFx0XHRcdFx0XHRcdFx0XHRkb25lOiBmYWxzZVxuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0fTtcblxuXG5cdFx0XHRcdFx0d2ViU29ja2V0LnNlbmRNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggb2JqICkgKVxuXHRcdFx0XHRcdHRoaXMubmV3SXRlbSA9IFwiXCI7XG5cdFx0XHRcdH07XG5cdFx0XHRcdHRoaXMudG9nZ2xlRG9uZSA9IGZ1bmN0aW9uKCBpdGVtICkge1xuXHRcdFx0XHRcdGl0ZW0uZG9uZSA9ICFpdGVtLmRvbmU7XG5cblx0XHRcdFx0XHR2YXIgb2JqID0ge1xuXHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwidG9kb19pdGVtXCIsXG5cdFx0XHRcdFx0XHRcdFx0ZGF0YTogaXRlbVxuXHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0d2ViU29ja2V0LnNlbmRNZXNzYWdlKCBKU09OLnN0cmluZ2lmeSggb2JqICkgKVxuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXJBczogXCJ0b2RvTGlzdFwiXG5cdFx0fTtcblx0fV0pO1xuXG5cdGV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuIiwidmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCBcIm1pcnJvci1hcHBcIiApO1xuXG5hcHAuZmFjdG9yeShcIldlYlNvY2tldFwiLCBmdW5jdGlvbigpIHtcblxuXG5cdHZhciB3cyA9IG5ldyBXZWJTb2NrZXQoXCJ3czovLzE3OC42Mi4xMTcuMTUwOjk5OTlcIiwgXCJlY2hvLXByb3RvY29sXCIpO1xuXG4gIHdzLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIGZ1bmN0aW9uKGUpIHtcblx0XHRjb25zb2xlLmxvZyggSlNPTi5wYXJzZSggZS5kYXRhICkgKTtcblx0fSk7XG5cblxuICBmdW5jdGlvbiBzZW5kTWVzc2FnZSggZGF0YSApIHtcbiAgICB3cy5zZW5kKCBkYXRhICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHNlbmRNZXNzYWdlOiBzZW5kTWVzc2FnZVxuICB9O1xuXG59KTtcbiJdfQ==
