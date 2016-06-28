"use strict";

app.controller('CalendarCTRL', function($scope, $location, addedStorage) {
  $scope.events = [];

  addedStorage.getAddedToCalList().then(function(showCollection){
    $scope.events = showCollection;
  });


 $scope.calendarOptions = {
    defaultDate: new Date(),
    minDate: new Date(),
    maxDate: new Date([2020, 12, 31]),
    dayNamesLength: 9, // How to display weekdays (1 for "M", 2 for "Mo", 3 for "Mon"; 9 will show full day names; default is 1)
    multiEventDates: true, // Set the calendar to render multiple events in the same day or only one event, default is false
    maxEventsPerDay: 5, // Set how many events should the calendar display before showing the 'More Events' message, default is 3;
    // eventClick: $scope.eventClick,
    // dateClick: $scope.dateClick
  };


  for (let i = 0; i < $scope.events.length; i++){
    console.log("date", $scope.events[i].date);
  }


})

