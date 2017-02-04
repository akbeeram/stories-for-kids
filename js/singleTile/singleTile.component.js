angular.module('storiesApp')
.component('singleTile',{
      restrict:'AE',
        bindings:{
            storyDetails:'<'
        },
        templateUrl:'js/singleTile/single-tile.html',
        controller: singleTileCtrl
});

singleTileCtrl.$inject = ['$state'];
function singleTileCtrl(){
    var vm = this;
    function onTileClick() {
        alert('a');
    }

    function openLoginLightBox(){
        //if user logged in take them to dashboard
        //if user not logged in show login light box
        $scope.showLoginForm = true;
        $scope.$broadcast('showLoginFormEvent', {
          showLoginForm: true 
        });
    }
    //Assign all functions and variable to vm
    vm.onTileClick = onTileClick;
    vm.openLoginLightBox = openLoginLightBox;
}