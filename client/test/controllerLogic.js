describe('LoginController', function() {

	var controller;
	var scope;
	var location;

	var mockLoginFactory = {
		login: function(user, pass)  {
			var promise = {
				then: function(success, error){
					if(user === "carl13" && pass === "12345" ){
						success({data: {
							Token: "",
							User: {
								Role: "student",
							}
						}});
					}
					else if(user === "admin" && pass ==="12345"){
						success({data: {
							Token: "",
							User: {
								Role: "admin",
							}
						}});
					}
					else{
						error({Error: 'Failed to login'});
					}
				}
			}
			return promise;
		}
	};

	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope, $location) {
		scope = $rootScope.$new();
		location = $location;
		controller = $controller('LoginController', {
			$scope: scope,
			$location: location,
			LoginFactory: mockLoginFactory
		});
	}));

	it("should give an error message when username is empty", function() {
		scope.username = "";
		scope.login();
		expect(scope.errorMessage).toEqual("You must fill in a username");
	});

	it("should give an error message when password is empty", function() {
		scope.username = "kalli";
		scope.password = "";
		scope.login();
		expect(scope.errorMessage).toEqual("You must fill in a password");
	});

	it("should fail to login", function() {
		scope.username = "carl11";
		scope.password = "12345";
		scope.login();
		expect(scope.errorMessage).toEqual("Failed to login");
	});



	it("should successfully login student ", function() {
		scope.username = "carl13";
		scope.password = "12345";
		scope.login();
		expect(location.path()).toEqual('/evals/')
	});

	it("should successfully login admin ", function() {
		scope.username = "admin";
		scope.password = "12345";
		scope.login();
		expect(location.path()).toEqual('/admin/')
	});
});

