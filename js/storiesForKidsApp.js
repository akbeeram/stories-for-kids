(function(angular){
    'use strict';

    angular.module('storiesApp',[
        'ui.router',
        'CategoriesService',
        'AuthenticationService',
        'StoryService',
        'boringStuff',
        'adminModule',
        'dashboardModule'
    ])
    .config(function($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise('/welcome');
        $stateProvider
            .state('welcome',{
                url:'/welcome',
                requireLogin:false,
                template:'<welcome-page />'
            })
            .state('contact-us',{
                url:'/contact-us',
                template:'<contact-us />',
                controller:function($scope,$state){

                }
            })
            .state('boring-stuff',{
                url:'/boring-stuff',
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

        function isUserValid(authService){
            if(localStorage.getItem('sfkUserInfo')){
                var userData = JSON.parse(localStorage.getItem('sfkUserInfo'));
                if(userData.username && userData.accessToken){
                    //check wiht DB for auth token & username
                    authService.authenticateUser(userData.email, userData.accessToken)
                    .then(function(data){
                        //set local storage data every time
                        localStorage.setItem('sfkUserInfo',JSON.stringify(data));
                        return true;
                    });
                }else{
                    //if local storage data found and
                    //if any data is not missing
                    return false;
                }
            }else{
                //if no localstorage data found
                return false;
            }
        }
    });
}(angular));