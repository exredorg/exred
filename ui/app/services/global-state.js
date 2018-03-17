import Service from '@ember/service';

export default Service.extend({
  
  init(){
    this.setProperties({
      activeNodeId: null,
      activeNode: null,
      activeFlowId: null,
      activeFlow: null,
      configChanged: false
    });
  },
  
  changeActiveNode: function(nodeId){
    this.set('activeNodeId', nodeId);
  }
  
});
