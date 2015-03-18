describe('LoginFactory', function() {
	var httpBackend, mockLoginFactory;

	beforeEach(function() {
		module('Evaluator');
		
		inject( function (LoginFactory, $httpBackend) {
			httpBackend = $httpBackend;
			mockLoginFactory = LoginFactory;
		});
		
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should login successfully', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/login')
		.respond(200, { Token : "student", User: {Username: "carl13", FullName: "Carl A Sveinsson" } });

		mockLoginFactory.login('carl13', '12345')
		.then(function(response) {
			expect(response.data.Token).toEqual('student');
			expect(response.data.User.FullName).toEqual('Carl A Sveinsson');
		});

		httpBackend.flush();
	});

	it('should  fail to login', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/login')
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
		
		inject( function (AdminFactory, $httpBackend) {
			httpBackend = $httpBackend;
			mockAdminFactory = AdminFactory;
		});
		
	});

	afterEach(function() {
		httpBackend.verifyNoOutstandingExpectation();
		httpBackend.verifyNoOutstandingRequest();
	});


	it('should return evaluationtemplates', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluationtemplates')
		.respond(200, [{ ID : 1, TemplateTitle: "Sample", StartDate: "2015-03-17T21:19:51.7776769+00:00"}]);

		mockAdminFactory.getTemplates()
		.then(function(response) {
			expect(response.data[0].ID).toEqual(1);
			expect(response.data[0].StartDate).toEqual("2015-03-17T21:19:51.7776769+00:00");
		});

		httpBackend.flush();
	});

	it('should fail to return evaluationtemplates', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluationtemplates')
		.respond(401, { ErrorMessage : "Unauthorized" });

		mockAdminFactory.getTemplates()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});
	
	it('should return an evaluationtemplate with a coresponding ID', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluationtemplates/3')
		.respond(200, { ID : 3, TemplateTitle: "Sample3", StartDate: "2015-03-17T21:19:51.7776769+00:00"});

		mockAdminFactory.getTemplate(3)
		.then(function(response) {
			expect(response.data.ID).toEqual(3);
			expect(response.data.TemplateTitle).toEqual("Sample3");
		});

		httpBackend.flush();
	});
	
	it('should return Bad Request', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluationtemplates/strengur')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getTemplate("strengur")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should add an evaluationtemplate', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/evaluationtemplates', {Title : "TestTitle", TitleEN : "titleEN", IntroText: "introText", IntroTextEN: "introTextEN", CourseQuestions: [], TeacherQuestions: []})
		.respond(204, { successMessage : "No Content" });

		mockAdminFactory.addTemplate("TestTitle", "titleEN", "introText", "introTextEN", fakeCourseQuestions, fakeTeacherQuestions)
		.then(function(response) {
			expect(response.data.successMessage).toEqual("No Content");
		});

		httpBackend.flush();
	});
	
	it('should fail to add an evaluationtemplate', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/evaluationtemplates', {Title : "", TitleEN : "", IntroText: "", IntroTextEN: "", CourseQuestions: [], TeacherQuestions: []})
		.respond(400, { ErrorMessage : "Bad Request" });

		
		mockAdminFactory.addTemplate("", "", "", "", fakeCourseQuestions, fakeTeacherQuestions)
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return evaluations', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluations')
		.respond(200, [{ ID : 1, TemplateTitle: "Sample", StartDate: "2015-03-17T21:19:51.7776769+00:00"}]);

		mockAdminFactory.getEvals()
		.then(function(response) {
			expect(response.data[0].ID).toEqual(1);
			expect(response.data[0].StartDate).toEqual("2015-03-17T21:19:51.7776769+00:00");
		});

		httpBackend.flush();
	});

	it('should fail to return evaluationtemplates', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluations')
		.respond(401, { ErrorMessage : "Unauthorized" });

		mockAdminFactory.getEvals()
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Unauthorized');
		});

		httpBackend.flush();
	});
	
		it('should return an evaluation with a coresponding ID', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluations/1')
		.respond(200, { ID : 1, TemplateID: 3, TemplateTitle: "template3"});

		mockAdminFactory.getEval(1)
		.then(function(response) {
			expect(response.data.ID).toEqual(1);
			expect(response.data.TemplateID).toEqual(3);
		});

		httpBackend.flush();
	});
	
	it('should return Bad Request', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/evaluations/strengur')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getEval("strengur")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should add an evaluation', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/evaluations', {TemplateID : 1, StartDate : "2015-03-17T21:19:51.7776769+00:00", EndDate: "2016-03-17T21:19:51.7776769+00:00"})
		.respond(204, { successMessage : "No Content" });

		mockAdminFactory.addEval(1, "2015-03-17T21:19:51.7776769+00:00", "2016-03-17T21:19:51.7776769+00:00")
		.then(function(response) {
			expect(response.data.successMessage).toEqual("No Content");
		});

		httpBackend.flush();
	});
	
	it('should fail to add an evaluation', function() {
		httpBackend.expect('POST', 'http://localhost:19358/api/v1/evaluations', {TemplateID : 1, StartDate : 2015, EndDate: "2016-03-17T21:19:51.7776769+00:00"})
		.respond(400, { ErrorMessage : "Bad Request" });

		
		mockAdminFactory.addEval(1, 2015, "2016-03-17T21:19:51.7776769+00:00")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});
	
	it('should return teachers in a given course and semester', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/courses/T-622-ARTI/20151/teachers')
		.respond(200, [{"Username":"stephans","FullName":"Stephan Schiffel","SSN":"1509803489","Email":"stephans@ru.is","Role":"teacher","ImageURL":"http://www.ru.is/kennarar/dabs/img/15/1509803489.jpg"}]);

		mockAdminFactory.getTeachers("T-622-ARTI", "20151")
		.then(function(response) {
			expect(response.data[0].Username).toEqual("stephans");
			expect(response.data[0].SSN).toEqual("1509803489");
		});

		httpBackend.flush();
	});
	
	it('should fail to return teachers', function() {
		httpBackend.expect('GET', 'http://localhost:19358/api/v1/courses/T-622-ARTI/haust/teachers')
		.respond(400, { ErrorMessage : "Bad Request" });

		mockAdminFactory.getTeachers("T-622-ARTI", "haust")
		.then(function(response) {
			expect(response.data.ErrorMessage).toEqual('Bad Request');
		});

		httpBackend.flush();
	});


});



