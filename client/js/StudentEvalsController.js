angular.module('Evaluator').controller('StudentEvalsController', ['$scope', '$location', '$routeParams', 'StudentFactory',
	function ($scope, $location, $routeParams, StudentFactory) {
	$scope.errorMessage = '';
	$scope.evaluations = [];

	$scope.showEvals = function() {
		StudentFactory.getMyEvals()
		.then(function(response) {
			$scope.evaluations = response.data;
		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};
	$scope.showEvals();
}]);