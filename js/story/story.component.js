angular.module('storiesApp')
.component('storyComponent',{
        bindings: {
            config: '='
        },
        templateUrl : 'js/story/story.html',
        controller: storyComponentCtrl,
        controllerAs: 'storyCtrl'
});

storyComponentCtrl.$inject = ['$scope','$state','$timeout','storyService'];
function storyComponentCtrl($scope, $state, $timeout,storyService){
    var vm = this;
    var routerState = $state;
    vm.$onInit = function() {
        init();
    };

    var init = function(){
        vm.showLoadingDiv = true;
        var reqObj = {
            storyId:vm.config.story_id
        };
        storyService.getStory(reqObj)
            .then(function(data){
                vm.showLoadingDiv = false;
                vm.story = data.story;
            });
    }
}