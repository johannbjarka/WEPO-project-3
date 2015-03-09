angular.module('Evaluator').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'Views/login.html', controller: 'LoginController' })
			.when('/evals/:user/', { templateUrl: 'Views/studentEvals.html', controller: 'StudentEvalsController' })
			.when('/evals/:user/:eval/', { templateUrl: 'Views/studentEval.html', controller: 'StudentEvalController'})
			.when('/evals/secure/:admin/', { templateUrl: 'Views/adminEvals.html', controller: 'AdminEvalsController' })
			.when('/evals/secure/:admin/:eval/', { templateUrl: 'Views/adminEval.html', controller: 'AdminEvalController'})
			.otherwise({
	  			redirectTo: '/login'
			});
	}
]);
