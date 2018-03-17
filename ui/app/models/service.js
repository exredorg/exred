import DS from 'ember-data';

export default DS.Model.extend({
  name:   DS.attr('string'),
  info:   DS.attr('string'),
  config: DS.attr(),
  
  flows:  DS.hasMany('flow')
});
