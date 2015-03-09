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
					console.log(response);
					//$http.defaults.headers.common.Autherization = 'Basic' + response.data.token;
					return response.data;
				}).error(function(response) {
					return response.message;
				});
			}
		};
	}
]);