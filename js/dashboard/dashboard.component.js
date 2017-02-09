(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('dashBoardMain',{
        templateUrl : 'js/dashboard/dashboard.html',
        controller: dashMainCtrl
    });
    
    dashMainCtrl.$inject = ['$scope','$state','storyService'];
    function dashMainCtrl($scope,$state,storyService){
        var vm = this;
        storyService.getStoriesList().then(function(data){
            vm.stories=data;
        });
    }
}(angular));
