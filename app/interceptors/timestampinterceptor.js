angular.module("portal").factory("timestampInterceptor", function () {
	return {
		    request: function (config) {
                        
             /*        console.log("interception");
                        console.log($("#loginName").is(':hidden'));
                        var LoginObj  =  JSON.parse(window.localStorage.getItem("tokenSPMS"));
                        console.log(LoginObj);
                        if ($("#loginName").is(':hidden') && LoginObj != null ){
                            console.log("interception if");
                            
                            console.log("-----------------");
                            console.log(LoginObj);
                            
                            $('#loginLink').hide();
                            $('#loginRegister').hide();
                            $('#loginNameVar').text(LoginObj.user_nome);
                            
                            $('#loginName').show();
                            $('#loginSair').show();
                        }else if($("#loginName").is(':visible') && LoginObj == null ){
                            $('#loginLink').show();
                            $('#loginRegister').show();
                            $('#loginNameVar').text("");
                            
                            $('#loginName').hide();
                            $('#loginSair').hide();
                            
                    }
                    */

			return config;
                    }
	};
});