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

    $scope.showCal = false;


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
    $scope.minDate = (new Date($scope.currentTime.getTime())).toISOString();
    $scope.maxDate = (new Date($scope.currentTime.getTime() + ( 1000 * 60 * 60 *24 * days ))).toISOString();


  $scope.search = (zipcode, startdate) => {

    if (zipcode === undefined) {
        Materialize.toast("Please enter a zipcode" , 4000);
        } else if (startdate === undefined) {
          Materialize.toast("Please enter a date" , 4000);
           } else {
    $location.path("/results").search({zipcode: zipcode, startdate: startdate});
  };
  }

  if ($location.url === "search" || "results" || "calendar") {
        queryStore.searchCall($routeParams.zipcode, $routeParams.startdate)
          .then(function(queryResults){                  
            $scope.results = queryResults.Events;

            for (let i = 0; i < $scope.results.length; i++){
              $scope.venues.push($scope.results[i].Venue)
              $scope.artists.push($scope.results[i].Artists);
              let newdate = new Date($scope.results[i].Date);
              $scope.dates.push(moment(newdate).utcOffset("06:00").format('MMMM Do, h:mm a'));
              $scope.results[i].Added = false;
            
            }
            
            for (let i = 0; i < $scope.artists.length; i++){
              $scope.headliners.push($scope.artists[i][0].Name);

            }
        }) 
      }

  $scope.addToCalendar = () => {
      $scope.selected.Added = true;
      addedStorage.addShowToCal($scope.selected)
      .then(function successCallback(response){
        $scope.addToCal.push($scope.selected)

      })    
  }

    $scope.details = (result) => {
        $scope.date = moment(result.Date).format('MMMM Do, h:mm a');
        $scope.selected = result;
        $scope.artist = [];
        $scope.oneartist = [];
        $scope.list = "";

        for (let i = 0; i < result.Artists.length; i++){
          $scope.artist.push(result.Artists[i].Name)
        }
        if ($scope.artist.length === 1) {
          $scope.oneartist.push($scope.artist[0])
        } else {
          $scope.list = $scope.artist.join(", ")
        }

        $('#modal1').openModal();
    }


})


