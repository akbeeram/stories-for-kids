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
                    var reqObj={
                        story:tinyMCE.get('writeStoryHere').getContent()
                    };
                    storyService.updateStory(reqObj)
                        .then(function(data){
                            console.log('success');
                        });
                },
                content_css: 'js/story/story.css',
                setup: function (editor) {
                    editor.on('init',function(e){
                        tinyMCE.get('writeStoryHere')
                            .setContent('<div class="story"><p>'+  tinyMCE.get('writeStoryHere').getContent() + '</p></div>');
                        vm.updatePreview();
                    });
                    editor.on('keyup blur', function (e) {
                        vm.updatePreview();
                    });
                }
            });
        };
        vm.$onDestroy = function () {
            tinymce.remove();
        };
    }
}(angular));

