angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory', 'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {

	$scope.errorMessage = "";
	$scope.isRootOpen = true;
	$scope.isOpen = true;

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
			var teachers = [];
			getTeachers = function() {
				AdminFactory.getTeachers($scope.Courses[c].CourseID, $scope.Courses[c].Semester)
				.then(function (response) {
					teachers = response.data;
					for(var i = 0; i < $scope.Courses.length; i++) {
						for(var q in $scope.Courses[i].Questions) {
							for(var t in teachers) {
								if($scope.Courses[i].Questions[q].TeacherSSN === teachers[t].SSN) {
									$scope.Courses[i].Questions[q]["TeacherName"] = "Results for: " + teachers[t].FullName;
								}
							}
						}
					}					
				}, function (response) {
					$scope.errorMessage = 'Failed to get data';
				});
			}
			getTeachers();
			
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

	close = function() {
		$scope.isRootOpen = false;
		$scope.isOpen = false;
	}

	$scope.openClose = function() {
		$scope.isRootOpen = !$scope.isRootOpen;
		$scope.isOpen = !$scope.isOpen;
	}

	setTimeout(close, 800);

	$scope.getEval($routeParams.id);
}]);