app.directive('dropDown', function($interval) {
  return{
    restrict: 'E',
    scope: false,
    templateUrl: 'templates/directiveTemplates/dropDown.html',
    controller: function($scope, $element, $attrs){

      //close dropdown when close button is clicked
      $scope.hideDropdown = function(){
        $scope.showDropdownMenu = false;
      };

      //close dropdown when playlist content is clicked
      $scope.contentClick = function(){
        $scope.showDropdownMenu = false;
      };

      $scope.onSwipeUp = function(){
        $scope.showDropdownMenu = false;
      };

    }
  }
});
