import Component from '@ember/component';
import {inject as service} from '@ember/service';


export default Component.extend({
  state: service('global-state'),
  
  //flowNavOpen: null,
  currentFlowId: null,
  clickedFlow: null,

  actions:{
    toggle: function(what){
      let current = this.get(what);
      this.set(what, !current);
    },
    clickOnFlow: function(flowId){
      this.get('state').set('activeFlowId', flowId);
    }
  }
});
