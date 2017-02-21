angular.module('storiesApp')
.component('signUpPage',{
        templateUrl:'js/signup/signup.html',
        controller: signupCtrl
});

signupCtrl.$inject = ['$scope','$state','authService'];
function signupCtrl($scope,$state,authService){
    var vm = this;
    vm.showSignIn = true;
    vm.showSigningIn = false;
    vm.showSignedIn = false;
    vm.showSignUpErr = false;
    
    vm.isUserUnique = function(){
        if($scope.regForm.email.$valid){
            vm.signupData.call = 'isUserUnique';
            authService.isUserUnique(vm.signupData).then(function(data){
                if(data){
                    if(data.isUserUnique){
                        vm.isUserAvailable = true;
                        vm.isUserNotAvailable = false;
                    }else{
                        vm.isUserAvailable = false;
                        vm.isUserNotAvailable = true;
                    }
                }else{
                    //service error
                }
            });
        }
    }
    
    
    vm.createUser = function(){
        vm.showSignIn = false;
        vm.showSigningIn = true;
        vm.showSignedIn = false;
        vm.showSignUpErr = false;
        vm.signupData.call = 'createUser';
        authService.createUser(vm.signupData).then(function(data){
            vm.signupSuccess = data && data.registerStatus ? true : false;
            if(vm.signupSuccess){
                vm.showSignIn = false;
                vm.showSigningIn = false;
                vm.showSignedIn = true;
                vm.showSignUpErr = false;
                localStorage.setItem('sfkUserInfo',JSON.stringify(data));
                $state.go('app.dash');
            }else{
                vm.showSignIn = false;
                vm.showSigningIn = false;
                vm.showSignedIn = false;
                vm.showSignUpErr = true;
            }
        });
    }
    
    
}