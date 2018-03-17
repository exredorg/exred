import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-sidetabs', 'Integration | Component | editor sidetabs', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editor-sidetabs}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editor-sidetabs}}
      template block text
    {{/editor-sidetabs}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
