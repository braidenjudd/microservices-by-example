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

phonecatApp.controller('OfferController', ['$scope', '$http', '$timeout', '$firebase', 
	function ($scope, $http, $timeout, $firebase) {
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
    		$http.get('http://localhost:8080/offers').success(function(data) {
    			var firebaseURL = data.offerListURL;
    			var offerListRef = new Firebase(firebaseURL);

    			var sync = $firebase(offerListRef);

				$scope.offers = sync.$asArray();
				$scope.loading.offers = false;
			});
    	}, 2000);
    };
}]);