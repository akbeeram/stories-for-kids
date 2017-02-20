angular.module('storiesApp')
.component('headerBlock',{
      restrict:'AE',
        templateUrl:'js/header/header.html',
        controller: headerCtrl
});

headerCtrl.$inject = ['$scope','$state','authService'];
function headerCtrl($scope,$state, authService){
    var vm = this;
    var isAuthenticatedUser = false;
    var displayShortName = '';
    var sfkUserInfo;
    if(localStorage.getItem('sfkUserInfo')){
        userInfo = JSON.parse(localStorage.getItem('sfkUserInfo'));
        isAuthenticatedUser = userInfo.isAuthenticatedUser ? true : false;
        //set short name abbreviation
        if(userInfo.isAuthenticatedUser){
            if(userInfo.username.indexOf(' ') >= 0){
                var temp = userInfo.username.split(' ');
                displayShortName = temp[0].charAt(0) + temp[1].charAt(0);
            } else {
                displayShortName = userInfo.username.slice(0,2);
            } 
            vm.displayShortName = displayShortName;
            vm.email = userInfo.email || '';
            vm.name = userInfo.username || ''; 
        }else{
        //temporary fix for authentication for other routes
        if($state.current.name !== 'welcome'){
            $state.go('login');
        }
    }
    }else{
        //temporary fix for authentication for other routes
        if($state.current.name !== 'welcome'){
            $state.go('login');
        }
    }
    openLoginLightBox = function(){
        vm.showLoginForm = true;
    }
    logoutUser = function(){
        if(localStorage.getItem('sfkUserInfo')){
            userInfo = JSON.parse(localStorage.getItem('sfkUserInfo'));
            authService.logoutUser(userInfo).then(function(data){
                if(data.logoutSuccess){
                    $state.go('welcome');
                    localStorage.removeItem('sfkUserInfo');
                    localStorage.removeItem('currStory');
                }
                //needs an else block here
            });
        }else{
            $state.go('welcome');
        }
    }
    //registering clicks to hide dropdowns
    var everywhere = angular.element(window.document);
    var isSearchAreaClicked,isSearchIconClicked,isUserInfoAreaClicked,isUserInfoClicked;
    everywhere.bind('click', function(event) {
        //for search area
        isSearchAreaClicked = event.target.className == 'header-search-results' || event.target.className.indexOf('header-search-input') >= 0;
        isSearchIconClicked = event.target.className == 'headerSearchAnchor' || event.target.className.indexOf('fa-search') >= 0;
        isUserInfoAreaClicked = event.target.className == 'header-search-results' || event.target.className.indexOf('fa-user') >= 0;
        isUserInfoIconClicked = event.target.className == 'user-info-circle' ||  event.target.className == 'user-info-name';
        //if search area open and clicked elsewhere
        //console.log(event.target.className);
        //console.log(vm.showUserInfoBox);
        
        
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
    vm.isAuthenticatedUser = isAuthenticatedUser;
    vm.openLoginLightBox = openLoginLightBox;
    vm.logoutUser = logoutUser;
}