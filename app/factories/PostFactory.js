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
        .success(function(chosenMovieObject){
          var addedShowCollection = chosenMovieObject;
          Object.keys(addedShowCollection).forEach(function(key){
            addedShowCollection[key].id=key;
            addedShows.push(addedShowCollection[key]);
        });
        resolve(addedShows);
        console.log("addedshows", addedShows);
      })
      .error(function(error){
        reject(error);
      });
    });
  };

    return {addShowToCal:addShowToCal, getAddedToCalList:getAddedToCalList};

});