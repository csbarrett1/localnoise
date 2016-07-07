"use strict";

app.controller('CalendarCTRL', ['$scope', '$location', 'addedStorage', function($scope, $location, addedStorage) {
    addedStorage.getAddedToCalList().then(function(someCollection){
    $scope.events = someCollection;

    $scope.parsedDate = [];
    $scope.parsedDate.sort();

    for (let i = 0; i < $scope.events.length; i++) {
      let newdate = new Date($scope.events[i].date);
      $scope.parsedDate.push(moment(newdate).utcOffset("06:00").format('MMMM Do, h:mm a'));
    }
  });

    $scope.openDeleteModal = (event) => {
        $('#modal2').openModal();
        $scope.deletethiseffingevent = event;
    }

    $scope.removeFromCalendar = (event) => {
      addedStorage.deleteEvent(event.id)
      .then(function(response){
        addedStorage.getAddedToCalList().then(function(stuff){
          $scope.events = stuff;

        });
      });
    };


}])
