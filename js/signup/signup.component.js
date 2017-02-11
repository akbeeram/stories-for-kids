angular.module('storiesApp')
.component('signUpPage',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/signup/signup.html',
        controller: signupCtrl
});

signupCtrl.$inject = ['$state'];
function signupCtrl(){
    var vm = this;
}