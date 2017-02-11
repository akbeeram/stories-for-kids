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
    vm.showSignIn = true;
    vm.showSigningIn = false;
    vm.showSignedIn = false;
}