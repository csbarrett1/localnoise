var app = angular.module("LocalNoise", ["ngRoute", '500tech.simple-calendar', 'ui.materialize'])
  .constant("firebaseURL", "https://localnoise.firebaseio.com/")
  .controller('BodyController', ["$scope", function ($scope) {
      $scope.select = {
          value: "Option1",
          choices: ["Option1", "I'm an option", "This is materialize", "No, this is Patrick."]
      };
  }]);

let isAuth = (AuthFactory) => new Promise ((resolve, reject) => {
  if(AuthFactory.isAuthenticated()){
    resolve();
  } else {
    reject();
  }
})


 

app.config(function($routeProvider){
    $routeProvider.
        when("/login", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL",
            resolve: !{isAuth}
        }).
        when("/logout", {
            templateUrl: "partials/login.html",
            controller: "AuthCTRL"
        }).
        when("/register", {
            templateUrl: "partials/register.html",
            controller: "AuthCTRL",
            resolve: !{isAuth}
        }).
        when("/search", {
            templateUrl: "partials/search.html",
            controller: "DateCTRL",
            resolve: {isAuth}
        }).
        when("/calendar", {
            templateUrl: "partials/calendar.html",
            controller: "CalendarCTRL",
            resolve: {isAuth}
        }).
        when("/results", {
            templateUrl: "partials/results.html",
            controller: "DateCTRL",
            resolve: {isAuth}
        }).
      otherwise("/");
});



app.run(($location) => {
  let localRef = new Firebase("https://localnoise.firebaseio.com/");

  localRef.onAuth(authData => {
    if(!authData) {
      $location.path("/login");
    }
  });
});

