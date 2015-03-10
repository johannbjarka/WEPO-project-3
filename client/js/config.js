angular.module('Evaluator').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/login', { templateUrl: 'views/login.html', controller: 'LoginController' })
		.when('/evals/:user', { templateUrl: 'views/studentEvals.html', controller: 'StudentEvalsController' })
		.when('/evals/:user/:eval', { templateUrl: 'views/studentEval.html', controller: 'StudentEvalController'})
		.when('/admin', { templateUrl: 'views/admin.html', controller: 'AdminController' })
		.when('/admin/template', { templateUrl: 'views/adminTemplateForm.html', controller: 'AdminTemplateController'})
		.when('/admin/template/:id', { templateUrl: 'views/adminTemplateView.html', controller: 'AdminTemplateController'})
		.when('/admin/evaluation', { templateUrl: 'views/der.html', controller: 'AdminEvaluationController'})
		.when('/admin/evaluation/:id', { templateUrl: 'views/der.html', controller: 'AdminEvaluationController'})
		.otherwise({
			redirectTo: '/login'
		});
	}
]);
