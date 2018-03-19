import Route from '@ember/routing/route';

export default Route.extend({
  beforeModel(/* transition */) {
    this.transitionTo('app'); // Implicitly aborts the on-going transition.
  }
});
