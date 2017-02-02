(function(angular){
    'use strict';

    angular.module('directiveModule',[])
    .directive('signUpPage',function(){
        return {
              restrict:'AEC',
                templateUrl:'partials/common/signup.html'
            };
    })
    .directive('signInPage',function(){
        return {
              restrict:'AEC',
                templateUrl:'partials/common/signin.html'
            };
    })
        .directive('singleTile',function(){
            return {
              restrict:'AEC',
                scope:{
                    storyDetails:'='
                },
                templateUrl:'partials/common/single-tile.html',
                controller:function($scope){
                },
                link:function(scope,ele,attrs){
                }
            };
        })
    .directive('loginLightBox',function(){
        return {
              restrict:'AEC',
                scope: {
                  showLoginForm:'='
                },
                templateUrl:'partials/common/login-lightbox.html',
                controller: ['$scope', '$http', '$window',
                  function($scope, $http, $window) {
                    $scope.loginError = false;
                    $scope.showLoginForm = false;
                    $scope.preventClick = function(e){
                        e.preventDefault();
                    }
                    $scope.close = function(){
                      $scope.showLoginForm=false;
                    }
                    $scope.login = function () {
                      $scope.loginError = false;
                      if($scope.username == $scope.password){
                        $scope.showLoginForm=false;
                        $scope.user="valid";
                      }
                    /*$http.post('/auth/login', {username: $scope.username, password: $scope.password})
                        .success(function (response) {
                          $window.location='/';
                        })
                        .error(function (err, status) {
                          $scope.username = '';
                          $scope.password = '';
                          $scope.loginError = true;
                        })*/
                    }
                  }
                ],
                link:function(scope,ele,attrs){
                }
            };
    });
}(angular));