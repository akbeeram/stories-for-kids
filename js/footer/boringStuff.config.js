angular.module('boringStuff',[])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
            .state('app.boring-stuff.privacy',{
            url:'/privacy',
            templateUrl:'partials/common/boring-stuff/privacy-policy.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('app.boring-stuff.disclaimer',{
            url:'/disclaimer',
            templateUrl:'partials/common/boring-stuff/disclaimer.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('app.boring-stuff.terms-of-use',{
            url:'/terms-of-use',
            templateUrl:'partials/common/boring-stuff/terms-of-use.html',
            controller:function($scope,$state,$stateParams){
                //console.log($stateParams);
            }
        }).state('app.boring-stuff.site-map', {
            url: '/site-map',
            templateUrl: 'partials/common/boring-stuff/site-map.html',
            controller: function ($scope, $state, $stateParams) {
                //console.log($stateParams);
            }
        })
    });