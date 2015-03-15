
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
	
	beforeEach(module('Evaluator'));
	beforeEach(inject(function ($controller, $rootScope) {
		scope = $rootScope.$new();
		controller = $controller('LoginController', {
			$scope: scope,
		});
	}));
	
	it("should have a blank error message to start with", function() {
		expect(scope.errorMessage).toEqual("");
	});

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

		controller = $controller({
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

/*
describe('AdminController', function() {
	var AdminController;

	beforeEach(module('Evaluator'));
	beforeEach(inject(function($injector) {
		AdminController = $injector.get('AdminController');
	}));

	it('should not create evaluation when dates are undefined', function() {
		expect(AdminController.$scope.createEvaluation()).not.toHaveBeenCalled();
	});
});
*/