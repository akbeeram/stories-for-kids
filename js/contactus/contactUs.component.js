(function(angular){
    'use strict';

    angular.module('storiesApp')
        .component('contactUs',{
            templateUrl : 'js/contactus/contact-us.html',
            controller: contactUsCtrl
        });

    contactUsCtrl.$inject = ['$scope','$state','authService','categoryService'];
    function contactUsCtrl($scope, $state, authService, categoryService){
        var vm = this;
        var routerState = $state;
        var submitComment = function(){
            console.log(vm.contact);
            var cmntInfo={
                email:vm.contact.email,
                name:vm.contact.name,
                comments:vm.contact.comments
            }
            authService.submitComments(cmntInfo).then(function(data){
                vm.commentSubmitResult = data && data.commentSubmitted ? true : false;
            });
        }

        vm.routerState = routerState;
        vm.submitComment = submitComment;
    }
}(angular));

