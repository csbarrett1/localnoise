"use strict";

app.factory("queryStore", function($q, $http, $location){

    var searchCall = function(zipcode, startdate){

        return $q(function(resolve, reject){
            $http.get("http://www.facebook.com")
            // $http.get("http://api.jambase.com/events?zipCode="+zipcode+"&radius=50&startDate="+startdate+"&page=0&api_key=zrct7ypqts4utjwbhdpr5tq6")
                .success(function(queryData){

                
                    var preKeyData = events;
  
                    // $location.path("/results");
                    resolve(preKeyData);

                })
                .error(function(error){
                
                    var preKeyData = events;

                    resolve(preKeyData);
                    // $location.path("/results");
                // reject(error);
            });

        });
    }

    return {searchCall:searchCall};
}); 

