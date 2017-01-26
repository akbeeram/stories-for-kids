(function(angular){
    'use strict';

    angular.module('directiveModule',[])
        .directive('singleTile',function(){
            return {
              restrict:'AEC',
                scope:{
                    storyTitle:'='
                },
                templateUrl:'partials/common/single-tile.html',
                controller:function($scope){
                    
                },
                link:function(scope,ele,attrs){
                }
            };
        });
}(angular));