angular.module('Evaluator').controller('AdminTemplateController', ['$scope', '$location', '$routeParams', 'AdminFactory' ,'toastr',
	function ($scope, $location, $routeParams, AdminFactory) {
	$scope.errorMessage = '';

	$scope.Title = '';
	$scope.TitleEN = '';
	$scope.IntroText = '';
	$scope.IntroTextEN = '';
	$scope.CourseQuestions = [];
	$scope.TeacherQuestions = [];

	$scope.addCourseTextQuestion = function() {
		$scope.CourseQuestions.push({TextEN: '', Text: '', Type: 'text'});
	};

	$scope.addCourseSingleQuestion = function() {
		$scope.CourseQuestions.push({TextEN: '', Text: '', Type: 'single', Answers: [{TextEN: '', Text: ''}]});
	};

	$scope.addCourseMultiQuestion = function() {
		$scope.CourseQuestions.push({TextEN: '', Text: '', Type: 'multiple', Answers: [{TextEN: '', Text: ''}]});
	};

	$scope.addCourseQuestionAnswer = function(id) {
		$scope.CourseQuestions[id].Answers.push({TextEN: '', Text: ''});
	};

	$scope.addTeacherTextQuestion = function() {
		$scope.TeacherQuestions.push({TextEN: '', Text: '', Type: 'text'});
	};

	$scope.addTeacherSingleQuestion = function() {
		$scope.TeacherQuestions.push({TextEN: '', Text: '', Type: 'single', Answers: [{TextEN: '', Text: ''}]});
	};

	$scope.addTeacherMultiQuestion = function() {
		$scope.TeacherQuestions.push({TextEN: '', Text: '', Type: 'multiple', Answers: [{TextEN: '', Text: ''}]});
	};

	$scope.addTeacherQuestionAnswer = function(id) {
		$scope.TeacherQuestions[id].Answers.push({TextEN: '', Text: ''});
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
			$scope.errorMessage += 'Failed load template';
		});
	}

	if($routeParams.id !== undefined) {
		$scope.getTemplate($routeParams.id);
	}
}]);