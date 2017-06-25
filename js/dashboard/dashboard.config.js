angular.module('dashboardModule',['localStorageModule','AuthenticationService'])
    .config(function ($stateProvider,$urlRouterProvider) {
        $stateProvider
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
            })
            .state('app.take-control',{
                url:'/admin',
                template:'<ui-view/>',
                controller:function($scope,$state,isAuthenticatedUser){
                    var vm = this;
                    console.log(isAuthenticatedUser.isAuthenticatedUser && isAuthenticatedUser.userRole === 'ADMIN');
                },
                resolve:{
                    // PreviousState: [
                    //     '$state',
                    //     function ($state) {
                    //         console.log($state);
                    //         var currentStateData = {
                    //             Name: $state.current.name,
                    //             Params: $state.params,
                    //             URL: $state.href($state.current.name, $state.params)
                    //         };
                    //         return currentStateData;
                    //     }
                    // ],
                    isAuthenticatedUser:isUserAuthenticated
                }
            });
        function isUserAuthenticated(localStorageService, authService) {
            var sfkUserInfo = localStorageService.getUserAuthInfo();
            if(sfkUserInfo && sfkUserInfo.username && sfkUserInfo.accessToken){
                //check wiht DB for auth token & username
                return authService.authenticateUser(sfkUserInfo.email, sfkUserInfo.accessToken);
            }
        }
    });