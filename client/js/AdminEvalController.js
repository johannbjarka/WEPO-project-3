angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory' , 'toastr',
	function ($scope, $location, $routeParams, toastr, AdminFactory) {
	
	$scope.getEvaluations = function() {
		AdminFactory.getEvals( )
		.then(function(response) {
			console.log('yay');
		}, function(response) {
			console.log('nay');
		});
	};


}]);