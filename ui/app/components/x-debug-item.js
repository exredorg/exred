import Component from '@ember/component';
import Ember from 'ember';


export default Component.extend({
  // attrs: 
  //   item: {node_id, node_name, debug_data}
  // node_id and node_name references the node this debug messages
  // is coming from
  item: null,
  
  mouseEnter: function(){
    let item=this.get('item');
    Ember.$("#"+item.node_id).addClass("debugHoverOn");
  }, 
  
  mouseLeave: function(){
    let item=this.get('item');
    Ember.$("#"+item.node_id).removeClass("debugHoverOn");
  }
  
});
