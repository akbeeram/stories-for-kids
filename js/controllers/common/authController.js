(function(angular){
   'use strict';

    angular.module('authModule',['filtersModule','directiveModule','AuthenticationService'])
        .controller('authController',function($scope,$timeout,authService,$state){
        
                $scope.showSignIn = true;
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
                $scope.showSignIn = false;
                $scope.showSigningIn = true;
                $scope.showSignedIn = false;
                authService.loginUser($scope.userlogin).then(function(data){
                //$timeout(function(){
                    if(data){
                        $scope.showSigningIn = false;
                        $scope.showSignIn = false;
                        $scope.showSignedIn = true;
                        if(data.loginSuccess){
                            $state.go('dashboard');
                        }
                        
                    }
                //},3000);
                });
            }
        });
}(angular));
