angular.module('firebase.config', [])
  .constant('FBURL', 'https://pob.firebaseio.com')
  .constant('SIMPLE_LOGIN_PROVIDERS', ['password','facebook'])

  .constant('loginRedirectPath', '/login');
