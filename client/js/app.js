var Evaluator = angular.module('Evaluator', ['ngRoute', 'ngAnimate', 'toastr', 'ui.bootstrap', 'chart.js']);
angular.module("Evaluator").constant("API", "http://dispatch.ru.is/h38/api/v1");
//http://localhost:19358/api/v1
angular.module('Evaluator').run(['$http', '$window', '$location',
	function ($http, $window, $location) {
		var storage = $window.localStorage;
		if(storage['LastUpdated'] !== undefined) {
			var cacheTime = 30 * 60000;
			var time = new Date(new Date(storage['LastUpdated']).getTime() + cacheTime);
			if(time > new Date()) {
				$http.defaults.headers.common.Authorization = 'Basic ' + storage['Token'];
				storage['LastUpdated'] = new Date();
			}
			else {
				storage['Token'] = '';
				storage['User'] = [];
				$http.defaults.headers.common.Authorization = undefined;
				$location.path('/login');
			}
		}
	}
]);