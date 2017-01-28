(function(angular){
   'use strict';

    angular.module('welcomeModule',['directiveModule'])
        .controller('welcomeController',function($scope){
            $scope.storyCategory=['A','B','C','D','E','F','G','H','I','J'];
        
            $scope.openLoginLightBox=function(){
                //if user logged in take them to dashboard
                //if user not logged in show login light box
                $scope.showLoginForm = true;
                $scope.$broadcast('showLoginFormEvent', {
                  showLoginForm: true 
                });
            }
        });
}(angular));