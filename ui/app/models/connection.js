import DS from 'ember-data';

export default DS.Model.extend({
  config: DS.attr(),
  flowId: DS.belongsTo('flow'),
  sourceId: DS.belongsTo('node', {inverse: 'out_conns'}),
  targetId: DS.belongsTo('node', {inverse: 'in_conns'}),
  sourceAnchorType: DS.attr('string'),
  targetAnchorType: DS.attr('string')
});
