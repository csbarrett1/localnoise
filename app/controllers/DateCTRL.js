"use strict";

app.controller('DateCTRL', function($scope, $location, queryStore, $routeParams) {
    $scope.results = [];
    var currentTime = new Date();

    $scope.currentTime = currentTime;
    $scope.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    $scope.monthShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    $scope.weekdaysFull = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $scope.weekdaysLetter = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    $scope.today = 'Today';
    $scope.clear = 'Clear';
    $scope.close = 'Close';
    var days = 1000;
    $scope.minDate = (new Date($scope.currentTime.getTime() - ( 1000 * 60 * 60 *24 * days ))).toISOString();
    $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();


// moment().format('MMMM Do YYYY, h:mm:ss a'); // June 22nd 2016, 8:22:02 am

  $scope.search = (zipcode, startdate) => {
    $location.path("/results").search({zipcode: zipcode, startdate: startdate});
  };

  if ($location.url !== "search") {
        queryStore.searchCall($routeParams.zipcode, $routeParams.startdate)
          .then(function(queryResults){                  
              $scope.results = queryResults.Events;
        }) 
      }





})