import Component from '@ember/component';
import {observer} from '@ember/object';

export default Component.extend({
  init: function(){
    this._super(...arguments);
    
    let value = this.get('value');
    let items = this.get('fieldAttrs.items');
    
    this.set('itemlist', items);
    this.set('selectedItem', value);
  },
  
  itemSelectChanged: observer('selectedItem', function(){
    let value = this.get('selectedItem');
    this.set('value', value);
    this.sendAction('configUpdate', this.get('key'), value);
  })
});
