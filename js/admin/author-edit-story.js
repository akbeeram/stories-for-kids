(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('authorEditStory',{
            templateUrl : 'js/admin/author-edit-story.html',
            controller: authorEditStoryCtrl,
            controllerAs: 'authorEditStoryCtrl'
        });

    authorEditStoryCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function authorEditStoryCtrl($scope, $state, storyService, categoryService){
        var vm = this;
        vm.showEditor = true;

        var getCategoryList = function (){
            categoryService.getCategories().then(function(catListdata){
                vm.categoryList=catListdata;
            });
        };
        var hideUpdatedMsg = function () {
            if(vm.storyUpdated){
                //reset success message
                vm.storyUpdated = false;
            }
            if(vm.storyUpdatedErr && !vm.storyUpdated){
                //reset error message
                vm.storyUpdatedErr = false;
            }
        };
        var changeCategory = function(){
            hideUpdatedMsg();
            vm.selectedStory = null;
            // vm.storyUpdated = false;
            storyService.getStoriesList(vm.categorySelected).then(function(stories_data){
                vm.storyList=stories_data;
            });
        };
        var loadStory = function () {
            hideUpdatedMsg();
            // vm.storyUpdated = false;
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
        }

        vm.$onInit = function () {
            //tiny mce author block
            tinymce.init({
                height:300,
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
                                // vm.categorySelected = null;
                                // vm.selectedStory = null;
                                vm.storyUpdated = data.storyUpdated;
                                vm.storyUpdatedErr = vm.storyUpdated ? false : true;
                                // vm.showEditor = false;
                            },function () {
                                vm.storyUpdatedErr = true;
                                vm.storyUpdated = false;
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
                    });
                }
            });
        };
        vm.$onDestroy = function () {
            tinymce.remove();
        };

        vm.updatePreview = updatePreview;


        getCategoryList();

        vm.loadStory = loadStory;
        vm.changeCategory = changeCategory;

    }
}(angular));

