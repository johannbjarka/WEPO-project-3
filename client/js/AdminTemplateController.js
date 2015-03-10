angular.module('Evaluator').controller('AdminTemplateController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory) {
	$scope.errorMessage = '';

	$scope.Title = '';
	$scope.TitleEN = '';
	$scope.IntroText = '';
	$scope.IntroTextEN = '';
	$scope.CourseQuestions = [];
	$scope.TeacherQuestions = [];

	$scope.getTemplate = function(id) {
		AdminFactory.getTemplate(id)
		.then(function(response) {
			$scope.Title = response.data.Title;
			$scope.TitleEN = response.data.TitleEN;
			$scope.IntroText = response.data.IntroText;
			$scope.IntroTextEN = response.data.IntroTextEN;
			$scope.CourseQuestions = response.data.CourseQuestions;
			$scope.TeacherQuestions = response.data.TeacherQuestions;
		}, function(response) {
			$scope.errorMessage += 'Failed too get template';
		});
	}

	$scope.addCourseRow = function() {
		$scope.CourseQuestions.push({textEN: '', text: '', type: 'text'});
	};

	$scope.addTeacherRow = function() {
		$scope.TeacherQuestions.push({textEN: '', text: '', type: 'text'});
	};

	$scope.createTemplate = function() {
		AdminFactory.addTemplate(
			$scope.Title,
			$scope.TitleEN,
			$scope.IntroText,
			$scope.IntroTextEN,
			$scope.CourseQuestions,
			$scope.TeacherQuestions
		).then(function() {
			$location.path('/admin');
		}, function() {
			$scope.errorMessage += 'Failed to post';
		});
	}

	if($routeParams.id !== undefined) {
		console.log('EDIT');
		$scope.getTemplate($routeParams.id);
	}
	else {
		console.log('NEW');
	}
}]);