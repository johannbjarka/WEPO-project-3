angular.module('Evaluator').controller('EvalController', ['$scope', '$location', '$routeParams', 'toastr',
	function ($scope, $location, $routeParams, toastr, AdminFactory) {
	
	getEvals = function() {
		EvalFactory.getEval( )
		.then(function(response) {
			console.log('yay');
		}, function(response) {
			console.log('nay');
		});
	};

}]);