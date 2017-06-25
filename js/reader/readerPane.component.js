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
    vm.ngihtMode = false;
    goBackToDash = function(){
        $state.go('app.dash');
    }
    
    $scope.$on('$includeContentLoaded', function(event, templateUrl){
      //console.log(event);  //this $includeContentLoaded event object
      //console.log(templateUrl); //path to the included resource, 'snippet.html' in this case
        vm.showLoadingDiv = false;
    });
    
    vm.showLoadingDiv = false;
    vm.goBackToDash = goBackToDash;
    vm.config = currStory;
}