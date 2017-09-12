app.service('formValidation', ['$q', function($q){
  var validity = {};

  this.validateSignupInput = function(registrationForm, regPhone, regPassword){
    var q = $q.defer();

    if(registrationForm.regPhone.$pristine && registrationForm.regPassword.$pristine){
      validity.isPhoneAndPasswordEmpty = true;
      validity.isPhoneEmpty = false;
      validity.isPhoneInvalid = false;
      validity.isPasswordEmpty = false;
      validity.isPasswordShort = false;
      validity.isPasswordInvalid = false;
      validity.onlyOneError = true;
      validity.twoErrors = false;
      validity.isDataValid = false;
      q.resolve(validity);

    } else if(registrationForm.regPhone.$pristine && registrationForm.regPassword.$dirty){

      if(registrationForm.regPassword.$modelValue.length < 4){
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = true;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = true;
        validity.isPasswordInvalid = true;
        validity.onlyOneError = false;
        validity.twoErrors = true;
        validity.isDataValid = false;
        q.resolve(validity);

      } else {
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = true;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = true;
        validity.twoErrors = false;
        validity.isDataValid = false;
        q.resolve(validity);

      }
    } else if(registrationForm.regPhone.$dirty && registrationForm.regPassword.$pristine){

      if(registrationForm.regPhone.$modelValue.length < 10){
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = true;
        validity.isPasswordEmpty = true;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = false;
        validity.twoErrors = true;
        validity.isDataValid = false;
        q.resolve(validity);

      } else {
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = true;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = true;
        validity.twoErrors = false;
        validity.isDataValid = false;
        q.resolve(validity);
      }

    } else {
      //registrationForm.regPhone.$dirty && registrationForm.regPassword.$dirty
      if(registrationForm.regPhone.$modelValue.length < 10){

        if(registrationForm.regPassword.$modelValue.length < 4){
          validity.isPhoneAndPasswordEmpty = false;
          validity.isPhoneEmpty = false;
          validity.isPhoneInvalid = true;
          validity.isPasswordEmpty = false;
          validity.isPasswordShort = true;
          validity.isPasswordInvalid = false;
          validity.onlyOneError = false;
          validity.twoErrors = true;
          validity.isDataValid = false;
          q.resolve(validity);

        } else {
          validity.isPhoneAndPasswordEmpty = false;
          validity.isPhoneEmpty = false;
          validity.isPhoneInvalid = true;
          validity.isPasswordEmpty = false;
          validity.isPasswordShort = false;
          validity.isPasswordInvalid = false;
          validity.onlyOneError = true;
          validity.twoErrors = false;
          validity.isDataValid = false;
          q.resolve(validity);
        }

      } else {

        if(registrationForm.regPassword.$modelValue.length < 4){
          validity.isPhoneAndPasswordEmpty = false;
          validity.isPhoneEmpty = false;
          validity.isPhoneInvalid = false;
          validity.isPasswordEmpty = false;
          validity.isPasswordShort = true;
          validity.isPasswordInvalid = false;
          validity.onlyOneError = true;
          validity.twoErrors = false;
          validity.isDataValid = false;
          q.resolve(validity);

        } else {
          validity.isPhoneAndPasswordEmpty = false;
          validity.isPhoneEmpty = false;
          validity.isPhoneInvalid = false;
          validity.isPasswordEmpty = false;
          validity.isPasswordShort = false;
          validity.isPasswordInvalid = false;
          validity.onlyOneError = false;
          validity.twoErrors = false;
          validity.isDataValid = true;
          q.resolve(validity);
        }
      }
    }

    return q.promise;
  };

  this.validateSigninInput = function(signinForm, loginPhone, loginPassword){
    var q = $q.defer();

    if(signinForm.loginPhone.$pristine && signinForm.loginPassword.$pristine){
      validity.isPhoneAndPasswordEmpty = true;
      validity.isPhoneEmpty = false;
      validity.isPhoneInvalid = false;
      validity.isPasswordEmpty = false;
      validity.isPasswordShort = false;
      validity.isPasswordInvalid = false;
      validity.onlyOneError = true;
      validity.twoErrors = false;
      validity.isDataValid = false;
      q.resolve(validity);

    } else if(signinForm.loginPhone.$pristine && signinForm.loginPassword.$dirty) {
      validity.isPhoneAndPasswordEmpty = false;
      validity.isPhoneEmpty = true;
      validity.isPhoneInvalid = false;
      validity.isPasswordEmpty = false;
      validity.isPasswordShort = false;
      validity.isPasswordInvalid = false;
      validity.onlyOneError = true;
      validity.twoErrors = false;
      validity.isDataValid = false;
      q.resolve(validity);

    } else if(signinForm.loginPhone.$dirty && signinForm.loginPassword.$pristine){

      if(signinForm.loginPhone.$modelValue.length < 10){
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = true;
        validity.isPasswordEmpty = true;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = false;
        validity.twoErrors = true;
        validity.isDataValid = false;
        q.resolve(validity);

      } else {
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = true;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = true;
        validity.twoErrors = false;
        validity.isDataValid = false;
        q.resolve(validity);
      }

    } else {

      if(signinForm.loginPhone.$modelValue.length < 10){
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = true;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = true;
        validity.twoErrors = false;
        validity.isDataValid = false;
        q.resolve(validity);

      } else {
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = false;
        validity.twoErrors = false;
        validity.isDataValid = true;
        q.resolve(validity);
      }

    }

    return q.promise;
  };

  this.validateForgotInput = function(forgotPasswordForm, forgotPhone){
    var q = $q.defer();

    if(forgotPasswordForm.forgotPhone.$pristine){
      validity.isPhoneAndPasswordEmpty = false;
      validity.isPhoneEmpty = true;
      validity.isPhoneInvalid = false;
      validity.isPasswordEmpty = false;
      validity.isPasswordShort = false;
      validity.isPasswordInvalid = false;
      validity.onlyOneError = true;
      validity.twoErrors = false;
      validity.isDataValid = false;
      q.resolve(validity);

    } else {

      if(forgotPasswordForm.forgotPhone.$modelValue.length < 10){
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = true;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = true;
        validity.twoErrors = false;
        validity.isDataValid = false;
        q.resolve(validity);

      } else {
        validity.isPhoneAndPasswordEmpty = false;
        validity.isPhoneEmpty = false;
        validity.isPhoneInvalid = false;
        validity.isPasswordEmpty = false;
        validity.isPasswordShort = false;
        validity.isPasswordInvalid = false;
        validity.onlyOneError = false;
        validity.twoErrors = false;
        validity.isDataValid = true;
        q.resolve(validity);
      }
    }

    return q.promise;
  };
}]);
