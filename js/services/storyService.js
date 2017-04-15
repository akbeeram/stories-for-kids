angular.module('StoryService',[])
.factory('storyService',function ($q,$http) {
    var story;
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
		},
        updateStory:function(reqObj){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/stories.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data: {
					call: 'updateStory',
					story: reqObj.story
				}
			})
            .then(function(response){
                deferred.resolve(response.data);
                return deferred.promise;
            },function(response){
                deferred.reject(response);
                return deferred.promise;
            });
		},

        getStory:function(reqObj){
            var deferred=$q.defer();
            return $http({
                url:'api/v1/stories.php',
                method:'POST',
                headers: {'Content-Type': 'application/json'},
                data: {
                    call: 'getStory',
                    storyId: reqObj.storyId
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