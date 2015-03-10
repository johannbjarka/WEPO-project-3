angular.module('Evaluator').controller('StudentEvalsController', ['$scope', '$location', '$routeParams', 'StudentFactory' ,'toastr',
	function ($scope, $location, $routeParams, StudentFactory) {

	$scope.showEvals = function() {
		StudentFactory.getStudentEvals()
		.then(function(response) {
			console.log(response);
		}, function(response) {
			$scope.errorMessage = 'Failed to login';
		});
	};

}]);