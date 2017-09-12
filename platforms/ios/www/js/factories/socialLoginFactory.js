app.factory('socialLoginFactory', ['$http', function($http){
  return{

    fbLogin: function(access_token){
      return $http({
        method: 'POST',
        url: 'http://api.radiomusic.exdan.ru/',
        data: {
          access_token: access_token
        }
      });
    },

    instaLogin: function(access_token){
      return $http({
        method: 'POST',
        url: 'http://api.radiomusic.exdan.ru/',
        data: {
          access_token: access_token
        }
      });
    },

    vkLogin: function(access_token){
      return $http({
        method: 'POST',
        url: 'http://api.radiomusic.exdan.ru/',
        data: {
          access_token: access_token
        }
      });
    },

    twitterLogin: function(access_token){
      return $http({
        method: 'POST',
        url: 'http://api.radiomusic.exdan.ru/',
        data: {
          access_token: access_token
        }
      });
    }

  }

}]);
