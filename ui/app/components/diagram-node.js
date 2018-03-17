import Ember from 'ember';
import Component from '@ember/component';
import { computed } from '@ember/object';
import {inject as service} from '@ember/service';


export default Component.extend({
  phoenixChannels: service(),
  
  // contains the elementId of the node where the radio button was clicked on
  // we clear this right after the click
  firingNode: null,

  // passed in from parent component
  jspInstance: null,
  model: null, //node from store

  classNames: ["exred-diagram-node", "jtk-node"],
  classNameBindings: ['isEnabled:exred-enabled:exred-disabled', 'classNameForCategory'],

  attributeBindings: ['style'],
  
  isEnabled: true,  

  classNameForCategory: computed('model.category', function(){
    let category=this.get('model').get('category');
    return 'exred-category-'+category;
  }),


  actions: {
    fire: function(){
      let nodeId = this.elementId;
      this.get('phoenixChannels').push('request', {action: 'fire', node_id: nodeId});
      this.debug("Fired:", this.elementId);
      this.set('firingNode', null);
    }
  },

  
  init: function(){
    this._super(...arguments);

    let node = this.get('model');

    let style = [
      "left: ", node.get('x'), "px; ",
      "top: ",  node.get('y'), "px; ",
    ].join('');

    this.set('style', Ember.String.htmlSafe(style));
    this.set('elementId', this.model.id);
  },

  didInsertElement: function(){
    let jspi = this.jspInstance;
    
    if (jspi){
      
    
    // https://github.com/jsplumb/katavorio/wiki#draggables
    jspi.draggable(this.elementId, { 
      grid: [20, 20], 
      stop: (params) => this._dragStop(params) 
    });

    let category = this.get('model').get('category');
    
    if (category != 'daemon'){
      // set up endpoints
      let endpoint_common = {
        endpoints: ["Rectangle", "Dot"],
        container: "canvas",
        isSource: true,
        isTarget: true,
        // connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
        connector: [ "Bezier", { radius: 30 } ],
        maxConnections: 10,
        //anchors:[ "Left", "Right" ],
        paintStyle: {
            stroke: "#446e99",
            fill: "#dddddd",
            radius: 5,
            strokeWidth: 2
        },
      };
      let leftEndpoint = jspi.addEndpoint(this.elementId, endpoint_common, {anchor: "Left"});
      let rightEndpoint = jspi.addEndpoint(this.elementId, endpoint_common, {anchor: "Right"});

    }

    }

    this.debug("created node:", this.elementId);
  },

  _dragStop: function(params) {
    console.log('Stopped dragging. Time to update the node position!');
    console.log(params);
    //let currentX = Ember.$('#'+this.elementId)[0].offsetLeft;
    //let currentY = Ember.$('#'+this.elementId)[0].offsetTop;
    
    this.updateNodePositionXY(params.pos[0], params.pos[1]);
  },

  // willDestroyElement: function(){
  //   let node = this.get('model');
  //   let nodeX = node.get('x');
  //   let nodeY = node.get('y');
  // 
  //   let currentX = Ember.$('#'+this.elementId)[0].offsetLeft;
  //   let currentY = Ember.$('#'+this.elementId)[0].offsetTop;
  // 
  //   if (nodeX != currentX || nodeY != currentY){
  //     this.updateNodePositionXY(currentX, currentY);      
  //   }
  // },

  didDestroyElement: function(){
    let jspi = this.jspInstance;
    jspi.removeAllEndpoints(this.elementId);
  },

});
