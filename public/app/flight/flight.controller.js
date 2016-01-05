(function() {
    'use strict';

    angular.module('app.flight.controller', [])
            .controller('FlightController', FlightController);

    FlightController.$inject = ['$http', '$window', 'FlightService'];

    function FlightController($http, $window, FlightService) {
        var vm = this;
        vm.tripType = 2;
        vm.toCity = {};
        vm.fromCity = {};
        vm.passengers = 1;
        vm.startDate = '';
        vm.endDate = '';
        
        vm.minPrice = 0;
        vm.maxPrice = vm.priceLimit = 0;
        
        vm.slider_options = {
            floor: vm.minPrice,
            ceil: vm.maxPrice,
            step: 500,
            precision: 1,
            onStart: function() {},
            onChange: function() {},
            onEnd: function() {
                console.log('Apply filters');
                vm.applyPriceFilter();
            }
        };
        
        vm.cities = [];
        vm.flights = [];
        vm.allflights = [];
        
        vm.FlightService = FlightService;

        vm.storageEngine = $window.sessionStorage;

        vm.getCities = function() {
            vm.FlightService.getCities()
            .then(function(data) { 
              vm.cities = data;
            },
            function(error) {
                console.log(error);
            });
        }

        vm.getFlights = function() {
            
            var storageData = {
                tripType: vm.tripType,
                toCity: vm.toCity,
                fromCity: vm.fromCity,
                passengers: vm.passengers,
                startDate: new Date(vm.startDate),
                endDate: new Date(vm.endDate)
            };
            
            var searchParams = {
                        tripType: vm.tripType,
                        to_city_id: vm.toCity.id,
                        from_city_id: vm.fromCity.id
            };
            
            vm.storageEngine.setItem('searchParams', angular.toJson(storageData));

            vm.FlightService.getFlights(searchParams)
            .then(function(data) { 
              vm.flights = vm.allflights = data;
              
              if(vm.flights.length > 0){
                  vm.minPrice = Math.min.apply(Math, data.map(function(o){ return o.price; }));
                  vm.maxPrice = Math.max.apply(Math, data.map(function(o){ return o.price; }));
                  vm.priceLimit = vm.maxPrice;
                  vm.slider_options.floor = vm.minPrice;
                  vm.slider_options.ceil = vm.maxPrice;
               }
            },
            function(error) {
                console.log(error);
            });
        }
        
        vm.applyPriceFilter = function(){
            vm.flights = vm.allflights.filter(function(obj) {
                if ((obj.price >= vm.minPrice) && (obj.price <= vm.maxPrice)) {
                    return true;
                } else {
                    return false;
                }
            });
        }
        
        if (vm.storageEngine.getItem('searchParams') != null) {
            var storageData = angular.fromJson(vm.storageEngine.getItem('searchParams'));
            
            vm.tripType = storageData.tripType;
            vm.toCity = storageData.toCity;
            vm.fromCity = storageData.fromCity;
            vm.passengers = storageData.passengers;
            vm.startDate = new Date(storageData.startDate);
            vm.endDate = new Date(storageData.endDate);
            
            vm.getFlights();
        }

        vm.getCities();
    }

})();