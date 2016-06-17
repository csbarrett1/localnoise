console.log("ZipCTRL");
"use strict";
app.controller("ZipCTRL", function($scope, $location, zipQueryStore){
  $scope.queryStorage = [];

  $scope.searchZIP = () => {
   zipQueryStore.zipSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
        $location.path("#/date");
    });
  };

});