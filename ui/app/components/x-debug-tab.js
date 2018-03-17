import Component from '@ember/component';
import {inject as service} from '@ember/service';

export default Component.extend({
  phoenixChannels: service(),
  eventMsgList: [],
  
  maxListSize: 100,

  init: function(){
    this._super(...arguments);
  
    this.set('msglist', []);
    
    let channel = this.get('phoenixChannels').joinChannel("event:debug", {verbosity: 3});
    this.debug('joined debug channel');
    this.set('channel', channel);
    
    channel.on("notification", (eventMsg) => {console.log(eventMsg); this._onNotification(eventMsg)});
  },
  
  willUpdate: function(){
    this.debug("SCROLLING");
    
    let mydiv = this.$('#debug-list');
    console.log(mydiv[0].scrollHeight);
    mydiv.stop().animate({
      scrollTop: mydiv[0].scrollHeight
    }, 800);
  },
  
  willDestroyElement: function(){
    this.debug("leaving event:debug channel");
    this.get('channel').leave();
  },
  
  _onNotification: function(eventMsg){
    this.debug('got event_msg:', eventMsg);
    let list = this.get('eventMsgList');
    if (list.length >= this.maxListSize) {
      list.removeAt(0, 10);
    }
    list.pushObject(eventMsg);
  }
});
