(function(angular){
   'use strict';

    angular.module('welcomeModule',['directiveModule'])
        .controller('welcomeController',function($scope){
            $scope.storyCategory=['A','B','C','D','E','F','G','H','I','J'];
        });
}(angular));