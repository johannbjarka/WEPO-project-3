angular.module('Evaluator').directive('evaluationQuestion', function () {
	return {
		restrict: 'E',
		replace: true,
		templateUrl: 'views/evaluationQuestion.html',
		scope: {
			ngQuestion: '=',
			ngIndex: '@',
			ngFunc: '&',
		},
		link: function (scope, element, attr) {
			scope.$watch('answer', function(value) {
			});
		}
	};
});