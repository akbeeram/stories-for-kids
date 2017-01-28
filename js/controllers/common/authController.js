(function(angular){
   'use strict';

    angular.module('authModule',['filtersModule','directiveModule','AuthenticationService'])
        .controller('authController',function($scope,$timeout,authService){
        
            $scope.$on('showLoginFormEvent', function (event, data) {
              if(data.showLoginForm){
                $scope.openLoginForm();
              }
            });

            $scope.loginForm=true;
            $scope.registerForm=false;
            $scope.openLoginForm = function(){
                $scope.loginForm=true;
                $scope.registerForm=false;
                $scope.loginStyle={'color':'darkcyan'};
                $scope.regStyle={'color':'darkgray'};
            }
            $scope.openRegisterForm = function(){
                $scope.loginForm=false;
                $scope.registerForm=true;
                $scope.loginStyle={'color':'darkgray'};
                $scope.regStyle={'color':'darkcyan'};
            }
            $scope.openLoginLightBox=function(){
                $scope.showLoginForm = true;
            }
            $scope.userLogin = function(){
                console.log($scope.userlogin);
                authService.authenticateUser($scope.userlogin).then(function(data){
                    console.log(data);
                });
            }
        });
}(angular));