angular.module('Evaluator').controller('NavigationController', ['$scope', '$location', '$routeParams', '$window', '$http',
	function ($scope, $location, $routeParams, $window, $http) {

	$scope.disconnecting = function () {
			var storage = $window.localStorage;
			$http.defaults.headers.common.Authorization = undefined;
			storage['Token'] = '';
			storage['User'] = [];
			$location.path('/login');
	};
}]);