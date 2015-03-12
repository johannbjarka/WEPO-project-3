angular.module('Evaluator').controller('StudentEvalsController', ['$scope', '$location', '$routeParams', 'StudentFactory' ,'toastr',
	function ($scope, $location, $routeParams, StudentFactory) {

	$scope.evaluations = [];
	$scope.username = '';
	$scope.errorMessage = '';

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