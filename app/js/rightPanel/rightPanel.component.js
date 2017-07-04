angular.module('storiesApp')
.component('rightPanel',{
      restrict:'AE',
        templateUrl:'js/rightPanel/rightPanel.html',
        controller: rightPanelCtrl
});

rightPanelCtrl.$inject = ['$scope','$state','$timeout'];
function rightPanelCtrl($state, $timeout){
    var vm = this;
}