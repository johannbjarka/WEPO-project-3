angular.module('Evaluator').controller('EvalsController', ['$scope', '$location', '$routeParams', 'StudentFactory' , 'AdminFactory' , 'toastr',
	function ($scope, $location, $routeParams, StudentFactory, AdminFactory) {
	showEvals = function() {
		StudentFactory.getStudentEvals()
		.then(function(response) {
			console.log(response);
		}, function(response) {
			$scope.errorMessage = 'Failed to login';
		});
	};

	showEval = function() {
		AdminFactory.getEval(1)
		.then(function(response) {
			console.log(response);
		}, function(response) {
			$scope.errorMessage = 'Failed to login';
		});
	};

	showEval();
	showEvals();

}]);