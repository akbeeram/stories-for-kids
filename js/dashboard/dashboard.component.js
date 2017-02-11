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
        var categorySelected = 'CG001';
        var changeCategory = function(){
            if(vm.categorySelected){
                vm.getStories(vm.categorySelected);
            }
        }
        var getStories = function(catCode){
            storyService.getStoriesList(catCode).then(function(data){
                vm.storyData=data;
            });
        }
        vm.categorySelected = categorySelected;
        vm.changeCategory = changeCategory;
        vm.getStories = getStories;
        vm.getStories(vm.categorySelected);
    }
    
    
}(angular));
