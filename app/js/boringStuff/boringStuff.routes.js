boringRoutes.$inject = ['$stateProvider', '$urlRouterProvider'];
function boringRoutes($stateProvider,$urlRouterProvider) {
    $stateProvider
        .state('boring-stuff.privacy',{
        url:'/privacy',
        template:require('./privacy-policy.html'),
        //controller:function($scope,$state,$stateParams){
        //    //console.log($stateParams);
        //}
    }).state('boring-stuff.disclaimer',{
        url:'/disclaimer',
        template:require('./disclaimer.html'),
        //controller:function($scope,$state,$stateParams){
        //    //console.log($stateParams);
        //}
    }).state('boring-stuff.terms-of-use',{
        url:'/terms-of-use',
        template:require('./terms-of-use.html'),
        //controller:function($scope,$state,$stateParams){
        //    //console.log($stateParams);
        //}
    }).state('boring-stuff.site-map', {
        url: '/site-map',
        template: require('./site-map.html'),
        //controller: function ($scope, $state, $stateParams) {
        //    //console.log($stateParams);
        //}
    })
}

module.exports = boringRoutes;