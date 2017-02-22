angular.module('storiesApp')
.component('readerPane',{
      restrict:'AE',
        templateUrl:'js/reader/reader.html',
        controller: readerPaneCtrl
});

readerPaneCtrl.$inject = ['$scope','$state','localStorageService','storyService'];
function readerPaneCtrl($scope, $state, localStorageService, storyService){
    var vm = this;
    var currStory = localStorageService.getCurrentStory();

    goBackToDash = function(){
        $state.go('app.dash');
    }
    
    vm.goBackToDash = goBackToDash;
    vm.config = currStory;
}