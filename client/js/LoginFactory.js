angular.module('Evaluator').factory('LoginFactory', [
	'$http', function($http) {
		return {
			login: function(user, pass) {
				return $http.post('API' + '/login', {
					username: user,
					password: pass
				}).success(function(response) {
					return response.data;
				}).error(function(errorResponse) {
					return errorResponse.message;
				});
			}
		};
	}
]);