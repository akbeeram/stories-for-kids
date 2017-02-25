angular.module('storiesApp')
.component('footerBlock',{
      restrict:'AE',
        templateUrl:'js/footer/footer.html',
        controller: footerCtrl
});

footerCtrl.$inject = ['$state','$timeout','APP_CONSTANTS'];
function footerCtrl($state, $timeout,APP_CONSTANTS){
    var vm = this;
    vm.isSubmittin=false;
    vm.submitted = false;
    vm.submitA = function(){
        vm.isSubmittin=true;
        $timeout(function(){
            vm.isSubmittin=false;
            vm.submitted = true;
        },4000);
    }

    //runs automatically
    //get recent news
    vm.recentlyAdded = [
        'A tale of two kids',
        'The monkey and the lion',
        'Lion is king of the jungle,All hail the king',
        'The three foolish brahmins who didnt know'
    ];
    vm.constants = APP_CONSTANTS.MAIN_FOOTER;
}