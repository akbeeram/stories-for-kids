angular.module('storiesApp')
    .component('forgotPwdForm',{
        restrict:'AE',
        bindings:{
            showLoginForm:'='
        },
        templateUrl:'js/forgotPwd/forgotPwd.html',
        controller: forgotPwdCtrl
    });

forgotPwdCtrl.$inject = ['$state','$http', 'authService'];
function forgotPwdCtrl($state,$http,authService){
    var vm = this;
    var routerState =$state;
    setSubmitButtonDesign = function(a,b,c,d){
        vm.showSignIn = a;
        vm.showSigningIn = b;
        vm.showSignedIn = c;
        vm.showSignInErr = d;
    }
    vm.setSubmitButtonDesign = setSubmitButtonDesign;
    vm.setSubmitButtonDesign(true,false,false,false);

    validateIfEmailExists = function () {
        authService.userExists(vm.userLoginInput).then(function (data) {
            if(data && data.userExists){
                vm.forgotPwdMailSent = "A temporary password has been sent to your email.";
            }else{
                vm.forgotPwdError = 'Email not found in our records.'
            }
        });
    }
    sendResetMail = function(){
        authService.sendResetMail(vm.userLoginInput).then(function (data) {
            if(data && data.sentResetEmail){

            }else{
                vm.forgotPwdError = 'Unable to reset password. Please try after some time.'
            }
        });
    }

    vm.sendResetMail = sendResetMail;
    vm.validateIfEmailExists = validateIfEmailExists;
    vm.routerState = routerState;
}