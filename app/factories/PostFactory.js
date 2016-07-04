'use strict';

app.factory("addedStorage", function($q, $http, firebaseURL, AuthFactory) {

  var addShowToCal = function(addedShow) {

    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .post(firebaseURL + "shows.json",
          JSON.stringify({
            id: addedShow.Id,
            date: addedShow.Date,
            venue: addedShow.Venue,
            artists: addedShow.Artists,
            ticketurl: addedShow.TicketUrl,
            added: false
          }))
        .success(function(objectFromFirebase) {
          resolve(objectFromFirebase);
        })
        .error(function(error) {
          reject(error);
        });
    });
  };


  var getAddedToCalList = function() {

    let addedShows = [];
    let user = AuthFactory.getUser();

    return $q(function(resolve, reject) {
      $http
        .get(`${firebaseURL}shows.json`)
        .success(function(chosenShowObject){
          var addedShowCollection = chosenShowObject;
          Object.keys(addedShowCollection).forEach(function(key){
            addedShowCollection[key].id=key;
            addedShows.push(addedShowCollection[key]);
        });
        resolve(addedShows);
      })
      .error(function(error){
        reject(error);
      });
    });
  };


    var deleteEvent = function(chosenShowId){
    return $q(function(resolve, reject){
      $http.delete(firebaseURL + `/shows/${chosenShowId}.json`)
           .success(function(objectFromFirebase){
           resolve(objectFromFirebase);
        })
    });
  };

  

    return {addShowToCal:addShowToCal, getAddedToCalList:getAddedToCalList, deleteEvent:deleteEvent};

});