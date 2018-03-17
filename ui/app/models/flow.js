import DS from 'ember-data';

export default DS.Model.extend({
  name:         DS.attr('string'),
  info:         DS.attr('string'),
  config:       DS.attr(),

  serviceId:    DS.belongsTo('service'),

  nodes:        DS.hasMany('node'),
  connections:  DS.hasMany('connection')
});
