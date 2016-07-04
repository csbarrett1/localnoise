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
      $scope.artists.push($scope.events[i].artists)
      $scope.ids.push($scope.events[i].id)
    }


    for (let i = 0; i < $scope.artists.length; i++) {
      $scope.bands.push($scope.artists[i][0].Name)
    }

    $scope.openDeleteModal = (event) => {
        $('#modal2').openModal();
        $scope.deletethiseffingevent = event;
          console.log("", event);
    }

    $scope.removeFromCalendar = (event) => {
      addedStorage.deleteEvent(event.id)
      .then(function(response){
          console.log("", event);
        addedStorage.getAddedToCalList().then(function(showCollection){
          $scope.events = [];
          $scope.events = showCollection;
          console.log("", $scope.events);

        });
      });
    };

  });



})
