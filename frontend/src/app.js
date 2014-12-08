var phonecatApp = angular.module('msApp', ['ngRoute', 'ngMaterial']);

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

phonecatApp.controller('OfferController', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
	$scope.offers = undefined;
	$scope.selectedIndex = 1;
	$scope.loading = {};

	$scope.tabs = [{
		id: 0,
		title: 'Event', 
		content: "Using the event offer service."
	}, {
		id: 1,
		title: 'Restful', 
		content: "Using the restful offer service."
	}];

    $scope.announceSelected = function (tab) {
    	$scope.offers = undefined;
    	$scope.loading.offers = false;
    };

    $scope.announceDeselected = function (tab) {
    	$scope.offers = undefined;
    	$scope.loading.offers = false;
    };

    $scope.search = function (searchParams) {
    	$scope.loading.offers = true;
    	$timeout(function () {
    		$http.get('http://localhost:8081/offers').success(function(data) {
				console.log(data.offers);
				$scope.offers = data.offers;
				$scope.loading.offers = false;
			});
    	}, 5000);
    };
}]);