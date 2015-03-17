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

	$scope.getTeachers = function() {
		StudentFactory.getTeachers($routeParams.CourseID, $routeParams.Semester)
		.then(function (response) {
			$scope.teachers = response.data;
		}, function (response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.getEval = function() {
		StudentFactory.getStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID)
		.then(function(response) {
			var i, j;
			$scope.courseQuestions = response.data.CourseQuestions;
			$scope.teacherQuestions = response.data.TeacherQuestions;

			for(i = 0; i < $scope.courseQuestions.length; i++) {
				$scope.courseAnswers.push({QuestionID: $scope.courseQuestions[i].ID, TeacherSSN: '', Value: ''});
			}
			for(i = 0; i < $scope.teachers.length; i++) {
				var teacherAns = [];
				for(j = 0; j < $scope.teacherQuestions.length; j++) {
					teacherAns.push({QuestionID: $scope.teacherQuestions[j].ID, TeacherSSN: $scope.teachers[i].SSN, Value: ''});
				}
				$scope.teacherAnswers.push(teacherAns);
			}


		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.answerQuestion = function(answers) {
		StudentFactory.answerStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID, answers)
		.then(function (response) {
		}, function (response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.saveEval = function() {
		var i, j;
		$scope.answerQuestion($scope.courseAnswers);
		for(i = 0; i < $scope.teacherAnswers.length; i++) {
			var isEmpty = true;
			for(j = 0; j < $scope.teacherAnswers[i].length; j++) {
				if($scope.teacherAnswers[i][j].Value !== '') {
					isEmpty = false;
					break;
				}
			}
			if (!isEmpty) {
				$scope.answerQuestion($scope.teacherAnswers[i]);
			}
		}
		if($scope.errorMessage === '')
		{
			$location.path('/evals');
		}
	};

	$scope.getTeachers();
	$scope.getEval();

}]);