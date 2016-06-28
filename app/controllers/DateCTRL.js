"use strict";

app.controller('DateCTRL', function($scope, $rootScope, $location, queryStore, $routeParams, addedStorage) {
    $scope.results = [];
    $scope.dates = [];
    $scope.venues = [];
    $scope.artists = [];
    $scope.headliners = [];
    $scope.urls = [];
    $scope.openers = [];
    $scope.openernames = [];
    $scope.getId = [];
    $scope.addToCal = [];



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
    $location.path("/results").search({zipcode: zipcode, startdate: startdate});
  };

  if ($location.url === "search" || "results" || "calendar") {
        queryStore.searchCall($routeParams.zipcode, $routeParams.startdate)
          .then(function(queryResults){                  
              $scope.results = queryResults.Events;
              for (let i = 0; i < $scope.results.length; i++){
                  let newdate = new Date($scope.results[i].Date);
                    $scope.dates.push(moment(newdate).utcOffset("06:00").format('MMMM Do, YYYY, h:mm a'));
              }
              for (let i = 0; i < $scope.results.length; i++){
                $scope.venues.push($scope.results[i].Venue)
              }
              for (let i = 0; i < $scope.results.length; i++){
                $scope.artists.push($scope.results[i].Artists);
              }
              for (let i = 0; i < $scope.artists.length; i++){
                $scope.headliners.push($scope.artists[i][0].Name);
              }
              for (let i = 0; i < $scope.artists.length; i++){
                $scope.urls.push($scope.results[i].TicketUrl);
              }
              for (let i = 0; i < $scope.artists.length; i++){
                let bandarrays = $scope.artists[i].slice(1, $scope.artists.length + 1);
                $scope.openers.push(bandarrays);
              }
              // for (let i = 0; i < $scope.openers.length; i++){
              // console.log("openers", $scope.openers);
              //   if ($scope.openers[i].length > 0) {
              //       var curropeners = $scope.openers[i].length;
              //       for (let i = 0; i < curropeners; i++){
              //           for (var key in $scope.openers[i]){
              //           $scope.openernames.push($scope.openers[i][key].Name);
              //               console.log("name", $scope.openernames);
              //           }
              //       }
              //   }
              // }
        }) 
      }

      addedStorage.getAddedToCalList().then(function(someCollection){
        $scope.events = someCollection;
      });

      $scope.addToCalendar = (addedShow) => {
          addedStorage.addShowToCal($scope.results[addedShow])
          .then(function successCallback(response){
            $scope.addToCal.push($scope.results[addedShow])
            console.log("show", $scope.addToCal);
          })    
      }

        $scope.details = () => {
            $('#modal1').openModal();
        }



})


