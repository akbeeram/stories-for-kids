angular.module('storiesApp')
    .component('changePwdForm',{
        restrict:'AE',
        bindings:{
            showLoginForm:'='
        },
        templateUrl:'js/changePwd/changePwd.html',
        controller: changePwdCtrl
    });

changePwdCtrl.$inject = ['$state','$http', 'authService'];
function changePwdCtrl($state,$http,authService){
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

    changePswd = function () {
        console.log('well take it from here');
    }

    vm.changePswd = changePswd;
    vm.routerState = routerState;
}