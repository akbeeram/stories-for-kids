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
    //to show the login form & hide the register form by default
    vm.loginForm=true;
    vm.registerForm=false;
    vm.loginError = false;
    vm.preventClick = function(e){
        e.preventDefault();
    }
    //to show the signin form
    vm.openLoginForm = function(){
        vm.loginForm=true;
        vm.registerForm=false;
        vm.loginStyle={'color':'darkcyan'};
        vm.regStyle={'color':'darkgray'};
    }
    //to show the register/signup form
    vm.openRegisterForm = function(){
        vm.loginForm=false;
        vm.registerForm=true;
        vm.loginStyle={'color':'darkgray'};
        vm.regStyle={'color':'darkcyan'};
    }
    //to close the login popup modal
    vm.close = function(){
      vm.showLoginForm=false;
    }
    vm.routerState = routerState;
}