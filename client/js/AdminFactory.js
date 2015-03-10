angular.module('Evaluator').factory('AdminFactory', [
	'$http',
	'API',
	function($http, API) {
		return {
			getTemplates: function() {
				return $http.get(API + '/evaluationtemplates')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getTemplate: function(id) {
				return $http.get(API + '/evaluationtemplates/:id')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			addTemplate: function(title, titleEN, introText, introTextEN, courseQuestions, teacherQuestions) {
				return $http.post(API + '/evaluationtemplates', {
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
			getEvals: function() {
				return $http.get(API + '/evaluations')
				.success(function(response) {
					return response;
				}).error(function(response) {
					return response;
				});
			},
			getEval: function(id) {
				return $http.get(API + '/evaluations/id')
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