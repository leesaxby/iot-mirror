angular.module( "mirror-app" ).config( ( $routeProvider ) => {
  $routeProvider.when("/todo", {
    templateUrl: "templates/todo-edit.html"
  }).otherwise({
    templateUrl: "templates/display.html"
  });
});
