angular.module('storiesApp')
.component('readerPane',{
      restrict:'AE',
        templateUrl:'js/reader/reader.html',
        controller: readerPaneCtrl
});

readerPaneCtrl.$inject = ['$scope','$state','$stateParams','storyService'];
function readerPaneCtrl($scope, $state, $stateParams, storyService){
    var vm = this;
    var currStory = null;
    if(localStorage.getItem('currStory')){
        currStory = JSON.parse(localStorage.getItem('currStory'));
    }
    goBackToDash = function(){
        $state.go('app.dash');
    }
    
    
    
    vm.goBackToDash = goBackToDash;
    vm.config = currStory;
}