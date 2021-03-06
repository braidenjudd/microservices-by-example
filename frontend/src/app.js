var phonecatApp = angular.module('msApp', ['ngRoute', 'ngMaterial', 'firebase']);

phonecatApp.config(['$routeProvider', function($routeProvider) {
	$routeProvider.
		when('/offers', {
			templateUrl: 'tmpls/offer-list.html',
			controller: 'OfferController'
		}).
		otherwise({
			redirectTo: '/offers'
		});
}]);

phonecatApp.filter('hourtime', function() {
  	return function(input) {
    	return String("0" + input).slice(-2) + "00";
  	};
});

phonecatApp.controller('OfferController', ['$scope', '$http', '$timeout', '$firebase', 
	function ($scope, $http, $timeout, $firebase) {

	$scope.tabs = [{
		id: 0,
		title: 'Event', 
		content: "Using the event offer service."
	}, {
		id: 1,
		title: 'Restful', 
		content: "Using the restful offer service."
	}];

	Activate();

	function Activate() { 
		$scope.url = 'http://localhost:8080/offers';
		$scope.offers = undefined;
		$scope.searchParams = {
			start: 6,
			end: 22
		};
		$scope.selectedIndex = 1;
		$scope.loading = {};
	};

    $scope.announceSelected = function (tab) {
    	$scope.offers = undefined;
    	$scope.loading.offers = false;
    	$scope.searchParams = {
			start: 6,
			end: 22
		};
			
    	if (tab.title == "Event")
    	{
    		$scope.url = 'http://localhost:8081/offers';
    	}
    	if (tab.title == "Restful")
    	{
    		$scope.url = 'http://localhost:8080/offers';
    	}
    };

    $scope.announceDeselected = function (tab) {
    	$scope.offers = undefined;
    	$scope.loading.offers = false;
    };

    $scope.updateFlightTime = function (start, end) {
    	if (start > end) {
    		$scope.searchParams.end = start
    	}
    };

    $scope.search = function (searchParams) {
    	$scope.loading.offers = true;
		$http.post($scope.url, searchParams).
			success(function(data, status, headers, config) {
			var firebaseURL = data.offerListURL;
			var offerListRef = new Firebase(firebaseURL);

			var sync = $firebase(offerListRef);

			$scope.offers = sync.$asArray();
			$scope.loading.offers = false;
		});
    };	
}]);