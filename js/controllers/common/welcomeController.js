(function(angular){
   'use strict';

    angular.module('welcomeModule',['directiveModule','CategoriesService'])
        .controller('welcomeController',function($scope,categoryService){
        categoryService.getCategories().then(function(data){
            console.log(data);
            $scope.storyCategory=data
        });
        
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
