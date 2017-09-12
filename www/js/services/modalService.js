app.service('modalService', ['$rootScope', '$ionicModal', function($rootScope, $ionicModal){

  //login error modal definition
  var errorModal = $ionicModal.fromTemplateUrl('templates/modals/loginError.html', {
    scope: $rootScope,
    animation: 'slide-in-down'
    }).then(function(modal) {
    $rootScope.errorModal = modal;
    return $rootScope.errorModal;
  });

  //loading template modal definition
  var loadingModal = $ionicModal.fromTemplateUrl('templates/modals/loadingTemplate.html', {
    scope: $rootScope,
    animation: 'slide-in-up'
    }).then(function(modal) {
    $rootScope.loadingModal = modal;
    return $rootScope.loadingModal;
  });


  //login error functions
  this.loginErrorModal = function(response) {
    $rootScope.isPhoneAndPasswordEmpty = response.isPhoneAndPasswordEmpty;
    $rootScope.isPhoneEmpty = response.isPhoneEmpty;
    $rootScope.isPhoneInvalid = response.isPhoneInvalid;
    $rootScope.isPasswordEmpty = response.isPasswordEmpty;
    $rootScope.isPasswordShort = response.isPasswordShort;
    $rootScope.isPasswordInvalid = response.isPasswordInvalid;
    $rootScope.onlyOneError = response.onlyOneError;
    $rootScope.twoErrors = response.twoErrors;
    $rootScope.errorModal.show();
    return errorModal;
  };

  this.removeLoginErrorModal = function(){
    $rootScope.errorModal.remove();
    var errorModal = $ionicModal.fromTemplateUrl('templates/modals/loginError.html', {
      scope: $rootScope,
      animation: 'slide-in-down'
      }).then(function(modal) {
      $rootScope.errorModal = modal;
      return $rootScope.errorModal;
    });
  };


  //loading template functions
  this.showLoadingTemplate = function(){
    $rootScope.loadingModal.show();
    return loadingModal;
  };

  this.hideLoadingTemplate = function(){
    $rootScope.loadingModal.remove();
    var loadingModal = $ionicModal.fromTemplateUrl('templates/modals/loadingTemplate.html', {
      scope: $rootScope,
      animation: 'slide-in-up'
      }).then(function(modal) {
      $rootScope.loadingModal = modal;
      return $rootScope.loadingModal;
    });
  };

}]);
