angular.module('adminModule',[])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('app.take-control.author-dash',{
                url:'/author',
                template:'<author-module />',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            })
            .state('app.take-control.author-dash.author-new-story',{
                url:'/new-story',
                template:'<author-new-story />',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            })
            .state('app.take-control.author-dash.author-edit-story',{
                url:'/edit-story',
                template:'<author-edit-story />',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            });
    });