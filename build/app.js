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

var ws = new WebSocket("ws://178.62.117.150:9999", "echo-protocol");
ws.addEventListener("message", function (e) {
	console.log(JSON.parse(e.data));
});

var todoList = angular.module("todo-list", []);

todoList.directive("todoList", ['$http', function ($http) {
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

				ws.send(JSON.stringify(obj));
				this.newItem = "";
			};
			this.toggleDone = function (item) {
				item.done = !item.done;

				var obj = {
					type: "todo_item",
					data: item
				};

				ws.send(JSON.stringify(obj));
			};
		},
		controllerAs: "todoList"
	};
}]);

exports.default = todoList;

},{}]},{},[1,2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvYXBwLmpzIiwic3JjL2RpcmVjdGl2ZXMvdG9kb0xpc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUUsWUFBWSxFQUFFLENBQUUsV0FBVyxDQUFFLENBQUUsQ0FBQzs7Ozs7Ozs7O0FDRHpELElBQUksRUFBRSxHQUFHLElBQUksU0FBUyxDQUFDLDBCQUEwQixFQUFFLGVBQWUsQ0FBQyxDQUFDO0FBQ3BFLEVBQUUsQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsVUFBUyxDQUFDLEVBQUU7QUFDMUMsUUFBTyxDQUFDLEdBQUcsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFFLENBQUMsQ0FBQyxJQUFJLENBQUUsQ0FBRSxDQUFDO0NBRXBDLENBQUMsQ0FBQzs7QUFHSCxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFFLFdBQVcsRUFBRSxFQUFFLENBQUUsQ0FBQzs7QUFFakQsUUFBUSxDQUFDLFNBQVMsQ0FBRSxVQUFVLEVBQUUsQ0FBRSxPQUFPLEVBQUUsVUFBVSxLQUFLLEVBQUc7QUFDNUQsUUFBTztBQUNOLFNBQU8sRUFBRSxHQUFHO0FBQ1osYUFBVyxFQUFFLHdCQUF3QjtBQUNyQyxZQUFVLEVBQUUsWUFBVzs7QUFFdEIsT0FBSSxLQUFLLEdBQUcsQ0FBQztBQUNWLE1BQUUsRUFBRSxJQUFJO0FBQ1IsUUFBSSxFQUFFLFlBQVk7QUFDbEIsUUFBSSxFQUFFLEtBQUs7SUFDWCxFQUNEO0FBQ0MsTUFBRSxFQUFFLElBQUk7QUFDUixRQUFJLEVBQUUsYUFBYTtBQUNuQixRQUFJLEVBQUUsSUFBSTtJQUNWLENBQUMsQ0FBQzs7QUFFTCxPQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixPQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixPQUFJLENBQUMsT0FBTyxHQUFHLFlBQVc7QUFDekIsUUFBSSxHQUFHLEdBQUc7QUFDUCxTQUFJLEVBQUUsV0FBVztBQUNqQixTQUFJLEVBQUU7QUFDTCxVQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87QUFDbEIsVUFBSSxFQUFFLEtBQUs7TUFDWDtLQUNELENBQUM7O0FBRUosTUFBRSxDQUFDLElBQUksQ0FBRSxJQUFJLENBQUMsU0FBUyxDQUFFLEdBQUcsQ0FBRSxDQUFFLENBQUM7QUFDakMsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDbEIsQ0FBQztBQUNGLE9BQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxJQUFJLEVBQUc7QUFDbEMsUUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7O0FBRXZCLFFBQUksR0FBRyxHQUFHO0FBQ1AsU0FBSSxFQUFFLFdBQVc7QUFDakIsU0FBSSxFQUFFLElBQUk7S0FDVixDQUFDOztBQUVKLE1BQUUsQ0FBQyxJQUFJLENBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBRSxHQUFHLENBQUUsQ0FBRSxDQUFFO0lBQ2xDLENBQUM7R0FDRjtBQUNELGNBQVksRUFBRSxVQUFVO0VBQ3hCLENBQUM7Q0FDRixDQUFDLENBQUMsQ0FBQzs7a0JBRVcsUUFBUSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgdG9kb0xpc3QgZnJvbSBcIi4vZGlyZWN0aXZlcy90b2RvTGlzdC5qc1wiO1xuXG52YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoIFwibWlycm9yLWFwcFwiLCBbIFwidG9kby1saXN0XCIgXSApO1xuIiwiXG5cdHZhciB3cyA9IG5ldyBXZWJTb2NrZXQoXCJ3czovLzE3OC42Mi4xMTcuMTUwOjk5OTlcIiwgXCJlY2hvLXByb3RvY29sXCIpO1xuXHR3cy5hZGRFdmVudExpc3RlbmVyKFwibWVzc2FnZVwiLCBmdW5jdGlvbihlKSB7XG5cdFx0Y29uc29sZS5sb2coIEpTT04ucGFyc2UoIGUuZGF0YSApICk7XG5cblx0fSk7XG5cblxuXHR2YXIgdG9kb0xpc3QgPSBhbmd1bGFyLm1vZHVsZSggXCJ0b2RvLWxpc3RcIiwgW10gKTtcblxuXHR0b2RvTGlzdC5kaXJlY3RpdmUoIFwidG9kb0xpc3RcIiwgWyAnJGh0dHAnLCBmdW5jdGlvbiggJGh0dHAgKSB7XG5cdFx0cmV0dXJuIHtcblx0XHRcdHJldHJpY3Q6IFwiRVwiLFxuXHRcdFx0dGVtcGxhdGVVcmw6IFwiLi92aWV3cy90b2RvLWxpc3QuaHRtbFwiLFxuXHRcdFx0Y29udHJvbGxlcjogZnVuY3Rpb24oKSB7XG5cblx0XHRcdFx0dmFyIGl0ZW1zID0gW3tcblx0XHRcdFx0XHRcdFx0aWQ6IFwiMDFcIixcblx0XHRcdFx0XHRcdFx0dGV4dDogXCJmaXJzdCBpdGVtXCIsXG5cdFx0XHRcdFx0XHRcdGRvbmU6IGZhbHNlXG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0e1xuXHRcdFx0XHRcdFx0XHRpZDogXCIwMlwiLFxuXHRcdFx0XHRcdFx0XHR0ZXh0OiBcInNlY29uZCBpdGVtXCIsXG5cdFx0XHRcdFx0XHRcdGRvbmU6IHRydWVcblx0XHRcdFx0XHRcdH1dO1xuXG5cdFx0XHRcdHRoaXMuaXRlbXMgPSBpdGVtcztcblx0XHRcdFx0dGhpcy5uZXdJdGVtID0gXCJcIjtcblx0XHRcdFx0dGhpcy5hZGRJdGVtID0gZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIG9iaiA9IHtcblx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInRvZG9faXRlbVwiLFxuXHRcdFx0XHRcdFx0XHRcdGRhdGE6IHtcblx0XHRcdFx0XHRcdFx0XHRcdHRleHQ6IHRoaXMubmV3SXRlbSxcblx0XHRcdFx0XHRcdFx0XHRcdGRvbmU6IGZhbHNlXG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9O1xuXG5cdFx0XHRcdFx0d3Muc2VuZCggSlNPTi5zdHJpbmdpZnkoIG9iaiApICk7XG5cdFx0XHRcdFx0dGhpcy5uZXdJdGVtID0gXCJcIjtcblx0XHRcdFx0fTtcblx0XHRcdFx0dGhpcy50b2dnbGVEb25lID0gZnVuY3Rpb24oIGl0ZW0gKSB7XG5cdFx0XHRcdFx0aXRlbS5kb25lID0gIWl0ZW0uZG9uZTtcblxuXHRcdFx0XHRcdHZhciBvYmogPSB7XG5cdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJ0b2RvX2l0ZW1cIixcblx0XHRcdFx0XHRcdFx0XHRkYXRhOiBpdGVtXG5cdFx0XHRcdFx0XHRcdH07XG5cblx0XHRcdFx0XHR3cy5zZW5kKCBKU09OLnN0cmluZ2lmeSggb2JqICkgKVx0O1xuXHRcdFx0XHR9O1xuXHRcdFx0fSxcblx0XHRcdGNvbnRyb2xsZXJBczogXCJ0b2RvTGlzdFwiXG5cdFx0fTtcblx0fV0pO1xuXG5cdGV4cG9ydCBkZWZhdWx0IHRvZG9MaXN0O1xuIl19
