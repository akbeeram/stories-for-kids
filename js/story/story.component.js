angular.module('storiesApp')
.component('storyComponent',{
      restrict:'AE',
        bindings: {
            config: '='
        },
        template:'<ng-include src="$ctrl.getTemplateUrl()"/>',
        controller: storyComponentCtrl
});

storyComponentCtrl.$inject = ['$scope','$state','$timeout'];
function storyComponentCtrl($scope, $state, $timeout){
    var vm = this;
    vm.getTemplateUrl = function(){
        console.log(vm.config);
        return 'js/stories/panchatantra/'+vm.config.story_html_name+'.html';
    }
}