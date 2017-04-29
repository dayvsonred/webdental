angular.module("portal").controller("loginCtrl", function ($scope, simpleService, $location, config, $timeout, $sessionStorage) {
    $scope.app = "portal";
    $scope.clinicas = [];
    $scope.frm = {
        bd : 'clinicatodos'
    }
    $scope.ListClinicas = ["Diite Usuario e Senha"];
    $scope.processando = 0;

    console.log("login controle");

    
    $scope.getNoticias = function(numQtds) {
            simpleService.getNoticAPI(objGetNoticias)
                .then(function (data) {
                    console.log("retorno");
                    console.log(data);
                    console.log(data.data);
            });
    };

    $scope.SenhaKeyPress = function() {
        var agora = document.querySelector("[id='IPTsenha']").value;
       $timeout(function () { $scope.SenhaFinal(agora); }, 1000);
    };

    $scope.UserKeyPress = function() {
        var agora = document.querySelector("[id='IPTusuario']").value;
       $timeout(function () { $scope.SenhaFinalUser(agora); }, 1000);
    };

    $scope.SenhaFinal = function(e) {
        //console.log("GET  - clinicas");  console.log($scope.frm);   console.log(e + " - "+ $scope.frm.senha );
        if((e == $scope.frm.senha) && ($scope.frm.usuario !== undefined) && ($scope.processando !== 1)){ $scope.processando = 1; $scope.getLogarClinicas($scope.frm);  }
    };

     $scope.SenhaFinalUser = function(e) {
        //console.log("GET  - clinicas");  console.log($scope.frm);  console.log(e + " - "+ $scope.frm.senha );
        if((e == $scope.frm.usuario) && ($scope.frm.senha !== undefined) && ($scope.processando !== 1)){ $scope.processando = 1; $scope.getLogarClinicas($scope.frm);  }
    };

    $scope.getLogarClinicas = function(objDados) {
        console.log("getAPI getLogarClinicas ");
            simpleService.getLogarClinicas(objDados)
                .then(function (data) {
                    $scope.processando = 0;
                    console.log("retorno");
                    //console.log(data);  console.log(data.data);
                    if(data.data.dados.length > 0){
                        console.log("senha ok");
                        $scope.ListClinicas =  angular.copy(data.data.dados);
                        $scope.ShowMsgSusses();
                        $scope.senhaOk = true;
                        $("#idClinicas" ).focus();


                    }else{
                        console.log("senha erro");
                    }  
            });
    };

    $scope.setClinica = function(idClinica,clinica) {
        console.log("escolha clinica");
        console.log(idClinica + " - "+ clinica);

        $scope.frm.clinicaSelec = clinica;
        $scope.frm.clinica = clinica;
        $scope.frm.IdClinica = idClinica;
       
    };


    $scope.ShowMsgSusses = function(clinica) {
        $("#msgLogar").addClass("AddBlock");
        $("#msgLogar").addClass("showSimplesEFEC");
        $timeout(function () { $("#msgLogar").removeClass("AddBlock");  $("#msgLogar").removeClass("showSimplesEFEC"); }, 3500);
    };
  


    $scope.LogarSistema = function(idClinica,clinica) {
        console.log("Redireciona sistema");
        console.log("sessionStorage");
        $sessionStorage.putObject('UserWebDental', $scope.frm);
        ///localStorage.setItem("lastname", "Smith");
        //var a = localStorage.getItem("lastname");
        var a = $sessionStorage.getObject('UserWebDental');
         console.log(a.usuario);
        //sessionStorage.setItem('WebDental', 'JSON.stringify($scope.frm)');
        //sessionStorage.clickcount = 1;
        //Window.localStorage.tokenSPMS = 'aaaaaaaaaaaa';
        //$window.sessionStorage.setItem("SavedString","I'm a value saved with SessionStorage");
        if($scope.senhaOk){
            $location.path('/menu/');
        }

    };

    
});