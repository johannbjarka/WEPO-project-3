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
		}
	};

	beforeEach(module('Evaluator', function($provide) {
		windowMock = {
			localStorage: { token: "mockGoodToken" }
		};
		$provide.value('window', windowMock);
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

	it('should set end date equal to start date if end date is earlier than start date', function() {
		scope.newEval = {
			errorMessage: '',
			startDate: new Date(),
			endDate: new Date(),
			templateID: 0
		};
		scope.newEval.startDate.setHours(10, 0, 0, 0);
		scope.newEval.endDate.setHours(0, 0, 0, 0);
		scope.setSd();
		expect(scope.newEval.startDate).toEqual(scope.newEval.endDate);
	});

	it('should set end date equal to start date if end date is earlier than start date', function() {
		scope.newEval = {
			errorMessage: '',
			startDate: new Date(),
			endDate: new Date(),
			templateID: 0
		};
		scope.newEval.startDate.setHours(10, 0, 0, 0);
		scope.newEval.endDate.setHours(0, 0, 0, 0);
		scope.setEd();
		expect(scope.newEval.startDate).toEqual(scope.newEval.endDate);
	});
});