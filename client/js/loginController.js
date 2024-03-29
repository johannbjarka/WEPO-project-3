angular.module('Evaluator').controller('LoginController', ['$scope', '$location', '$routeParams', 'LoginFactory',
	function ($scope, $location, $routeParams, LoginFactory) {

	$scope.errorMessage = '';
	$scope.username = '';
	$scope.password = '';

	$scope.login = function() {
		if ($scope.username === '') {
			$scope.errorMessage = 'You must fill in a username';
		} else if ($scope.password === '') {
			$scope.errorMessage = 'You must fill in a password';
		} else {
			LoginFactory.login($scope.username, $scope.password)
			.then(function(response) {
				if(response.data.User.Role === 'admin') {
					$location.path('/admin/');
				} else {
					$location.path('/evals/');
				}
			}, function(response) {
				$scope.errorMessage = 'Failed to login';
			});
		}
	};
}]);