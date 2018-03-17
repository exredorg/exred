import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-flows', 'Integration | Component | editor flows', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editor-flows}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editor-flows}}
      template block text
    {{/editor-flows}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
