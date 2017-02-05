angular.module('storiesApp')
.component('headerBlock',{
      restrict:'AE',
        templateUrl:'js/header/header.html',
        controller: headerCtrl
});

headerCtrl.$inject = ['$state','$timeout'];
function headerCtrl($state, $timeout){
    var vm = this;
    var isAuthentiactedUser = false;
    var displayShortName = '';
    var userInfo;
    if(localStorage.getItem('userInfo')){
        userInfo = JSON.parse(localStorage.getItem('userInfo'));
        isAuthentiactedUser = userInfo.isAuthentiactedUser ? true : false;
        //set short name abbreviation
        if(userInfo.username.indexOf(' ') >= 0){
            var temp = userInfo.username.split(' ');
            displayShortName = temp[0].charAt(0) + temp[1].charAt(0);
        } else {
            displayShortName = userInfo.username.slice(0,2);
        } 
    }
    openLoginLightBox = function(){
        vm.showLoginForm = true;
    }
    
    
    vm.openLoginLightBox = openLoginLightBox;
    vm.isAuthentiactedUser = isAuthentiactedUser;
    vm.displayShortName = displayShortName;
    vm.email = userInfo.email;
    vm.name = userInfo.username;
}