angular.module("portal").controller("agendaCtrl", function ($scope, AgendaService, $location, config, $sessionStorage, $timeout, $window) {
    $scope.app = "portal";
    $scope.contatos = [];
    $scope.Usuario = [];
    $scope.ag = {};
    $scope.ClinicaObj = {
        logado : true
    };
    $scope.Pg = {
        nome:  'Agendamento - Cancelar Horário'
    };
    $scope.ClinicDados = {};
    $scope.ClinicHoraFunciona = {};
    $scope.ClinicMedicoAtendimento = {};
    $scope.GridHoraAgenda = {};
    $scope.GridDadosBD = {};
    $scope.ListOperadoraCel = {};
    $scope.MD = {}; //Objeto para os Modals
    $scope.FormaPagSelectd = {}; // objeto para receber obj da lista de botoes da forma de pagamento MD finaceiro

    $scope.SelectedUnidMed = {
                            unidade : "",
                            medico : ""
                        };

    $scope.ListTratamento = [];
    

    console.log("agenda controle");
    console.log($location.path());

    

    


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
                    //console.log($scope.ClinicDados);
                    //console.log($scope.ClinicHoraFunciona);
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
    
    
     //DtAgenda.setMinutes(DtAgenda.getMinutes() + 17);
     ///var f = DtAgenda.getHours() +':'+DtAgenda.getMinutes();
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
          console.log(" get getSelectMedicos");
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
          console.log(" get getSelcCadeiras" );
          //console.log($scope.ag);
          //$scope.SelectedUnidMed
          AgendaService.getSelcCadeiras($scope.ag)
                .then(function (data) {
                    //console.log(" get getSelcCadeiras retorno"); console.log(data); console.log(data.data);
                    //console.log(data.data.dados);

                    /**
                     * Faço um loop no array de cadeira, para cada valor de cadeira adiciono mais um no array de values (cadeiraValue)
                     * tranformo cadeiras 4,6,7 em 0,1,2 
                     * o banco de dados esta adapitado a este modelo 
                     */
                     Object.keys(data.data.dados).map(function (key) {
                        //console.log(ArrayCaderias[key].cadeira);
                        data.data.dados[key].cadeiraValue = parseInt(key)+1;
                        data.data.dados[key].cadeiraValueSelect = parseInt(key);
                        
                    });

                    $scope.ListCadeiras = angular.copy(data.data.dados);
                    $scope.ClinicMedicoConfig = angular.copy(data.data.medicconfig);
                    $scope.getAgendaDia();
                    
            });
    };




    $scope.getAgendaDia = function() {
          console.log(" get getAgendaDia " );
          console.log($scope.ag);
          console.log($scope.ListCadeiras);
          console.log($scope.ListCadeiras[0]);
          //console.log($scope.ag.cadeira);
          if( ((typeof $scope.ag.cadeira == 'undefined') || ($scope.ag.cadeira == null) ) && ($scope.ListCadeiras[0]) && ( $scope.ListCadeiras[0].cadeiraValue > 0  ) ){
              $scope.ag.cadeira = $scope.ListCadeiras[0];
              console.log("Add cadeira automatico");
              //console.log($scope.ag);
          }
          //$scope.cadeiraValueSecelctd = $scope.ag.cadeira.cadeiraValue;
          //$scope.ag.cadeira = $scope.ag.cadeira.cadeira;
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
                    $scope.getMotivoAtendimento();
            });
    };



    /**
     * Apos buscar a configuraçao do medico no banco, fixo os horarios de atendimento do medico no Grid
     * Função verifica cadeira selecionada e seta horario de funcionamento
     */
     $scope.AddHoraAtendMedicoConfig = function() {
          console.log("AddHoraAtendMedicoConfig");
          console.log($scope.ag);
         ///$scope.NaoATDAgendaHora(iniHora,FinHora,addClass);
         if($scope.ag.cadeira != null){
            Object.keys($scope.ClinicMedicoConfig).map(function (key) {
               //if($scope.ClinicMedicoConfig[key].cadeira ==  $scope.ag.cadeira){
                   if($scope.ClinicMedicoConfig[key].cadeira ==  $scope.ag.cadeira.cadeira){
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
         console.log("NaoATDAgendaHora");
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
                $scope.ListAgendaDaddos[key].dados = "...Agendar...";
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
                $scope.ListAgendaDaddos[key].KeyList= key; // propia chave do array para localizar dados
                $scope.ListAgendaDaddos[key].addcss_daados = '';
                $scope.ListAgendaDaddos[key].addcss =  "bgPrestNAtende";
                //$scope.ListAgendaDaddos[key].addcss =  "bgPrestNAtende";
                $scope.ListAgendaDaddos[key].tel = '';
                $scope.ListAgendaDaddos[key].observac = '';
                $scope.ListAgendaDaddos[key].BT_chegou = false;
                $scope.ListAgendaDaddos[key].BT_faltou = false;
                $scope.ListAgendaDaddos[key].BT_cacelarConslt = false;
                $scope.ListAgendaDaddos[key].BT_cartaoFinanceiro = false;
                $scope.ListAgendaDaddos[key].BT_convertPacient = false;
                $scope.ListAgendaDaddos[key].BT_atender = false;
                
                
            });
      };


      /**
       * Adiciona no Grid as consultas registradas do Medico(Prestador)
       */
      $scope.GridAddCosultsMarcadas = function() {
            console.log("GridAddCosultsMarcadas****************"); 

            //console.log($scope.GridDadosBD); 

            Object.keys($scope.GridDadosBD).map(function (key) {
               //$scope.GridDadosBD[key].hora_agenda ;
               /**
                * envio o iten do array e a chave caso seja, tera uma terceira função para abilitar os botoes
                */
                $scope.ADDGridAtendimento( $scope.GridDadosBD[key], key );
                //console.log(  $scope.GridDadosBD[key].hora_agenda ); 
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

            if( typeof $scope.ListAgendaDaddos[key] != 'undefined'){
                if( $scope.ListAgendaDaddos[key].hora == obj.hora_agenda ){
                    $scope.ListAgendaDaddos[key].GridKey = GridKey; // para saber dasdos BD completo do paciente/Consulta $scope.GridDadosBD[GridKey]
                    $scope.ListAgendaDaddos[key].dados = obj.nome;
                    $scope.ListAgendaDaddos[key].addcss_daados = 'lb-shad-a';
                    $scope.ListAgendaDaddos[key].addcss =  "";
                    $scope.ListAgendaDaddos[key].tel = 'Tel: '+obj.num_telefone1;
                    $scope.ListAgendaDaddos[key].observac = 'Obs: '+obj.observacao;
                    $scope.ListAgendaDaddos[key].BT_chegou = false;
                    $scope.ListAgendaDaddos[key].BT_faltou = false;
                    $scope.ListAgendaDaddos[key].BT_cacelarConslt = false;
                    $scope.ListAgendaDaddos[key].BT_cartaoFinanceiro = false;
                    $scope.ListAgendaDaddos[key].duracao = obj.duracao_agenda;

                    
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
                                AddClassSit = "";
                        }
                }else if(obj.faltou == "F"){
                            AddClassSit = "AtendidoFalto";
                        
                }else if( obj.cd_pacficharapida != null && obj.cd_pacficharapida != ""){
                            AddClassSit = "AtendFichaRapd";
                }
                //console.log(obj.cd_pacficharapida);

                $scope.ListAgendaDaddos[key].addcss =   AddClassSit;

                    
                /**
                 * Busca Nome Da especialidade do dentista e add no lugar da chave(TROCA NUMERO POR NOME)
                 */
                Object.keys($scope.ListTratamento).map(function (keyB) {
                        //console.log( $scope.ListTratamento[keyB].chave +" == "+ obj.cd_tipo_tratamento );
                        if( $scope.ListTratamento[keyB].chave == obj.cd_tipo_tratamento ){
                            //console.log( $scope.ListTratamento[keyB].nm_tipo_tratamento );
                            $scope.ListAgendaDaddos[key].espcialidd =  $scope.ListTratamento[keyB].nm_tipo_tratamento;
                        }
                });


                    /**
                     * Chamo função para abilitar botoes ou add estilo e link(evento) marca consulta
                     * @key valor array de ListAgendaDaddos 
                     * @GridKey valo dos dados do BD do atendimento no GridDadosBD
                     */
                    //$scope.GridAbilitarBotoes(key,GridKey);   

                    //ARRY GRID FORMADO 
                    //console.log("ARRAY FORMADO ----------------------------");
                    //console.log($scope.ListAgendaDaddos[key]);
                    //console.log($scope.GridDadosBD[GridKey]);
                    //console.log($scope.GridDadosBD[GridKey].);
                    $scope.ApagaIntervalosConsutas(key);

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
         * Hora que termina a consulta
         * * se listkey +1 a hora da consulta for maior que o horario que termina 10:10 termina outro 10:15
         *                                       add horario 10:10 no grid de horarios
         * else se-nao o horario 10:30 proximo no grid 10:15 
         *                                      o horarios 10:15 e apagado do array e char novamente a function
         */
        $scope.ApagaIntervalosConsutas = function(value) {
            console.log("---------------ApagaIntervalosConsutas ------------------");
            //console.log($scope.ListAgendaDaddos[value]);
            //console.log($scope.ListAgendaDaddos[value].KeyList); //value dados in key list

            //console.log($scope.ListAgendaDaddos[value].KeyList)
            //console.log(value);

            var next = parseInt(value) +1;
            var next_MAIS_UM = parseInt(next) +1;
            //console.log("PROXIMA HORA DO ARRAY");
           //console.log(next);
            //console.log($scope.ListAgendaDaddos[next].hora);
            //console.log($scope.ListAgendaDaddos[next]);

            //verifico se existe procimo iten no array
            if( typeof $scope.ListAgendaDaddos[next] != 'undefined'){

                var Dt_ProximaHora= new Date(); var Dt_ProximaHoraMais10 = new Date();  var Dt_IniciaConsulta = new Date();  var Dt_TerminaConsulta = new Date();
                Dt_ProximaHora.setHours($scope.ListAgendaDaddos[next].hora.substring(0, 2),$scope.ListAgendaDaddos[next].hora.substring(3, 5),0);
                Dt_IniciaConsulta.setHours($scope.ListAgendaDaddos[value].hora.substring(0, 2),$scope.ListAgendaDaddos[value].hora.substring(3, 5),0);
                Dt_TerminaConsulta.setHours($scope.ListAgendaDaddos[value].hora.substring(0, 2),$scope.ListAgendaDaddos[value].hora.substring(3, 5),0);
                Dt_TerminaConsulta.setMinutes(Dt_TerminaConsulta.getMinutes() + $scope.ListAgendaDaddos[value].duracao);

                //console.log("HORAS_________________________");
                //console.log(Dt_ProximaHora.getHours() +"-"+  Dt_ProximaHora.getMinutes());
                //console.log(Dt_IniciaConsulta.getHours() +"-"+  Dt_IniciaConsulta.getMinutes());
                //console.log(Dt_TerminaConsulta.getHours() +"-"+  Dt_TerminaConsulta.getMinutes());

            
                if( Dt_ProximaHora < Dt_TerminaConsulta  ){ // se igual noa faz nada | se menos retiro hora do array
                    $scope.ListAgendaDaddos.splice(next,1);
                    $scope.ApagaIntervalosConsutas(value); // redireciona para o inicio da função **Recursividade**
                }else if(Dt_ProximaHora != Dt_TerminaConsulta){ //se e o ultimo item do loop verificar intervalo restante e superior a 10 minnutos se for add hora no grid
                            Dt_ProximaHoraMais10.setHours($scope.ListAgendaDaddos[value].hora.substring(0, 2),$scope.ListAgendaDaddos[value].hora.substring(3, 5),0);
                            Dt_ProximaHoraMais10.setMinutes(Dt_ProximaHoraMais10.getMinutes() + 10 + $scope.ListAgendaDaddos[value].duracao); //adiciono mais dez minutos no termino se for menor ou igual a proxima hora add no GridList
                            //console.log("@@@@@@@@@@@ HORAS COM INTERVALOS @@@@@@@@@");
                            //console.log(Dt_ProximaHoraMais10.getHours() +"-"+  Dt_ProximaHoraMais10.getMinutes());
                            if(Dt_ProximaHoraMais10 <= Dt_ProximaHora ){
                                 //console.log("@@@@@@@@@@@ HORAS COM INTERVALO**** @@@@@@@@@");
                                 //console.log($scope.ListAgendaDaddos[value]);
                                 //console.log(Dt_ProximaHoraMais10.getHours() +":"+  Dt_ProximaHoraMais10.getMinutes());
                                 //console.log($scope.ListAgendaDaddos[next]);

                                  var iten = {
                                        'BT_convertPacient':false,
                                        'BT_cacelarConslt':false,
                                        'BT_cartaoFinanceiro':false,
                                        'BT_chegou':false,
                                        'BT_faltou':false,
                                        'BT_atender':false,
                                        'KeyList':next,
                                        'addcss':"",
                                        'addcss_daados':"",
                                        'dados':"...Agendar...",
                                        'espcialidd':"",
                                        'hora': (Dt_ProximaHoraMais10.getHours() < 10 ? '0' + Dt_ProximaHoraMais10.getHours() : Dt_ProximaHoraMais10.getHours()) +":"+  Dt_ProximaHoraMais10.getMinutes(),
                                        'observac':"",
                                        'tel':""
                                                                        
                                  }

                                $scope.ListAgendaDaddos.splice(next,0, iten); //Adiciona iten no indice do array
                            }
                }

                 /**
                 * Chama função para abilitar botoes ou add estilo e link(evento) marca consulta
                 */
                $scope.GridAbilitarBotoes(value, $scope.ListAgendaDaddos[value].GridKey);   
              

            };
            
                 
        };




     /**
      * Recebe as Keys dos Arrays da lista e dos dados 
      * para adicioar os btoes na ListAgendaDaddos
      */
     $scope.GridAbilitarBotoes = function(GrindList,GridBDDados) {
        console.log("GridAbilitarBotoes");
        //console.log(GrindList);
        //console.log(GridBDDados);
        if( typeof $scope.ListAgendaDaddos[GrindList] != 'undefined'){
        //console.log($scope.ListAgendaDaddos[GrindList]);
        //console.log($scope.GridDadosBD[GridBDDados]);
      
            /**
             * exibe Botão Chegou / Botão Faltou
             */
            if(($scope.GridDadosBD[GridBDDados].situacao == null || $scope.GridDadosBD[GridBDDados].situacao == 'C'  ) && ($scope.GridDadosBD[GridBDDados].faltou == null)){
                    $scope.ListAgendaDaddos[GrindList].BT_chegou = true;
                    //console.log("true - Botão Chegou ");
                    if(!$scope.HoraMaiorQeAgora($scope.GridDadosBD[GridBDDados].hora_agenda) ){
                        //console.log("true - Botão Faltou ");
                        $scope.ListAgendaDaddos[GrindList].BT_faltou = true;
                        //$scope.ListAgendaDaddos[GrindList].BT_cartaoFinanceiro = true;
                    }
            }
            /**
             * exibe Botão Cancelar 
             */
            //console.log($scope.HoraMaiorQeAgora($scope.GridDadosBD[GridBDDados].hora_agenda) );
            if((($scope.GridDadosBD[GridBDDados].situacao == null) || ($scope.GridDadosBD[GridBDDados].situacao == 'E') ) && ($scope.HoraMaiorQeAgora($scope.GridDadosBD[GridBDDados].hora_agenda)) && ($scope.GridDadosBD[GridBDDados].faltou == null) && ($scope.DataHoje( $scope.GridDadosBD[GridBDDados].data_agenda )) ){
                    //console.log("2");
                    $scope.ListAgendaDaddos[GrindList].BT_cacelarConslt = true;
                    //$scope.ListAgendaDaddos[GrindList].BT_cartaoFinanceiro = true;
            }

            /**
             * exibe Botão Financeiro
             */
            if(($scope.GridDadosBD[GridBDDados].cd_paciente != null)  || ($scope.GridDadosBD[GridBDDados].cd_paciente != '' ) ) {
                $scope.ListAgendaDaddos[GrindList].BT_cartaoFinanceiro = true;
                //console.log("financeiro");
            }


            /**
             * exibe Botão Coverte paciente FICHARAPDA
             */
            if(( $scope.GridDadosBD[GridBDDados].cd_pacficharapida != null) && ( $scope.GridDadosBD[GridBDDados].cd_pacficharapida != ''  )){
                $scope.ListAgendaDaddos[GrindList].BT_convertPacient = true;
            }

            /**
             * exibe Botão Atender paciente 
             */
            if(($scope.GridDadosBD[GridBDDados].situacao == 'B') && ($scope.GridDadosBD[GridBDDados].faltou == null) && ($scope.DataHoje( $scope.GridDadosBD[GridBDDados].data_agenda )) ){
                $scope.ListAgendaDaddos[GrindList].BT_atender = true;
            }


            /**
             * exibe Botão PARA TESTE 
             */

            //$scope.ListAgendaDaddos[GrindList].BT_faltou = true;
            //$scope.ListAgendaDaddos[GrindList].BT_cacelarConslt = true;
            //$scope.ListAgendaDaddos[GrindList].BT_cartaoFinanceiro = true;
            //$scope.ListAgendaDaddos[GrindList].BT_convertPacient = true;
            

        };
        
     };



     /**
      * Converte emn paciente ficharapda
      */
      $scope.ShowModalConvertPaciente = function(LAG) {
        console.log("ShowModalConvertPaciente");
        console.log("Usiario clicado");
        console.log(LAG);
        //console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        console.log($scope.GridDadosBD[LAG.GridKey]);

        /**
         * Busca Operados de celular cadastrada no sistema
         * para exibus no select do modal
         */
        $scope.getOperadorasCelular();
      
        //console.log("USER");
        //console.log($scope.UserDados);
        $scope.MD = {};
        $scope.MD.nome = $scope.GridDadosBD[LAG.GridKey].nm_paciente;
        $scope.MD.sobrenome = $scope.GridDadosBD[LAG.GridKey].sobrenome;
        $scope.MD.duracao = LAG.duracao;
        $scope.MD.hora = LAG.hora;
        $scope.MD.observac = LAG.observac;
        $scope.MD.sexo = $scope.GridDadosBD[LAG.GridKey].sexo;
        $scope.MD.tel1 = $scope.GridDadosBD[LAG.GridKey].num_telefone1;
        $scope.MD.tel2 = $scope.GridDadosBD[LAG.GridKey].num_telefone2;
        $scope.MD.GridKey = LAG.GridKey;
        $scope.MD.KeyList = LAG.KeyList;
        $scope.MD.cd_pacficharapida = $scope.GridDadosBD[LAG.GridKey].cd_pacficharapida;
        $scope.MD.cd_prestador = $scope.GridDadosBD[LAG.GridKey].cd_prestador;
        $scope.MD.cd_motivo_agendamento = $scope.GridDadosBD[LAG.GridKey].cd_motivo_agendamento;
        $scope.MD.cd_unidade = $scope.GridDadosBD[LAG.GridKey].cd_unidade;
        $scope.MD.funcionario = $scope.GridDadosBD[LAG.GridKey].funcionario;
        $scope.MD.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;

        
        
        
        

          
        $scope.OpenCloseModalById('MDConvertPacient');

        $scope.ModalItensIniFP(); 

        
      };
     
     /**
     * Busca Operados de celular cadastrada no sistema
     */
     $scope.getOperadorasCelular = function() {
         console.log("getOperadorasCelular");
           AgendaService.getOperadorasCelular()
                    .then(function (data) {
                        console.log(" set getOperadorasCelular retorno"); console.log(data); console.log(data.data);
                        $scope.ListOperadoraCel = data.data.dados;
                    });
     }

      $scope.cadastraPacientFichaRapda = function() {
        console.log("CadastraPacientFichaRapda");

        console.log("DADOS DO MODAL A ENVIAR");
        console.log($scope.MD);
        console.log($scope.MD.data_nacimento);

        /**
         * VERIFICO SE OS CAMPOS ESTAO PREENCHIDOS
         * OBS.: FORMULARIO MUITO GRANDE
         */
        if(( typeof $scope.MD.nome != 'undefined') && ($scope.MD.nome != '') &&
            ( typeof $scope.MD.sobrenome != 'undefined') && ($scope.MD.sobrenome != '') &&
            ( typeof $scope.MD.data_nacimento != 'undefined') && ($scope.MD.data_nacimento != '') &&
            ( typeof $scope.MD.CPF != 'undefined') && ($scope.MD.CPF != '') &&
            ( typeof $scope.MD.OP_tel1 != 'undefined') && ($scope.MD.OP_tel1 != '') &&
            ( typeof $scope.MD.email != 'undefined') && ($scope.MD.email != '') &&
            ( typeof $scope.MD.rendaFamilia != 'undefined') && ($scope.MD.rendaFamilia != '') &&
            ( typeof $scope.MD.diaPagamento != 'undefined') && ($scope.MD.diaPagamento != '') &&
            ( typeof $scope.MD.CEP != 'undefined') && ($scope.MD.CEP != '') &&
            ( typeof $scope.MD.CepNumero != 'undefined') && ($scope.MD.CepNumero != '') &&
            ( typeof $scope.MD.pagChecBoleto != 'undefined') && ($scope.MD.pagChecBoleto != '') &&
            ( typeof $scope.MD.filhos != 'undefined') && ($scope.MD.filhos != '') &&
            ( typeof $scope.MD.CepEndereco != 'undefined') && ($scope.MD.CepEndereco != '')
          )
          {
            console.log("campos preenchidos OK  jjj");
            console.log($scope.ClinicDados);


            $scope.MD.cd_filial =  $scope.ClinicDados.cd_unidade_atendimento;
            $scope.MD.grupo_unidades = $scope.ClinicDados.grupo_unidades;
            $scope.MD.paciente_unidade = $scope.ClinicDados.paciente_unidade;
            
            // alterar pagina permiçoes  #*
            $scope.MD.USERID = $scope.UserDados.chave;
            $scope.MD.PGnome = "Paciente";
            $scope.MD.PGTela = "Paciente"; 

            $scope.MD.medico = $scope.ag.medico;
            $scope.MD.unidade = $scope.ag.unidade;
            $scope.MD.cadeira = $scope.ag.cadeira.cadeira;
            $scope.MD.cadeiraValue = $scope.ag.cadeira.cadeiraValue; // adcionado depois 

            console.log("DADOS DO MODAL A ENVIAR");
            console.log($scope.MD);

                AgendaService.cadastraPacientFichaRapda($scope.MD)
                        .then(function (data) {
                            console.log(" set CadastraPacientFichaRapda retorno"); console.log(data); console.log(data.data);
                            $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                        });

        }else{
            /**
             * DADOS INVALIDOS OU INCOMPLETOS
             */
            $window.alert("Preencha os campos obrigatorios");
        }

      };


      /**
       * Efeito Nav de troca (Modal converte paciente)
       */
      $scope.navActivPessoais= function() {
            $('#MdPessoaois').addClass('active');
            $('#MdPessoaois_link').addClass('active');
            $('#MdComprement_link').removeClass('active');
            $('#MdComprement').removeClass('active');
            
      };
      $scope.navActivComplemetar= function() {
                $('#MdPessoaois').removeClass('active');
                $('#MdPessoaois_link').removeClass('active');
                $('#MdComprement_link').addClass('active');
                $('#MdComprement').addClass('active');
                
      };




    /**
     * Ação de cancelar consulta marcada
     * Invocada polo usuario 
     * BT Cancelar Atendimento
     * Regra > nao permite cancelar um dia apos a data da consulta
     * 
     *  set cancelado = 'S',
        dt_ultima_edicao='2017-05-12 13:38:09',
        datahora_cancelamento = '2017-05-12 13:38:09', 
        quem_cancelou='C',
        usuario_cancelou = 'L00500020160620140212' 
        where chave = 'L02600020170406182832'
     */
    $scope.CancelAtendimento = function(LAG) {
        console.log("CancelAtendimento");
        console.log(LAG);
        //console.log("list");
        //console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        //console.log("BD");
        //console.log($scope.GridDadosBD[LAG.GridKey]);
        //console.log("USER");
        //console.log($scope.UserDados);


        $scope.MD.nomePaciet = $scope.GridDadosBD[LAG.GridKey].nome;
        $scope.MD.chave =  $scope.GridDadosBD[LAG.GridKey].chave;
        $scope.MD.USERID = $scope.UserDados.chave;
        $scope.MD.quem_cancelou = null;
        $scope.MD.PGnome = $scope.Pg.nome;
        $scope.MD.usuario_cancelou = $scope.UserDados.chave;
        
        $scope.OpenCloseModalById('MDCacelConsult');
    };
    $scope.ConfirmaCancelAtendimento = function() {
        console.log("ConfirmaCancelAtendimento");
         //console.log($scope.MD);
        if($scope.MD.chave != null && $scope.MD.quem_cancelou != null){
                AgendaService.setCancelAtendimento($scope.MD)
                .then(function (data) {
                   //console.log(" get ConfirmaCancelAtendimento retorno");  console.log(data); console.log(data.data);
                    //console.log(data.data.dados[0]);
                    //console.log(data.data.confg[0]);
                    if(data.data.dados == 'cancelado'){
                        $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                    }
                    $scope.OpenCloseModalById('MDCacelConsult');
            });

        }
    }

    
    /**
     * Atender paciente
     */
     $scope.pacienteAtender = function(LAG) {
        console.log("pacienteAtender");
        console.log(LAG);
        console.log("list");
        console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        console.log("BD");
        console.log($scope.GridDadosBD[LAG.GridKey]);
        console.log("USER");
        console.log($scope.UserDados);
        console.log("AG-DADS");
        console.log($scope.ag);

        $scope.MD = {};

        $scope.MD.USERID = $scope.UserDados.chave;
        $scope.MD.PGnome = $scope.Pg.nome;
        $scope.MD.chaveAgenda = $scope.GridDadosBD[LAG.GridKey].chave;
        $scope.MD.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;
        $scope.MD.data_a = $scope.ag.data_a;
        $scope.MD.hora_agenda = $scope.GridDadosBD[LAG.GridKey].hora_agenda;
        $scope.MD.duracao_agenda = $scope.GridDadosBD[LAG.GridKey].duracao_agenda;
        $scope.MD.cd_prestador = $scope.GridDadosBD[LAG.GridKey].cd_prestador;
        $scope.MD.cd_paciente = $scope.GridDadosBD[LAG.GridKey].cd_paciente;
        $scope.MD.cd_paciente = $scope.GridDadosBD[LAG.GridKey].cd_paciente;
        $scope.MD.cd_filial = $scope.ag.filial;
        $scope.MD.nome = $scope.GridDadosBD[LAG.GridKey].nome;
        $scope.MD.intevecoes = "0"// o selecte nao esta buscando varios itens
        $scope.MD.observacao = null;

        console.log($scope.MD);

        $scope.OpenCloseModalById('MDAtendePacient');



    };



    $scope.setPacienteAtendido = function() {
        console.log("setPacienteAtendido");
        //console.log($scope.MD);
        
        $scope.OpenCloseModalById('MDAtendePacient'); // fecho o modal antes do retorno da Api para q nao possa ser enviado varias vezes

        AgendaService.setPacienteAtendido($scope.MD)
                .then(function (data) {
                   console.log(" get setPacienteAtendido retorno");  console.log(data); console.log(data.data);
                   if(data.data.error == false){
                        $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                    }
        });

    }





     $scope.pacienteChegou = function(LAG) {
        console.log("pacienteChegou");
        console.log(LAG);
        console.log("list");
        console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        console.log("BD");
        console.log($scope.GridDadosBD[LAG.GridKey]);
        console.log("USER");
        console.log($scope.UserDados);
        console.log("AG-DADS");
        console.log($scope.ag);

        $scope.ag.USERID = $scope.UserDados.chave;
        $scope.ag.PGnome = $scope.Pg.nome;
        $scope.ag.chaveAgenda = $scope.GridDadosBD[LAG.GridKey].chave;
        $scope.ag.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;

        AgendaService.setPacienteChegou($scope.ag)
                .then(function (data) {
                   console.log(" get ConfirmaCancelAtendimento retorno");  console.log(data); console.log(data.data);
                   if(data.data.dados == 'ok'){
                        $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                    }
        });

    };


    $scope.pacienteFalta = function(LAG) {
        console.log("pacienteFalta");
        console.log(LAG);
        console.log("list");
        console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        console.log("BD");
        console.log($scope.GridDadosBD[LAG.GridKey]);
        console.log("USER");
        console.log($scope.UserDados);
        console.log("Clinica");
        console.log($scope.ClinicDados);
        console.log("AG-DADS");
        console.log($scope.ag);

        $scope.ag.USERID = $scope.UserDados.chave;
        $scope.ag.PGnome = $scope.Pg.nome;
        $scope.ag.chaveAgenda = $scope.GridDadosBD[LAG.GridKey].chave;
        $scope.ag.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;
        $scope.ag.hora_agenda = $scope.GridDadosBD[LAG.GridKey].hora_agenda;
        $scope.ag.cd_paciente = $scope.GridDadosBD[LAG.GridKey].cd_paciente;
        $scope.ag.cd_tipo_tratamento = $scope.GridDadosBD[LAG.GridKey].cd_tipo_tratamento;
        $scope.ag.cd_filial = $scope.ClinicDados.cd_unidade_atendimento;
        $scope.ag.nm_unidade_atendimento = $scope.ClinicDados.nm_unidade_atendimento;
        $scope.getMedicoNome($scope.ag.medico,$scope.ag);
         
        
        
        

        

        AgendaService.setPacienteFalta($scope.ag)
                .then(function (data) {
                   console.log(" get SetPacienteFalta retorno");  console.log(data); console.log(data.data);
                   if(data.data.error == false){
                        $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                    }
        });

    };


    /**
     * Abre modal com Dados da consulta
     * Se o horario tem agenda -> abre dados do agendamento
     * Se nao tem exibe formulario para nova agenda
     */
     $scope.ShowAtendimento = function(LAG) {
        console.log("ShowAtendimento");
        console.log("Usiario clicado");
        console.log(LAG);
        

        $scope.ListBuscaPacientClinica = {};
        if(LAG.dados != "...Agendar..." ){
            console.log("exite dados");
            console.log("list");
            console.log($scope.ListAgendaDaddos[LAG.KeyList]);
            console.log("BD");
            console.log($scope.GridDadosBD[LAG.GridKey]);
            console.log("USER");
            console.log($scope.UserDados);

            console.log("data hoje");
            console.log($scope.GridDadosBD[LAG.GridKey].data_agenda );
            console.log($scope.DataHoje( $scope.GridDadosBD[LAG.GridKey].data_agenda ));
             
            // nome
            // observacao
            $scope.MD.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;
            $scope.MD.hora_agenda =  $scope.GridDadosBD[LAG.GridKey].hora_agenda;
            $scope.MD.duracao_agenda =  $scope.GridDadosBD[LAG.GridKey].duracao_agenda;

            $scope.MD.cd_prestador =  $scope.GridDadosBD[LAG.GridKey].cd_prestador;
            $scope.MD.num_telefone1 =  $scope.GridDadosBD[LAG.GridKey].num_telefone1;

            
            $scope.MD.observacao =  $scope.GridDadosBD[LAG.GridKey].observacao;
            $scope.MD.nome =  $scope.GridDadosBD[LAG.GridKey].nome;
            $scope.getMedicoNome($scope.GridDadosBD[LAG.GridKey].cd_prestador,$scope.MD);
            $scope.getTipoTratamentoNome($scope.GridDadosBD[LAG.GridKey].cd_tipo_tratamento,$scope.MD);
            $scope.getUnidadeNome($scope.GridDadosBD[LAG.GridKey].cd_unidade,$scope.MD);

            


            if(typeof $scope.ListMotivoAtendimento == 'undefined'){
                    AgendaService.getMotivoAtendimento()
                        .then(function (data) {
                                $scope.ListMotivoAtendimento = angular.copy(data.data.dados);
                                Object.keys($scope.ListMotivoAtendimento).map(function (key) {
                                        if( $scope.ListMotivoAtendimento[key].chave == $scope.GridDadosBD[LAG.GridKey].cd_motivo_agendamento){
                                            $scope.MD.nome_motivo_atendimento =  $scope.ListMotivoAtendimento[key].nm_motivo_atendimento;
                                        }
                                });
                     });

            }else{
                Object.keys($scope.ListMotivoAtendimento).map(function (key) {
                            if( $scope.ListMotivoAtendimento[key].chave == $scope.GridDadosBD[LAG.GridKey].cd_motivo_agendamento){
                                $scope.MD.nome_motivo_atendimento =  $scope.ListMotivoAtendimento[key].nm_motivo_atendimento;
                            }
                    });
            }



            //GET DADOS COMPLETOS DA CONSULTA RESTANTES (SE NAO E FICHA RAPDA)
           if($scope.GridDadosBD[LAG.GridKey].cd_paciente != null){
                var iten = {
                            "funcionario": $scope.GridDadosBD[LAG.GridKey].funcionario,
                            "paciente": $scope.GridDadosBD[LAG.GridKey].cd_paciente
                            };
            $scope.getDadosConultaCompleta(iten);
           }
    


           console.log($scope.MD);

             //$scope.getNomePrestador(id,obj);
            $scope.OpenCloseModalById('MDDadosConsult');

        }else{
            console.log("cadastra nova consulta");
            $scope.MD = {};
            $scope.MD.TabelaTopTXT = false;

            

            //console.log(LAG);
            //console.log("USER");
            //console.log($scope.UserDados);
            console.log("Medico Config");
            console.log($scope.ClinicMedicoConfig );
            console.log("Config AG");
            console.log($scope.ag);
            console.log("List Atendimento");
            console.log($scope.ListMotivoAtendimento );
            console.log("Clinica Dados");
            console.log($scope.ClinicDados);
            console.log($scope.ClinicHoraFunciona);

            $scope.getMedicoTratamentos();

            $scope.MD.dia_select = $scope.ag.data_a;
            $scope.MD.hora_select = LAG.hora;


            $scope.MD.BuscarString = "";
            $scope.MD.cd_filial =  $scope.ClinicDados.cd_unidade_atendimento;
            $scope.MD.grupo_unidades = $scope.ClinicDados.grupo_unidades;
            $scope.MD.paciente_unidade = $scope.ClinicDados.paciente_unidade;
            
            $scope.MD.USERID = $scope.UserDados.chave;
            $scope.MD.PGnome = $scope.Pg.nome;

            $scope.MD.medico = $scope.ag.medico;
            $scope.MD.unidade = $scope.ag.unidade;
            $scope.MD.cadeira = $scope.ag.cadeira.cadeira;
            $scope.MD.cadeiraValue = $scope.ag.cadeira.cadeiraValue; // adcionado depois 



            /*Abre MODAL Nova consulta */
            $scope.OpenCloseModalById('MDNovaConsult');
            console.log($scope.MD);


        }
    };




    /**
     * DO MODAL NOVA CONSULTA
     * Busca para preenche o grid com os pacientes da clinica 
     * @param String Com o nome digitado esta no OBJECT $scope.MD 
     */
    $scope.getListPacienteForString = function(e) {
        console.log("getListPacienteForString");
        //console.log($scope.MD);
        if((e.which == 13) || (e.which == 32 )){
               AgendaService.getListPacienteForString($scope.MD)
                .then(function (data) {
                   console.log("get getListPacienteForString retorno");  console.log(data); console.log(data.data);
                        $scope.ListBuscaPacientClinica = angular.copy(data.data.dados);
                        $scope.MD.TabelaTopTXT = true;
                        console.log($scope.ListBuscaPacientClinica);
              });
        };

    };
    


    
    /**
     * Adiciona Consulta No Grid 
     */
    $scope.GridAddConsulta = function(obj) {
        console.log("GridAddConsulta");
        console.log("Config AG");
        console.log($scope.ag);
        console.log("DADOS PACIENTE");
        console.log(obj);
        console.log($scope.MD);
        
        /**        VERIFICO SE TODOS OS CAMPOS OBRIGATORIOS ESTAO PREENCHIDOS         */
        if(($scope.MD.dia_select != "")  && ($scope.MD.cd_filial != "")){
            //console.log("if ok");
            //console.log( $scope.MD);
            


            //console.log( $scope.MD.duracao);
            //console.log( $scope.MD.tratamento);
            //console.log( $scope.MD.nm_motivo_atendimento);

           typeof $scope.MD.duracao == "undefined" ?   $window.alert("Selecione a duração da consulta!") :   $scope.setValidadoForm($scope.MD,false); 
           typeof $scope.MD.tratamento == "undefined" ?  $window.alert("Selecione o motivo do agendamento da consulta!") :  $scope.setValidadoForm($scope.MD,false); 
           typeof $scope.MD.nm_motivo_atendimento == "undefined" ?  $window.alert("Selecione o tratamento da consulta!") :  $scope.setValidadoForm($scope.MD,false); 

           if( ( typeof $scope.MD.duracao != "undefined"  ) && ( typeof $scope.MD.tratamento != "undefined"  ) && ( typeof $scope.MD.nm_motivo_atendimento != "undefined"  ) ) {
                 //console.log("cadastra consulta ########################"); 

                    
                    $scope.MD.cd_paciente = obj.chave;
                    $scope.MD.cadeiraValue =  $scope.ag.cadeira.cadeiraValueSelect; // quando salva no banco muda o valor de 1 para 0,  2 para 1 ....
                    console.log($scope.MD);
                    AgendaService.insertConsultaGrid($scope.MD)
                    .then(function (data) {
                        console.log("get InsertConsultaGrid retorno ");  console.log(data); console.log(data.data);
                        //$scope.getSelcCadeiras();
                        $scope.getAgendaDia(); //Mudar para apena aterar os estatus - nao buscar do back
                        $scope.OpenCloseModalById('MDNovaConsult');
                                //$scope.ListMotivoAtendimento = angular.copy(data.data.dados);
                    });

            }
                
        }

    };


    /**
     * Busca os motivos de tratamendo (Select do modal cadastra nova consulta)
     */
    $scope.getMotivoAtendimento = function() {
        //console.log("getMotivoAtendimento");
               AgendaService.getMotivoAtendimento()
                .then(function (data) {
                   //console.log("get getMotivoAtendimento retorno");  console.log(data); console.log(data.data);
                        $scope.ListMotivoAtendimento = angular.copy(data.data.dados);
              });
    };

    $scope.getMedicoTratamentos = function() {
        //console.log("getMotivoAtendimento");
               AgendaService.getMedicoTratamentos($scope.ag)
                .then(function (data) {
                   //console.log("get getMotivoAtendimento retorno");  console.log(data); console.log(data.data);
                        $scope.ListMedicoTratamentos = angular.copy(data.data.dados);
              });
    };

    $scope.setValidadoForm = function(obj,val) {
            obj.validado = val; 
    };


    $scope.getDadosConultaCompleta = function(obj) {
        console.log("getDadosConultaCompleta");
        //console.log(obj);
               AgendaService.getDadosConultaCompleta(obj)
                .then(function (data) {
                   //console.log("get getDadosConultaCompleta retorno");  console.log(data); console.log(data.data);
                        
                        //console.log(data.data.funcionario[0].nm_prestador);
                        //console.log(data.data.paciente[0].prontuario);
                        $scope.MD.nome_funcionario_cadastro = data.data.funcionario[0].nm_prestador;
                        $scope.MD.prontuario = data.data.paciente[0].num_matricula;
                        
                        //obj.nomePrestado = data.data.dados;
            });
    };

   




    /**
     * Abre ou fecha modal,  pelo ID
     */
    $scope.OpenCloseModalById = function(id) {
        //console.log("modal open/Close");
        id = "#"+id; $(id).modal('toggle');
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




    /**
     * Loop para encontra valor equivalente a chave enviada
     * TODOS PODEN SER SUBSTITUIDOS POR APENAS 1
     * ANALIZAR DESEMPENHO
     */

    $scope.getMedicoNome = function(id,obj) {
         Object.keys($scope.ListMedico).map(function (key) {
                    if( $scope.ListMedico[key].chave == id){
                        
                        obj.nome_medico =  $scope.ListMedico[key].nm_prestador;
                    }
            });
    }
   
    
    $scope.getTipoTratamentoNome = function(id,obj) {
         Object.keys($scope.ListTratamento).map(function (key) {
                if( $scope.ListTratamento[key].chave == id){
                    obj.nome_tipo_tratamento =  $scope.ListTratamento[key].nm_tipo_tratamento;
                }
            });
    }
    
    $scope.getUnidadeNome = function(id,obj) {
        console.log("getUnidadeNome");
        //console.log($scope.ListUnidade);
         Object.keys($scope.ListUnidade).map(function (key) {
                if( $scope.ListUnidade[key].chave == id){
                    obj.nome_unidade =  $scope.ListUnidade[key].nm_unidade_atendimento;
                }
            });
    };


    /**
     * BUSCA DADOS FINANCEIRO DO PACIENTE APOS ABRIR MODAL FINACEIRO
     */
    /**
     * ABRE MODAL FINACEIRO
     */
    $scope.ShowModFinanceiro = function(LAG) {
        console.log("ShowModFinanceiro");
        console.log("Usiario clicado");
        console.log(LAG);
        //console.log($scope.ListAgendaDaddos[LAG.KeyList]);
        console.log($scope.GridDadosBD[LAG.GridKey]);

        //console.log("USER");
        //console.log($scope.UserDados);

        //INICIALIZA OBJETOS MANIPOULADOS NO MODAL
        $scope.MD = {};
        $scope.PacienteFinanceiro = {};

        $scope.MD.FormFinaceiroBaixa = false; // esconde o form finaceiro baixa

        $scope.MD.nome = $scope.GridDadosBD[LAG.GridKey].nm_paciente;
        $scope.MD.sobrenome = $scope.GridDadosBD[LAG.GridKey].sobrenome;

        $scope.MD.nomePaciente = $scope.MD.nome +" "+ $scope.MD.sobrenome;

        $scope.MD.GridKey = LAG.GridKey;
        $scope.MD.KeyList = LAG.KeyList;

        $scope.MD.cd_unidade = $scope.GridDadosBD[LAG.GridKey].cd_unidade;
        $scope.MD.funcionario = $scope.GridDadosBD[LAG.GridKey].funcionario;
        $scope.MD.data_agenda = $scope.GridDadosBD[LAG.GridKey].data_agenda;

        
        $scope.MD.cd_filial =  $scope.ClinicDados.cd_unidade_atendimento;
        $scope.MD.grupo_unidades = $scope.ClinicDados.grupo_unidades;
        $scope.MD.paciente_unidade = $scope.ClinicDados.paciente_unidade;
        
        $scope.MD.USERID = $scope.UserDados.chave;
        $scope.MD.PGnome = $scope.Pg.nome;

        
        $scope.MD.cd_paciente = $scope.GridDadosBD[LAG.GridKey].cd_paciente;

        $scope.getUnidadeNome($scope.MD.cd_unidade,$scope.MD);
        $scope.MD.fincUnidade = $scope.MD.cd_unidade

         console.log("getFinanceiroPaciente");
            AgendaService.getFinanceiroPaciente($scope.MD)
                .then(function (data) {
                    console.log(" get getFinanceiroPaciente retorno"); console.log(data); console.log(data.data);
                    $scope.listFinacTratamentos = angular.copy(data.data.dados);

                    $scope.listFinacGrid = angular.copy(data.data.grid);

                    $scope.listFinacGridJuros = angular.copy(data.data.juros);

                     console.log("listFinacTratamentos");
                     console.log($scope.listFinacTratamentos);
                     console.log("listFinacGrid");
                     console.log($scope.listFinacGrid);

                     console.log("juros");
                     console.log($scope.listFinacGridJuros);


                    
            });


            /***
             * Faço um get para pegar os dados do paciente noa disponiveis ainda
             */
            AgendaService.getPaciente($scope.MD.cd_paciente)
                .then(function (data) {
                    console.log(" get getPaciente retorno");  console.log(data.data.dados);
                    $scope.MD.pacienteDados = data.data.dados;

                    $scope.MD.fincCPF =  angular.copy($scope.MD.pacienteDados.cpf);
                    $scope.MD.fincNome = angular.copy($scope.MD.pacienteDados.nm_paciente);
                });

            /***
             * Faço um get para pegar as formas de pagamento
             */
            AgendaService.getFormasPagamento()
                .then(function (data) {
                    console.log(" get GetFormasPagamento retorno");  console.log(data.data.dados);
                    $scope.ListFormsPagamento = data.data.dados;
            });

            /***
             * Faço um get para pegar as operadoras no caso do BigCard
             */
            AgendaService.getOperadorasCartao()
                .then(function (data) {
                    console.log(" get getOperadorasCartao retorno");  console.log(data.data.dados);
                    $scope.ListFormsPagOperadoras = data.data.dados;
            });


            /***
             * Faço um get para pegar BANDEIRAS DE CARTAO
             */
            AgendaService.getBandeirasCartao($scope.MD.cd_unidade)
                .then(function (data) {
                    console.log(" get getBandeirasCartao retorno");  console.log(data.data.dados);
                    $scope.ListFormsPagBandeiras = data.data.dados;
            });


            

            
            
        /**
         * Seto TODAS no selected para exibir todo o retorno
         */
        $scope.MD.exibirSelect = "T";


        /**
         * Seto o padrao ini de algumas variaveis
         */
        $scope.MD.baixaFormaCalc = "R$";


        console.log("$scope.MD _____ ");
        console.log($scope.MD);
        console.log("------- _____ ");

        

        $scope.OpenCloseModalById('MDDadosFinanceiro');

    };

    
    /**
     * AINDA NAO ESTA FUNCIONANDO
     * Calcula Juros 
     * o juros e calcula se a parcela for promisoria e ja estiver a mais de um dia vencida
     * Função rescebe o iten do grid e retorna o juros
     */
    $scope.calcJurosMdFinanceiro = function(LAG) {
        // debito_efetivado   == 'N'   nm_tipo_pagamento == 'Nota Promissoria'
        /*if($res['debito_efetivado'] == 'N' && $res['nm_tipo_pagamento'] == 'Nota Promissoria'){
            $dias_atraso = (strtotime(date('Y-m-d')) - strtotime($res['data'])) / 86400;
            if($dias_atraso > 0){
                //pega percentual de juros ao dia
                $sql = "select percentual_juros_atraso from tbl_sistema";
                $sql = query_execute($sql,$con);
                $perc = mysqli_fetch_array($sql);
                extract($perc);
                $valor = $res['valor_parcela'];
                for($x=1; $x <= $dias_atraso; $x++){
                    $valor += ($valor * ($percentual_juros_atraso / 100));
                }
                $juros = $valor - $res['valor_parcela'];
            }else{
                $juros = 0.00;
            }
        }else{
            $juros = $res["juros"];
        }
        */
    };


    /**
     * Exibe link(icon) para modal financeiro da parcela do tratamento
     * o id do elemento e sempre iniciado com 'MdFinTd' e acresentado hashkey
     * VERIFICAR ACEESO **#
     */
    $scope.baixaMdFinanceiro = function(LAG,ID) {
        //console.log("baixaMdFinanceiro");
        //console.log(ID);
        var ItenId = 'MdFinTd' + ID;
        if(LAG.cd_parcela_destino !== null  &&  LAG.debito_efetivado == 'S' ){
                //console.log('<i class="fa fa-check-circle"></i>');
                document.querySelector("[id='"+ItenId+"']").innerHTML =  '<i class="fa fa-check-circle "   ></i>' ;
                //LAG.situacaoBaixaIcon = '<i class="fa fa-check-circle"></i>' ;
                
        }else{
            if (LAG.debito_efetivado == "S") {
                //console.log('<i class="fa fa-check" aria-hidden="true"></i>');
                document.querySelector("[id='"+ItenId+"']").innerHTML = '<i class="fa fa-check " aria-hidden="true"  ></i>';
                ///LAG.situacaoBaixaIcon = '<i class="fa fa-check" aria-hidden="true"></i>';
            }
            else{
                //console.log('<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>');
                document.querySelector("[id='"+ItenId+"']").innerHTML = '<i class="fa fa-arrow-circle-o-down " aria-hidden="true"  ></i>';
                //LAG.situacaoBaixaIcon = '<i class="fa fa-arrow-circle-o-down" aria-hidden="true"></i>';
            }
        }
    };


    /**
     * Seleciona parcela para baixa
     */
    $scope.MdBaixaSelect = function(LAG) {
        console.log("MdBaixaSelect");
        console.log(LAG);
        console.log("-----------");
        console.log($scope.ag);
        $scope.MD.FormFinaceiroBaixa = true;
        $scope.MD.FinaceiroBaixaOBJ = angular.copy(LAG)
        $scope.MD.fincVancim = $scope.FormataDataUsuaio($scope.MD.FinaceiroBaixaOBJ.data);
        $scope.MD.fincBaixa = $scope.ag.data_Hoje;
        $scope.MD.fincHistoric = $scope.MD.FinaceiroBaixaOBJ.historico;
        $scope.MD.fincValPace = $scope.MD.FinaceiroBaixaOBJ.valor_parcela;

        $scope.MD.fincValAPaga = $scope.MD.FinaceiroBaixaOBJ.valor_parcela;
        $scope.MD.fincValPago = $scope.MD.FinaceiroBaixaOBJ.valor_parcela;
        $scope.MD.fincJuros = $scope.MD.FinaceiroBaixaOBJ.juros;
        $scope.MD.fincDesconto = $scope.MD.FinaceiroBaixaOBJ.desconto;

        
        $scope.getTratamentDesconto($scope.MD.FinaceiroBaixaOBJ.cd_financeiro);


        
        //$scope.MD.fincNomePaciente

    };

    $scope.MdBaixaExecuta = function() {
        console.log("MdBaixaExecuta");
        console.log($scope.MD.FinaceiroBaixaOBJ);
        console.log($scope.MD);
        
    };



    /**
     * Feicha o form financeiro 
     */
    $scope.SairBaixaMdFinaceiro = function() {
        console.log("SairBaixaMdFinaceiro");
        $scope.MD.FormFinaceiroBaixa = false;
        
    };
    


    /***
     * Pego tipo de tratamento se tem desconto
     */
    $scope.getTratamentDesconto = function() {
        AgendaService.getTratamentDesconto(cd_tratamento)
            .then(function (cd_tratamento) {
                console.log(" get getTratamentDesconto retorno");  console.log(data.data.dados);
                //MD.fincDescontAtivo
        });
    };





    /**
     * NAO ESTA SENDO USADO
     * exibe inputs do Modal financeiro
     * dados complementares para a forma de pagamento
     */
    $scope.showBTsFormaPag = function(LAG) {
        console.log("showBTsFormaPag");
        console.log(LAG);
        $scope.FormaPagSelectd = LAG;
    };



    /**
     * NAO ESTA SENDO USADO
     * Verifica se o array com as lista de atyendimentos esta criado
     * se nao estiver chama a função para criar
     * add ao obj enviado o valor nome da chave
     */
    $scope.getMotivoAtendimentoNome = function(id,obj) {
         console.log("getMotivoAtendimentoNome");
        if(typeof $scope.ListMotivoAtendimento == 'undefined'){
            $scope.getMotivoAtendimento();
            //console.log("go");
        }else{
             Object.keys($scope.ListMotivoAtendimento).map(function (key) {
                    //console.log( $scope.ListMotivoAtendimento[key].chave +" == "+ id );
                        if( $scope.ListMotivoAtendimento[key].chave == id){
                            obj.nome_motivo_atendimento =  $scope.ListMotivoAtendimento[key].nm_motivo_atendimento;
                        }
                });
        }
    };


     
    $scope.addSelectdMdFinaceiro = function() {
        console.log("addSelectdMdFinaceiro");
        console.log($scope.finShow);
        console.log($scope.MD);
        $scope.MD.tratSelectd = $scope.finShow.cd_financeiro;
        $scope.MD.exibirDebitoSelectd = $scope.MD.debito_efetivado;
        
    };



    $scope.ShowLinhaMdFinacenro = function(LAG) {
        console.log("ShowLinhaMdFinacenro");
        console.log(LAG);
    };
    

    $scope.getDadosUser = function() {
       var userChave = { 'chave' : $scope.Usuario.IdPrestador   }; // antes usava como teste valo usuario admin
            console.log('getDadosUser');console.log(userChave);
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


    $scope.cadastraFichaRapda =  function(){
        console.log("cadastraFichaRapda");
        console.log($scope.MD);
        $scope.MD.PGnome = "Agendamento - Chamar Paciente"; // NOME DA PAGINA ?
        $scope.MD.cadeiraValue =  $scope.ag.cadeira.cadeiraValueSelect; // quando salva no banco muda o valor de 1 para 0,  2 para 1 ....
        //**VERIFICA SE TODOS OS DADOS FOI SELECIONADO -APENAS OS QUE O USUARIO DEVE SELECIONAR ###+ adicionar verificar se campo nao e nulo (Campo em branco) */
        if( (typeof $scope.MD.duracao != "undefined") && (typeof $scope.MD.nm_motivo_atendimento != "undefined") && (typeof $scope.MD.tratamento != "undefined") && (typeof $scope.MD.fp_nome != "undefined") && (typeof $scope.MD.fp_sobrenome != "undefined")  && ((typeof $scope.MD.fp_tel_1 != "undefined")  || (typeof $scope.MD.fp_tel_2 != "undefined") ) && (typeof $scope.MD.fp_sexo != "undefined")){
             AgendaService.setFichaRapida($scope.MD)
                .then(function (data) {
                    console.log(" get cadastraFichaRapda retorno"); console.log(data); console.log(data.data);
                     $scope.getAgendaDia();
                     
                     
                     /*FECHA MODAL Nova consulta FICHARAPDA */
                    $scope.OpenCloseModalById('MDNovaConsult');
                    
            });
        }else{
            $window.alert("Preencha os campos para cadastra a ficha rápida");
        }
    };




    $scope.ipthi = function(){
        console.log("ipthi data valor");
        var a = document.querySelector('#my_hidden_input').value;
        //console.log(a);
        //console.log( $('#datepicker').datepicker('getFormattedDate'));
    };

    $scope.AlteradoDia = function(){
        console.log("AlteradoDia");
        console.log($scope.ag);
        if(($scope.ag.data_a != null ) && ($scope.ag.unidade != null ) && ($scope.ag.medico != null )   && ($scope.ag.cadeira.cadeira != null ) ){
            $scope.getSelcCadeiras();
        }
        if(($scope.ag.data_a != null ) && ($scope.ag.unidade != null )){
            $scope.getSelectMedicos();
        }
    };


     $scope.getCepViaCep = function(cep) {
         console.log("getCepViaCep");
         console.log(cep);
            $scope.MD.UF = '';
            $scope.MD.CepCidade = '';
            $scope.MD.CepBairro = '';
            $scope.MD.CepEndereco = '';
            $scope.MD.CepValido = false;
         AgendaService.getCepViaCep(cep)
                .then(function (data) {
                    console.log(" get getCepViaCep retorno"); //console.log(data); console.log(data.data);
                    if(data.status == 200){
                        $scope.MD.UF = data.data.uf
                        $scope.MD.CepCidade = data.data.localidade
                        $scope.MD.CepBairro = data.data.bairro
                        $scope.MD.CepEndereco = data.data.logradouro
                        $scope.MD.CepValido = true;
                    }
            });
     };





    /**
     * Verifica se a data enviada e a de hoje
     */
    $scope.DataHoje = function(dataCompare) {
        //console.log("DataHoje");
        var DiaArray = dataCompare.split("-");
        dataCompare = DiaArray[1]+"-"+DiaArray[2]+"-"+DiaArray[0];

        var Dt_agora = new Date();         var Dt_Seleciona = new Date(dataCompare);
        
        var currDate = Dt_agora.getDate();  //currDate = currDate < 10 ? '0' + currDate : currDate;
        var currMonth = Dt_agora.getMonth()+1;     //currMonth = currMonth < 10 ? '0' + currMonth : currMonth;
        var currYear = Dt_agora.getFullYear();
        var hoje  =  currDate +"-"+ currMonth +"-"+ currYear;

        var selectDate = Dt_Seleciona.getDate();  //selectDate = selectDate < 10 ? '0' + selectDate : selectDate;
        var selectMonth = Dt_Seleciona.getMonth()+1;  //selectMonth = selectMonth < 10 ? '0' + selectMonth : selectMonth;
        var selectYear = Dt_Seleciona.getFullYear();
        var SelectDia  =  selectDate +"-"+ selectMonth +"-"+ selectYear;

            if((SelectDia == hoje)){
                return true;
            }
            return false;
    }


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

    /**
     * Retorna data formatada dd/mm/yyyy 
     * recebe yyyy-mm-dd
     */
    $scope.FormataDataUsuaio = function(dataFormatar) {
        dataFormatar = dataFormatar.split("-");
        return dataFormatar[2] +"/"+ dataFormatar[1] +"/"+ dataFormatar[0]

    };


    /**
     * Funcão de inicialização do sistema 
     * Onde e difinido dos dados de acesso e segurança da pagina
     */
    $scope.Ini = function() {
        console.log("ini");
        
            $scope.Usuario = $sessionStorage.getObject('UserWebDental');
            console.log($scope.Usuario);

            if($scope.Usuario !== null){

                $scope.getDadosUser();

                //Pega a unidade selecionada no login
                var clinicaSelected = {
                    'chave' : $scope.Usuario.IdClinica,
                    'nm_unidade_atendimento' : $scope.Usuario.clinicaSelec
                };
                console.log($scope.ag);
                $scope.ListUnidade = clinicaSelected;
                $scope.ag.unidade = $scope.Usuario.IdClinica;
                console.log("ini seta unidade");
                console.log($scope.ag);
                $scope.getSelectMedicos();

            }else{
                /**
                 * Sair do sistema se usuario nao identificado na seção 
                 * Chama logout
                 */
                 $location.path('/');
             }
    };


    /**
     * Costroi array tempo step 15
     */
    $scope.stepConsultas = [];  var i,ob; for (i = 10; i < 125; ) { ob = {'valor' : i  };  $scope.stepConsultas.push(ob); i = i + 5;  };

    var d = new Date();

    var currDate = d.getDate();  currDate = currDate < 10 ? '0' + currDate : currDate;
    var currMonth = d.getMonth()+1;     currMonth = currMonth < 10 ? '0' + currMonth : currMonth;
    var currYear = d.getFullYear();
    $scope.ag.dia_semana = d.getDay()+1;

    var dateStr = currDate + "/" + currMonth + "/" + currYear;
    $scope.ag.data_a = dateStr;
    $scope.ag.data_Hoje = dateStr;
    //console.log(dateStr);


    var DtAgenda = new Date();
    DtAgenda.setHours(8,0,0);
    //document.getElementById("demo").innerHTML = d;
    
    
     DtAgenda.setMinutes(DtAgenda.getMinutes() + 17);
     var f = DtAgenda.getHours() +':'+DtAgenda.getMinutes();



     $scope.ModalItensIniFP = function() {
            $('#data_MD_1').datepicker({
                format: 'dd/mm/yyyy',                
                language: 'pt-BR',
                todayHighlight: true,
            });

     };


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
    $scope.Ini();
    //$scope.getDadosUser();// esta sendo chanmado dentro do INI
    $scope.getSelcTratamento();
    $scope.getSelcUnidade();
    
    
    
    
    
    //console.log("fim file");
    
});