angular.module('Evaluator').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/login', { templateUrl: 'views/login.html', controller: 'LoginController' })
		.when('/evals/:user', { templateUrl: 'views/studentEvals.html', controller: 'StudentEvalsController' })
		.when('/evals/:user/:eval', { templateUrl: 'views/studentEval.html', controller: 'StudentEvalController'})
		.when('/admin', { templateUrl: 'views/adminEvals.html', controller: 'AdminEvalsController' })
		.when('/admin/template', { templateUrl: 'views/templateForm.html', controller: 'AdminTemplateController'})
		.when('/admin/template/:id', { templateUrl: 'views/templateForm.html', controller: 'AdminTemplateController'})
		.otherwise({
			redirectTo: '/login'
		});
	}
]);
