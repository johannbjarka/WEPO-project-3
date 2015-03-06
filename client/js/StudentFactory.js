angular.module('Evaluator').factory('StudentFactory', [
	'$http',
	'API',
	function($http) {
		return {
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