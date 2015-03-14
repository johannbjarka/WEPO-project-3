angular.module('Evaluator').directive('evaluationQuestion', function () {
	return {
		restrict: "E",
		replace: true,
		templateUrl: 'views/evaluationQuestion.html',
		//template: '<div><div>',
		scope: { question: '=question'},
		
		link: function ( scope, element, attr ) {
			scope.$watch('question', function(question) {
			console.log(scope);
			console.log(scope.question, question);
			});
		}
	};
});