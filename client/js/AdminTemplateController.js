angular.module('Evaluator').controller('AdminTemplateController', ['$scope', '$location', '$routeParams', 'AdminFactory',
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

	$scope.removeCourseQuestion = function(id) {
		$scope.CourseQuestions.splice(id, 1);
	};

	$scope.removeCourseQuestionAnswer = function(id, answerID) {
		$scope.CourseQuestions[id].Answers.splice(answerID, 1);
	};

	$scope.moveCourseQuestion = function(id, shift) {
		var temp = $scope.CourseQuestions[id];
		if(shift === 1 && id + 1 < $scope.CourseQuestions.length) {
			$scope.CourseQuestions[id] = $scope.CourseQuestions[id+1];
			$scope.CourseQuestions[id+1] = temp;
		}
		else if(shift === -1 && id > 0) {
			$scope.CourseQuestions[id] = $scope.CourseQuestions[id-1];
			$scope.CourseQuestions[id-1] = temp;
		}
	};

	/*******************************************************/

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

	$scope.removeTeacherQuestion = function(id) {
		$scope.TeacherQuestions.splice(id, 1);
	};

	$scope.removeTeacherQuestionAnswer = function(id, answerID) {
		$scope.TeacherQuestions[id].Answers.splice(answerID, 1);
	};

	$scope.moveTeacherQuestion = function(id, shift) {
		var temp = $scope.TeacherQuestions[id];
		if(shift === 1 && id + 1 < $scope.TeacherQuestions.length) {
			$scope.TeacherQuestions[id] = $scope.TeacherQuestions[id+1];
			$scope.TeacherQuestions[id+1] = temp;
		}
		else if(shift === -1 && id > 0) {
			$scope.TeacherQuestions[id] = $scope.TeacherQuestions[id-1];
			$scope.TeacherQuestions[id-1] = temp;
		}
	};

	/*******************************************************/

	$scope.createTemplate = function() {
		if($scope.form.$valid) {
			AdminFactory.addTemplate(
				$scope.Title,
				$scope.TitleEN,
				$scope.IntroText,
				$scope.IntroTextEN,
				$scope.CourseQuestions,
				$scope.TeacherQuestions
			).then(function() {
				$location.path('/admin');
			}, function(response) {
				$scope.errorMessage = 'Server error: ' + response.status + ', ' + response.statusText;
			});
		}
		else {
			$scope.errorMessage = 'Some fields are empty';
		}
	};

	//Only used for viewing the template.
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
			$scope.errorMessage = 'Failed load template';
		});
	};

	$scope.isViewing = function() {
		if($routeParams.id !== undefined) {
			$scope.getTemplate($routeParams.id);
		}
	};

	$scope.isViewing();
}]);