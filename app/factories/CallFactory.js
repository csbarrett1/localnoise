"use strict";

console.log("zipfactory1");
app.factory("zipQueryStore", function($q, $http){

    var zipSearchCall = function(){
        let zipcode = document.getElementById("zipsearch").value;
        console.log(zipcode);      
        return $q(function(resolve, reject){
            $http.get("http://ZiptasticAPI.com/"+zipcode)
                .success(function(queryData){
                    var preKeyData = queryData;
                    Object.keys(preKeyData).forEach(function(key){
                        queryStorage.push(preKeyData[key]);
                    });
                    if (queryStorage[0] !== "False") {
                        resolve(queryStorage);
                    } else {
                        Materialize.toast(queryStorage[1], 3000, "rounded")
                    }
                })
                .error(function(error){
                reject(error);
            });

        });
    }

    return {zipSearchCall:zipSearchCall};
console.log("zipfactory2");
}); 