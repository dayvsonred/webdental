angular.module("portal").controller("menuCtrl", function ($scope, simpleService, $location, config, $sessionStorage) {
    $scope.app = "portal";
    $scope.contatos = [];
    $scope.Usuario = [];

    console.log("menu controle");
    console.log($location.path());
    

    //$("body").addClass("navbar-fixed");
    //$("body").addClass(" sidebar-nav");
    //$("body").addClass(" fixed-nav");
    $scope.Ini = function() {
        console.log("ini");
        
            $scope.Usuario = $sessionStorage.getObject('UserWebDental');
            if($scope.Usuario !== null){

            }else{
                /**
                 * Sair do sistema se usuario nao identificado na seção 
                 * Chama logout
                 */
                 $location.path('/');
             }
             console.log( $scope.Usuario);
         //console.log( $scope.Usuario.clinicaSelec);
        //console.log( $scope.Usuario.usuario);
    };
    
   
    $scope.CloseDiv = function(id) {
        console.log("close div");
        $("#"+id).toggleClass("closeNone");
        //$("#"+id).addClass("showSimplesEFEC");
        //$timeout(function () { $("#"+id).removeClass("AddBlock");  $("#"+id).removeClass("showSimplesEFEC"); }, 3500);
    };



    /* INICIALIZAR FUNÇOES */
    //$scope.Ini();
    
});