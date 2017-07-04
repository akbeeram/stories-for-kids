angular.module('storiesApp')
.component('loginLightBox',{
      restrict:'AE',
        bindings:{
            showLoginForm:'='
        },
        templateUrl:'js/loginLightBox/login-lightbox.html',
        controller: loginLightBoxCtrl
});

loginLightBoxCtrl.$inject = ['$state','$http', '$window'];
function loginLightBoxCtrl($state,$http,$window){
    var vm = this;
    var routerState = $state;
    vm.loginError = false;
    /*
     to show the login form & hide the register form by default
     params:
     a:loginForm
     b:registerForm
     c:showForgotPwdForm
     */
    setFormDisplay = function(a,b,c){
        vm.loginForm=a;
        vm.registerForm=b;
        vm.showForgotPwdForm = c;
    }
    vm.setFormDisplay = setFormDisplay;

    //to show the login form & hide the register form by default
    vm.setFormDisplay(true,false,false);
    //to show the signin form
    vm.openLoginForm = function(){
        vm.loginForm=true;
        vm.registerForm=false;
        vm.showForgotPwdForm = false;
        vm.loginStyle={'color':'darkcyan'};
        vm.regStyle={'color':'darkgray'};
    }
    //to show the register/signup form
    vm.openRegisterForm = function(){
        vm.loginForm=false;
        vm.registerForm=true;
        vm.showForgotPwdForm = false;
        vm.loginStyle={'color':'darkgray'};
        vm.regStyle={'color':'darkcyan'};
    }
    //to close the login popup modal
    close = function(){
      vm.showLoginForm=false;
    }
    openForgotPwdForm = function(){
        vm.showForgotPwdForm = true;
        vm.loginForm=false;
        vm.registerForm=false;
    }

    vm.close = close;
    vm.openForgotPwdForm = openForgotPwdForm;
    vm.routerState = routerState;
}