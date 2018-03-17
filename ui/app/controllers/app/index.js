import Controller from '@ember/controller';
import { computed, observer } from '@ember/object';
import { v4 } from 'ember-uuid';
import {inject as service} from '@ember/service';
import Ember from 'ember';



export default Controller.extend({
  phoenixChannels: service(),
  paperToaster: service(),
  state: service('global-state'),
  
  init: function(){
    this._super(...arguments);
    
    this.get('state');  // apparently this is supposed to trigger the observers on state
    
    this.get('phoenixChannels').connect();
    
    this.setProperties({
      flowNavOpen: false
    })
  },
  
  
  stateUpdate_activeNode: observer('state.activeNodeId', function(){
    let state = this.get('state');
    let id = state.get('activeNodeId');
    let node = this.model.nodes.findBy('id', id);
    state.set('activeNode', node);
    this.debug('state (activeNodeId changed)', state);
  }),
  
  
  stateUpdate_activeFlow: observer('state.activeFlowId', function(){
    let state = this.get('state');
    let id = state.get('activeFlowId');
    let flow = this.model.flows.findBy('id', id);
    state.set('activeFlow', flow);
    this.debug('state (activeFlowId changed )', state);
  }),
  
  
  stateChange_configChanged: observer('state.configChanged', function(){
    let state = this.get('state');
    this.debug('state', state);
  }),

  currentFlow: computed('currentFlowId', function(){
    let cfid = this.get('currentFlowId');
    let cf = this.model.flows.findBy('id', cfid);
    return cf;
  }),

  actions: {
    toggleFlowNav: function(){
      this.set('flowNavOpen', !this.get('flowNavOpen'));
    },

    deleteActive: function(){
      this.debug("deleting active node");
      let state = this.get('state');
      let store = this.get('store');
      
      let activeNodeId = state.get('activeNodeId');
      
      if (activeNodeId) {
        store.findRecord('node', activeNodeId, {backgroundReload: false})
        .then(function(node){
          node.destroyRecord();
          state.set('activeNodeId', null);
        });
      }
    },

    addConnection: function(connId, sourceId, sourceAnchorType, targetId, targetAnchorType){
      this.debug("adding connection:", [sourceId, targetId]);
      let store = this.get('store');
      let state = this.get('state');
      
      let flow = store.peekRecord('flow', state.get('activeFlowId'));
      let sourceNode = store.peekRecord('node', sourceId);
      let targetNode = store.peekRecord('node', targetId);

      let conn = {
        id: connId,
        config: {},
        flowId: flow,
        sourceId: sourceNode,
        targetId: targetNode,
        sourceAnchorType: sourceAnchorType,
        targetAnchorType: targetAnchorType
      };
      let connRecord = store.createRecord('connection', conn);
      this.debug("created connection:", connRecord.get('id'));

      connRecord.save().then(() => {
        this.debug("saved connection");
      }).catch((err) => {
        // remove from Store
        this.get('store').unloadRecord(connRecord);
        this.debug("ERROR failed to create connection", err.errors);
      });
    },
    
    deleteConnection: function(connId){
      this.debug('deleteing connection:', connId);
      this.get('store').findRecord('connection', connId, {backgroundReload: false})
      .then(function(conn){
        conn.destroyRecord();
      });
    },


    updateNodePosition: function(nodeId, x, y){
      this.debug('Updating Node Position');
      this.get('store').findRecord('node', nodeId).then(function(node){
        node.set('x', x);
        node.set('y', y);
        node.save();
      });
    },


    createDNode: function(nodeId){
      this.debug("creating diagram node from prototype:", nodeId);
      
      let state = this.get('state');
      let store = this.get('store');
      let activeFlowId = state.get('activeFlowId');
      
      let prototype = store.peekRecord('node', nodeId);
      let flow = store.peekRecord('flow', activeFlowId);
      
      let instance = {
        id            : v4(),
        isPrototype   : false,
        flowId        : flow,
        name          : prototype.get('name'),
        info          : prototype.get('info'),
        category      : prototype.get('category'),
        module        : prototype.get('module'),
        config        : Ember.$.extend(true, {}, prototype.get('config')),
        ui_attributes : prototype.get('ui_attributes'),
        x             : 0,
        y             : 0
      };

      let dnode = store.createRecord('node', instance);

      this.debug("created node:", dnode.get('id'),dnode.get('name'));

      dnode.save().then(() => {
        this.debug("saved node");
      }).catch((err) => {
        // remove from Store
        store.unloadRecord(dnode);
        this.debug("ERROR failed to create node", err.errors);
      });


      // // Clear any existing error messages
      // this.set('currentModel.newRoom.errors', []);
      //
      // room.save().then(() => { // Successful creation
      //   // Notification of success!
      //   this.get('flashMessages').success(`Created room: ${data.name}`);
      //   this.set('currentModel.newRoom.name', ''); // Clear the input
      // }).catch((err) => { // Server-side error message
      //   // Remove the ember-data record from the Store
      //   this.store.unloadRecord(room);
      //   // Pass any error messages (i.e., server-side validation) into the UI
      //   this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
      //   // Notification of failure!
      //   this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
      // });
      //

    },

    saveNewConfig: function(newConfig) {
      let t = this;
      t.debug('Updating selected node with: ', newConfig);

      let state = this.get('state');
      let paperToaster = this.get('paperToaster');
      let store = this.get('store');
      let activeNodeId = state.get('activeNodeId');

      store.findRecord('node', activeNodeId).then(function(node){
        t.debug('found node record');

        for (var key in newConfig){
          if (newConfig.hasOwnProperty(key)){
            node.set("config."+key+".value", newConfig[key]);
            t.debug("SET config."+key+".value", newConfig[key]);
          }
        }

        node.save()
        .then(() => {
          t.debug("Updated node");
          state.set('configChanged', false);
        }).catch((err) => {
          // remove from Store
          store.unloadRecord(node);
          t.debug("ERROR failed to update node", err.errors);
          paperToaster.show('Error saving update', {duration: 2000, position: "top right"});
        });
      });


      //this.selectednode.setProperties(newConfig);
      // for (var key in newConfig){
      //   if (newConfig.hasOwnProperty(key)){
      //     this.selectedNode.set("config."+key+".value", newConfig[key]);
      //     this.debug("SET config."+key+".value", newConfig[key]);
      //   }
      // }
      // this.debug("selectednode.config", this.selectedNode.get('config'));
      // this.selectedNode.save().then(() => {
      //   this.debug("updated node");
      //   this.set('configChanged', false);
      // }).catch((err) => {
      //   // remove from Store
      //   this.store.unloadRecord(dnode);
      //   this.debug("ERROR failed to update node", err.errors);
      //   this.get('paperToaster').show('Error saving update', {duration: 2000, position: "top right"});
      // });
    }
  }
});
