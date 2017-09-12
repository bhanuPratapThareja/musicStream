app.controller('settingsController', ['$scope', '$timeout', '$ionicPlatform',
 function($scope, $timeout, $ionicPlatform){

  $scope.$on("$ionicView.afterEnter", function(event){

    //android backbutton control
    $ionicPlatform.registerBackButtonAction(function(e) {
      e.preventDefault();
    }, 125);

  });

  $scope.changeNotifications = function(notifications){
    console.log(notifications);
  };

  $scope.changeAddsSetting = function(adds){
    console.log(adds);
  };

}]);
