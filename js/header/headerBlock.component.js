angular.module('storiesApp')
.component('headerBlock',{
      restrict:'AE',
        templateUrl:'js/header/header.html',
        controller: headerCtrl
});

headerCtrl.$inject = ['$scope','$state','authService','localStorageService','APP_CONSTANTS'];
function headerCtrl($scope,$state, authService, localStorageService,APP_CONSTANTS){
    var vm = this;
    var isAuthenticatedUser = false;
    var displayShortName = '';
    var userInfo = localStorageService.getUserAuthInfo();
    //authentication is happending in header automatically
    //this is a temp fix
    if(userInfo){
        isAuthenticatedUser = userInfo.isAuthenticatedUser ? true : false;
        //set short name abbreviation
        if(isAuthenticatedUser){
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
        //the next line is to avoid authentication to routes that dont need authentication
        //in futue refine this logicby adding a all routes to constants that dont need login
        if($state.current.name !== 'welcome' && $state.current.name.indexOf('boring')<0 && $state.current.name !== 'contact-us'){
            $state.go('login');
        }
    }
    openLoginLightBox = function(){
        vm.showLoginForm = true;
    }
    logoutUser = function(){
        //need to improve this logic
        //when user clciks on logout & there is not data in localstorage, they y check for data at
        var userInfo = localStorageService.getUserAuthInfo();
        if(userInfo){
            authService.logoutUser(userInfo).then(function(data){
                if(data.logoutSuccess){
                    $state.go('welcome');
                    localStorageService.logoutUser();
                }else{
                    //error with logout
                    //show user the error message
                }
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
        //if search area open and clicked elsewhere

        //start of info box click handle
        var isUserCircleClicked = event.target.className.indexOf('circle-click')>=0 ? true : false;
        var isUserInfoClicked = event.target.className.indexOf('click-identifier')>=0 ||
        (event.target.parent && event.target.parent.className.indexOf('click-identifier')>=0) ? true : false;
        vm.showUserInfoBox = isUserCircleClicked ? !vm.showUserInfoBox :    isUserInfoClicked ? true : false;
        //end of info box click handle

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
    vm.constants = APP_CONSTANTS.MAIN_HEADER;
    vm.isAuthenticatedUser = isAuthenticatedUser;
    vm.openLoginLightBox = openLoginLightBox;
    vm.logoutUser = logoutUser;
}