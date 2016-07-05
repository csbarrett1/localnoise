"use strict";

app.controller('CalendarCTRL', function($scope, $location, addedStorage) {
    addedStorage.getAddedToCalList().then(function(someCollection){
    $scope.events = someCollection;
  });

    $scope.openDeleteModal = (event) => {
        $('#modal2').openModal();
        console.log("", event);
        $scope.deletethiseffingevent = event;
    }

    $scope.removeFromCalendar = (event) => {
      addedStorage.deleteEvent(event.id)
      .then(function(response){
          console.log("response", response);
          console.log("", event);
        addedStorage.getAddedToCalList().then(function(stuff){
          $scope.events = stuff;
          for (let i = 0; i < $scope.events.length; i++) {
            let newdate = $scope.events[i].date;
            $scope.dates.push(moment(newdate).format('MMMM Do, h:mm a'));
            $scope.venues.push($scope.events[i].venue)
            $scope.artists.push($scope.events[i].artists)
            $scope.ids.push($scope.events[i].id)
          }
          console.log("", stuff);
          console.log("", stuff.length);

        });
      });
    };


})
