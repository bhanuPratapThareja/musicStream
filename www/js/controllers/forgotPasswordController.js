app.controller('forgotPasswordController', ['$scope', '$ionicModal', 'formValidation', 'formFactory', '$timeout', '$state', 'modalService',
  function($scope, $ionicModal, formValidation, formFactory, $timeout, $state, modalService){

  $scope.$on('$ionicView.afterEnter', function(){

    //codeInput modal definition
    $ionicModal.fromTemplateUrl('templates/modals/codeInput.html', {
      scope: $scope,
      focusFirstInput: true,
      backdropClickToClose: false,
      hardwareBackButtonClose: false,
      animation: 'slide-in-up'
        }).then(function(modal) {
      $scope.smsInputModal = modal;
    });
  });

  ionic.Platform.ready(function(){

    //setting form error scope variables
    $scope.isPhoneAndPasswordEmpty = false;
    $scope.isPhoneEmpty = false;
    $scope.isPhoneInvalid = false;
    $scope.isPasswordEmpty = false;
    $scope.isPasswordShort = false;
    $scope.isPasswordInvalid = false;
    $scope.onlyOneError = false;
    $scope.twoErrors = false;
    $scope.isDataValid = false;

    //setting sms code input modal scope variables
    $scope.smsValue = false;
    $scope.codeSpinner = false;

    $scope.onTouch = function(){
      angular.element(document.getElementById('buttonForgot')).addClass('button-pressed');
    };

    $scope.onRelease = function(){
      angular.element(document.getElementById('buttonForgot')).removeClass('button-pressed');
    };

    $scope.hideErrorModalbySlideUP = function(){
      $scope.loginErrorModal.hide();
    };

    //function to set $pristine on email if field is empty
    $scope.updatePhoneModel = function(forgotPasswordForm, forgotPhone){
      if(forgotPhone == ''){
        forgotPasswordForm.forgotPhone.$setPristine();
      }
    };

    $scope.closeInputModal = function(){
      $scope.smsInputModal.hide();
    };

    $scope.getSmsCodeFromUser = function(input1, input2, input3, input4){
      smsCode = input1 + input2 + input3 + input4;
      $scope.smsValue = true;
    };

    //forgot password function
    $scope.forgotPassword = function(forgotPasswordForm, forgotPhone){
      forgotPhone = '7' + forgotPhone;
      formValidation.validateForgotInput(forgotPasswordForm, forgotPhone)
        .then(function(response){
          if(response.isDataValid == true){

            if(1==1){
              formFactory.getSmsForPassword(forgotPhone)
                .then(function(response){

                  if(1==1){
                    if(cordova.plugins.Keyboard.isVisible){
                      cordova.plugins.Keyboard.close();
                      $timeout(function(){
                        $scope.smsInputModal.show();
                      }, 750);
                    } else {
                      $scope.smsInputModal.show();
                    }
                    var unwatch = $scope.$watch('smsValue', function(newValue){
                      if(newValue == true){
                        $scope.smsValue = false;
                        $scope.codeSpinner = true;

                        formFactory.setNewPassword(smsCode)
                          .then(function(response){

                            $scope.smsValue = false;
                            $scope.codeSpinner = false;

                            if(1==1){
                              $scope.smsInputModal.remove();

                              // store.set('access_token', response.data.access_token);
                              $timeout(function(){

                                  $timeout(function(){
                                    $state.go('signin', {}, {reload: true});
                                  }, 500);

                              }, 2000);

                            } else if(1==2) {
                              alert('The code was inccorect. Please try again.');
                            } else {
                              alert('There was some error with the connection. Please try again.');
                            }

                          });
                      }

                    });

                  } else {
                    alert('There was some error with the connection. Please try again.');
                  }

                });
            } else {
              alert('There was some error with the connection. Please try again.');
            }


          } else {
            if(cordova.plugins.Keyboard.isVisible){
              cordova.plugins.Keyboard.close();
              $timeout(function(){
                modalService.loginErrorModal(response);
              }, 750);
            } else {
              modalService.loginErrorModal(response);
            }
          }
        });
    };

  });

}])
