angular.module('Evaluator').controller('AdminController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {
	$scope.errorMessage = '';

	$scope.evaluations = [];
	$scope.templates = [];

	$scope.newEval = {
		errorMessage: '',
		startDate: new Date(),
		endDate: new Date(),
		templateID: 0
	};

	$scope.minDate = new Date();

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
			if(response.status === 401) {
				$location.path('/login');
			}
			$scope.errorMessage += 'Failed to get templates';
		});
	};

	$scope.createEvaluation = function() {
		$scope.newEval.startDate.setHours(0, 0, 0, 0);
		$scope.newEval.startDate = new Date($scope.newEval.startDate.getTime() - 60000);
		$scope.newEval.endDate.setHours(23, 59, 59, 0);

		AdminFactory.addEval(
			$scope.newEval.templateID,
				$scope.newEval.startDate,
				$scope.newEval.endDate
		).then(function() {
			$scope.showEvals();
		}, function(response) {
			console.log(response);
			$scope.newEval.errorMessage = 'Failed to create evaluation';
		});
	};

	$scope.openSd = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedSd = true;
		$scope.openedEd = false;
	};

	$scope.openEd = function($event) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.openedEd = true;
		$scope.openedSd = false;
	};

	$scope.setSd = function() {
		if($scope.newEval.startDate > $scope.newEval.endDate) {
			$scope.newEval.endDate = new Date($scope.newEval.startDate.getTime());
		}
	};

	$scope.setEd = function() {
		if($scope.newEval.startDate > $scope.newEval.endDate) {
			$scope.newEval.startDate = new Date($scope.newEval.endDate.getTime());
		}
	};

	$scope.showEvals();
	$scope.showTemplates();
}]);