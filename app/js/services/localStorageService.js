module.exports = localStorageService;
localStorageService.$inject = [];
function localStorageService() {
    return {
        getUserAuthInfo : function(){
            return localStorage.getItem('sfkUserInfo') ? JSON.parse(localStorage.getItem('sfkUserInfo')):null;
        },
        setUserAuthInfo : function(userAuthInfo){
            localStorage.setItem('sfkUserInfo',JSON.stringify(userAuthInfo));
        },
        logoutUser : function(){
            localStorage.removeItem('sfkUserInfo');
            localStorage.removeItem('currStory');
        },
        getCurrentStory : function () {
            return localStorage.getItem('currStory') ? JSON.parse(localStorage.getItem('currStory')) : null;
        },
        setCurrentStory : function(story){
            localStorage.setItem('currStory',JSON.stringify(story));
        }
    };
};