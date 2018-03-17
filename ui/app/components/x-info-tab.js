import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  state: service('global-state'),
});
