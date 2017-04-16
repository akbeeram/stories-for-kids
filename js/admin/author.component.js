(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('authorModule',{
            templateUrl : 'js/admin/author.html',
            controller: authorCtrl
        });

    authorCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function authorCtrl($scope, $state, storyService, categoryService){
        var vm = this;
        var routerState = $state;
        var editStory = function(){
            console.log('editStory');
        }
        var newStory = function(){
            console.log('newStory');
        }
        vm.routerState = routerState;

        var getCategoryList = function (){
            categoryService.getCategories().then(function(catListdata){
                vm.categoryList=catListdata;
            });
        };
        var changeCategory = function(){
            storyService.getStoriesList(vm.categorySelected).then(function(stories_data){
                vm.storyList=stories_data;
            });
        };
        var loadStory = function () {
            var reqObj = {
                storyId:vm.selectedStory
            };
            storyService.getStory(reqObj)
                .then(function(data){
                    vm.story = data.story;
                    tinyMCE.get('writeStoryHere')
                        .setContent(data.story);
                    vm.updatePreview();
                });
        };
        //update the preview
        var updatePreview = function(){
            document.getElementById("previewStoryHere").innerHTML = tinyMCE.get('writeStoryHere').getContent();
        }
        vm.updatePreview = updatePreview;


        getCategoryList();

        vm.loadStory = loadStory;
        vm.changeCategory = changeCategory;
        vm.editStory = editStory;
        vm.newStory = newStory;


    }
}(angular));

