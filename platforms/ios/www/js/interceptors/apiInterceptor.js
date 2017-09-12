app.factory('apiInterceptor', [function(){
  return{
    request: function(config){

        config.params = {
          apikey: 'ugdoewhfo742gi2wuoe'
        };
        console.log(angular.toJson(config));
        return config;
      }

    }

}]);
