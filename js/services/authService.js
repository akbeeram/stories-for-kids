angular.module('AuthenticationService',[])
.factory('authService',function ($q,$http) {
	return {
		loginUser:function(userInfo){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/login.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:{
                    email:userInfo.email,
                    password:userInfo.trickyWord
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
		logoutUser:function(userInfo){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/logout.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:{
                    email:userInfo.email
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
		authenticateUser:function(email, accessToken){
			var deferred=$q.defer();
			return $http({
				url:'api/v1/authenticate.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:{
                    email:email,
                    accessToken:accessToken
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
		submitComments:function (cmntInfo) {
			var deferred=$q.defer();
			return $http({
				url:'api/v1/contact.php',
				method:'POST',
				headers: {'Content-Type': 'application/json'},
				data:cmntInfo
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