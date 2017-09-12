app.config(function($stateProvider, $urlRouterProvider, $sceDelegateProvider, $ionicConfigProvider, $httpProvider) {

  // $httpProvider.interceptors.push('apiInterceptor');

  $sceDelegateProvider.resourceUrlWhitelist([
    'https://www.googleapis.com/youtube/v3/search',
    'http://api.radiomusic.exdan.ru/**',
    'self'
   ]);

   $ionicConfigProvider.views.transition('platform');
   $ionicConfigProvider.views.swipeBackEnabled(false);

  $stateProvider

    .state('signin', {
    url: '/signin',
    templateUrl: function(){
      if(ionic.Platform.isAndroid()){
        return 'templates/androidLoginTemplates/signinAndroid.html';
      }
      return 'templates/signin.html';
    },
    controller: 'loginController',
    cache: false
  })

  .state('signup', {
    url: '/signup',
    templateUrl: function(){
      if(ionic.Platform.isAndroid()){
        return 'templates/androidLoginTemplates/signupAndroid.html';
      }
      return 'templates/signup.html';
    },
    controller: 'signupController',
    cache: false
  })

  .state('playlists', {
    url: '/home',
    templateUrl: 'templates/playlists.html',
    controller: 'playlistsController',
    cache: false
  })

  .state('forgot', {
    url: '/forgot',
    templateUrl: function(){
      if(ionic.Platform.isAndroid()){
        return 'templates/androidLoginTemplates/forgotAndroid.html';
      }
      return 'templates/forgot.html';
    },
    controller: 'forgotPasswordController'
  })

  .state('mymusic', {
    url: '/mymusic',
    templateUrl: 'templates/mymusic.html',
    controller: 'pakkaUICtrl'
  })

  .state('invite', {
    url: '/invite',
    templateUrl: 'templates/invite.html',
    controller: 'pakkaUICtrl'
  })

  .state('rewards', {
    url: '/rewards',
    templateUrl: 'templates/rewards.html',
    controller: 'pakkaUICtrl'
  })

  .state('playmusic', {
    url: '/playmusic',
    templateUrl: 'templates/playmusic.html',
    controller: 'pakkaUICtrl'
  })

  .state('playerqueue', {
    url: '/playerqueue',
    templateUrl: 'templates/playerqueue.html',
    controller: 'pakkaUICtrl'
  })

  .state('settings', {
    url: '/settings',
    templateUrl: 'templates/settings.html',
    controller: 'settingsController',
    cache: false
  })

  .state('profile', {
    url: '/profile',
    templateUrl: 'templates/profile.html',
    controller: 'pakkaUICtrl'
  })

  .state('editprofile', {
    url: '/editprofile',
    templateUrl: 'templates/editprofile.html',
    controller: 'pakkaUICtrl'
  })

  .state('editorpick', {
    url: '/editorpick',
    templateUrl: 'templates/editorpick.html',
    controller: 'pakkaUICtrl'
  })

  .state('newrelease', {
    url: '/newrelease',
    templateUrl: 'templates/newrelease.html',
    controller: 'pakkaUICtrl'
  })

  .state('topchart', {
    url: '/topchart',
    templateUrl: 'templates/topchart.html',
    controller: 'pakkaUICtrl'
  })

  .state('featured', {
    url: '/featured',
    templateUrl: 'templates/featured.html',
    controller: 'pakkaUICtrl'
  })


$urlRouterProvider.otherwise('/signin')



});
