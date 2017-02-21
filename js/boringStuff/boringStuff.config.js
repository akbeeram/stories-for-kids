angular.module('boringStuff',[])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('boring-stuff.privacy',{
            url:'/privacy',
            templateUrl:'js/boringStuff/privacy-policy.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('boring-stuff.disclaimer',{
            url:'/disclaimer',
            templateUrl:'js/boringStuff/disclaimer.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('boring-stuff.terms-of-use',{
            url:'/terms-of-use',
            templateUrl:'js/boringStuff/terms-of-use.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('boring-stuff.site-map', {
            url: '/site-map',
            templateUrl: 'js/boringStuff/site-map.html',
            controller: function ($scope, $state, $stateParams) {
                //console.log($stateParams);
            }
        })
    });