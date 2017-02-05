angular.module('storiesApp')
.component('signInPage',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/signin/signin.html',
        controller: signinCtrl
});

signinCtrl.$inject = ['$state'];
function signinCtrl(){
    var vm = this;
}