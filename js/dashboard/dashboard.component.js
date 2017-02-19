(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('dashBoardMain',{
        templateUrl : 'js/dashboard/dashboard.html',
        controller: dashMainCtrl
    });
    
    dashMainCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function dashMainCtrl($scope, $state, storyService, categoryService){
        var vm = this;
        var categorySelected;
        var routerState = $state;

        //if user is navigating from reader page back to dashboard
        //er-select the story
        if(localStorage.getItem('currStory')){
            var story = JSON.parse(localStorage.getItem('currStory'));
            categorySelected = story.story_cat_id;
        } else {
          //if user is coming to dash page for first time  
            categorySelected = 'CG001';
        }
        
        
        //called when user selects or changes the category dropdown
        var changeCategory = function(){
            if(vm.categorySelected){
                vm.getStoriesList(vm.categorySelected);
            }
        }
        //called first time when controller loads to get data
        //to get all the sotires for a category
        var getStoriesList = function(catCode){
            storyService.getStoriesList(catCode).then(function(stories_data){
                vm.dash= vm.dash || {};               
                categoryService.getCategoryInfo(catCode).then(function(cat_data){
                    vm.dash.storyData=stories_data;
                    vm.dash.categoryData=cat_data; 
                });
            });
        }
        //when user selects astory,story is persisted in localstorage
        //and user is navigated to reader page
        var openStory = function(story){
            localStorage.setItem('currStory',JSON.stringify(story));
            $state.go('app.read',{
                htmlPage: story.story_html_name
            });
        }
        var getCategoryList = function (){
            categoryService.getCategories().then(function(catListdata){
                vm.dash= vm.dash || {};
                vm.dash.categoryList=catListdata;
            });
        }
        
        //set controller level variable to acces in view
        vm.categorySelected = categorySelected;
        vm.openStory = openStory;
        vm.categorySelected = categorySelected;
        vm.changeCategory = changeCategory;
        vm.getStoriesList = getStoriesList;
        vm.getCategoryList = getCategoryList;
        vm.routerState = routerState;
        
        vm.getCategoryList();
        vm.getStoriesList(vm.categorySelected);
    }
    
    
}(angular));
