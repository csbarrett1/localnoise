
"use strict";
app.controller("ZipCTRL", function($scope, zipQueryStore){
  $scope.queryStorage = [];
  console.log ("zipsearch", $("#zipsearch"));

  $scope.searchZIP = () => {
    zipQueryStore.zipSearchCall()
      .then(function(queryResults){
        $scope.queryStorage = queryResults[0];
    });
  };

});