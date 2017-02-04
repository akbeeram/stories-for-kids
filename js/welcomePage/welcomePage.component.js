(function(angular){
   'use strict';

    angular.module('welcomeModule',['directiveModule','CategoriesService'])
        .controller('welcomeController',function($scope,categoryService){
        categoryService.getCategories().then(function(data){
            $scope.storyCategory=data
        });
        
            
        });
}(angular));