describe('AdminController', function() {
	var controller;
	var scope;
	var window;
	var window_;
	var windowMock;

	var mockAdminFactory = {
		getEvals: function() {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken") {
						success({data: [{
							ID: 1,
							TemplateTitle: "template"
						}]});
					} else {
						error({Error: 'Failed to get evaluations'});
					}
				}
			}
			return promise;
		},
		getTemplates: function() {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken") {
						success({data: [{
							ID: 1,
							Title: "template1"
						}]});
					} else {
						error({Error: 'Failed to get templates'});
					}
				}
			}
			return promise;
		},
		addEval: function(templateID, startDate, endDate) {
			var promise = {
				then: function(success, error) {
					if(templateID === 1) {
						success({Success: 'Evaluation was created'});
					} else {
						error({Error: 'Failed to create evaluation'});
					}
				}
			}
			return promise;
		}
	};

	beforeEach(module('Evaluator', function($provide) {
		windowMock = {
			localStorage: { token: "mockGoodToken" }
		};
		$provide.value('window', windowMock);

		spyOn(mockAdminFactory, "addEval");
	}));

	beforeEach(inject(function ($controller, $rootScope, _window_) {
		scope = $rootScope.$new();
		window_ = _window_;
		controller = $controller('AdminController', {
			$scope: scope,
			AdminFactory: mockAdminFactory
		});
	}));

	it('should fetch evaluations', function() {
		scope.showEvals();
		expect(scope.evaluations).toEqual([{ID: 1, TemplateTitle: "template"}]);
	});

	it('should fail to get evaluations when token is invalid', function() {
		window_.localStorage = { token: "mockBadToken123" };
		scope.showEvals();
		expect(scope.errorMessage).toEqual("Failed to get evaluations");
	});

	it('should fetch templates', function() {
		scope.showTemplates();
		expect(scope.templates).toEqual([{ID: 1, Title: "template1"}]);
	});

	it('should fail to get templates when token is invalid', function() {
		window_.localStorage = { token: "mockBadToken123" };
		scope.showTemplates();
		expect(scope.errorMessage).toEqual("Failed to get templates");
	});

	it('should create a new evaluation', function() {
		scope.newEval = {
			startDate: new Date(),
			endDate: new Date(),
			templateID: 1
		};
		//scope.createEvaluation();
		//expect(mockAdminFactory.addEval).toHaveBeenCalled();
	});

	//NOT SHOWING UP ON COVERAGE REPORT?!?
	it('should open startDate datepicker and close endDate datepicker', function() {
		scope.openedSd = false;
		scope.openedEd = true;

		//Shitty way to not test events.
		var evente = {
			preventDefault: function() {},
			stopPropagation: function() {}
		};
		scope.openSd(evente);

		expect(scope.openedSd).toEqual(true);
		expect(scope.openedEd).toEqual(false);
	});

	//NOT SHOWING UP ON COVERAGE REPORT?!?
	it('should open startDate datepicker and close endDate datepicker', function() {
		scope.openedSd = true;
		scope.openedEd = false;

		//Shitty way to not test events.
		var evente = {
			preventDefault: function() {},
			stopPropagation: function() {}
		};
		scope.openEd(evente);

		expect(scope.openedSd).toEqual(false);
		expect(scope.openedEd).toEqual(true);
	});


	it('should set endDate equal to startDate if endDate is earlier than startDate', function() {
		scope.newEval = {
			startDate: new Date(),
			endDate: new Date(),
		};

		scope.newEval.startDate.setHours(1, 0, 0, 0);
		scope.newEval.endDate.setHours(0, 0, 0, 0);
		scope.setSd();

		expect(scope.newEval.startDate).toEqual(scope.newEval.endDate);
	});

	it('should set startDate equal to endDate if startDate is later than endDate', function() {
		scope.newEval = {
			startDate: new Date(),
			endDate: new Date(),
		};

		scope.newEval.startDate.setHours(0, 0, 0, 0);
		scope.newEval.endDate.setHours(-1, 0, 0, 0);
		scope.setEd();

		expect(scope.newEval.startDate).toEqual(scope.newEval.endDate);
	});

	it('should set the startDate not the endDate', function() {
		scope.newEval = {
			startDate: new Date(),
			endDate: new Date(),
		};

		scope.newEval.startDate.setHours(-1, 0, 0, 0);
		scope.newEval.endDate.setHours(0, 0, 0, 0);
		scope.setSd();

		expect(scope.newEval.startDate).toBeLessThan(scope.newEval.endDate);
	});

	it('should set the endDate not the startDate', function() {
		scope.newEval = {
			startDate: new Date(),
			endDate: new Date(),
		};

		scope.newEval.startDate.setHours(0, 0, 0, 0);
		scope.newEval.endDate.setHours(1, 0, 0, 0);
		scope.setEd();

		expect(scope.newEval.startDate).toBeLessThan(scope.newEval.endDate);
	});
});

