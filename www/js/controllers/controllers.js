

/*-- SUPPORT-MENUS- --*/

app.controller('pakkaUICtrl', function($scope, $ionicPopover, $ionicHistory, $ionicModal) {



/*SEARCH*/

  $ionicModal.fromTemplateUrl('templates/search.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.search = modal;
  });

/*MORE*/

  $ionicModal.fromTemplateUrl('templates/more.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.more = modal;
  });


/*SETTINGS*/

  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };

});
