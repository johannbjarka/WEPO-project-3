angular.module('Evaluator').controller('AdminController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {
	$scope.errorMessage = '';
	$scope.evalErrorMessage = '';

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
		console.log($scope.templates);
		console.log($scope.StartDate);
		console.log($scope.EndDate);
		console.log($scope.templateID);
		AdminFactory.addEval(
			$scope.templateID,
			$scope.StartDate,
			$scope.EndDate
		).then(function(response) {
			$scope.showEvals();
		}, function(response) {
			$scope.errorMessage = 'Failed to create evaluation';
		});
	};

	$scope.optionChanged = function(ID) {
        $scope.templateNotSelected = !ID;
    };

	$scope.today = function() {
		$scope.StartDate = new Date();
		$scope.EndDate = new Date();
	};
	$scope.today();

	$scope.clear = function () {
		$scope.StartDate = null;
		$scope.EndDate = null;
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