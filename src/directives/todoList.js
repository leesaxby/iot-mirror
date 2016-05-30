  let todoList = angular.module( "todo-list", [] );

  todoList.directive( "todoList", [ function() {
    return {
      retrict: "E",
      templateUrl: "./views/todo-list.html",
      controller: "TodoListCtrl",
      controllerAs: "todo"
    };
  }]);
