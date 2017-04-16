angular.module('storiesApp')
.component('storyComponent',{
      restrict:'AE',
        bindings: {
            config: '='
        },
        templateUrl : 'js/story/story.html',
        controller: storyComponentCtrl,
        controllerAs: 'storyComponentCtrl'
});

storyComponentCtrl.$inject = ['$scope','$state','$timeout','storyService'];
function storyComponentCtrl($scope, $state, $timeout,storyService){
    var vm = this;
    var routerState = $state;
    vm.$onInit = function() {
        var reqObj = {
            storyId:vm.config.story_id
        };
        storyService.getStory(reqObj)
            .then(function(data){
                vm.story = data.story;
            });
    };
}