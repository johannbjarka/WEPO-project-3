angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory', 'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {

	$scope.getEval = function (id) {
		AdminFactory.getEval(id)
		.then(function(response) {
			$scope.TemplateID = response.data.TemplateID;
			$scope.TemplateTitle = response.data.TemplateTitle;
			$scope.TemplateTitleEN = response.data.TemplateTitleEN;
			$scope.Courses = response.data.Courses;
		}, function(response) {
			$scope.errorMessage = 'Failed to load evaluation';
		});
	};

	for(var q in $scope.Courses.Questions) {
		var labels = [];
		var data = [];
		
		if(q.OptionsResults !== null) {
			for(var o in q.OptionsResults) {
				labels.push(o.AnswerTextEN);
				data.push(o.Count);
			}
		}
		q["labels"] = labels;
		q["data"] = data;
	}

	$scope.getEval($routeParams.id);
}]);