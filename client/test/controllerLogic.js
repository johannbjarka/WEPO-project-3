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

	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('AdminTemplateController', {
			$scope: scope,
			//AdminFactory: mockAdminFactory
		});
	}));
});