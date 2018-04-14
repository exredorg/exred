import Component from '@ember/component';
import {inject as service} from '@ember/service';
import { observer } from '@ember/object';


export default Component.extend({
  state: service('global-state'),
  
  configBuffer: null,
  
  init: function(){
    this._super(...arguments);
    this._clearConfigBuffer();
  },

  stateUpdate_activeNode: observer('state.activeNodeId', function(){
    this._clearConfigBuffer();
  }),

  actions: {
    configUpdate: function(key, value){
      this.debug("UPDATED CONFIG BUFFER", key);
      this.set("configBuffer."+key, value);
      this.get('state').set('configChanged', true);
    }
  },

  willDestroyElement: function(){
    this._clearConfigBuffer();
  }, 
  
  _clearConfigBuffer: function(){
    let state = this.get('state');
    this.set('configBuffer', {});
    state.set('configChanged', false);
  }

});
