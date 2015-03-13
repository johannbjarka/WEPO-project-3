angular.module('Evaluator').controller('StudentEvalController', ['$scope', '$location', '$routeParams','StudentFactory' ,
	function ($scope, $location, $routeParams, StudentFactory) {

	$scope.evaluations = [];
	$scope.errorMessage = '';
	$scope.teachers = [];

	$scope.showEval = function() {
		StudentFactory.getStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID)
		.then(function(response) {
			console.log(response.data);
			$scope.evaluations = response.data;
		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.getTeachers = function() {
		StudentFactory.getTeachers($routeParams.CourseID, $routeParams.Semester)
		.then(function (response) {
			console.log(response.data);
			$scope.teachers = response.data;
		}, function (response) {
			$scope.errorMessage = 'Failed to get data';
		});

	};

	$scope.getTeachers();
	$scope.showEval();


}]);