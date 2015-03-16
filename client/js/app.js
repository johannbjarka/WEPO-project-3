var Evaluator = angular.module('Evaluator', ['ngRoute', 'ngAnimate', 'toastr', 'ui.bootstrap', 'chart.js']);
angular.module("Evaluator").constant("API", "http://localhost:19358/api/v1");

angular.module('Evaluator').run(['$http', '$window',
	function ($http, $window) {
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
			}
		}
	}
]);

Evaluator.directive('ngEnter', function () {
	return function (scope, element, attrs) {
		element.bind("keydown keypress", function (event) {
			if(event.which === 13) {
				scope.$apply(function (){
					scope.$eval(attrs.ngEnter);
				});
				event.preventDefault();
			}
		});
	};
});