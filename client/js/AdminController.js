angular.module('Evaluator').controller('AdminController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {
	$scope.errorMessage = '';
	$scope.evalErrorMessage = '';
	$scope.templateID = '';
	$scope.startDate = '';
	$scope.endDate = '';

	$scope.evaluations = [];
	$scope.templates = [];
	$scope.templateID = 0;

	$scope.evalName = '';

	$scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
	$scope.format = $scope.formats[2];

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

	$scope.createEvaluation = function() {
		$scope.startDate.setHours(0,0,0,0);
		$scope.startDate = new Date($scope.startDate.getTime() - 60000);
		$scope.endDate.setHours(23,59,59,0);
		AdminFactory.addEval(
			$scope.templateID,
  			$scope.startDate,
  			$scope.endDate
		).then(function() {
			$scope.showEvals();
		}, function() {
			$scope.errorMessage = 'Failed to create evaluation';
		});
	};

	$scope.today = function() {
		$scope.startDate = new Date();
		$scope.endDate = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.startDate = null;
		$scope.endDate = null;
	};

	$scope.toggleMin = function() {
		$scope.minDate = $scope.minDate ? null : new Date();
	};
	$scope.toggleMin();

	$scope.openSd = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedSd = true;
	};

	$scope.openEd = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedEd = true;
	};

	$scope.showEvals();
	$scope.showTemplates();
}]);