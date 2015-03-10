angular.module('Evaluator').controller('StudentEvalsController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory) {
	$scope.showEvals = function() {
		AdminFactory.getEvals()
		.then(function(response) {
			console.log(response);
		}, function(response) {
			$scope.errorMessage = 'Failed to login';
		});
	};

}]);