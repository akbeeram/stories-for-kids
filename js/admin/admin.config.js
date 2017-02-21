angular.module('adminModule',[])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('app.take-control.submit-a-story',{
                url:'/author',
                template:'<author-module />',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            });
    });