app.value('smsCode', '');

app.controller('signupController', ['$scope', '$ionicModal', 'formValidation', 'formFactory', 'smsCode', 'store', '$state', '$timeout', 'modalService',
  function($scope, $ionicModal, formValidation, formFactory, smsCode, store, $state, $timeout, modalService){

  $scope.$on("$ionicView.afterEnter", function(event){


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


    $scope.regex = '^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$'

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
    $scope.smsCodeProvided = false;

    $scope.onTouch = function(){
      angular.element(document.getElementById('buttonSignup')).addClass('button-pressed');
    };

    $scope.onRelease = function(){
      angular.element(document.getElementById('buttonSignup')).removeClass('button-pressed');
    };

    $scope.hideErrorModalbySlideUP = function(){
      $scope.loginErrorModal.hide();
    };

    // function to set $pristine on email if field is empty
      $scope.updatePhoneModel = function(registrationForm, regPhone){
        if(regPhone == ''){
          registrationForm.regPhone.$setPristine();
        }
      };

    // function to set $pristine on password if field is empty
      $scope.updatePasswordModel = function(registrationForm, regPassword){
        if(regPassword == ''){
          registrationForm.regPassword.$setPristine();
        }
      };

    // function to set $pristine on password repeat if field is empty
      $scope.updatePasswordRepeatModel = function(registrationForm, repeatRegPassword){
        if(repeatRegPassword == ''){
          registrationForm.repeatRegPassword.$setPristine();
        }
      };

      $scope.openInputModal = function(){
        $scope.smsInputModal.show();
      };

      $scope.closeInputModal = function(){
        $scope.smsInputModal.hide();
        $scope.smsValue = false;
      };

      $scope.getSmsCodeFromUser = function(input1, input2, input3, input4){
        smsCode = input1 + input2 + input3 + input4;
        $scope.smsValue = true;
      };

    //register function
    $scope.register = function(registrationForm, regPhone, regPassword){
      regPhone = '7' + regPhone;
      formValidation.validateSignupInput(registrationForm, regPhone, regPassword)
        .then(function(response){
          if(response.isDataValid == true){

            formFactory.signupUser(regPhone)
              .then(function(response){

                if(true){
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
                      $scope.smsCodeProvided = true;
                      $scope.codeSpinner = true;

                      formFactory.signupAuthentication(regPhone, regPassword, smsCode)
                        .then(function(response){

                          if(true){

                            // store.set('access_token', response.data.access_token);
                            var timer1 = $timeout(function(){
                              $scope.smsValue = false;
                              $scope.smsCodeProvided = false;
                              $scope.codeSpinner = false;
                              $scope.smsInputModal.remove();
                                var timer2 = $timeout(function(){
                                  unwatch();
                                  $state.go('playlists', {}, {reload: true});
                                }, 1000).then(function(){$timeout.cancel(timer2)});

                            }, 2000).then(function(){$timeout.cancel(timer1)});

                          } else if(1==2) {
                            alert('The code was inccorect. Please try again.');
                            $scope.smsValue = false;
                            $scope.smsCodeProvided = false;
                            $scope.codeSpinner = false;
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
            if(cordova.plugins.Keyboard.isVisible){
              cordova.plugins.Keyboard.close();
              var timer = $timeout(function(){
                modalService.loginErrorModal(response);
              }, 750).then(function(){$timeout.cancel(timer)});
            } else {
              modalService.loginErrorModal(response);
            }
          }
        });
    };

  });

}]);
