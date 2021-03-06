import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('app', function() {});
  this.route('auth', function() {
    this.route('login');
    this.route('register');
  });
});

export default Router;
