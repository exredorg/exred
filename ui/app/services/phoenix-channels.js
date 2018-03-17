//import Service from '@ember/service';
import {inject as service} from '@ember/service';

import PhoenixSocket from 'phoenix/services/phoenix-socket';
 
export default PhoenixSocket.extend({
  
  paperToaster: service(),
  
  init() {
    // You may listen to open, "close" and "error"
    this.on('open', () => {
      console.log('Socket was opened!');
    });
    this.on('error', () => {
      console.log('Phoenix Socket error');
    });
  },
  
  connect(/*url, options*/) {
    // const myjwt = "abacnwih12eh12...";
    // connect the socket
    this._super("ws://localhost:4000/socket", {
      //params: {token: myjwt}
    });
 
    // join a channel
    const channel = this.joinChannel("cmd:general", {
      nickname: "Mike"
    });
 
    this.set('channel', channel);
    
    // add message handlers
    channel.on("notification", (msg) => this._onNotification(msg));
  },
 
  push: function(event, msg){
    this.get('channel').push(event, msg)
    .receive("ok", (msg) => console.log("PhoenixChannel: message sent, received ok", msg) )
    .receive("error", (reasons) => console.log("PhoenixChannel: message sent, received error", reasons) )
    .receive("timeout", () => console.log("PhoenixChannel: message send failed") )
  },
 
  _onNotification(message) {
    console.log('PhoenixChannel got: ', message);
    this.get('paperToaster').show(message.msg, {duration: 5000, position: "top right", toastClass: "toastInSuccess"});
  }
});

