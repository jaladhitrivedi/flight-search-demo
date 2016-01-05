(function() {
    'use strict';

    angular.module('app', [
        'ngRoute',
        'rzModule',
        'app.flight'
    ])
     .config(['$routeProvider', function($routeProvider) {
        $routeProvider.
                when('/', {
                    templateUrl: 'app/flight/search.html',
                    controller: 'FlightController',
                    controllerAs: 'flightCtrl'
                });
    }]);

})();