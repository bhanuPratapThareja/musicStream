app.value('recentPlaylists', []);

app.controller('playlistsController', ['$scope', '$ionicModal', '$interval', '$timeout', '$ionicBackdrop', 'playlistsFactory', '$state', '$ionicHistory', 'recentPlaylists', 'store', '$ionicScrollDelegate', '$ionicPlatform', '$ionicPopup',
function($scope, $ionicModal, $interval, $timeout, $ionicBackdrop, playlistsFactory, $state, $ionicHistory, recentPlaylists, store, $ionicScrollDelegate, $ionicPlatform, $ionicPopup){
  $scope.playlistsLoadingSpinner = true;
  $scope.platform = ionic.Platform.platform();

  $scope.$on("$ionicView.afterEnter", function(event){

    //android backbutton control
    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
    }, 1000);

    //player modal definition
    $ionicModal.fromTemplateUrl('templates/modals/player.html', {
      scope: $scope,
      hardwareBackButtonClose: false
    }).then(function(modal) {
      $scope.player = modal;
    });

    //addsModal modal definition
    $ionicModal.fromTemplateUrl('templates/modals/addsModal.html', {
      scope: $scope,
      animation: 'slide-in-right',
      hardwareBackButtonClose: false,
      backdropClickToClose: false
    }).then(function(modal) {
      $scope.addsModal = modal;
    });

    //loading playlists
    playlistsFactory.loadAllPlaylists()
    .then(function(response){
      var timer = $timeout(function(){
        $scope.playlistsLoadingSpinner = false;
        $scope.playlists = response.data.playlists;
        playlists = response.data.playlists;
      }, 3000).then(function(){$timeout.cancel(timer)});
    })

});


  ionic.Platform.ready(function(){

    //declaring play pause and dropdown scope variables
    $scope.playOn = true;
    $scope.pauseOn = false;
    $scope.showDropdownMenu = false;


    //interval to show add after every 15 mins
    var showAdd = function(){

      //show time to close add
          $scope.time = 5;
          $timeout(function(){
            $scope.addsModal.show();
            var timer = 5;
            $interval(function () {
              timer = timer - 1;
              $scope.time = timer;
              if(timer == 0){
                $scope.time = '';
              }
            },1000, 5).then(function(){
              timer = 5;
            });
          })


      //close add if time up
      var timer = $timeout(function(){
        if($scope.addsModal.isShown() == true){
          $scope.addsModal.hide();
        }
      }, 5000).then(function(){$timeout.cancel(timer)});

    }

    var add = $interval(showAdd, 900000);

    //close add by clicking close button
    $scope.closeAdd = function(){
        $scope.addsModal.hide();
        $ionicBackdrop.release();
    };


    //show dropdown when down arrow is clicked
    $scope.showDropdown = function(){
      $scope.showDropdownMenu = true;
    };

    //doSomething
    $scope.doSomething = function(){
      console.log('lets do something');
    };

    //open settings page
    $scope.goToSettings = function(){
      $interval.cancel(add);
      $scope.showDropdownMenu = false;
      $scope.player.remove();
      $scope.addsModal.remove();
        var timer = $timeout(function(){
          $state.go('settings', {}, {reload: true});
      }, 400).then(function(){$timeout.cancel(timer)});
    };

    //logout
    $scope.goToLoginPage = function(){
      $interval.cancel(add);
      var confirmPopup = $ionicPopup.confirm({
        title: 'Logout',
        template: 'Are you sure you want to logout?'
      });

      confirmPopup.then(function(res) {

        if(res == true){
          $timeout(function(){
            $scope.showDropdownMenu = false;
          }, 500);
          store.remove('access_token');
          $scope.player.remove();
          $scope.addsModal.remove();
            var timer = $timeout(function(){
              $state.go('signin', {}, {reload: true});
          }, 1000).then(function(){$timeout.cancel(timer)});
        } else {
          var timer = $timeout(function(){
            $scope.showDropdownMenu = false;
            $interval(showAdd, 10000);
          }, 500).then(function(){$timeout.cancel(timer)});
        }
     });
    };

    //open playlist
    $scope.openPlaylistModal = function(playlist){
      $scope.playlistImage = playlist.img;
      $scope.otherPlaylists = playlists;
      $scope.lastOpenPlaylist = playlist.id;
      $scope.player.show();
      $scope.playedplaylist = playlist.id;
    };

    //close playlist
    $scope.closePlaylistModal = function(){
      $scope.player.hide();
    };

    //open another playlist while one playlist is open
    $scope.openOtherPlaylist = function(otherPlaylist){
     $scope.closePlaylistModal();
     var timer = $timeout(function(){
       $scope.playlistImage = otherPlaylist.img;
       $scope.otherPlaylists = playlists;
       $scope.lastOpenPlaylist = otherPlaylist.id;
       $scope.player.show();
       $ionicScrollDelegate.$getByHandle('playerModal').scrollTop();
     }, 1000).then(function(){$timeout.cancel(timer)});
    };

    //manage bluetooth
    $scope.showBluetoothSettings = function(){
      $interval.cancel(add);
      $scope.player.hide();
      $scope.addsModal.hide();
      if(ionic.Platform.isIOS()){
	      OpenSettings.settings();
      } else {
        bluetoothSerial.showBluetoothSettings();
      }
    };

    $scope.onTouchPause = function(){
      $scope.addBorderPause = true;
    };

    $scope.onReleasePause = function(){
      $scope.addBorderPause = false;
      $scope.stopWhiteBckground = true;
    };


    $scope.onTouchPlay = function(){
      $scope.addBorderPlay = true;
    };

    $scope.onReleasePlay = function(){
      $scope.addBorderPlay = false;
    };

    $scope.pauseButtonClick = function(){
      $scope.pauseButtonTapped = true;
      angular.element(document.querySelectorAll('#pause-button-border')).addClass('hide-button-border');
      angular.element(document.querySelectorAll('#play-button-border')).removeClass('hide-button-border');
    };

    $scope.playButtonClick = function(){
      angular.element(document.querySelectorAll('#play-button-border')).addClass('hide-button-border');
      angular.element(document.querySelectorAll('#pause-button-border')).removeClass('hide-button-border');
    };

  });

}]);
