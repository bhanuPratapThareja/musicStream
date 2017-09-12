app.factory('playlistsFactory', ['$http', function($http){

  return{

    loadAllPlaylists: function(){
      return $http({
        method: 'GET',
        url: 'data/playlists.json'
      })
    }
  }

}]);
