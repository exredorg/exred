import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import {inject as service} from '@ember/service';

export default Route.extend({
  state: service('global-state'),
  
  model() {
    return RSVP.hash({
      services:     this.store.findAll('service'),
      flows:        this.store.findAll('flow'),
      nodes:        this.store.findAll('node'),
      connections:  this.store.findAll('connection')
    })
  }, 
  
  setupController: function(controller, model) {
    controller.set('model', model);
    controller.set('currentFlowId', model.flows.get('firstObject').id);
    
    let firstFlow = model.flows.get('firstObject');
    this.get('state').set('activeFlowId', firstFlow.id);
  }
});
