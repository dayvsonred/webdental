angular.module("portal").config(function ($routeProvider) {

    $routeProvider.when("/menu", {
        templateUrl: "view/menu.html",
        controller: "menuCtrl"
    });
    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "loginCtrl"
    });
    
    
    
    
    $routeProvider.otherwise({redirectTo: "/login"});
});


angular.module("portal").run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        //console.log("");
        // handle route changes     
    });
});