describe('AdminTemplateController', function() {
	var controller;
	var scope;
	var params;
	var windowMock;

	var mockAdminFactory = {
		getTemplate: function(id) {
			console.log(id);
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken" && id !== undefined) {
						success({
							data: {
								Title: "abcd",
								TitleEN: "efgh",
								IntroText: "qwer",
								IntroTextEN: "rewq",
								CourseQuestions: [
									{ TextEN: '', Text: 'best course?', Type: 'text' },
									{ TextEN: '', Text: 'IsQuestion?', Type: 'single', Answers: [{TextEN: 'yes', Text: 'já'}, {TextEN: 'no', Text: 'nei'}, {TextEN: 'no answer', Text: 'ekkert svar'}]},
									{ TextEN: '', Text: 'IsMulti?', Type: 'multiple', Answers: [{TextEN: 'yes', Text: 'já'}, {TextEN: 'no', Text: 'nei'}]}
								],
								TeacherQuestions: [
									{ TextEN: '', Text: 'best teacher?', Type: 'text' },
									{ TextEN: '', Text: 'IsQuestion?', Type: 'single', Answers: [{TextEN: 'yes', Text: 'já'}, {TextEN: 'no', Text: 'nei'}, {TextEN: 'no answer', Text: 'ekkert svar'}]}
								]
							}
						});
					} else {
						console.log('bleh');
						error({Error: 'Failed to get template'});
					}
				}
			}
			return promise;
		},
		createTemplate: function() {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken") {
						success({data: [{
							ID: 1,
							Title: "template1"
						}]});
					} else {
						error({Error: 'Failed to create template'});
					}
				}
			}
			return promise;
		}
	};

	beforeEach(module('Evaluator', function($provide) {
		windowMock = {
			localStorage: { token: "mockGoodToken" }
		};
		$provide.value('window', windowMock);
	}));

	beforeEach(inject(function ($controller, $rootScope, $routeParams) {
		scope = $rootScope.$new();
		params = $routeParams;
		controller = $controller('AdminTemplateController', {
			$scope: scope,
			$routeParams: { id: 1 },
			AdminFactory: mockAdminFactory
		});

		spyOn(scope, 'getTemplate');
	}));

	it('Should not get template if id is not set', function() {
		params.id = undefined;

		scope.isViewing();

		expect(scope.getTemplate).toHaveBeenCalled();
	});


	it('Should should fail loading template', function() {
		scope.errorMessage = '';

		scope.getTemplate();

		expect(scope.errorMessage).toBe("");
	});

	it('Should populate fields', function() {
		scope.getTemplate(1);

		expect(scope.Title).toEqual("abcd");
		expect(scope.TitleEN).toEqual("efgh");
		expect(scope.IntroText).toEqual("qwer");
		expect(scope.IntroTextEN).toEqual("rewq");
		expect(scope.CourseQuestions.length).toEqual(3);
		expect(scope.TeacherQuestions.length).toEqual(2);
	});

	it('Should add course text question', function() {
		scope.getTemplate(1);

		scope.addCourseTextQuestion();

		expect(scope.CourseQuestions.length).toEqual(4);
		expect(scope.CourseQuestions[3].Type).toEqual('text');
	});

	it('Should add course single question', function() {
		scope.getTemplate(1);

		scope.addCourseSingleQuestion();

		expect(scope.CourseQuestions.length).toEqual(4);
		expect(scope.CourseQuestions[3].Type).toEqual('single');
	});

	it('Should add course multiple question', function() {
		scope.getTemplate(1);

		scope.addCourseMultiQuestion();

		expect(scope.CourseQuestions.length).toEqual(4);
		expect(scope.CourseQuestions[3].Type).toEqual('multiple');
	});

	it('Should add course question answer', function() {
		scope.getTemplate(1);

		scope.addCourseQuestionAnswer(1);

		expect(scope.CourseQuestions[1].Answers.length).toEqual(4);
	});

	it('Should remove course question', function() {
		scope.getTemplate(1);

		scope.removeCourseQuestion(1);

		expect(scope.CourseQuestions.length).toEqual(2);
	});

	it('Should remove course question answer', function() {
		scope.getTemplate(1);

		scope.removeCourseQuestionAnswer(1, 1);

		expect(scope.CourseQuestions[1].Answers.length).toEqual(2);
	});

	it('Should move course question up', function() {
		scope.getTemplate(1);

		var q1 = scope.CourseQuestions[0];
		var q2 = scope.CourseQuestions[1];
		scope.moveCourseQuestion(1, -1);

		expect(q1).toEqual(scope.CourseQuestions[1]);
		expect(q2).toEqual(scope.CourseQuestions[0]);
	});

	it('Should move course question down', function() {
		scope.getTemplate(1);

		var q1 = scope.CourseQuestions[0];
		var q2 = scope.CourseQuestions[1];
		scope.moveCourseQuestion(0, 1);

		expect(q1).toEqual(scope.CourseQuestions[1]);
		expect(q2).toEqual(scope.CourseQuestions[0]);
	});

	it('Should try move first course question up', function() {
		scope.getTemplate(1);

		var q = scope.CourseQuestions[0];
		scope.moveCourseQuestion(0, -1);

		expect(q).toEqual(scope.CourseQuestions[0]);
	});

	it('Should try move last course question up', function() {
		scope.getTemplate(1);

		var q = scope.CourseQuestions[2];
		scope.moveCourseQuestion(2, 1);

		expect(q).toEqual(scope.CourseQuestions[2]);
	});

	/************************************************/

	it('Should add Teacher text question', function() {
		scope.getTemplate(1);

		scope.addTeacherTextQuestion();

		expect(scope.TeacherQuestions.length).toEqual(3);
		expect(scope.TeacherQuestions[2].Type).toEqual('text');
	});

	it('Should add Teacher single question', function() {
		scope.getTemplate(1);

		scope.addTeacherSingleQuestion();

		expect(scope.TeacherQuestions.length).toEqual(3);
		expect(scope.TeacherQuestions[2].Type).toEqual('single');
	});

	it('Should add Teacher multiple question', function() {
		scope.getTemplate(1);

		scope.addTeacherMultiQuestion();

		expect(scope.TeacherQuestions.length).toEqual(3);
		expect(scope.TeacherQuestions[2].Type).toEqual('multiple');
	});

	it('Should add Teacher question answer', function() {
		scope.getTemplate(1);

		scope.addTeacherQuestionAnswer(1);

		expect(scope.TeacherQuestions[1].Answers.length).toEqual(4);
	});

	it('Should remove Teacher question', function() {
		scope.getTemplate(1);

		scope.removeTeacherQuestion(1);

		expect(scope.TeacherQuestions.length).toEqual(1);
	});

	/*
	it('Should remove course question answer', function() {
		scope.getTemplate(1);

		scope.removeCourseQuestionAnswer(1, 1);

		expect(scope.CourseQuestions[1].Answers.length).toEqual(2);
	});

	it('Should move Teacher question up', function() {
		scope.getTemplate(1);

		var q1 = scope.TeacherQuestions[0];
		var q2 = scope.TeacherQuestions[1];
		scope.moveTeacherQuestion(1, -1);

		expect(q1).toEqual(scope.TeacherQuestions[1]);
		expect(q2).toEqual(scope.TeacherQuestions[0]);
	});

	it('Should move Teacher question down', function() {
		scope.getTemplate(1);

		var q1 = scope.TeacherQuestions[0];
		var q2 = scope.TeacherQuestions[1];
		scope.moveTeacherQuestion(0, 1);

		expect(q1).toEqual(scope.TeacherQuestions[1]);
		expect(q2).toEqual(scope.TeacherQuestions[0]);
	});

	it('Should try move first Teacher question up', function() {
		scope.getTemplate(1);

		var q = scope.TeacherQuestions[0];
		scope.moveTeacherQuestion(0, -1);

		expect(q).toEqual(scope.TeacherQuestions[0]);
	});

	it('Should try move last Teacher question up', function() {
		scope.getTemplate(1);

		var q = scope.TeacherQuestions[2];
		scope.moveTeacherQuestion(2, 1);

		expect(q).toEqual(scope.TeacherQuestions[2]);
	});*/
});


