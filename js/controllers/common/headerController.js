(function(angular){
   'use strict';

    angular.module('headerModule',['filtersModule','directiveModule'])
        .controller('headerController',function($scope,$timeout,$window){
        if(localStorage.getItem('userInfo')){
        }
            $scope.openLoginLightBox=function(){
                $scope.showLoginForm = true;
                $scope.$broadcast('showLoginFormEvent', {
                  showLoginForm: true // send whatever you want
                });
            }
        });
}(angular));