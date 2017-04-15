angular.module('storiesApp')
.component('storyComponent',{
      restrict:'AE',
        bindings: {
            config: '='
        },
        // template:'<ng-include src="$ctrl.getTemplateUrl()"/>',
        // template: '<div>{{storyComponentCtrl.story}}</div>',
        templateUrl : 'js/story/story.html',
        controller: storyComponentCtrl,
        controllerAs: 'storyComponentCtrl'
});

storyComponentCtrl.$inject = ['$scope','$state','$timeout','storyService'];
function storyComponentCtrl($scope, $state, $timeout,storyService){
    var vm = this;
    var templateUrl = '';
    var reqObj = {
        storyId:'ST0001'
    };
    storyService.getStory(reqObj)
        .then(function(data){
            vm.story = data.story;
        });
    vm.getTemplateUrl = function(){
        //console.log(vm.config);
        if(vm.config && vm.config.story_cat_id){
            // switch (vm.config.story_cat_id) {
            //     case 'CG001':
            //         templateUrl = 'js/stories/panchatantra/'+vm.config.story_html_name+'.html';
            //         break;
            //     case 'CG002':
            //         templateUrl = 'js/stories/sindbad-the-sailor/'+vm.config.story_html_name+'.html';
            //         break;
            //     case 'CG003':
            //         templateUrl = 'js/stories/tenali-raman/'+vm.config.story_html_name+'.html';
            //         break;
            //     case 'CG004':
            //         templateUrl = 'js/stories/akbar-birbal/'+vm.config.story_html_name+'.html';
            //         break;
            //     case 'CG005':
            //         templateUrl = 'js/stories/vikram-baethal/'+vm.config.story_html_name+'.html';
            //         break;
            //     case 'CG006':
            //         templateUrl = "js/stories/aesops-fables/"+vm.config.story_html_name+".html";
            //         break;
            //     case 'CG007':
            //         templateUrl = "js/stories/grimm-fairy-tales/"+vm.config.story_html_name+".html";
            //         break;
            //     case 'CG008':
            //         templateUrl = "js/stories/jataka-tales/"+vm.config.story_html_name+".html";
            //         break;
            //     case 'CG009':
            //         templateUrl = "js/stories/arabian-nights/"+vm.config.story_html_name+".html";
            //         break;
            // }
        }
        return templateUrl;
    }
}