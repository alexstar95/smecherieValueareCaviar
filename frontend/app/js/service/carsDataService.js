angular.module('carsApp')
.service('carsDataService', ['$http', 
	
	function($http) {

		return {

			getCarsData: function() {

				var url = 'http://elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com/motdata/testresult/_search';

				return $http.get(url).then(function(response) {
					return response.data;
				}, function(result){});
			}
		}
	}
]);