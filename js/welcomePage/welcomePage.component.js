(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('welcomePage',{
        templateUrl : 'js/welcomePage/welcome.html',
        controller: welcomeCtrl
    });
    
    welcomeCtrl.$inject = ['$scope','$state','categoryService','authService'];
    function welcomeCtrl($scope,$state,categoryService,authService){
        var vm = this;
        var userInfo;
        var isAuthenticatedUser = false;
        if(localStorage.getItem('sfkUserInfo')){
            userInfo = JSON.parse(localStorage.getItem('sfkUserInfo'));
            //is user valid : is set here
            isAuthenticatedUser = userInfo.isAuthenticatedUser ? true : false;
        }
        //to get category list for welcomepage
        var getCategoryList = function() {
            categoryService.getCategories().then(function(data){
                vm.storyCategory=data
            });
        }
        //when user clicks on a tile in welcome page
        var onTileClick = function(item){
            //if user is valid, load dash page with the same tile he selects
            if(vm.isAuthenticatedUser){
                var story = {
                    story_cat_id:item.categoryId
                }
                //in dash, we load the current dategory from localstorage
                localStorage.setItem('currStory',JSON.stringify(story));
                $state.go('app.dash');
            }else{
                vm.showLoginForm = true;   
            }
        }
        
        
        vm.getCategoryList = getCategoryList;
        vm.onTileClick = onTileClick;
        vm.isAuthenticatedUser = isAuthenticatedUser;
        vm.getCategoryList();
    }
}(angular));
