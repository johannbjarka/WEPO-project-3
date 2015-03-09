angular.module('Evaluator').factory('LoginFactory', [
	'$http',
	'API',
	function($http) {
		return {
			login: function(user, pass) {
				return $http.post('API' + '/login', {
					username: user,
					password: pass
				}).success(function(response) {
					$http.defaults.headers.common.Authorization = 'Basic' + response.data.token;
					console.log(response);
					return response.data;
				}).error(function(response) {
					return response.message;
				});
			}
		};
	}
]);