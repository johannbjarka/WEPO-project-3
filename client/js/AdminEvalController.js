angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory', 'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {

	$scope.getEval = function (id) {
		AdminFactory.getEval(id)
		.then(function(response) {
			$scope.TemplateID = response.data.TemplateID;
			$scope.TemplateTitle = response.data.TemplateTitle;
			$scope.TemplateTitleEN = response.data.TemplateTitleEN;
			$scope.Courses = response.data.Courses;
			console.log($scope.Courses);
			evalData();
		}, function(response) {
			$scope.errorMessage = 'Failed to load evaluation';
		});
	};

	var evalData = function() {
		console.log("YOLO");
		console.log($scope.Courses);
		for(var c in $scope.Courses) {
			//console.log($scope.Courses[c].Questions);
			for(var q in $scope.Courses[c].Questions) {
				console.log("NOLO");
				var labels = [];
				var data = [];
				
				if($scope.Courses[c].Questions[q].OptionsResults !== null) {
					for(var o in $scope.Courses[c].Questions[q].OptionsResults) {
						labels.push($scope.Courses[c].Questions[q].OptionsResults[o].AnswerTextEN);
						data.push($scope.Courses[c].Questions[q].OptionsResults[o].Count);
					}
				}
				$scope.Courses[c].Questions[q]["labels"] = labels;
				$scope.Courses[c].Questions[q]["data"] = data;
				console.log(labels);
				console.log($scope.Courses[c].Questions[q].labels);
				console.log(data);
				console.log($scope.Courses[c].Questions[q].data);
			}
		}

	};

	$scope.labels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
	$scope.series = ['Series A', 'Series B'];

	$scope.data = [
		[65, 59, 80, 81, 56, 55, 40],
		[28, 48, 40, 19, 86, 27, 90]
	];


	$scope.getEval($routeParams.id);
}]);