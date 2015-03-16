
/*
describe("HomeCtrl login", function(){
	
	var ctrl, scope;
	var fakeChat = {
		logonUser: function(username){
			return username == "dabs";},
			getRoomList: function(){ return ["lobby", "smu"]; }
	};
	beforeEach(module("Evaluator"));

	beforeEach(inject(function ($controller, $rootScope) {
		$scope = $rootScope.$new();
		ctrl = $controller("LoginController", {
		$scope: $scope,
		ChatBackend: fakeChat });
	}));

	it("should request a list of rooms if username is available", function(){
		// Arrange:
		var user = "dabs";
		scope.username = user;
		// Act:
		ctrl.doLogin();
		// Assert:
		expect(fakeChat.getRoomList)
		.toHaveBeenCalledWith(user);
	});
	
});

*/
/*
describe('LoginController', function() {
	
	var controller;
	var scope;

	var mockLoginFactory = {

		login: function(user, pass) {
			return {
				success: function(fn) {
					//
					//
					return {
						error: function(errorfn) {
							//
							//
						}
					};
				}
			};
		}

		login: function(user, pass) {
			return ({
				user: "kalli",
				pass: "123"
			}).success(function(response) {
				return "login successful";
			}).error(function(response) {
				return "failed to login";
			});
		}
	};



	var mockLocation = {

	};

	var mockRoutes = {

	};
	
	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('LoginController', {
			$scope: scope,
			$location: mockLocation,
			$routeParams: mockRoutes,
			LoginFactory: mockLoginFactory
		});
	}));
	
	it("should return correct message when successful", function() {
		scope.username = "kalli";
		scope.password = "123";
		controller.scope.login();
		expect(mockLoginFactory.login).toBe("login successful");
	});
	
});
*/

describe('LoginController', function() {
	
	var controller;
	var scope;

	var mockLoginFactory = {

		login: function(user, pass) {
			return {
				success: function(fn) {
					//
					//
					return {
						error: function(errorfn) {
							//
							//
						}
					};
				}
			};
		}
	};

	var mockLocation = {

	};

	var mockRoutes = {

	};
	
	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('LoginController', {
			$scope: scope,
			$location: mockLocation,
			$routeParams: mockRoutes,
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
	/*
	it("should return correct message when successful", function() {
		scope.username = "kalli";
		scope.password = "123";
		scope.login();
		expect(mockLoginFactory.login).toBe("login successful");
	});
	*/
});

/*
describe('AdminTemplateController', function() {

	var controller;
	var scope;

	var mockAdminFactory = {
		addTemplate: function(title, titleEN, introText, introTextEN, courseQuestions, teacherQuestions) {

		}
	};
	
	beforeEach(module('Evaluator'));
	beforeEach(inject(function($controller, $rootScope) {
		scope = $rootScope.$new();

		spyOn(mockAdminFactory, "addTemplate");

		controller = $controller('AdminTemplateController', {
			$scope: scope,
			AdminFactory: mockAdminFactory
		});
	}));

	it("should create a template", function() {
		expect(scope.title).toBeDefined();
		expect(scope.titleEN).toBeDefined();
		expect(scope.introText).toBeDefined();
		expect(scope.introTextEN).toBeDefined();
		expect(scope.CourseQuestions).toBeDefined();
		expect(scope.teacherQuestions).toBeDefined();
		expect(scope.createTemplate).toBeDefined();
		expect(mockAdminFactory.addTemplate()).toHaveBeenCalled();
	});
});
*/


describe('AdminController', function() {
	var controller;
	var scope;

	/*
	var mockAdminFactory = {
		addTemplate: function(title, titleEN, introText, introTextEN, courseQuestions, teacherQuestions) {

		},

		getEvals: function() {
			return {
				success: function(fn) {
					//
					//
					return {
						error: function(errorfn) {
							//
							//
						}
					};
				}
			};
		}
	};
	*/

	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('AdminController', {
			$scope: scope,
			//AdminFactory: mockAdminFactory
		});
	}));

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