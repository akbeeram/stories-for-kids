/**
 * Created by beeraman on 6/30/2017.
 */
var appModule = require('./app.module');

appModule.config(appRoutes);

appRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
function appRoutes($stateProvider, $urlRouterProvider, $locationProvider){
    $urlRouterProvider.otherwise('/welcome');
    $stateProvider
        .state('welcome',{
            url:'/welcome',
            requireLogin:false,
            //resolve:{
            //    isUserAlreadyLoggedIn:isUserValid
            //},
            views:{
                '':{
                    template:'<welcome-page />'
                }
            }
        })
        //.state('login',{
        //    url:'/login',
        //    template:''
        //})
        //.state('contact-us',{
        //    url:'/contact-us',
        //    requireLogin:false,
        //    template:'',
        //    controller:function($scope,$state){
        //
        //    }
        //})
        .state('boring-stuff',{
            url:'/boring-stuff',
            requireLogin:false,
            template : require('../boringStuff/boring-stuff.html')
            //controller:function($scope,$state,$stateParams){
            //    //console.log($stateParams);
            //}
        })
        .state('app',{
            url:'',
            abstract:true,
            requireLogin:true,
            //resolve: {
            //    isUserAlreadyLoggedIn : isUserValid
            //},
            templateUrl:require('./main.html'),
            //controller: function($scope,isUserAlreadyLoggedIn){
            //    //not running
            //    console.log(isUserAlreadyLoggedIn);
            //},
            //onEnter: scrollBackToTop
        });
    $locationProvider.html5Mode(true);

    //})
    //.run(function ($rootScope, $location, $window, $anchorScroll) {
    // initialise google analytics
    //$window.ga('create', 'UA-92543826-1', 'auto');

    // track pageview on state change
    // $rootScope.$on('$stateChangeSuccess', function (event) {
    //     $anchorScroll();
    //     $window.ga('send', 'pageview', $location.path());
    // });
    //console.log($window.pageYOffset);
    //window.addEventListener('scroll',function(){alert('sadf')});
}

module.exports = appRoutes;