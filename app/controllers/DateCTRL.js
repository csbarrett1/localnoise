"use strict";

app.controller('DateCTRL', function($scope, $location, queryStore) {
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




  $scope.search = (zipcode, startdate) => {
    $scope.results = queryStore.searchCall(zipcode, startdate)
      .then(function(queryResults){
        queryResults.forEach(function(queryResult){
          $scope.results.push(queryResults.Events);
        console.log("queryResults", results);
        });

    // $scope.results = queryStore.searchCall(zipcode, startdate)
    //   .then(function(queryResults){
    //    $scope.result = queryResults.Events;

    //     // console.log("scopeResults", $scope.results);

    })
  };
})

