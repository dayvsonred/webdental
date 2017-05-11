angular.module("portal").controller("agendaCtrl", function ($scope, AgendaService, $location, config, $sessionStorage) {
    $scope.app = "portal";
    $scope.contatos = [];
    $scope.Usuario = [];
    $scope.ag = {};
    $scope.ClinicaObj = {
        logado : true
    };
    $scope.ClinicDados = {};
    $scope.ClinicHoraFunciona = {};
    $scope.ClinicMedicoAtendimento = {};
    $scope.GridHoraAgenda = {};
    $scope.GridDadosBD = {};


    $scope.SelectedUnidMed = {
                            unidade : "",
                            medico : ""
                        };

    $scope.ListTratamento = [];
    

    console.log("agenda controle");
    console.log($location.path());

    

    $scope.Ini = function() {
        //console.log("ini");


        
        
            $scope.Usuario = $sessionStorage.getObject('UserWebDental');
            if($scope.Usuario !== null){

            }else{
                /**
                 * Sair do sistema se usuario nao identificado na seção 
                 * Chama logout
                 */
                 $location.path('/');
             }
    };

     $scope.getUnidadeDados = function() {
          //console.log(" get getUnidadeDados");
          //console.log($scope.ag);
            AgendaService.getUnidadeDados($scope.ag)
                .then(function (data) {
                    //console.log(" get getUnidadeDados retorno");  console.log(data); console.log(data.data);
                    //console.log(data.data.dados[0]);
                    //console.log(data.data.confg[0]);
                    $scope.ClinicDados = data.data.dados[0];
                    $scope.ClinicHoraFunciona = data.data.confg[0];
                    console.log($scope.ClinicDados);
                    console.log($scope.ClinicHoraFunciona);
                    $scope.ag.filial = angular.copy($scope.ClinicHoraFunciona.filial);
                    $scope.geraGridHoraAgenda();
                    //$scope.ListUnidade = angular.copy(data.data.dados);
            });
    };
    $scope.geraGridHoraAgenda = function(){
         //console.log("geraGridHoraAgenda");
       // $scope.GridHoraAgenda

            var DtAgenda = new Date();
            var DtAgendaFim = new Date();
            
            //SETO A HORA INICIAL DO GRID
            DtAgenda.setHours($scope.ClinicHoraFunciona.horario_manha_inicio.substring(0, 2),$scope.ClinicHoraFunciona.horario_manha_inicio.substring(3, 5),0);
            DtAgendaFim.setHours($scope.ClinicHoraFunciona.horario_tarde_fim.substring(0, 2),$scope.ClinicHoraFunciona.horario_tarde_fim.substring(3, 5),0);
            //currMonth = DtAgenda.getMinutes() < 10 ? '0' + DtAgenda.getMinutes() : DtAgenda.getMinutes();
            var horaList = new Array();
            var horaINI = (DtAgenda.getHours() < 10 ? '0' + DtAgenda.getHours() : DtAgenda.getHours())+':'+ (DtAgenda.getMinutes() < 10 ? '0' + DtAgenda.getMinutes() : DtAgenda.getMinutes());
            var iten = {
                        "hora": horaINI, 
                        "dados": "",
                        "addcss": ""
                    };
            horaList.push(iten);  
            //console.log(horaList);
            //console.log((DtAgenda.getHours() < 10 ? '0' + DtAgenda.getHours() : DtAgenda.getHours())+':'+DtAgenda.getMinutes() < 10 ? '0' + DtAgenda.getMinutes() : DtAgenda.getMinutes())
            //console.log( DtAgenda.getHours() +':'+DtAgenda.getMinutes());
            //console.log( DtAgendaFim.getHours() +':'+DtAgendaFim.getMinutes());

            while (DtAgenda < DtAgendaFim) {

                DtAgenda.setMinutes(DtAgenda.getMinutes() + $scope.ClinicHoraFunciona.duracao_horario);
                 var keyh = {
                        "hora": horaINI, 
                        "dados": "",
                        "addcss": ""
                    };
                keyh.hora = (DtAgenda.getHours() < 10 ? '0' + DtAgenda.getHours() : DtAgenda.getHours())+':'+(DtAgenda.getMinutes() < 10 ? '0' + DtAgenda.getMinutes() : DtAgenda.getMinutes());
                horaList.push(keyh);  
              
                //console.log( (DtAgenda.getHours() < 10 ? '0' + DtAgenda.getHours() : DtAgenda.getHours())+':'+(DtAgenda.getMinutes() < 10 ? '0' + DtAgenda.getMinutes() : DtAgenda.getMinutes()));
            };
            //console.log(horaList);
               
//horario_tarde_fim

//horario_manha_fim
//horario_tarde_inicio
            $scope.GridHoraAgenda.dados = angular.copy(horaList);
            //console.log("GridHoraAgenda =)");
            //console.log($scope.GridHoraAgenda.dados);
            $scope.ListAgendaDaddos =  angular.copy($scope.GridHoraAgenda.dados);
       


    //document.getElementById("demo").innerHTML = d;
    
    
     DtAgenda.setMinutes(DtAgenda.getMinutes() + 17);
     var f = DtAgenda.getHours() +':'+DtAgenda.getMinutes();
    };


    $scope.dataEfect = function(){
            //Date picker
            $('#datepicker').datepicker({
                format: 'dd/mm/yyyy',                
                language: 'pt-BR'
            });
            
    };


    $scope.getSelcTratamento = function() {
            AgendaService.getSelcTratamento()
                .then(function (data) {
                    //console.log(" get tratamento retorno"); console.log(data);  console.log(data.data);
                    $scope.ListTratamento = angular.copy(data.data.dados);
                    //console.log(" get tratamento retorno"); console.log($scope.ListTratamento);
                    /*Object.keys(data.data).map(function (key) {
                        $scope.ListTratamento.push(data.data[key]);
                    });*/
            });
    };


    $scope.getSelcUnidade = function() {
          //console.log(" get getSelcUnidade");
            AgendaService.getSelcUnidade(null)
                .then(function (data) {
                    //console.log(" get getSelcUnidade retorno"); console.log(data); console.log(data.data);
                    $scope.ListUnidade = angular.copy(data.data.dados);
            });
    };


    $scope.getSelectMedicos = function() {
          //console.log(" get getSelectMedicos");
          //console.log($scope.ag);
            AgendaService.getSelectMedicos($scope.ag)
                .then(function (data){
                    console.log(" get getSelectMedicos retorno"); console.log(data); console.log(data.data);
                    $scope.ListMedico = angular.copy(data.data.dados);
                    $scope.getUnidadeDados();
                    $scope.getSelcCadeiras();
            });
    };


    /**
     * Busca da API as cadeiras que o medico atende e os horaios que ele atende naquele dia
     */
     $scope.getSelcCadeiras = function() {
          //console.log(" get getSelcCadeiras -> " + $scope.ag  );
          //console.log($scope.ag);
          //$scope.SelectedUnidMed
          AgendaService.getSelcCadeiras($scope.ag)
                .then(function (data) {
                    console.log(" get getSelcCadeiras retorno"); console.log(data); console.log(data.data);
                    $scope.ListCadeiras = angular.copy(data.data.dados);
                    $scope.ClinicMedicoConfig = angular.copy(data.data.medicconfig);
                    $scope.getAgendaDia();
            });
    };


    $scope.getAgendaDia = function() {
          console.log(" get getAgendaDia " );
          //console.log($scope.ag);
          //$scope.SelectedUnidMed
          AgendaService.getAgendaDia($scope.ag)
                .then(function (data) {
                    console.log(" get getAgendaDia retorno"); console.log(data); console.log(data.data.dados);
                    //$scope.ListCadeiras = angular.copy(data.data.dados);
                    $scope.GridDadosBD = data.data.dados;
                    $scope.AddValueAgendaHora();
                    $scope.GridDadosDefault();
                    $scope.AddHoraAtendMedicoConfig();
                    $scope.GridAddCosultsMarcadas();
            });
    };


    /**
     * Apos buscar a configuraçao do medico no banco, fixo os horarios de atendimento do medico no Grid
     * Função verifica cadeira selecionada e seta horario de funcionamento
     */
     $scope.AddHoraAtendMedicoConfig = function() {
          console.log("AddHoraAtendMedicoConfig");
         ///$scope.NaoATDAgendaHora(iniHora,FinHora,addClass);
         if($scope.ag.cadeira !== undefined){
            Object.keys($scope.ClinicMedicoConfig).map(function (key) {
                if($scope.ClinicMedicoConfig[key].cadeira ==  $scope.ag.cadeira){
                   // console.log($scope.ClinicMedicoConfig[key].cadeira );
                   // console.log($scope.ClinicMedicoConfig[key].horario_inicio );
                   // console.log($scope.ClinicMedicoConfig[key].horario_fim );
                    $scope.NaoATDAgendaHora($scope.ClinicMedicoConfig[key].horario_inicio,$scope.ClinicMedicoConfig[key].horario_fim,"bgPrestNAtende");
            };
            });
         };
     }


     /**
      *  Adiciona no Grid os horaios de funcionamento da clinica, cria o array
      */
    $scope.AddValueAgendaHora = function(action,dados,addClass) {
         console.log("AddValueAgendaHora");
         //console.log($scope.ListAgendaDaddos);
            Object.keys($scope.ListAgendaDaddos).map(function (key) {
                  $scope.ListAgendaDaddos[key].dados = "";
                  $scope.ListAgendaDaddos[key].espcialidd =  "";
                       //console.log($scope.ListAgendaDaddos[key]);
            });
     };


    /**
     * Adiciona no Grid Horario que o medico nao atende
     */
    $scope.NaoATDAgendaHora = function(iniHora,FinHora,addClass) {
         //console.log("NaoATDAgendaHora");
         //console.log(iniHora +"-"+ FinHora );
         var DtAgenda_a = new Date();         var DtAgenda_b = new Date();         var DtAgenda_c = new Date();

        Object.keys($scope.ListAgendaDaddos).map(function (key) {
            //$scope.ListAgendaDaddos[key].hora = "add value" + key;
            DtAgenda_a.setHours($scope.ListAgendaDaddos[key].hora.substring(0, 2),$scope.ListAgendaDaddos[key].hora.substring(3, 5),0);
            DtAgenda_b.setHours(iniHora.substring(0, 2),iniHora.substring(3, 5),0);
            DtAgenda_c.setHours(FinHora.substring(0, 2),FinHora.substring(3, 5),0);
            var a = DtAgenda_a.getHours() +':'+DtAgenda_a.getMinutes();var b = DtAgenda_b.getHours() +':'+DtAgenda_b.getMinutes();var c = DtAgenda_c.getHours() +':'+DtAgenda_c.getMinutes();
            //console.log( a +" >= "+  b +" s "+ a +" <"+ c );   
            if( (DtAgenda_a >= DtAgenda_b) && (DtAgenda_a < DtAgenda_c)  ){
                //console.log( "yyyyyyy" );
                $scope.ListAgendaDaddos[key].dados = "";
                $scope.ListAgendaDaddos[key].addcss =  "";
            }
        });
     };


     /**
      * Quando o grid e criado adiciona default em todo Array que o Prestador "NAO" atende,
      * apos sera chamada função para adicionar apena os orarios que o medico atende
      */
      $scope.GridDadosDefault = function() {
            Object.keys($scope.ListAgendaDaddos).map(function (key) {
                $scope.ListAgendaDaddos[key].dados = "Prestador não atende neste horário";
                 $scope.ListAgendaDaddos[key].addcss_daados = '';
                $scope.ListAgendaDaddos[key].addcss =  "bgPrestNAtende";
                //$scope.ListAgendaDaddos[key].addcss =  "bgPrestNAtende";
                $scope.ListAgendaDaddos[key].tel = '';
                $scope.ListAgendaDaddos[key].observac = '';
                $scope.ListAgendaDaddos[key].BT_chegou = false;
                $scope.ListAgendaDaddos[key].BT_faltou = false;
                $scope.ListAgendaDaddos[key].BT_cacelarConslt = false;
            });
      };


      /**
       * Adiciona no Grid as consultas registradas do Medico(Prestador)
       */
      $scope.GridAddCosultsMarcadas = function() {
            console.log("GridAddCosultsMarcadas"); 

            console.log($scope.GridDadosBD); 

            Object.keys($scope.GridDadosBD).map(function (key) {
               //$scope.GridDadosBD[key].hora_agenda ;
               /**
                * envio o iten do array e a chave caso seja, tera uma terceira função para abilitar os botoes
                */
                $scope.ADDGridAtendimento( $scope.GridDadosBD[key], key );
                console.log(
                   $scope.GridDadosBD[key].hora_agenda
                   ); 
              
               
               /*duracao_agenda
               cd_tipo_tratamento
               nome
               num_telefone1
               situacao
               observacao
               sexo
               tipo*/

               //$scope.ListTratamento 

               
            });
      };




      


     /**
     * Adiciona no Grid atendimento do médico
     * Busca no array a hora ennviada e insere os dados
     */
    $scope.ADDGridAtendimento = function(obj , GridKey) {
        console.log("ADDGridAtendimento");
        //console.log(obj);
        
        Object.keys($scope.ListAgendaDaddos).map(function (key) {

            if( $scope.ListAgendaDaddos[key].hora == obj.hora_agenda ){
                $scope.ListAgendaDaddos[key].dados = obj.nome;
                $scope.ListAgendaDaddos[key].addcss_daados = 'lb-shad-a';
                $scope.ListAgendaDaddos[key].addcss =  "";
                $scope.ListAgendaDaddos[key].tel = 'Tel: '+obj.num_telefone1;
                $scope.ListAgendaDaddos[key].observac = 'Obs: '+obj.observacao;
                $scope.ListAgendaDaddos[key].BT_chegou = false;
                $scope.ListAgendaDaddos[key].BT_faltou = false;
                $scope.ListAgendaDaddos[key].BT_cacelarConslt = false;
                

            /**
             * Css BackGroud do Grid atendimento
             */
            var AddClassSit;
            if(obj.situacao != null){
                    switch (obj.situacao) {
                        case "A":
                            AddClassSit = "Atendido";
                            break;
                        case "E":
                            AddClassSit = "AtendidoEntrou";
                            break;
                        case "B":
                            AddClassSit = "AtendiAtraso";
                            break;
                        case "O":
                            AddClassSit = "AtendidoObs";
                            break;
                        case "C":
                            AddClassSit = "";
                            break;
                        default: 
                            AddClassSit = "AtendFichaRapd";
                    }
            }else if(obj.faltou == "F"){
                        AddClassSit = "AtendidoFalto";
                    
            }
            //console.log(AddClassSit);

            $scope.ListAgendaDaddos[key].addcss =   AddClassSit;

                
            /**
             * Busca Nome Da especialidade do dentista e add no lugar da chave
             */
            Object.keys($scope.ListTratamento).map(function (keyB) {
                    //console.log( $scope.ListTratamento[keyB].chave +" == "+ obj.cd_tipo_tratamento );
                    if( $scope.ListTratamento[keyB].chave == obj.cd_tipo_tratamento){
                        //console.log( $scope.ListTratamento[keyB].nm_tipo_tratamento );
                        $scope.ListAgendaDaddos[key].espcialidd =  $scope.ListTratamento[keyB].nm_tipo_tratamento;
                    }
            });


            /**
             * Chamo função para abilitar botoes ou add estilo e link(evento) marca consulta
             * @key valor array de ListAgendaDaddos 
             * @GridKey valo dos dados do BD do atendimento no GridDadosBD
             */
             $scope.GridAbilitarBotoes(key,GridKey);   

        }else{
            /**
             * Adiciona no array hora de consulta marcada 
             * 11:15 11:10 11:09 11:25  sendo a hora diferente do padrao de intervalo da clinica
             */
            //console.log("nao e igual");
            var keyNext =  parseInt(key)  +1;
            //console.log(key); console.log(keyNext); console.log(obj.hora_agenda);  console.log($scope.ListAgendaDaddos[key].hora); console.log($scope.ListAgendaDaddos[key]); console.log($scope.ListAgendaDaddos[keyNext]);
             if( (obj.hora_agenda > $scope.ListAgendaDaddos[key].hora)&& (obj.hora_agenda < $scope.ListAgendaDaddos[keyNext].hora)  ){
            //console.log("ADD EXTRA --------------------------------------------------------"); console.log(obj);
              var iten = {
                            "hora": obj.hora_agenda, 
                            "dados": "",
                            "addcss": ""
                         };
             $scope.ListAgendaDaddos.splice(keyNext, 0, iten);
            }
        }


            /**
             * Chamo função para abilitar botoes ou add estilo e link(evento) marca consulta
             */
             //$scope.GridAbilitarBotoes($scope.ListAgendaDaddos[key] , obj );   


            
        });
    
        /**
         * Chamo função para abilitar botoes ou add estilo e link(evento) marca consulta
         */
        //$scope.GridAbilitarBotoes($scope.ListAgendaDaddos);   
           

     };



     /**
      * Recebe as Keys dos Arrays da lista e dos dados 
      * para adicioar os btoes na ListAgendaDaddos
      */
     $scope.GridAbilitarBotoes = function(GrindList,GridBDDados) {
        console.log("GridAbilitarBotoes");
        console.log(GrindList);
        console.log(GridBDDados);
        console.log($scope.ListAgendaDaddos[GrindList]);
        console.log($scope.GridDadosBD[GridBDDados]);
      
        /**
         * exibe Botão Chegou / Botão Faltou
         */
        if(($scope.GridDadosBD[GridBDDados].situacao == null || $scope.GridDadosBD[GridBDDados].situacao == 'C'  ) && ($scope.GridDadosBD[GridBDDados].faltou == null)){
                $scope.ListAgendaDaddos[GrindList].BT_chegou = true;
                console.log("true *********************************************************************************");
                if($scope.HoraMaiorQeAgora($scope.GridDadosBD[GridBDDados].hora_agenda) ){
                      console.log("true *********************************************************************************");
                      $scope.ListAgendaDaddos[GrindList].BT_faltou = true;
                }
        }
        /**
         * exibe Botão Cancelar 
         */
        if(($scope.GridDadosBD[GridBDDados].situacao == 'B' || $scope.GridDadosBD[GridBDDados].situacao == 'E'  ) && ($scope.HoraMaiorQeAgora($scope.GridDadosBD[GridBDDados].hora_agenda))){
            $scope.ListAgendaDaddos[GrindList].BT_cacelarConslt = true;
        }
     };






     $scope.getMedicoDados = function() {
          //console.log(" get getMedicoDados " );
          //console.log($scope.ag);
          //$scope.SelectedUnidMed
          AgendaService.getMedicoDados($scope.ag)
                .then(function (data) {
                    //console.log(" get getMedicoDados retorno"); console.log(data); console.log(data.data);
                    //$scope.ListCadeiras = angular.copy(data.data.dados);
            });
    };


    $scope.getDadosUser = function() {
        var userChave = {
                            chave : 'L00500020160620140212'
                        };
        //console.log(" get GetDadosUser");
        //console.log(userChave);
            AgendaService.getDadosUser(userChave)
                .then(function (data) {
                    //console.log(" get GetDadosUser retorno"); console.log(data); console.log(data.data);
                    $scope.UserDados = angular.copy(data.data.dados[0]);
                    //console.log($scope.UserDados);
            });
    };

     
    /**
     * Gera o dia da semana conrenpondete a data selecionada [seguada = 2, terça = 3, quarta = 4]
     */
    $scope.FunDiaSemana = function(data){
        //console.log("FunDiaSemana" + data);
        //var data = this.value;
        var arr = data.split("/").reverse();
        var teste = new Date(arr[0], arr[1] - 1, arr[2]);
        //var dia = teste.getDay()+1;
        $scope.ag.dia_semana = teste.getDay()+1;
        //alert(dia);
    };




    



    $scope.ipthi = function(){
        console.log("data valor");
        var a = document.querySelector('#my_hidden_input').value;
        console.log(a);
        console.log( $('#datepicker').datepicker('getFormattedDate'));
    };

    $scope.AlteradoDia = function(){
        console.log("AlteradoDia");
        console.log($scope.ag);
        if(($scope.ag.data_a != null ) && ($scope.ag.unidade != null ) && ($scope.ag.medico != null )   && ($scope.ag.cadeira != null ) ){
            $scope.getSelcCadeiras();
        }
        if(($scope.ag.data_a != null ) && ($scope.ag.unidade != null )){
            $scope.getSelectMedicos();
        }
    };


    /**
     * Retorna True se Hora (00:00) enviada maior que agora
     */
    $scope.HoraMaiorQeAgora = function(horaCompare) {
        var Dt_agora = new Date();         var Dt_Seleciona = new Date();
            Dt_Seleciona.setHours(horaCompare.substring(0, 2),horaCompare.substring(3, 5),0);
            if((Dt_Seleciona >= Dt_agora)){
                return true;
            }

            return false;


    }

    var d = new Date();

    var currDate = d.getDate();  currDate = currDate < 10 ? '0' + currDate : currDate;
    var currMonth = d.getMonth()+1;     currMonth = currMonth < 10 ? '0' + currMonth : currMonth;
    var currYear = d.getFullYear();
    $scope.ag.dia_semana = d.getDay()+1;

    var dateStr = currDate + "/" + currMonth + "/" + currYear;
    $scope.ag.data_a = dateStr;
    //console.log(dateStr);


    var DtAgenda = new Date();
    DtAgenda.setHours(8,0,0);
    //document.getElementById("demo").innerHTML = d;
    
    
     DtAgenda.setMinutes(DtAgenda.getMinutes() + 17);
     var f = DtAgenda.getHours() +':'+DtAgenda.getMinutes();



    $('#datepicker').datepicker({
        format: 'dd/mm/yyyy',                
        language: 'pt-BR',
        todayHighlight: true,
    });



    $('#datepicker').on('changeDate', function() {
        $('#my_hidden_input').val(
            $('#datepicker').datepicker('getFormattedDate')
        );
        $scope.ag.data_a = $('#datepicker').datepicker('getFormattedDate');
       // console.log("val muded ok");
       // console.log($('#my_hidden_input').val() );
       
        $('#data_b').val($('#datepicker').datepicker('getFormattedDate'));
        $('#data_c').val($('#datepicker').datepicker('getFormattedDate'));
        $scope.FunDiaSemana($('#datepicker').datepicker('getFormattedDate'));
        $scope.AlteradoDia();
    });


   //document.getElementById("siedBarMenu").style.display = "none";

    /*-------------------------------------------------------------------------------
    *
    * INICIALIZAR FUNÇOES
    *
    ------------------------------------------------------------------------------- */
   // $scope.Ini();
    $scope.getDadosUser();
    $scope.getSelcTratamento();
    $scope.getSelcUnidade();
    
    
    
    
    //console.log("fim file");
    
});