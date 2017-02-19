(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('contactUs',{
            templateUrl : 'js/contactus/contact-us.html',
            controller: contactUsCtrl
        });

    contactUsCtrl.$inject = ['$scope','$state','storyService','categoryService'];
    function contactUsCtrl($scope, $state, storyService, categoryService){
        var vm = this;
        var routerState = $state;
        var submitComment = function(){
            console.log(vm.contact);
        }

        vm.routerState = routerState;
        vm.submitComment = submitComment;
    }
}(angular));

