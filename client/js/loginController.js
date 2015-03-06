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
			console.log(LoginFactory);
			LoginFactory.login($scope.userName, $scope.password)
			.then(function(response) {
				$location.path('/evals/' + $scope.username);
			}, function(response) {
				console.log('Failed to log in');
			});

		}
	};
}]);