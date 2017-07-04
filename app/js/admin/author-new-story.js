(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('authorNewStory',{
            templateUrl : 'js/admin/author-new-story.html',
            controller: authorNewStoryCtrl,
            controllerAs: 'authorNewStoryCtrl'
        });

    authorNewStoryCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function authorNewStoryCtrl($scope, $state, storyService, categoryService){
        var vm = this;

        vm.$onInit = function () {

        };
        vm.$onDestroy = function () {
        };
        var createStory = function () {
            vm.setSubmitButtonDesign(false,true,false,false);
            var reqObj = {
                categoryId: vm.categorySelected,
                storyName: vm.storyName
            }
            storyService.createStory(reqObj).then(function (data){
                if(data.storyCreated){
                    vm.storyCreated = true;
                    vm.storyId = data.storyId;
                    vm.setSubmitButtonDesign(false,false,true,false);
                }
            },function (err) {
                console.log(err);
                vm.setSubmitButtonDesign(false,false,false,true);
            });
        };
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
        //update the preview
        var updatePreview = function(){
            document.getElementById("previewStoryHere").innerHTML = tinyMCE.get('writeStoryHere').getContent();
        };
        var saveDetails = function(){

        };

        var setSubmitButtonDesign = function(a,b,c,d){
            vm.showSignIn = a;
            vm.showSigningIn = b;
            vm.showSignedIn = c;
            vm.showSignInErr = d;
        }
        vm.setSubmitButtonDesign = setSubmitButtonDesign;

        vm.getCategoryList = getCategoryList;
        vm.changeCategory = changeCategory;
        vm.saveDetails = saveDetails;
        vm.updatePreview = updatePreview;
        vm.createStory = createStory;

        vm.getCategoryList();
        vm.setSubmitButtonDesign(true,false,false,false);
    }
}(angular));

