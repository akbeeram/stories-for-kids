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
        //to get category list for welcomepage
        var getCategoryList = function() {
            categoryService.getCategories().then(function(data){
                vm.storyCategory=data
            });
        }

        var onTileClick = function(catCode){
            vm.showLoginForm = true;
        }
        
        
        vm.getCategoryList = getCategoryList;
        vm.onTileClick = onTileClick;
        
        vm.getCategoryList();
    }
}(angular));
