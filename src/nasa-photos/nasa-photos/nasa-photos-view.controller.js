(function(){
'use strict';
angular
  .module('NasaPhotosListControllers',[])
  .controller('NasaPhotosListController', NasaPhotosListController);

  NasaPhotosListController.$inject = ['NasaPhotosService', '$mdDialog'];
  function NasaPhotosListController(NasaPhotosService, $mdDialog){
   var vm = this;
   vm.dateSelected = new Date();
   vm.getPhotoByDate = getPhotoByDate;
   vm.showMore = showMore;
   
   function getPhotoByDate(dateSelected){
    var date = getDateInApiFormat(dateSelected);    
    NasaPhotosService.getPhotoByDate(date)
    .then(function(response){
     vm.photo = response;
    }, function(err){
      var alert = $mdDialog.alert({
        title: 'Error',
        textContent: err.data.msg,
        ok: 'OK :('
      });
      $mdDialog
      .show(alert)
      .finally(function() {
       alert = undefined;
      });
    });
   };
   
  function getDateInApiFormat(date){
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  };
   
  function showMore(event) {
    $mdDialog.show({
      controller: MoreInfoDialogController,
      controllerAs: 'vm',
      templateUrl: 'src/nasa-photos/nasa-photos/moreinfo.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: event,
      clickOutsideToClose: true,
      fullscreen: true,
      locals: {
        photoInfo: vm.photo
      },
    });
  };
   
  MoreInfoDialogController.inject = ['$mdDialog', 'photoInfo']; 
  function MoreInfoDialogController($mdDialog, photoInfo){
    var vm = this;
    vm.photo = photoInfo  ;
    vm.close = close;

    function close(){
      $mdDialog.hide();        
    };
  };
   
  }
}());