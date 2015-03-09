angular.module('Evaluator').factory('LoginFactory', [
	'$http',
	'API',
	function($http, API) {
		return {
			login: function(user, pass) {
				return $http.post(API + '/login', {
					user: user,
					pass: pass
				}).success(function(response) {
					$http.defaults.headers.common.Authorization = 'Basic ' + response.Token;
					return response;
				}).error(function(response) {
					return response;
				});
			}
		};
	}
]);