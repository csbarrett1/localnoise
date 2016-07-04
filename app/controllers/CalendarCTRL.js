"use strict";

app.controller('CalendarCTRL', function($scope, $location, addedStorage) {
  // $scope.isDark = true;
  $scope.dates = [];
  $scope.venues = [];
  $scope.artists = [];
  $scope.ids = [];
  $scope.bands = [];

  addedStorage.getAddedToCalList().then(function(showCollection){
    console.log("showcollection", showCollection);
    $scope.events = showCollection;
    for (let i = 0; i < $scope.events.length; i++) {
      let newdate = $scope.events[i].date;
      $scope.dates.push(moment(newdate).format('MMMM Do, h:mm a'));
      $scope.venues.push($scope.events[i].venue)
      $scope.ids.push($scope.events[i].id)
      $scope.artists.push($scope.events[i].artists)
    }
    for (let i = 0; i < $scope.artists.length; i++) {
      $scope.bands.push($scope.artists[i][0].Name)
    }

    // addedStorage.getAddedToCalList().then(function(someCollection){
    //   $scope.events = someCollection;
    // });



  $scope.delete = (selected) => {
      $('#modal1').openModal();
        console.log("", selected);
  }



  $scope.removeFromCalendar = function(selected){
    addedStorage.deleteEvent(selected)
    .then(function(){
        console.log("", selected);
      addedStorage.getAddedToCalList().then(function(someCollection){
        $scope.events = someCollection;

      });
    });
  };






  });



})
