import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('diagram-node', 'Integration | Component | diagram node', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{diagram-node}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#diagram-node}}
      template block text
    {{/diagram-node}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
