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

});

