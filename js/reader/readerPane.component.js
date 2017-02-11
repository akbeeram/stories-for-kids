angular.module('storiesApp')
.component('readerPane',{
      restrict:'AE',
        templateUrl:'js/reader/reader.html',
        controller: readerPaneCtrl
});

readerPaneCtrl.$inject = ['$scope','$state','$stateParams'];
function readerPaneCtrl($state, $stateParams){
    var vm = this;
    console.log($stateParams);
}