angular.module('storiesApp')
.component('dashBoardMain',{
    templateUrl : 'js/dashboard/dashboard.html',
    controller: dashMainCtrl
});
dashMainCtrl.$inject = ['$scope','$state','storyService','categoryService','localStorageService'];
function dashMainCtrl($scope, $state, storyService, categoryService, localStorageService){
    var vm = this;
    var routerState = $state;
    var categorySelected;
    var isUserAdmin,loadingCtgryInProgrs = false;

    //if user is navigating from reader page back to dashboard
    //re-select the story
    var currStory = localStorageService.getCurrentStory();
    categorySelected = currStory && currStory.story_cat_id ? currStory.story_cat_id : 'CG001';

    //called when user selects or changes the category dropdown
    var changeCategory = function(){
        //display loading icon
        vm.loadingCtgryInProgrs = true;
        if(vm.categorySelected){
            vm.getStoriesList(vm.categorySelected);
        }
    }
    //called first time when controller loads to get data
    //to get all the sotires for a category
    var getStoriesList = function(catCode){
        storyService.getStoriesList(catCode).then(function(stories_data){
            vm.dash= vm.dash || {};
            categoryService.getCategoryInfo(catCode).then(function(cat_data){
                vm.dash.storyData=stories_data;
                vm.dash.categoryData=cat_data;
                //hide loading icon
                vm.loadingCtgryInProgrs = false;
            });
        });
    }
    //when user selects astory,story is persisted in localstorage
    //and user is navigated to reader page
    var openStory = function(story){
        localStorageService.setCurrentStory(story);
        $state.go('app.read',{
            htmlPage: story.story_html_name
        });
    }
    var getCategoryList = function (){
        categoryService.getCategories().then(function(catListdata){
            vm.dash= vm.dash || {};
            vm.dash.categoryList=catListdata;
        });
    }

    //need to move this block to a new servcie
    var userData = localStorageService.getUserAuthInfo();
    isUserAdmin = (userData && userData.userRole === 'ADMIN') ? true : false;

    //set controller level variable to acces in view
    vm.loadingCtgryInProgrs = loadingCtgryInProgrs;
    vm.categorySelected = categorySelected;
    vm.openStory = openStory;
    vm.changeCategory = changeCategory;
    vm.getStoriesList = getStoriesList;
    vm.getCategoryList = getCategoryList;
    vm.routerState = routerState;
    vm.isUserAdmin = isUserAdmin;
    vm.getCategoryList();
    vm.getStoriesList(vm.categorySelected);
}
