(function(angular){
   'use strict';

    angular.module('storiesApp')
    .component('welcomePage',{
        templateUrl : 'js/welcomePage/welcome.html',
        controller: welcomeCtrl
    });
    
    welcomeCtrl.$inject = ['$scope','$state','categoryService'];
    function welcomeCtrl($scope,$state,categoryService){
        var vm = this;
        categoryService.getCategories().then(function(data){
            vm.storyCategory=data
        });

        vm.onTileClick = function(){
            vm.showLoginForm = true;
        }
    }
}(angular));
