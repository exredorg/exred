import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  phoenixChannels: service(),
  state: service('global-state'),
  
  currentFlowId: null,
  currentFlow: null,
});
