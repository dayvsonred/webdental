angular.module("portal").service("AgendaService", function ($http, config) {
   
    this.getSelcTratamento = function (data) {
        return $http.post(config.baseUrl + "/api/GetSelcTratamento",  data);
    };

    this.getSelcUnidade = function (data) {
        return $http.post(config.baseUrl + "/api/GetSelcUnidade",  data);

    };

    this.getDadosUser = function (data) {
        return $http.post(config.baseUrl + "/api/GetDadosUser",  data);
    };

    this.getSelectMedicos = function (data) {
        return $http.post(config.baseUrl + "/api/GetSelectMedicos",  data);
    };

    this.getSelcCadeiras = function (data) {
        return $http.post(config.baseUrl + "/api/GetSelcCadeiras",  data);
    };

    this.getAgendaDia = function (data) {
        return $http.post(config.baseUrl + "/api/GetAgendaDia",  data);
    };

    this.getUnidadeDados = function (data) {
        return $http.post(config.baseUrl + "/api/GetUnidadeDados",  data);
    };

    this.getMedicoDados = function (data) {
        return $http.post(config.baseUrl + "/api/GetMedicoDados",  data);
    };

    this.setCancelAtendimento = function (data) {
        return $http.post(config.baseUrl + "/api/SetCancelAtendimento",  data);
    };

    this.getDadosConultaCompleta = function (data) {
        return $http.post(config.baseUrl + "/api/GetDadosConultaCompleta",  data);
    };

    this.getMotivoAtendimento = function () {
        return $http.get(config.baseUrl + "/api/GetMotivoAtendimento");
    };

    this.getMedicoTratamentos = function (data) {
        return $http.post(config.baseUrl + "/api/GetMedicoTratamentos", data);
    };

    this.getListPacienteForString = function (data) {
        return $http.post(config.baseUrl + "/api/GetListPacienteForString", data);
    };

    this.insertConsultaGrid = function (data) {
        return $http.post(config.baseUrl + "/api/InsertConsultaGrid", data);
    };

    this.setFichaRapida = function (data) {
        return $http.post(config.baseUrl + "/api/SetFichaRapida", data);
    };

    this.cadastraPacientFichaRapda = function (data) {
        return $http.post(config.baseUrl + "/api/CadastraPacientFichaRapda", data);
    };

    this.getCepViaCep = function (data) {
        return $http.get("http://viacep.com.br/ws/"+ data + "/json");
    };

    this.getOperadorasCelular = function () {
        return $http.post(config.baseUrl + "/api/GetOperadorasCelular");
    };

    this.getFinanceiroPaciente = function (data) {
        return $http.post(config.baseUrl + "/api/GetFinanceiroPacienteAG", data);
    };

    this.getPaciente = function (data) {
        return $http.post(config.baseUrl + "/api/GetPaciente/"+ data);
    };

    this.getFormasPagamento = function () {
        return $http.post(config.baseUrl + "/api/GetFormasPagamento");
    };

    this.getOperadorasCartao = function () {
        return $http.post(config.baseUrl + "/api/GetOperadorasCartao");
    };

    this.getBandeirasCartao = function (data) {
        return $http.post(config.baseUrl + "/api/GetBandeirasCartao/"+ data);
    };

    this.setPacienteChegou = function (data) {
        return $http.post(config.baseUrl + "/api/SetPacienteChegou", data);
    };

    this.setPacienteFalta = function (data) {
        return $http.post(config.baseUrl + "/api/SetPacienteFalta", data);
    };

    this.setPacienteAtendido = function (data) {
        return $http.post(config.baseUrl + "/api/SetPacienteAtendido", data);
    };

    this.getTratamentDesconto = function (data) {
        return $http.post(config.baseUrl + "/api/GetTratamentDesconto", data);
    };


    

    




    


    

    

    
    

    
    

    


    

    



    

    
});