"use strict";

app.controller('CalendarCTRL', function($scope, $location, addedStorage) {

  $scope.addedShows = [];

  addedStorage.getAddedToCalList().then(function(showCollection){
    console.log(showCollection);
    $scope.addedShows = showCollection;
  });


})