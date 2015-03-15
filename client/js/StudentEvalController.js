angular.module('Evaluator').controller('StudentEvalController', ['$scope', '$location', '$routeParams', 'StudentFactory',
	function ($scope, $location, $routeParams, StudentFactory) {
	$scope.errorMessage = '';

	$scope.courseQuestions = [];
	$scope.teacherQuestions = [];
	$scope.teachers = [];
	$scope.title = $routeParams.CourseID;
	$scope.intro = '';
	$scope.introN = '';
	$scope.teachersAnswers = [];
	$scope.teacherAnswers = [];
	$scope.courseAnswers = [];


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
				for(j = 0; j < $scope.teacherQuestions.length; j++) {
					$scope.teacherAnswers.push({QuestionID: $scope.teacherQuestions[j].ID, TeacherSSN: $scope.teachers[i].SSN, Value: ''});
				}

				$scope.teachersAnswers.push($scope.teacherAnswers);
				$scope.teacherAnswers = [];
			}


		}, function(response) {
			$scope.errorMessage = 'Failed to get data';
		});
	};

	$scope.answerQuestion = function (answers) {
		StudentFactory.answerStudentEval($routeParams.CourseID, $routeParams.Semester, $routeParams.ID, answers)
		.then(function (response) {
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

	$scope.saveEval = function () {
		
		$scope.answerQuestion($scope.courseAnswers);

		for(var i = 0; i < $scope.teachersAnswers.length; i++) {
			var isEmpty = true;
			for(var j = 0; j < $scope.teachersAnswers[i].length; j++) {
				if($scope.teachersAnswers[i][j].Value !== '') {
					isEmpty = false;
					break;
				}
			}
			if (!isEmpty) {
				$scope.answerQuestion($scope.teachersAnswers[i]);
			}
				
		}

		// hætta að sýna þetta eval ?
	};

	$scope.submit = function() {
		$scope.saveEval();
	};

	$scope.getTeachers();
	$scope.getEval();

}]);