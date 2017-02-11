(function(angular){
    'use strict';

    angular.module('storiesApp',['ui.router','CategoriesService','AuthenticationService','StoryService'])
        .controller('LandingCtrlr',function($scope){
            $scope.msg="hi";
        })
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/welcome');
            $stateProvider
                .state('welcome',{
                    url:'/welcome',
                    requireLogin:false,
                    template:'<welcome-page />'
                })
                .state('app',{
                    url:'',
                    abstract:true,
                    requireLogin:true,
                    resolve: {
                        isUserAlreadyLoggedIn : isUserValid
                    },
                    templateUrl:'partials/common/main.html',
                    controller: function($scope,isUserAlreadyLoggedIn){
                        //not running
                    }
                })
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
                });
        
            function isUserValid(authService){
                if(localStorage.getItem('userInfo')){
                    var userData = JSON.parse(localStorage.getItem('userInfo'));
                    if(userData.username && userData.accessToken){
                        //check wiht DB for auth token & username
                        authService.authenticateUser(userData.email, userData.accessToken)
                        .then(function(data){
                            //set local storage data every time
                            localStorage.setItem('userInfo',JSON.stringify(data));
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
        })
    .controller('mainCtrl',function($scpoe){
        
    });
}(angular));