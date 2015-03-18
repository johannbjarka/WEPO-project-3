angular.module('Evaluator').controller('AdminEvalController', ['$scope', '$location', '$routeParams', 'AdminFactory',
	function ($scope, $location, $routeParams, AdminFactory) {
	$scope.errorMessage = "";
	$scope.isOpen = true;

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
					chartData(question);

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
				$scope.getTeacherInfo(course);

				$scope.Courses = response.data.Courses;

				$scope.courses.push(course);
			}
		}, function(response) {
			$scope.errorMessage = 'Failed to load evaluation';
		});
	};

	$scope.getTeacherInfo = function(course) {
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

	$scope.openClose = function() {
		$scope.isOpen = !$scope.isOpen;
	};

	var chartData = function(question) {
		var labels = [];
		var data = [[]];

		if(question.OptionsResults !== null) {
			for(var o in question.OptionsResults) {
				labels.push(question.OptionsResults[o].AnswerTextEN);
				// Genarating random data for charts because API allways returns count 0
				data[0].push(Math.floor(((Math.random() * 100) % 100)));
			}
		}
		if(labels.length !== 0) {
			question["labels"] = labels;
			question["data"] = data;
		}
	};


	$scope.getEval($routeParams.id);
}]);