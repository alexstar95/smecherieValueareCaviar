angular.module('carsApp', [])
.controller('carsDataController', ['$scope', 'carsDataService', 
	function($scope, carsDataService) {

		$scope.test = "dsdasdas";
		console.log($scope.test);

		$scope.getCarsData = function() {
			return carsDataService.getCarsData().then(function(response) {
				$scope.carsData = response;
				console.log($scope.carsData);
			});
		}
	}
]);