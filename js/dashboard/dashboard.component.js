(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('dashBoardMain',{
        templateUrl : 'js/dashboard/dashboard.html',
        controller: dashMainCtrl
    });
    
    dashMainCtrl.$inject = ['$scope','$state','storyService'];
    function dashMainCtrl($scope,$state,storyService){
        var vm = this;
        var categorySelected;
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
                vm.getStories(vm.categorySelected);
            }
        }
        //to get all the sotires for a category
        var getStories = function(catCode){
            storyService.getStoriesList(catCode).then(function(data){
                vm.storyData=data;
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
        
        
        //set controller level variable to acces in view
        vm.categorySelected = categorySelected;
        vm.openStory = openStory;
        vm.categorySelected = categorySelected;
        vm.changeCategory = changeCategory;
        vm.getStories = getStories;
        vm.getStories(vm.categorySelected);
    }
    
    
}(angular));
