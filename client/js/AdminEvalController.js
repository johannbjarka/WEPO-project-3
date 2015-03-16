angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory', 'toastr',
	function ($scope, $location, $routeParams, AdminFactory, toastr) {
	$scope.errorMessage = "";

	$scope.template = {};
	$scope.courses = [];

	$scope.getEval = function (id) {
		AdminFactory.getEval(id)
		.then(function(response) {
			$scope.TemplateID = response.data.TemplateID;
			$scope.TemplateTitle = response.data.TemplateTitle;
			$scope.TemplateTitleEN = response.data.TemplateTitleEN;

			for(var i in response.data.Courses) {
				var courseData = response.data.Courses[i];
				var course = {
					id: courseData.CourseID,
					name: courseData.CourseName,
					nameEN: courseData.CourseNameEN,
					semester: courseData.Semester,
					questions: [],
					teachers: {}
				};
				for(var j in courseData.Questions) {
					var question = courseData.Questions[j];
					if(question.TeacherSSN === null) {
						course.questions.push(question);
					}
					else {
						if(course.teachers[question.TeacherSSN] === undefined) {
							course.teachers[question.TeacherSSN] = {questions: []};
						}
						course.teachers[question.TeacherSSN].questions.push(question);
					}
				}
				getTeacherInfo(course);

				$scope.Courses = response.data.Courses;
				evalData();

				$scope.courses.push(course);
			}
			console.log($scope.courses);
		}, function(response) {
			$scope.errorMessage = 'Failed to load evaluation';
		});
	};

	var getTeacherInfo = function(course) {
		AdminFactory.getTeachers(course.id, course.semester)
		.then(function(response) {
			for(var t in response.data) {
				var teacherData = response.data[t];
				var teacher = course.teachers[teacherData.SSN];
				teacher.name = teacherData.FullName;
				teacher.email = teacherData.Email;
				teacher.imageURL = teacherData.ImageURL;
			}
		}, function(response) {
			$scope.errorMessage = 'Failed to load teachers';
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