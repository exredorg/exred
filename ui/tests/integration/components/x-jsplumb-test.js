import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-jsplumb', 'Integration | Component | x jsplumb', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-jsplumb}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-jsplumb}}
      template block text
    {{/x-jsplumb}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
