(function(){
'use strict';
  angular
    .module('NasaPhotosServices',[])
    .factory('NasaPhotosService', NasaPhotosService);

    NasaPhotosService.$inject = ['$http'];
    function NasaPhotosService($http){
    var service = this;
    service.apiKey = 'NtKofGbrMicAFrCNJLzwKnqur6QiVAV6rCzSauYb';
    service.getPhotoByDate = getPhotoByDate;
    return service;
  
    function getPhotoByDate(dateSelected){
      var url = 'https://api.nasa.gov/planetary/apod?api_key=' + service.apiKey + '&date=' + dateSelected; 
      return $http({
          method: 'GET',
          url: url
        }).then(function(response) {
          return response.data;
        });
    };
    
  };
}());
