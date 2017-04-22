(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('authorEditStory',{
            bindings:{
                category:'=?',
                story:'=?'
            },
            templateUrl : 'js/admin/author-edit-story.html',
            controller: authorEditStoryCtrl,
            controllerAs: 'authorEditStoryCtrl'
        });

    authorEditStoryCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function authorEditStoryCtrl($scope, $state, storyService, categoryService){
        var vm = this;
        var routerState = $state;
        vm.showEditor = false;
        vm.showEditSuccessMsg = false;
        vm.showEditFailureMsg = false;
        /*
        This function is to populate the categories in the first select dropdown
         */
        var getCategoryList = function (){
            categoryService.getCategories().then(function(catListdata){
                vm.categoryList=catListdata;
            });
        };
        var hideUpdatedMsg = function () {
            vm.showEditSuccessMsg = vm.showEditSuccessMsg ? false : false;
            vm.showEditFailureMsg = vm.showEditFailureMsg ? false : false;
        };
        var changeCategory = function(story){
            vm.hideUpdatedMsg();
            vm.selectedStory = null;
            storyService.getStoriesList(vm.categorySelected).then(function(stories_data){
                vm.storyList=stories_data;
                if(story){
                    //to preselect
                    vm.selectedStory = story;
                    vm.loadStory();
                }
            });
        };
        var loadStory = function () {
            vm.hideUpdatedMsg();
            vm.initEditor();
            var len = vm.storyList.length;
            for(var i=0;i<len;i++){
                if(vm.storyList[i].story_id == vm.selectedStory){
                    vm.storyName = vm.storyList[i].story_name;
                    break;
                }
            }
            var reqObj = {
                storyId:vm.selectedStory
            };
            storyService.getStory(reqObj)
                .then(function(data){
                    vm.story = data.story;
                    vm.showEditor = true;
                    tinyMCE.get('writeStoryHere')
                        .setContent(data.story);
                    vm.updatePreview();
                });
        };
        //update the preview
        var updatePreview = function(){
            document.getElementById("previewStoryHere").innerHTML = tinyMCE.get('writeStoryHere').getContent();
        };
        var initEditor = function () {
            vm.showEditor = true;
                //tiny mce author block
            tinymce.init({
                height:350,
                selector:'#writeStoryHere',
                plugins: [
                    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
                    "searchreplace wordcount visualblocks visualchars code fullscreen",
                    "insertdatetime media nonbreaking save table contextmenu directionality",
                    "emoticons template paste textcolor colorpicker wordcount"
                ],
                toolbar1: 'undo redo | insert | styleselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
                toolbar2: 'link image code | visualchars save',
                save_onsavecallback: function () {
                    if(vm.storyName){
                        var reqObj={
                            storyId:vm.selectedStory,
                            storyName:vm.storyName,
                            story:tinyMCE.get('writeStoryHere').getContent()
                        };
                        storyService.updateStory(reqObj)
                            .then(function(data){
                                vm.showEditSuccessMsg = data.storyUpdated ? true : false;
                                vm.showEditFailureMsg = !data.storyUpdated ? true : false;
                            },function () {
                                vm.showEditSuccessMsg = false;
                                vm.showEditFailureMsg = true;
                            });
                    }
                },
                content_css: 'js/story/story.css',
                setup: function (editor) {
                    editor.on('init',function(e){
                        tinyMCE.get('writeStoryHere')
                            .setContent('<div class="story"><p>'+  tinyMCE.get('writeStoryHere').getContent() + '</p></div>');
                        vm.updatePreview();
                    });
                    editor.on('keyup blur paste', function (e) {
                        vm.updatePreview();
                        //once success modal is implemented below line is not needed here
                        // vm.hideUpdatedMsg();
                    });
                }
            });
        };
        vm.$onInit = function () {
            if(vm.category){
                vm.categorySelected = vm.category;
                vm.changeCategory(vm.story);
                // vm.selectedStory = vm.story;
            }
        };
        vm.$onDestroy = function () {
            tinymce.remove();
        };

        vm.routerState = routerState;
        vm.updatePreview = updatePreview;
        vm.initEditor = initEditor;
        vm.getCategoryList = getCategoryList;
        vm.hideUpdatedMsg = hideUpdatedMsg;
        vm.loadStory = loadStory;
        vm.changeCategory = changeCategory;

        vm.getCategoryList();
    }
}(angular));

