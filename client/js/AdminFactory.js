angular.module('Evaluator').factory('AdminFactory', [
	'$http',
	'API',
	function($http, API) {
		return {
			getEvalTemplates: function() {
				return $http.get(API + '/evaluationtemplates')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEvalTemplate: function(ID) {
				return $http.get(API + '/evaluationtemplates/' + ID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addEvalTemplate: function(title, titleEN, introText, introTextEN, courseQuestions, teacherQuestions ) {
				return $http.post(API + '/evaluations', {
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
				return $http.get(API + '/evaluations')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEval: function(ID) {
				return $http.get(API + '/evaluations/' + ID)
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addEval: function(startDate, endDate) {
				return $http.post(API + '/evaluations', {
					StartDate: startDate,
					EndDate: endDate
				}).success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
		};
	}
]);