describe('AdminEvalController', function() {
	var controller;
	var scope;
	var params;
	var windowMock;

	var mockAdminFactory = {
		getEval: function(id) {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken" && id !== undefined) {
						success({
							data: {
								ID: 1,
								TemplateID: 1,
								TemplateTitle: "Aðala undirstaða",
								TemplateTitleEN: "Main template",
								Courses: [{
									CourseID: "T-427-WEPO",
									CourseName: "Vefforritun II",
									CourseNameEN: "Web Programming II",
									ID: 1,
									Semester: "20151",
									Questions: [{
											QuestionID: 1,
											TeacherSSN: null,
											nullText: "Fallegt verk?",
											TextEN: "Work of art?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"teyesyesys",
												"I hear you boi",
												"yesyesno?",
												"wewe",
												"bebebebebe"]
										}, {
											QuestionID: 2,
											TeacherSSN: null,
											Text: "Verkefni handa börnum",
											TextEN: "Babadook?",
											Type: "single",
											TextResults: null,
											OptionsResults: [{
													Answer: 1,
													AnswerText: "Varla er það hérna!",
													AnswerTextEN: "Where is this!",
													Count: 4
												}, {
													Answer: 2,
													AnswerText: "Fleiri smákökur",
													AnswerTextEN: "Moar cookies",
													Count: 2
												}
											]
										}, {
											QuestionID: 3,
											TeacherSSN: "1203735289",
											Text: "Besta verkið?",
											TextEN: "What is his best Work?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"Nothing at all",
												"His hair"]
										}, {
											QuestionID: 4,
											TeacherSSN: "1203735289",
											Text: "Besti trefillinn?",
											TextEN: "What is his best trefill?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"Nothing at all",
												"His hair"]
										}
									]
								}]
							}
						});
					} else {
						error({Error: 'Failed to load evaluation'});
					}
				}
			}
			return promise;
		},
		getTeachers: function(id, semester) {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken" && id !== undefined) {
						success({data: [{
							Email: "man@beef.com",
							FullName: "Madur Mansson",
							ImageURL: "http://example.com/example.jpg",
							Role: "teacher",
							SSN: "1203735289"
						}]});
					} else {
						error({Error: 'Failed to load teachers'});
					}
				}
			}
			return promise;
		}
	};

	beforeEach(module('Evaluator', function($provide) {
		windowMock = {
			localStorage: { token: "mockGoodToken" }
		};
		$provide.value('window', windowMock);
	}));

	beforeEach(inject(function ($controller, $rootScope, $routeParams) {
		scope = $rootScope.$new();
		params = $routeParams;
		controller = $controller('AdminEvalController', {
			$scope: scope,
			$routeParams: { id: 1 },
			AdminFactory: mockAdminFactory
		});
	}));

	it('Should get eval and map into courses object', function() {
		scope.getEval(1);

		expect(scope.courses[0].id).toEqual('T-427-WEPO');
		expect(scope.courses[0].name).toEqual('Vefforritun II');
		expect(scope.courses[0].nameEN).toEqual('Web Programming II');
		expect(scope.courses[0].semester).toEqual('20151');
		expect(scope.courses[0].questions.length).toEqual(2);
		expect(scope.courses[0].teachers['1203735289']).not.toBeUndefined();
		expect(scope.courses[0].teachers['1203735289'].name).toEqual('Madur Mansson');
		expect(scope.courses[0].teachers['1203735289'].imageURL).toEqual('http://example.com/example.jpg');
		expect(scope.courses[0].teachers['1203735289'].email).toEqual('man@beef.com');
		expect(scope.courses[0].teachers['1203735289'].questions.length).toEqual(2);
	});

	it('Should fail loading eval', function() {
		scope.errorMessage = '';

		scope.getEval();

		expect(scope.errorMessage).toBe('Failed to load evaluation');
	});

	it('Should fail loading teachers', function() {
		scope.errorMessage = '';

		scope.getTeacherInfo({id: undefined, semester: '2'});

		expect(scope.errorMessage).toBe('Failed to load teachers');
	});


	it('Should flip isOpen', function() {
		scope.isOpen = false;

		scope.openClose();

		expect(scope.isOpen).toBeTruthy();
	});
});

