import Component from '@ember/component';
import {inject as service} from '@ember/service'; 

export default Component.extend({
  state: service('global-state'),
  
  init: function(){
    this._super(...arguments);
    let data = {hello: 12};
  },
  didInsertElement: function(){
    // this.$('.xjson').appendChild(this.get('formatter').render());
  }
});
