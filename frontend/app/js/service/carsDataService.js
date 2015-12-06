angular.module('carsApp')
.service('carsDataService', ['$http', 
	
	function($http) {

		return {

			getCarsData: function() {

				var url = 'http://elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com/motdata/testresult/_search?pretty';

				return $http.get(url).then(function(response) {
					return response.data;
					console.log(response.data);
				}, function(result){});
			},

			sendData: function(carCapacity, carMileage, carFirst, carTest) {

				var url  = "/sendData";
				var data = {
					'carCapacity' : carCapacity,
					'carMileage' : carMileage,
					'carFirst' : carFirst,
					'carTest' : carTest
				};

				console.log(data);

				return $http.post(url, data).then(function(response) {
					return response.data;
				}, function(){});
			}
		}
	}
]);