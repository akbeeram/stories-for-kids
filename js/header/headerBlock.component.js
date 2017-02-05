angular.module('storiesApp')
.component('headerBlock',{
      restrict:'AE',
        templateUrl:'js/header/header.html',
        controller: headerCtrl
});

headerCtrl.$inject = ['$state','$timeout'];
function headerCtrl($state, $timeout){
    var vm = this;
    if(localStorage.getItem('userInfo')){
        }
    vm.openLoginLightBox=function(){
        vm.showLoginForm = true;
    }
}