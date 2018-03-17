export function initialize(application) {
  // application.inject('route', 'foo', 'service:foo');
  application.store = application.__container__.lookup('service:store');
  window.App = application;  // or window.Whatever
}

export default {
  name: 'global',
  initialize
};
