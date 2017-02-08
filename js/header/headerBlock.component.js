angular.module('storiesApp')
.component('headerBlock',{
      restrict:'AE',
        templateUrl:'js/header/header.html',
        controller: headerCtrl
});

headerCtrl.$inject = ['$scope','$state','$timeout'];
function headerCtrl($scope,$state, $timeout){
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
    //registering clicks to hide dropdowns
    var everywhere = angular.element(window.document);
    var isSearchAreaClicked,isSearchIconClicked;
    everywhere.bind('click', function(event) {
        //for search area
        isSearchAreaClicked = event.target.className == 'header-search-results' || event.target.className.indexOf('header-search-input') >= 0;
        isSearchIconClicked = event.target.className == 'headerSearchAnchor' || event.target.className.indexOf('fa-search') >= 0;
        //if search area open and clicked elsewhere
        console.log(isSearchAreaClicked,isSearchIconClicked);
        /*if(vm.showSearchBox && !isSearchAreaClicked){
            vm.showSearchBox = false;
        }
        if(vm.showSearchBox && isSearchIconClicked){
            vm.showSearchBox = false;
        }
        if(!vm.showSearchBox && isSearchIconClicked){
            vm.showSearchBox = true;
        }*/
        if(isSearchIconClicked){
            if(vm.showSearchBox){
                $scope.$apply(function(){
                    vm.showSearchBox = false;
                });
            }else{
                $scope.$apply(function(){
                    vm.showSearchBox = true;
                });
            }
        }else{
            if(isSearchAreaClicked){
                if(vm.showSearchBox){
                    $scope.$apply(function(){
                        vm.showSearchBox = true;
                    });
                }
            }else{
                $scope.$apply(function(){
                    vm.showSearchBox = false;
                });
            }
        }
    });
    vm.openLoginLightBox = openLoginLightBox;
    vm.isAuthentiactedUser = isAuthentiactedUser;
    vm.displayShortName = displayShortName;
    vm.email = userInfo.email;
    vm.name = userInfo.username;
}