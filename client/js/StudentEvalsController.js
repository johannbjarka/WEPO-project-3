angular.module('Evaluator').controller('StudentEvalsController', ['$scope', '$location', '$routeParams', 'StudentFactory' ,
	function ($scope, $location, $routeParams, StudentFactory) {

	$scope.evaluations = [];
	$scope.errorMessage = '';

	$scope.showEvals = function() {
		StudentFactory.getMyEvals()
		.then(function(response) {
			console.log(response.data);
			$scope.evaluations = response.data;
		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.showEvals();

}]);