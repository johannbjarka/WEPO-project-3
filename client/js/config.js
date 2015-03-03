angular.module("teachingEval").config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: 'Views/login.html', controller: 'LoginController' })
			.when('/evals/:user/', { templateUrl: 'Views/evals.html', controller: 'EvalsController' })
			.when('/evals/:user/:eval/', { templateUrl: 'Views/eval.html', controller: 'EvalController'})
			.otherwise({
	  			redirectTo: '/login'
			});
	}
]);