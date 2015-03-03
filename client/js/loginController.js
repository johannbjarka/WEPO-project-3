angular.module("teachingEval").controller('LoginController', ['$scope', '$location', '$routeParams', 'LoginFactory',
	function ($scope, $location, $routeParams, LoginFactory) {
	
	$scope.errorMessage = '';
	$scope.userName = '';
	$scope.password = '';

	$scope.login = function() {			
		if ($scope.userName === '') {
			$scope.errorMessage = 'You must fill in a username';

		} else if ($scope.password === '') {
			$scope.errorMessage = 'You must fill in a password';
		} else {
			LoginFactory.login($scope.userName, $scope.password)
			.then(function(data) {
				
			}, function(error) {
				
			})
		}
	};
}]);