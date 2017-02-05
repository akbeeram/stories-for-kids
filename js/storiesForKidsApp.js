(function(angular){
    'use strict';

    angular.module('storiesApp',['ui.router','welcomeModule','CategoriesService','headerModule','directiveModule','authModule','AuthenticationService'])
        .controller('LandingCtrlr',function($scope){
            $scope.msg="hi";
        })
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/welcome');
            $stateProvider
                .state('welcome',{
                    url:'/welcome',
                    requireLogin:false,
                    views:{
                        '':{templateUrl:"js/welcomePage/welcome.html"},
                        'header@welcome':{
                            templateUrl:"partials/common/header.html"
                        }
                    }
                })
                .state('app',{
                    url:'',
                    abstract:true,
                    requireLogin:true,
                    resolve: {
                        isUserAlreadyLoggedIn : isUserValid
                    },
                    views:{
                        '':{
                            templateUrl:'partials/common/main.html',
                            controller: function($scope,isUserAlreadyLoggedIn){
                                var vm = this;
                                alert(isUserAlreadyLoggedIn);
                                console.log(vm.isUserAlreadyLoggedIn);
                            }
                        },
                        'header@app':{templateUrl:"partials/common/header.html"}
                    }
                })
                .state('app.dash',{
                    url:'/dashboard',
                    templateUrl:"partials/dashboard/dashboard.html",
                    controller:function($scope,$state){
                        $scope.click=function(){
                            $state.go('app.read');
                        }
                    }
                })
                .state('app.read',{
                    url:'/read',
                    template:"This is read"
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