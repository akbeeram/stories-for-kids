angular.module('CategoriesService',[])
.factory('categoryService',function ($q,$http) {
	return {
		getCategories:function(){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/categories.php',
				method:'GET',
				headers: {'Content-Type': 'application/json'}               
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