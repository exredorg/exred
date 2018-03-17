import DS from 'ember-data';
import { computed } from '@ember/object';

export default DS.Model.extend({
  name:           DS.attr('string'),
  category:       DS.attr('string'),
  module:         DS.attr('string'),
  config:         DS.attr(),
  info:           DS.attr('string'),
  isPrototype:    DS.attr('boolean'),
  x:              DS.attr('number'),
  y:              DS.attr('number'),
  ui_attributes:  DS.attr(),
  
  flowId:         DS.belongsTo('flow'),
  in_conns:       DS.hasMany('connections', {inverse: 'targetId'}),
  out_conns:      DS.hasMany('connections', {inverse: 'sourceId'}),

  jsPlumbEndpoints: DS.attr(),
  
  visibleName: computed("name", "config.name.value", function(){
    let config = this.get('config');

    if (config && config.name && config.name.value) {
      return config.name.value;
    } else {
      return this.get('name');
    }    
  })

});
