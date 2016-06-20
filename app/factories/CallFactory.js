"use strict";

console.log("zipfactory1");
app.factory("queryStore", function($q, $http, $location){

    var searchCall = function(zipcode, startdate, enddate){
        console.log(zipcode);
        console.log(startdate);
        console.log(enddate);
        return $q(function(resolve, reject){
            $http.get("http://api.jambase.com/events?zipCode="+zipcode+"&radius=20&startDate="+startdate+"&endDate="+enddate+"&page=0&api_key=zrct7ypqts4utjwbhdpr5tq6")
                .success(function(queryData){
                    var preKeyData = queryData.Events;
                    console.log("queryData", queryData.Events);
                    resolve(preKeyData);
                })
                .error(function(error){
                reject(error);
            });

        });
    }






    return {searchCall:searchCall};
}); 

