angular.module('Evaluator').factory('LoginFactory', ['$http', '$window', 'API',
	function($http, $window, API) {
		return {
			login: function(user, pass) {
				return $http.post(API + '/login', {
					user: user,
					pass: pass
				}).success(function(response) {
					$window.localStorage['LastUpdated'] = new Date();
					$window.localStorage['Token'] = response.Token;
					$window.localStorage['User'] = response.User;
					$http.defaults.headers.common.Authorization = 'Basic ' + response.Token;
					return response;
				}).error(function(response) {
					return response;
				});
			}
		};
	}
]);