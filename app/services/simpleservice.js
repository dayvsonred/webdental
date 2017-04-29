angular.module("portal").service("simpleService", function ($http, config) {
   
     this.getLogarClinicas = function (data) {
        return $http.post(config.baseUrl + "/api/GetLogarClinica",  data);
    };
    
});