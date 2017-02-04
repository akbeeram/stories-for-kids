(function(angular){
    'use strict';

    angular.module('storiesApp',['ui.router','welcomeModule','CategoriesService','footerModule','headerModule','directiveModule','authModule','AuthenticationService'])
        .controller('LandingCtrlr',function($scope){
            $scope.msg="hi";
        })
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/welcome');
            $stateProvider
                .state('app',{
                    url:'',
                    abstract:true,
                    requireLogin:true,
                    controller:function($scope){

                    },
                    views:{
                        '':{templateUrl:'partials/common/main.html'},
                        'header@app':{templateUrl:"partials/common/header.html"},
                        'footer@app':{templateUrl:"partials/common/footer.html"}
                    }
                })
                .state('welcome',{
                    url:'/welcome',
                    requireLogin:false,
                    views:{
                        '':{templateUrl:"partials/common/welcome.html"},
                        'header@welcome':{
                            templateUrl:"partials/common/header.html"
                            //controller:headerController
                            //controller:welcomeController
                        },
                        'footer@welcome':{templateUrl:"partials/common/footer.html"}
                    }
                })
                .state('app.dash',{
                    url:'/dashboard',
                    templateUrl:"partials/dashboard.html",
                    controller:function($scope,$state){
                        $scope.click=function(){
                            $state.go('app.read');
                        }
                    }
                })
                .state('app.read',{
                    url:'/read',
                    template:"This is read"
                })
        });

}(angular));