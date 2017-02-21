angular.module('dashboardModule',[])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('app.dash',{
                url:'/dashboard',
                template:'<dash-board-main />',
                controller:function($scope,$state){

                }
            })
            .state('app.read',{
                url:'/read/:htmlPage',
                template:'<reader-pane />',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            })
            .state('app.take-control',{
                url:'/admin',
                template:'<ui-view/>',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            })
    });