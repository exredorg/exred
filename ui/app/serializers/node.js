import ApplicationSerializer from './application';

export default ApplicationSerializer.extend({
  attrs: {
    jsPlumbEndpoints: {serialize: false}
  }
});
