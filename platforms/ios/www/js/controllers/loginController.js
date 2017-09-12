//login Controller
app.controller('loginController', ['$scope', '$state', '$timeout', '$stateParams', '$cordovaOauth', 'formFactory', 'store', 'formValidation', '$ionicPlatform', 'modalService',
function($scope, $state, $timeout, $stateParams, $cordovaOauth, formFactory, store, formValidation, $ionicPlatform, modalService){

  $scope.$on("$ionicView.afterEnter", function(event){

    //android backbutton control
    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
    }, 175);


    var access_token = store.get('access_token');

    if(access_token){
      $state.go('playlists', {}, {reload: true});
    }

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


  // function to set $pristine on email if field is empty
    $scope.updatePhoneModel = function(signinForm, loginPhone){
      if(loginPhone == ''){
        signinForm.loginPhone.$setPristine();
      }
    };

  // function to set $pristine on password if field is empty
    $scope.updatePasswordModel = function(signinForm, loginPassword){
      if(loginPassword == ''){
        signinForm.loginPassword.$setPristine();
      }
    };

    $scope.onTouch = function(){
      angular.element(document.getElementById('buttonLogin')).addClass('button-pressed');
    };

    $scope.onRelease = function(){
      angular.element(document.getElementById('buttonLogin')).removeClass('button-pressed');
    };

    $scope.hideErrorModalbySlideUP = function(){
      $scope.loginErrorModal.hide();
    };

  //login function
    $scope.login = function(signinForm, loginPhone, loginPassword){
      loginPhone = '7' + loginPhone;

      if(loginPhone == 79999999999 && loginPassword == 1234){
        var timer1 = $timeout(function(){
          if(cordova.plugins.Keyboard.isVisible){
            cordova.plugins.Keyboard.close();
            $timeout(function(){
              modalService.showLoadingTemplate();
            }, 750);
          } else {
            modalService.showLoadingTemplate();
          }
         var timer2 = $timeout(function(){
           $state.go('playlists', {}, {reload: true});
           var timer3 = $timeout(function(){
             modalService.hideLoadingTemplate();
             modalService.removeLoginErrorModal();
           }, 500).then(function(){$timeout.cancel(timer3)});
         }, 500).then(function(){$timeout.cancel(timer2)});
       }, 1000).then(function(){$timeout.cancel(timer1)});
     } else {

       formValidation.validateSigninInput(signinForm, loginPhone, loginPassword)
         .then(function(response){

           if(response.isDataValid == true){

             formFactory.loginUser(loginPhone, loginPassword)
             .then(function(response){

               if(response.status >= 200 && response.status <= 300){

                 store.set('access_token', response.data.access_token);        //setting access token in storage
                 modalService.removeLoginErrorModal();                             //removing error modal from scope

                 var timer1 = $timeout(function(){
                   if(cordova.plugins.Keyboard.isVisible){
                     cordova.plugins.Keyboard.close();
                     $timeout(function(){
                       modalService.showLoadingTemplate();
                     }, 750);
                   } else {
                     modalService.showLoadingTemplate();
                   }
                  var timer2 = $timeout(function(){
                    $state.go('playlists', {}, {reload: true});
                    var timer3 = $timeout(function(){
                      modalService.hideLoadingTemplate();
                      modalService.removeLoginErrorModal();
                    }, 500).then(function(){$timeout.cancel(timer3)});
                  }, 500).then(function(){$timeout.cancel(timer2)});
                }, 1000).then(function(){$timeout.cancel(timer1)});

            } else {
              alert('There was some error with the connection. Please try again.');
            }

          });

           } else {
             if(cordova.plugins.Keyboard.isVisible){
               cordova.plugins.Keyboard.close();
               $timeout(function(){
                 modalService.loginErrorModal(response);
               }, 400);
             } else {
               modalService.loginErrorModal(response);
             }
           }
         });

     }


   };


  });

}]);
