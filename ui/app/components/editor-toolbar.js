import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  phoenixChannels: service(),
  paperToaster: service(),
  state: service('global-state'),
  
  actions: {
    log: function(what){
      this.debug(what);
    },
    requestDeploy: function(){
      this.get('paperToaster').show('Requesting Deploy', {duration: 2000, position: "top right"});
      this.get('phoenixChannels').push('request', {action: 'deploy'});
    }
  }
});
