import Component from '@ember/component';
import {observer} from '@ember/object';


export default Component.extend({
  init: function(){
    this._super(...arguments);
    
    let value = this.get('value');
    let items = this.get('items');
    
    // internal component property to store which items are enabled
    let itemlist = [];
    
    this.get('fieldAttrs.items').forEach( (itemName) => {
      let isEnabled = value.indexOf(itemName) != -1;
      itemlist.pushObject({"name": itemName, "enabled": isEnabled});
    });
    this.set('itemlist', itemlist);
  },
  
  itemSelectChanged: observer('itemlist.@each.enabled', function(){
    this.debug(this.get('itemlist'));
    let itemlist = this.get('itemlist');
    let value = [];
    itemlist.forEach( (item) => { if(item.enabled) {value.push(item.name);}; } );
    this.debug("value", value);
    this.set('value', value);
    this.sendAction('configUpdate', this.get('key'), value);
  })
});
