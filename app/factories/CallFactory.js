"use strict";
    console.log("zipfactory");
app.factory("zipQueryStore", function($q, $http){

    var zipSearchCall = function(){
        let zipcode = document.getElementById("zipsearch").value;
        console.log(zipcode);      
        return $q(function(resolve, reject){
            $http.get("http://ZiptasticAPI.com/"+zipcode)
                .success(function(itemObject){
                })
                .error(function(error){
                reject(error);
            });
        });
    }
    return {zipSearchCall:zipSearchCall};
        console.log("zip", zipcode);
}); 