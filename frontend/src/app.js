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
	// $http.get('http://localhost:8081/offers').success(function(data) {
	// 	$scope.offers = data;
	// });

	var tabs = [{
		id: 0,
		title: 'Event', 
		content: "Using the event offer service."
	}, {
		id: 1,
		title: 'Restful', 
		content: "Using the restful offer service."
	}];

    $scope.tabs = tabs;
    $scope.selectedIndex = 1;

    $scope.announceSelected = function (tab) {
    	$scope.farewell = 'Goodbye ' + tab.title + '!';
    };

    $scope.announceDeselected = function (tab) {
    	$scope.greeting = 'Hello ' + tab.title + '!';
    };

	$scope.offers = [{
			id: 1,
			cost: 49,
			description: "Platinum Offer"
		}, {
			id: 1,
			cost: 99,
			description: "Gold Offer"
	}];
}]);