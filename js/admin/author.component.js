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

        vm.routerState = routerState;
        //update the preview
        var updatePreview = function(){
            document.getElementById("previewStoryHere").innerHTML = tinyMCE.get('writeStoryHere').getContent();
        }
        vm.updatePreview = updatePreview;

        //tiny mce author block
        tinymce.init({
            height:300,
            selector:'#writeStoryHere',
            plugins: [
                'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table contextmenu paste code textcolor colorpicker save visualchars wordcount'
            ],
            toolbar1: 'undo redo | insert | styleselect | bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent',
            toolbar2: 'link image code | visualchars save',
            save_onsavecallback: function () {
                console.log(tinyMCE.get('writeStoryHere').getContent());
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



    }
}(angular));

