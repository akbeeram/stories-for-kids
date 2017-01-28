(function(angular){
    'use strict';

    angular.module('storiesApp',['ui.router','welcomeModule','footerModule','headerModule','directiveModule','authModule','AuthenticationService'])
        .controller('LandingCtrlr',function($scope){
            $scope.msg="hi";
        })
        .config(function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.otherwise('/welcome');
            $stateProvider
                .state('welcome',{
                    url:'/welcome',
                    views:{
                        '':{templateUrl:'partials/common/welcome.html'},
                        'header':{templateUrl:'partials/common/header.html'},
                        'footer':{templateUrl:'partials/common/footer.html'}
                    }
                })
                .state('welcome.about',{
                    url:'/about',
                    template:'Thanks.'
                })
        });

}(angular));