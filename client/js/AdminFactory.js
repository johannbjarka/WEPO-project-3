angular.module('Evaluator').factory('AdminFactory', [
	'$http',
	'API',
	function($http) {
		return {
			getEvalTemplates: function() {
				return $http.get('API' + '/evaluationtemplates')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEvalTemplate: function(ID) {
				return $http.get('API' + '/evaluationtemplates/' + ID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addEvalTemplate: function(title, titleEN, introText, introTextEN, courseQuestions, teacherQuestions ) {
				return $http.post('API' + '/evaluations', {
					Title: title,
					TitleEN: titleEN,
					IntroText: introText,
					IntroTextEN: introTextEN,
					CourseQuestions: courseQuestions,
					TeacherQuestions: teacherQuestions
				}).success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEvals: function( ) {
				return $http.get('API' + '/evaluations')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEval: function(ID) {
				return $http.get('API' + '/evaluations/' + ID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addEval: function(startDate, endDate) {
				return $http.post('API' + '/evaluations', {
					StartDate: startDate,
					EndDate: endDate
				}).success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getStudentEvals: function( ) {
				return $http.get('API' + '/my/evaluations')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getStudentEval: function(courseID, semesterID, evalID) {
				return $http.get('API' + 'courses/' + courseID + '/'+ semesterID + '/evaluations/' + evalID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addStudentEval: function(courseID, semesterID, evalID, questionID, teacherSSN, value) {
				return $http.post('API' + 'courses/' + courseID + '/'+ semesterID + '/evaluations/' + evalID, {
					QuestionID: questionID,
					TeacherSSN: teacherSSN,
					Value: value
				}).success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getTeachers: function(courseID, semesterID) {
				return $http.get('API' + 'courses/' + courseID + '/'+ semesterID + '/teachers')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			}
		};
	}
]);