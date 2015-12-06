angular.module('carsApp', [])
.controller('carsDataController', ['$scope', 'carsDataService', 
	function($scope, carsDataService) {
		
		$scope.start_years = [
			1999,
			2000,
			2001,
			2002,
			2003,
			2004,
			2005,
			2006,
			2007,
			2008,
			2009,
			2010,
			2011,
			2012,
			2013,
			2014
		];

		$scope.test_years = [
			2015,
			2016,
			2017,
			2018,
			2019,
			2020
		];
		
		$scope.sent = false;
		$scope.carName = '';
		$scope.carCapacity = '';
		$scope.carMileage = '';
		$scope.carFirst = '';
		$scope.carTest = '';

		$scope.result = undefined;

		$scope.getCarsData = function() {
			return carsDataService.getCarsData().then(function(response) {
				$scope.carsData = response;
			});
		}

		$scope.sendData = function() {
			carsDataService
				.sendData($scope.carCapacity,
						  $scope.carMileage, $scope.carFirst, $scope.carTest)
					.then(function(response) {
						$scope.result = response;
						$scope.sent = true;
						console.log(response);
					});
		}
	}
]);