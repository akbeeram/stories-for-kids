angular.module('AuthenticationService',[])
.factory('authService',function ($q,$http) {
	return {
		authenticateUser:function(userInfo){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/authenticate.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:userInfo
			})
			.then(function(response){
				deferred.resolve(response.data);
				return deferred.promise;
			},function(response){
				deferred.reject(response);
				return deferred.promise;
			});
		},
		loginUser:function(userInfo){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/login.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:userInfo
			})
			.then(function(response){
				deferred.resolve(response.data);
				return deferred.promise;
			},function(response){
				deferred.reject(response);
				return deferred.promise;
			});
		},
		logoutUser:function (userInfo) {
			var deferred=$q.defer();
			return $http({
				url:'api/v1/logout.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:userInfo
			})
			.then(function(response){
				deferred.resolve(response.data);
				return deferred.promise;
			},function(response){
				deferred.reject(response);
				return deferred.promise;
			});
		},
		createUser:function (userInfo) {
			var deferred=$q.defer();
			return $http({
				url:'api/v1/register.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:userInfo
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