angular.module('storiesApp')
.component('signInPage',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/signin/signin.html',
        controller: signinCtrl
});

signinCtrl.$inject = ['$scope','$state','authService'];
function signinCtrl($scope,$state,authService){
    var vm = this;
    vm.LOGIN_TEXT = 'Login';
    vm.showSignIn = true;
    //user call to login service
    vm.userLogin = function(){
        vm.showSignIn = false;
        vm.showSigningIn = true;
        vm.showSignedIn = false;
        vm.showSignInErr = false;
        if($scope.loginForm && $scope.loginForm.$valid){
            authService.loginUser(vm.userLoginInput).then(function(data){
                if(data && data.loginSuccess){
                    localStorage.setItem('sfkUserInfo',JSON.stringify(data));
                    vm.showSigningIn = false;
                    vm.showSignIn = false;
                    vm.showSignedIn = true;
                    vm.showSignInErr = false;
                    //console.log($state);
                    $state.go('app.dash');
                }else if(data.loginError){
                    vm.loginError = data.loginError;
                    
                    vm.showSigningIn = false;
                    vm.showSignIn = false;
                    vm.showSignedIn = false;
                    vm.showSignInErr = true;
                }
            });
        }
    }
}