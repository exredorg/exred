import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  state: service('global-state'),
  
  actions: {
    clickOnNode: function(nodeId){
      this.get('state').set('activeNodeId', nodeId);
    }
  }
});
