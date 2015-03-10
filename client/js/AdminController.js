angular.module('Evaluator').controller('AdminController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory) {
	$scope.errorMessage = '';
	$scope.evalErrorMessage = '';

	$scope.evaluations = [];
	$scope.templates = [];

	$scope.evalName = '';

	$scope.showEvals = function() {
		AdminFactory.getEvals()
		.then(function(response) {
			$scope.evaluations = response.data;
		}, function(response) {
			$scope.errorMessage += 'Failed to get evaluations';
		});
	};

	$scope.showTemplates = function() {
		AdminFactory.getTemplates()
		.then(function(response) {
			$scope.templates = response.data;
		}, function(response) {
			$scope.errorMessage += 'Failed to get templates';
		});
	};

	$scope.showEvals();
	$scope.showTemplates();
}]);