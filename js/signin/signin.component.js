angular.module('storiesApp')
.component('signInPage',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/signin/signin.html',
        controller: signinCtrl
});

signinCtrl.$inject = ['$scope','$state','authService','localStorageService'];
function signinCtrl($scope,$state,authService, localStorageService){
    var vm = this;
    setSubmitButtonDesign = function(a,b,c,d){
        vm.showSignIn = a;
        vm.showSigningIn = b;
        vm.showSignedIn = c;
        vm.showSignInErr = d;
    }
    vm.setSubmitButtonDesign = setSubmitButtonDesign;
    vm.setSubmitButtonDesign(true,false,false,false);
    //user call to login service
    userLogin = function(){
        vm.setSubmitButtonDesign(false,true,false,false);
        if($scope.loginForm && $scope.loginForm.$valid){
            authService.loginUser(vm.userLoginInput).then(function(data){
                if(data && data.loginSuccess){
                    localStorageService.setUserAuthInfo(data);
                    vm.setSubmitButtonDesign(false,false,true,false);
                    //console.log($state);
                    $state.reload();
                }else if(data.loginError){
                    vm.loginError = data.loginError;
                    vm.setSubmitButtonDesign(false,false,false,true);
                }
            });
        }
    }
    forgotPwd = function () {

    }

    vm.LOGIN_TEXT = 'Login';
    vm.userLogin = userLogin;
    vm.forgotPwd = forgotPwd;
}