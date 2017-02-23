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
    var templateUrl = '';
    vm.getTemplateUrl = function(){
        //console.log(vm.config);
        if(vm.config && vm.config.story_cat_id){
            switch (vm.config.story_cat_id) {
                case 'CG001':
                    templateUrl = 'js/stories/panchatantra/'+vm.config.story_html_name+'.html';
                    break;
                case 'CG003':
                    templateUrl = 'js/stories/tenali-raman/'+vm.config.story_html_name+'.html';
                    break;
                case 'CG005':
                    templateUrl = 'js/stories/vikram-baethal/'+vm.config.story_html_name+'.html';
                    break;
            }
        }
        return templateUrl;
    }
}