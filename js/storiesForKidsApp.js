(function(angular){
    'use strict';

    angular.module('storiesApp',[
        'ui.router',
        'CategoriesService',
        'AuthenticationService',
        'StoryService',
        'boringStuff',
        'adminModule',
        'dashboardModule',
        'localStorageModule'
    ])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/welcome');
        $stateProvider
            .state('welcome',{
                url:'/welcome',
                requireLogin:false,
                resolve:{
                    isUserAlreadyLoggedIn:isUserValid
                },
                template:'<welcome-page />'
            })
            .state('login',{
                url:'/login',
                template:'<login-light-box />'
            })
            .state('contact-us',{
                url:'/contact-us',
                requireLogin:false,
                template:'<contact-us />',
                controller:function($scope,$state){

                }
            })
            .state('boring-stuff',{
                url:'/boring-stuff',
                requireLogin:false,
                templateUrl : 'js/boringStuff/boring-stuff.html',
                controller:function($scope,$state,$stateParams){
                    //console.log($stateParams);
                }
            })
            .state('app',{
                url:'',
                abstract:true,
                requireLogin:true,
                resolve: {
                    isUserAlreadyLoggedIn : isUserValid
                },
                templateUrl:'js/common/main.html',
                controller: function($scope,isUserAlreadyLoggedIn){
                    //not running
                }
            });

        function isUserValid(authService, localStorageService){
            var sfkUserInfo = localStorageService.getUserAuthInfo();
            if(sfkUserInfo && sfkUserInfo.username && sfkUserInfo.accessToken){
                //check wiht DB for auth token & username
                authService.authenticateUser(sfkUserInfo.email, sfkUserInfo.accessToken)
                .then(function(data){
                    //set local storage data every time
                    localStorageService.setUserAuthInfo(data);
                    return true;
                });
            }else{
                //if no localstorage data found ??
                return false;
            }
        }
    })
        .run(function ($rootScope, $location, $window) {
            // initialise google analytics
            $window.ga('create', 'UA-92543826-1', 'auto');

            // track pageview on state change
            $rootScope.$on('$stateChangeSuccess', function (event) {
                $window.ga('send', 'pageview', $location.path());
            });
        });
}(angular));