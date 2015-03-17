angular.module('Evaluator').directive('displayQuestion', function (){
	return {
		restrict: 'E',
		replace: true,
		require: 'ngModel',
		templateUrl: 'views/displayResults.html',
		scope: { ngModel: '=' },
		link: function(scope, element, attr) {}
	};
});