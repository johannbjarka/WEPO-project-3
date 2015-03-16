angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory', 'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {

	$scope.errorMessage = "";

	$scope.getEval = function (id) {
		AdminFactory.getEval(id)
		.then(function(response) {
			$scope.TemplateID = response.data.TemplateID;
			$scope.TemplateTitle = response.data.TemplateTitle;
			$scope.TemplateTitleEN = response.data.TemplateTitleEN;
			$scope.Courses = response.data.Courses;
			//console.log($scope.Courses);
			evalData();
		}, function(response) {
			$scope.errorMessage = 'Failed to load evaluation';
		});
	};

	var evalData = function() {
		for(var c in $scope.Courses) {
			for(var q in $scope.Courses[c].Questions) {
				var labels = [];
				var data = [[]];
				
				if($scope.Courses[c].Questions[q].OptionsResults !== null) {
					for(var o in $scope.Courses[c].Questions[q].OptionsResults) {
						labels.push($scope.Courses[c].Questions[q].OptionsResults[o].AnswerTextEN);
						data[0].push($scope.Courses[c].Questions[q].OptionsResults[o].Count);
					}
				}
				if(labels.length !== 0) {
					$scope.Courses[c].Questions[q]["labels"] = labels;
					$scope.Courses[c].Questions[q]["data"] = data;
				}
			}
		}
	};

	$scope.getEval($routeParams.id);
}]);