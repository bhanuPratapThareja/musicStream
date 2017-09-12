app.service('formValidationService', ['$q', function($q){
  var validity = {};
  var regexForSmallLetter = new RegExp('^(?=.*[a-z]).+$');
  var regexForCapitalLetter = new RegExp('^(?=.*[A-Z]).+$');
  var regexForNumber = new RegExp('^(?=.*[0-9]).+$');

  function passwordValidity(password){
    var check1 = regexForSmallLetter.test(password);
    if(check1 === true){
      var check2 = regexForCapitalLetter.test(password);
      if(check2 === true){
        var check3 = regexForNumber.test(password);
        if( check3 === true){
          return check3;
        } else {
          return check3;
        }
      } else {
        return check2;
      }
    } else {
      return check1;
    }
  }

  this.validateSignupInput = function(registrationForm, regPhone, regPassword){
    var q = $q.defer();

      // case1 empty empty empty
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


      //case 3 empty val empty
      } else if(registrationForm.regPhone.$pristine && registrationForm.regPassword.$dirty) {

        if(registrationForm.regPassword.$modelValue.length < 4){
          validity.isPhoneAndPasswordEmpty = false;
          validity.isPhoneEmpty = true;
          validity.isPhoneInvalid = false;
          validity.isPasswordEmpty = false;
          validity.isPasswordShort = true;
          validity.isPasswordInvalid = false;
          validity.onlyOneError = false;
          validity.twoErrors = true;
          validity.isDataValid = false;
          q.resolve(validity);

        } else {
          if(passwordValidity(registrationForm.regPassword.$modelValue)){
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
            validity.isPhoneAndPasswordEmpty = false;
            validity.isPhoneEmpty = true;
            validity.isPhoneInvalid = false;
            validity.isPasswordEmpty = false;
            validity.isPasswordShort = false;
            validity.isPasswordInvalid = true;
            validity.onlyOneError = false;
            validity.twoErrors = true;
            validity.isDataValid = false;
            q.resolve(validity);
          }
        }

      //case 5 val empty empty
      } else if(registrationForm.regPhone.$dirty && registrationForm.regPassword.$pristine){

        if(registrationForm.regPhone.$modelValue.length < 10){
          //case valInValid empty empty
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
          //case valValid empty empty
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

            if(passwordValidity(registrationForm.regPassword.$modelValue)){
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
              validity.isPhoneInvalid = true;
              validity.isPasswordEmpty = false;
              validity.isPasswordShort = false;
              validity.isPasswordInvalid = true;
              validity.onlyOneError = false;
              validity.twoErrors = true;
              validity.isDataValid = false;
              q.resolve(validity);
            }
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

            if(passwordValidity(registrationForm.regPassword.$modelValue)){
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
            } else {
              validity.isPhoneAndPasswordEmpty = false;
              validity.isPhoneEmpty = false;
              validity.isPhoneInvalid = false;
              validity.isPasswordEmpty = false;
              validity.isPasswordShort = false;
              validity.isPasswordInvalid = true;
              validity.onlyOneError = true;
              validity.twoErrors = false;
              validity.isDataValid = false;
              q.resolve(validity);
            }
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

    } else if (signinForm.loginPhone.$pristine && signinForm.loginPassword.$dirty){
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

    } else if (signinForm.loginPhone.$dirty && signinForm.loginPassword.$pristine){

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

    } else { //inner else

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
