angular.module('storiesApp')
.component('signInPage',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/signin/signin.html',
        controller: signinCtrl
});

signinCtrl.$inject = ['$state','authService'];
function signinCtrl($state,authService){
    var vm = this;
    vm.LOGIN_TEXT = 'Login';
    vm.showSignIn = true;
    //user call to login service
    vm.userLogin = function(){
        console.log('clciked sign in');
        vm.showSignIn = false;
        vm.showSigningIn = true;
        vm.showSignedIn = false;
        authService.loginUser(vm.userLoginInput).then(function(data){
            if(data){
                localStorage.setItem('sfkUserInfo',JSON.stringify(data));
                vm.showSigningIn = false;
                vm.showSignIn = false;
                vm.showSignedIn = true;
                if(data.loginSuccess){
                    $state.go('app.dash');
                }

            }
        });
    }
}