angular.module('storiesApp')
.component('signUpPage',{
        templateUrl:'js/signup/signup.html',
        controller: signupCtrl
});

signupCtrl.$inject = ['$scope','$state','authService','localStorageService'];
function signupCtrl($scope,$state,authService,localStorageService){
    var vm = this;

    setSubmitButtonDesign = function(a,b,c,d){
        vm.showSignIn = a;
        vm.showSigningIn = b;
        vm.showSignedIn = c;
        vm.showSignUpErr = d;
    }
    vm.setSubmitButtonDesign = setSubmitButtonDesign;

    vm.setSubmitButtonDesign(true,false,false,false);
    
    isUserUnique = function(){
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
    
    createUser = function(){
        vm.setSubmitButtonDesign(false,true,false,false);
        vm.signupData.call = 'createUser';
        authService.createUser(vm.signupData).then(function(data){
            vm.signupSuccess = data && data.registerStatus ? true : false;
            if(vm.signupSuccess){
                vm.setSubmitButtonDesign(false,false,true,false);
                localStorageService.setUserAuthInfo(data);
                $state.go('app.dash');
            }else{
                vm.setSubmitButtonDesign(false,false,false,true);
            }
        });
    }
    
    vm.createUser = createUser;
    vm.isUserUnique = isUserUnique;
}