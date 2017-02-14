angular.module('CategoriesService',[])
.factory('categoryService',function ($q,$http) {
	return {
		getCategories:function(){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/categories.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
                data: {
                    call: 'getCategories'
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
		getCategoryInfo:function(catCode){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/categories.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
                data: {
                    call: 'getCategoryInfo',
                    cat_code: catCode
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