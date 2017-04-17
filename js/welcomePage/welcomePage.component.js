(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('welcomePage',{
        templateUrl : 'js/welcomePage/welcome.html',
        controller: welcomeCtrl
    });
    
    welcomeCtrl.$inject = ['$scope','$state','categoryService','authService','localStorageService','APP_CONSTANTS'];
    function welcomeCtrl($scope,$state,categoryService,authService,localStorageService,APP_CONSTANTS){
        var vm = this;
        var isAuthenticatedUser = false;
        var userInfo = localStorageService.getUserAuthInfo();
        //is user valid : is set here
        isAuthenticatedUser = userInfo && userInfo.isAuthenticatedUser ? true : false;
        //to get category list for welcomepage
        var getCategoryList = function() {
            categoryService.getCategories().then(function(data){
                vm.storyCategory=data
            });
        }
        //when user clicks on a tile in welcome page
        var onTileClick = function(item){
            //if user is valid, load dash page with the same tile he selects
            //if(vm.isAuthenticatedUser){
                var story = {
                    story_cat_id:item.categoryId
                }
                //in dash, we load the current dategory from localstorage
                localStorageService.setCurrentStory(story);
                $state.go('app.dash');
            //}else{
                //vm.showLoginForm = true;   
            //}
        }

        vm.constants = APP_CONSTANTS.WELCOME_PAGE;
        vm.getCategoryList = getCategoryList;
        vm.onTileClick = onTileClick;
        vm.isAuthenticatedUser = isAuthenticatedUser;
        vm.getCategoryList();
    }
}(angular));
