angular.module('storiesApp')
.component('singleTile',{
        templateUrl:'js/singleTile/single-tile.html',
        controller: singleTileCtrl
});

singleTileCtrl.$inject = ['$state'];
function singleTileCtrl(){
    var vm = this;
}