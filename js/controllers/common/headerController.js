(function(angular){
   'use strict';

    angular.module('headerModule',['filtersModule','directiveModule'])
        .controller('headerController',function($scope,$timeout){
            $scope.openLoginLightBox=function(){
                $scope.showLoginForm = true;
                $scope.$broadcast('showLoginFormEvent', {
                  showLoginForm: true // send whatever you want
                });
            }
        });
}(angular));