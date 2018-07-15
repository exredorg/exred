import Component from '@ember/component';
import {inject as service} from '@ember/service';


export default Component.extend({
  state: service('global-state'),
  
  //flowNavOpen: null,
  currentFlowId: null,
  addDialogOpened: null,
  newFlowName: null,
  newFlowInfo: null,
  newFlowService: null,

  actions:{
    toggle: function(what){
      let current = this.get(what);
      this.set(what, !current);
    },
    clickOnFlow: function(flowId){
      let state = this.get('state');
      state.set('activeFlowId', flowId);
      state.set('activeNodeId', null);
    },
    
    openAddFlow: function(service){
      this.debug('action/openAddFlow serviceId', service.id);
      this.set('newFlowService', service);
      this.set('addDialogOpened', true);
    },
    
    clearNewFlowArgs: function(){
      this.set('newFlowName', null);
      this.set('newFlowInfo', null);
      this.set('newFlowServiceId', null);
    }
  }
});
