angular.module('Evaluator').factory('StudentFactory', [
	'$http',
	'API',
	function($http, API) {
		return {
			getStudentEval: function(course, semester, evalID) {
				return $http.get(API + '/courses/' + course + '/'+ semester + '/evaluations/' + evalID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			answerStudentEval: function(course, semester, evalID, questionID, value, teacherSSN) {
				return $http.post(API + '/courses/' + course + '/'+ semester + '/evaluations/' + evalID, {
					QuestionID: questionID,
					TeacherSSN: teacherSSN,
					Value: value
				}).success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getTeachers: function(course, semester) {
				return $http.get(API + '/courses/' + course + '/'+ semester + '/teachers')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getMyCourses: function() {
				return $http.get(API + '/my/courses')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getMyEvals: function() {
				return $http.get(API + '/my/evaluations')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			}
		};
	}
]);