describe('LoginFactory', function() {
	var httpBackend, mockLoginFactory;

	beforeEach(function() {
		module('Evaluator');
		
		inject( function (LoginFactory, $httpBackend, API) {
			httpBackend = $httpBackend;
			mockLoginFactory = LoginFactory;
			mockAPI = API;
		});
		
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should login successfully', function() {
		httpBackend.expect('POST', mockAPI + '/login')
		.respond(200, { Token : "student", User: {Username: "carl13", FullName: "Carl A Sveinsson" } });

		mockLoginFactory.login('carl13', '12345')
		.then(function(response) {
			expect(response.data.Token).toEqual('student');
			expect(response.data.User.FullName).toEqual('Carl A Sveinsson');
		});

		httpBackend.flush();
	});

	it('should  fail to login', function() {
		httpBackend.expect('POST', mockAPI + '/login')
		.respond(401, { ErrorMessage : "Unauthorized" });

		mockLoginFactory.login('carl11', '125')
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});

});

describe('AdminFactory', function() {
	var httpBackend, mockAdminFactory;
	var fakeCourseQuestions = [];
	var fakeTeacherQuestions = [];
   
	beforeEach(function() {
		module('Evaluator');
		
		inject( function (AdminFactory, $httpBackend, API) {
			httpBackend = $httpBackend;
			mockAdminFactory = AdminFactory;
			mockAPI = API;
		});
		
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should return evaluationtemplates', function() {
		httpBackend.expect('GET', mockAPI + '/evaluationtemplates')
		.respond(200, [{ ID : 1, TemplateTitle: "Sample", StartDate: "2015-03-17T21:19:51.7776769+00:00"}]);

		mockAdminFactory.getTemplates()
		.then(function(response) {
			expect(response.data[0].ID).toEqual(1);
			expect(response.data[0].StartDate).toEqual("2015-03-17T21:19:51.7776769+00:00");
		});

		httpBackend.flush();
	});

	it('should fail to return evaluationtemplates', function() {
		httpBackend.expect('GET', mockAPI + '/evaluationtemplates')
		.respond(401, { ErrorMessage : "Unauthorized" });

		mockAdminFactory.getTemplates()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});
	
	it('should return an evaluationtemplate with a coresponding ID', function() {
		httpBackend.expect('GET', mockAPI + '/evaluationtemplates/3')
		.respond(200, { ID : 3, TemplateTitle: "Sample3", StartDate: "2015-03-17T21:19:51.7776769+00:00"});

		mockAdminFactory.getTemplate(3)
		.then(function(response) {
			expect(response.data.ID).toEqual(3);
			expect(response.data.TemplateTitle).toEqual("Sample3");
		});

		httpBackend.flush();
	});
	
	it('should return Bad Request', function() {
		httpBackend.expect('GET', mockAPI + '/evaluationtemplates/strengur')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getTemplate("strengur")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should add an evaluationtemplate', function() {
		httpBackend.expect('POST', mockAPI + '/evaluationtemplates', {Title : "TestTitle", TitleEN : "titleEN", IntroText: "introText", IntroTextEN: "introTextEN", CourseQuestions: [], TeacherQuestions: []})
		.respond(204, { successMessage : "No Content" });

		mockAdminFactory.addTemplate("TestTitle", "titleEN", "introText", "introTextEN", fakeCourseQuestions, fakeTeacherQuestions)
		.then(function(response) {
			expect(response.data.successMessage).toEqual("No Content");
		});

		httpBackend.flush();
	});
	
	it('should fail to add an evaluationtemplate', function() {
		httpBackend.expect('POST', mockAPI + '/evaluationtemplates', {Title : "", TitleEN : "", IntroText: "", IntroTextEN: "", CourseQuestions: [], TeacherQuestions: []})
		.respond(400, { ErrorMessage : "Bad Request" });

		
		mockAdminFactory.addTemplate("", "", "", "", fakeCourseQuestions, fakeTeacherQuestions)
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return evaluations', function() {
		httpBackend.expect('GET', mockAPI + '/evaluations')
		.respond(200, [{ ID : 1, TemplateTitle: "Sample", StartDate: "2015-03-17T21:19:51.7776769+00:00"}]);

		mockAdminFactory.getEvals()
		.then(function(response) {
			expect(response.data[0].ID).toEqual(1);
			expect(response.data[0].StartDate).toEqual("2015-03-17T21:19:51.7776769+00:00");
		});

		httpBackend.flush();
	});

	it('should fail to return evaluation', function() {
		httpBackend.expect('GET', mockAPI + '/evaluations')
		.respond(401, { ErrorMessage : "Unauthorized" });

		mockAdminFactory.getEvals()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});
	
		it('should return an evaluation with a coresponding ID', function() {
		httpBackend.expect('GET', mockAPI + '/evaluations/1')
		.respond(200, { ID : 1, TemplateID: 3, TemplateTitle: "template3"});

		mockAdminFactory.getEval(1)
		.then(function(response) {
			expect(response.data.ID).toEqual(1);
			expect(response.data.TemplateID).toEqual(3);
		});

		httpBackend.flush();
	});
	
	it('should return Bad Request', function() {
		httpBackend.expect('GET', mockAPI + '/evaluations/strengur')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getEval("strengur")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should add an evaluation', function() {
		httpBackend.expect('POST', mockAPI + '/evaluations', {TemplateID : 1, StartDate : "2015-03-17T21:19:51.7776769+00:00", EndDate: "2016-03-17T21:19:51.7776769+00:00"})
		.respond(204, { successMessage : "No Content" });

		mockAdminFactory.addEval(1, "2015-03-17T21:19:51.7776769+00:00", "2016-03-17T21:19:51.7776769+00:00")
		.then(function(response) {
			expect(response.data.successMessage).toEqual("No Content");
		});

		httpBackend.flush();
	});
	
	it('should fail to add an evaluation', function() {
		httpBackend.expect('POST', mockAPI + '/evaluations', {TemplateID : 1, StartDate : 2015, EndDate: "2016-03-17T21:19:51.7776769+00:00"})
		.respond(400, { ErrorMessage : "Bad Request" });

		
		mockAdminFactory.addEval(1, 2015, "2016-03-17T21:19:51.7776769+00:00")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return teachers in a given course and semester', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-622-ARTI/20151/teachers')
		.respond(200, [{"Username":"stephans","FullName":"Stephan Schiffel","SSN":"1509803489","Email":"stephans@ru.is","Role":"teacher","ImageURL":"http://www.ru.is/kennarar/dabs/img/15/1509803489.jpg"}]);

		mockAdminFactory.getTeachers("T-622-ARTI", "20151")
		.then(function(response) {
			expect(response.data[0].Username).toEqual("stephans");
			expect(response.data[0].SSN).toEqual("1509803489");
		});

		httpBackend.flush();
	});
	
	it('should fail to return teachers', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-622-ARTI/haust/teachers')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getTeachers("T-622-ARTI", "haust")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});


});

