app.value('mostPlayedPlaylistArray', []);

app.directive('mostPlayedPlaylists', function($http, mostPlayedPlaylistArray,$timeout){
    return{
      restrict: 'E',
      templateUrl: 'templates/directiveTemplates/mostPlayedPlaylists.html',
      scope:{
        playlist: '=playlist'
      },
      link: function($scope, element, attrs){
        $timeout(function () {
      //    angular.element(document.getElementById("foo")).on('click',function(e){
  alert("click:"+$scope.playlist);

      //    })
    },2000);

//alert("dddd"+$scope.playlist)
      },
      controller: function($scope, $element, $attrs){

        // mostPlayedPlaylistArray.push($scope.directivePlaylists);
        // $scope.recentPlaylists = mostPlayedPlaylistArray;

        $http.get('data/playlists.json')
        .then(function(response){
          $scope.recentPlaylists = response.data.playlists;
         });

      }
    }
});
