(function() {
    'use strict';

    angular.module('app.flight.service', [])
            .service('FlightService', FlightService);

    FlightService.$inject = ['$http', '$q'];

    function FlightService($http, $q) {
        var vm = this;
        
        vm.getCities = function() {
            
            var deferred = $q.defer();
            $http.get('/api/cities')
                    .success(function(data) {
                        console.log(data);
                        deferred.resolve(data);
                    })
                    .error(function(message) {
                        deferred.reject(message);
                    });
                    
            return deferred.promise;
        }

        vm.getFlights = function(searchParams) {
            
            var deferred = $q.defer();
            $http.post('/api/flights', searchParams)
                    .success(function(data) {
                        console.log(data);
                        deferred.resolve(data);
                    })
                    .error(function(message) {
                        deferred.reject(message);
                    });
                    
            return deferred.promise;
        }

    }

})();