describe('StudentFactory', function() {
	var httpBackend, mockStudentFactory;
	var fakeCourseQuestions = [];
	var fakeTeacherQuestions = [];
   
	beforeEach(function() {
		module('Evaluator');
		
		inject( function (StudentFactory, $httpBackend, API) {
			httpBackend = $httpBackend;
			mockStudentFactory = StudentFactory;
			mockAPI = API;
		});
		
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});
	
	it('should return a coresponding student evaluation', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-622-ARTI/20151/evaluations/1')
		.respond(200, {ID : 1, TemplateID : 3, Title : "title", TitleEN : "titleEN", IntroText: "sample", IntroTextEN: "sampleEN", CourseQuestions: [], TeacherQuestions: []});

		mockStudentFactory.getStudentEval("T-622-ARTI", "20151", 1)
		.then(function(response) {
			expect(response.data.ID).toEqual(1);
			expect(response.data.TemplateID).toEqual(3);
		});

		httpBackend.flush();
	});
	
	it('should fail to return evaluation', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-622-ARTI/haust/evaluations/bad')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockStudentFactory.getStudentEval("T-622-ARTI", "haust", "bad")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should answer an evaluation', function() {
		httpBackend.expect('POST', mockAPI + '/courses/T-622-ARTI/20151/evaluations/1', [{QuestionID: "4", TeacherSSN: '', Value: 'Yes'},{QuestionID: "3", TeacherSSN: '', Value: 'NO'}])
		.respond(204, { successMessage : "No Content" });

		mockStudentFactory.answerStudentEval("T-622-ARTI", "20151", 1, [{QuestionID: "4", TeacherSSN: '', Value: 'Yes'},{QuestionID: "3", TeacherSSN: '', Value: 'NO'}])
		.then(function(response) {
			expect(response.data.successMessage).toEqual("No Content");
		});

		httpBackend.flush();
	});
	
	it('should fail to add an evaluation', function() {
		httpBackend.expect('POST', mockAPI + '/courses/3/20151/evaluations/1', [{QuestionID: "4", TeacherSSN: '', Value: 'Yes'},{QuestionID: "3", TeacherSSN: '', Value: 'NO'}])
		.respond(400, { ErrorMessage : "Bad Request" });

		mockStudentFactory.answerStudentEval(3, "20151", 1, [{QuestionID: "4", TeacherSSN: '', Value: 'Yes'},{QuestionID: "3", TeacherSSN: '', Value: 'NO'}])
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return teachers in a given course and semester', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-427-WEPO/20151/teachers')
		.respond(200, [{"Username":"baering10","FullName":"Bæring Gunnar Steinþórsson","SSN":"1001902499","Email":"baering10@ru.is","Role":"teacher","ImageURL":"http://www.ru.is/kennarar/dabs/img/10/1001902499.jpg"}]);

		mockStudentFactory.getTeachers("T-427-WEPO", "20151")
		.then(function(response) {
			expect(response.data[0].Username).toEqual("baering10");
			expect(response.data[0].SSN).toEqual("1001902499");
		});

		httpBackend.flush();
	});
	
	it('should fail to return teachers', function() {
		httpBackend.expect('GET', mockAPI + '/courses/T-427-WEPO/haust/teachers')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockStudentFactory.getTeachers("T-427-WEPO", "haust")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return courses for the loged in student', function() {
		httpBackend.expect('GET', mockAPI + '/my/courses')
		.respond(200, [{"ID":1,"CourseID":"T-427-WEPO","Name":"Vefforritun II","NameEN":"Web Programming II","DateBegin":"2015-01-14T00:00:00","DateEnd":"2015-04-04T00:00:00"}]);

		mockStudentFactory.getMyCourses()
		.then(function(response) {
			expect(response.data[0].DateBegin).toEqual("2015-01-14T00:00:00");
			expect(response.data[0].CourseID).toEqual("T-427-WEPO");
		});

		httpBackend.flush();
	});
	
	it('should return unauthorized for a logout student', function() {
		httpBackend.expect('GET', mockAPI + '/my/courses')
		.respond(401, { ErrorMessage : "Unauthorized" });
		
		mockStudentFactory.getMyCourses()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});
	
	it('should return evaluations for the loged in student', function() {
		httpBackend.expect('GET', mockAPI + '/my/evaluations')
		.respond(200, [{"ID":4,"CourseID":"T-427-WEPO","CourseName":"Vefforritun II","CourseNameEN":"Web Programming II","TemplateName":"f","TemplateNameEN":"f","Semester":"20151"}]);

		mockStudentFactory.getMyEvals()
		.then(function(response) {
			expect(response.data[0].TemplateName).toEqual("f");
			expect(response.data[0].CourseID).toEqual("T-427-WEPO");
		});

		httpBackend.flush();
	});
	
		it('should not return evaluations for the loged out student', function() {
		httpBackend.expect('GET', mockAPI + '/my/evaluations')
		.respond(400, { ErrorMessage : "Bad Request" });
		
		mockStudentFactory.getMyEvals()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	

});