describe('AdminEvalsController', function() {
	/*
	var controller;
	var scope;
	var windowMock;

	var mockAdminFactory = {
		getEvals: function(id) {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken" && id !== undefined) {
						success({
							data: {
								ID: 1,
								TemplateID: 1,
								TemplateTitle: "Aðala undirstaða",
								TemplateTitleEN: "Main template",
								Courses: [{
									CourseID: "T-427-WEPO",
									CourseName: "Vefforritun II",
									CourseNameEN: "Web Programming II",
									ID: 1,
									Semester: "20151",
									Questions: [{
											QuestionID: 1,
											TeacherSSN: null,
											nullText: "Fallegt verk?",
											TextEN: "Work of art?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"teyesyesys",
												"I hear you boi",
												"yesyesno?",
												"wewe",
												"bebebebebe"]
										}, {
											QuestionID: 2,
											TeacherSSN: null,
											Text: "Verkefni handa börnum",
											TextEN: "Babadook?",
											Type: "single",
											TextResults: null,
											OptionsResults: [{
													Answer: 1,
													AnswerText: "Varla er það hérna!",
													AnswerTextEN: "Where is this!",
													Count: 4
												}, {
													Answer: 2,
													AnswerText: "Fleiri smákökur",
													AnswerTextEN: "Moar cookies",
													Count: 2
												}
											]
										}, {
											QuestionID: 3,
											TeacherSSN: "1203735289",
											Text: "Besta verkið?",
											TextEN: "What is his best Work?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"Nothing at all",
												"His hair"]
										}, {
											QuestionID: 4,
											TeacherSSN: "1203735289",
											Text: "Besti trefillinn?",
											TextEN: "What is his best trefill?",
											Type: "text",
											OptionsResults: null,
											TextResults: [
												"Nothing at all",
												"His hair"]
										}
									]
								}]
							}
						});
					} else {
						error({Error: 'Failed to load evaluation'});
					}
				}
			}
			return promise;
		},
		getTeachers: function(id, semester) {
			var promise = {
				then: function(success, error) {
					if(windowMock.localStorage['token'] === "mockGoodToken" && id !== undefined) {
						success({data: [{
							Email: "man@beef.com",
							FullName: "Madur Mansson",
							ImageURL: "http://example.com/example.jpg",
							Role: "teacher",
							SSN: "1203735289"
						}]});
					} else {
						error({Error: 'Failed to load teachers'});
					}
				}
			}
			return promise;
		}
	};

	beforeEach(module('Evaluator', function($provide) {
		windowMock = {
			localStorage: { token: "mockGoodToken" }
		};
		$provide.value('window', windowMock);
	}));

	beforeEach(inject(function ($controller, $rootScope, $routeParams) {
		scope = $rootScope.$new();
		params = $routeParams;
		controller = $controller('AdminEvalController', {
			$scope: scope,
			$routeParams: { id: 1 },
			AdminFactory: mockAdminFactory
		});
	}));

	it('Should get eval and map into courses object', function() {
		scope.getEval(1);

		expect(scope.courses[0].id).toEqual('T-427-WEPO');
		expect(scope.courses[0].name).toEqual('Vefforritun II');
		expect(scope.courses[0].nameEN).toEqual('Web Programming II');
		expect(scope.courses[0].semester).toEqual('20151');
		expect(scope.courses[0].questions.length).toEqual(2);
		expect(scope.courses[0].teachers['1203735289']).not.toBeUndefined();
		expect(scope.courses[0].teachers['1203735289'].name).toEqual('Madur Mansson');
		expect(scope.courses[0].teachers['1203735289'].imageURL).toEqual('http://example.com/example.jpg');
		expect(scope.courses[0].teachers['1203735289'].email).toEqual('man@beef.com');
		expect(scope.courses[0].teachers['1203735289'].questions.length).toEqual(2);
	});

	it('Should fail loading eval', function() {
		scope.errorMessage = '';

		scope.getEval();

		expect(scope.errorMessage).toBe('Failed to load evaluation');
	});

	it('Should fail loading teachers', function() {
		scope.errorMessage = '';

		scope.getTeacherInfo({id: undefined, semester: '2'});

		expect(scope.errorMessage).toBe('Failed to load teachers');
	});


	it('Should flip isOpen', function() {
		scope.isOpen = false;

		scope.openClose();

		expect(scope.isOpen).toBeTruthy();
	});*/
});