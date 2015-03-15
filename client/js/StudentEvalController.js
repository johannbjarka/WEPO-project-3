angular.module('Evaluator').controller('StudentEvalController', ['$scope', '$location', '$routeParams', 'StudentFactory',
	function ($scope, $location, $routeParams, StudentFactory) {
	$scope.errorMessage = '';

	$scope.courseQuestions = [];
	$scope.teacherQuestions = [];
	$scope.teachers = [];
	$scope.title = $routeParams.CourseID;
	$scope.intro = '';
	$scope.introN = '';
	$scope.teacherAnswers = [];
	$scope.courseAnswers = [];

	$scope.answerTeacherQuestion = function(value, ID, teacherSSN) {
		$scope.teacherAnswers.push({QuestionID: ID, TeacherSSN: teacherSSN, Value: value});
	};

	$scope.answerCourseQuestion = function(value, ID) {
		console.log(value);
		console.log(ID);
		$scope.courseAnswers.push({QuestionID: ID, TeacherSSN: '', Value: value});
	};

	$scope.getEval = function() {
		StudentFactory.getStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID)
		.then(function(response) {
			$scope.courseQuestions = response.data.CourseQuestions;
			$scope.teacherQuestions = response.data.TeacherQuestions;
		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.answerEval = function () {
		StudentFactory.answerStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID)
		.then(function (response) {
			console.log(response.data);
			$scope.teachers = response.data;
		}, function (response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.getTeachers = function() {
		StudentFactory.getTeachers($routeParams.CourseID, $routeParams.Semester)
		.then(function (response) {
			$scope.teachers = response.data;
		}, function (response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.getTeachers();
	$scope.getEval();
}]);