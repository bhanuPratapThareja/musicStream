app.directive('oAuth', function($cordovaOauth, $http, store, $timeout, $state){
return{
  restrict: 'E',
  templateUrl: 'templates/directiveTemplates/oAuth.html',
  controller: function($scope, $element, $attrs){

    //fb oAuth
   $scope.facebookLogin = function() {
       $cordovaOauth.facebook("488494824871938", ["email, public_profile"]).then(function(result) {
         $http.get("https://graph.facebook.com/v2.2/me", {params: {access_token: result.access_token, fields: "email,name,gender,id,age_range", format: "json" }}).then(function(result){
          //  var email = result.data.email;
          //  var name = result.data.name;
          //  var gender = result.data.gender;
          //  var id = result.data.id;
           store.set('access_token', result.config.params.access_token);
           console.log(result.config.params.access_token);
           $timeout(function(){
             $state.go('playlists', {}, {reload: true});
           }, 1000);
         }, function(error){
             $timeout(function(){
               alert('There was some error with the connection. Please try again.');
             }, 1000);
         });

        //  socialLoginFactory.fbLogin(result.access_token)
          // .then(function(response){
          //   console.log("response from fb: " + response);
          // }, function(error){
          //   console.log("error from fb: " + error);
          // });
       });

      };

      //vk oauth
      $scope.vkLogin = function(){
        $cordovaOauth.vkontakte('5916505', ["first_name", "last_name", "email"]).then(function(result){
          store.set('access_token', result.access_token);
          $timeout(function(){
            $state.go('playlists', {}, {reload: true});
          }, 1000);
        }, function(error){
            if(error != "The sign in flow was canceled"){
              $timeout(function(){
                alert('There was some error with the connection. Please try again.');
              }, 1000);
            }
        });
      };


    //instagram oAuth
    $scope.instagramLogin = function(){
    //   var options = {
    //     location: 'no',
    //     clearcache: 'yes',
    //     toolbar: 'no'
    //   };
    //
    // $cordovaInAppBrowser.open('https://www.instagram.com/oauth/authorize?client_id=4421b8edd8b04d7b8b4df2196bc684e7&redirect_uri=http://localhost&response_type=token', '_blank', options)
    //   .then(function(result){
    //       console.log(angular.toJson(result));
    //   }, function(error){
    //     console.log(angular.toJson(error));
    //   });

      $cordovaOauth.instagram("4421b8edd8b04d7b8b4df2196bc684e7", ["basic"]).then(function(result){
        console.log(angular.toJson(result));
        });
      };


      //twitter oauth
      $scope.twitterLogin = function(){
        $cordovaOauth.twitter("JgMvlW3fiw0MyEeddVtqv17nv", "3tANKxru8FEgMoinJg1pqV2QhffUUgn7capC5BX500v92syeMZ")
          .then(function(result){
            console.log(angular.toJson(result));
          });
      };

    }
  }
});
