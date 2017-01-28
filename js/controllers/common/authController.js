(function(angular){
   'use strict';

    angular.module('authModule',['filtersModule','directiveModule'])
        .controller('authController',function($scope,$timeout){
        
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
        });
}(angular));