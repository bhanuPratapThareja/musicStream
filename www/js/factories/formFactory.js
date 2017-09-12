app.factory('formFactory', ['$http', '$q', function($http, $q){
  return{

    loginUser: function(loginPhone, loginPassword){
      var q = $q.defer();
      q.resolve(loginPhone)
      return q.promise;
      // return $http({
      //   method: 'POST',
      //   url: 'http://api.radiomusic.exdan.ru/',
      //   data: {
      //     login: loginPhone,
      //     password: loginPassword
      //   }
      // });
    },

    signupUser: function(regPhone){
      var q = $q.defer();
      q.resolve(regPhone)
      return q.promise;
      // return $http({
      //   method: 'GET',
      //   url: 'http://api.radiomusic.exdan.ru/',
      //   params: {
      //     login: regPhone
      //   }
      // });
    },

    signupAuthentication: function(regPhone, regPassword, smsCode){
      var q = $q.defer();
      q.resolve(regPhone + regPassword + smsCode)
      return q.promise;
      // return $http({
      //   method: 'POST',
      //   url: 'http://api.radiomusic.exdan.ru/',
      //   data: {
      //     login: regPhone,
      //     password: regPassword,
      //     smsCode: smsCode
      //   }
      // })
    },

    getSmsForPassword: function(forgotPhone){
      var q = $q.defer();
      q.resolve(forgotPhone);
      return q.promise;
      // return $http({
      //   method: 'GET',
      //   url: 'http://api.radiomusic.exdan.ru/',
      //   params: {
      //     login: forgotPhone
      //   }
      // });
    },

    setNewPassword: function(smsCode){
      var q = $q.defer();
      q.resolve('abc');
      return q.promise;
    }

  }
}]);
