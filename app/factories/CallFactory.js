"use strict";

app.factory("queryStore", function($q, $http, $location){

    var searchCall = function(zipcode, startdate){

        return $q(function(resolve, reject){
            $http.get("http://api.jambase.com/events?zipCode="+zipcode+"&radius=50&startDate="+startdate+"&page=0&api_key=zrct7ypqts4utjwbhdpr5tq6")
                .success(function(queryData){
                    var preKeyData = queryData;

                    resolve(preKeyData);
                    $location.path("/results");
                })
                .error(function(error){
                reject(error);
            });

        });
    }

    return {searchCall:searchCall};
}); 

