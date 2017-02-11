angular.module('StoryService',[])
.factory('storyService',function ($q,$http) {
	return {
		getStoriesList:function(category){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/stories.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
                data: {
                    call: 'getStoriesList',
                    category: category

                }
			})
			.then(function(response){
				deferred.resolve(response.data);
				return deferred.promise;
			},function(response){
				deferred.reject(response);
				return deferred.promise;
			});
		}
    };
});