angular.module("portal").config(function ($routeProvider) {

    $routeProvider.when("/menu", {
        templateUrl: "view/menu.html"
    });
    $routeProvider.when("/login", {
        templateUrl: "view/login.html",
        controller: "loginCtrl"
    });
    $routeProvider.when("/Agenda-do-dia", {
        templateUrl: "view/agenda/agenda-do-dia.html",
        controller: "agendaCtrl"
    });
    $routeProvider.when("/error", {
        templateUrl: "view/404.html"
    });
    
    
    
    
    
    $routeProvider.otherwise({redirectTo: "/login"});
});


angular.module("portal").run(function($rootScope) {
    $rootScope.$on("$locationChangeStart", function(event, next, current) { 
        //console.log("");
        // handle route changes     
    });
});