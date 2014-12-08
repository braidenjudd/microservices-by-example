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

phonecatApp.controller('OfferController', ['$scope', '$http', function ($scope, $http) {
	$scope.offers = undefined;
	$scope.selectedIndex = 1;

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
    };

    $scope.announceDeselected = function (tab) {
    	$scope.offers = undefined;
    };

    $scope.search = function (searchParams) {
    	$http.get('http://localhost:8081/offers').success(function(data) {
			console.log(data.offers);
			$scope.offers = data.offers;
		});
    };
}]);