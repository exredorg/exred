import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-config-tab/select', 'Integration | Component | x config tab/select', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-config-tab/select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-config-tab/select}}
      template block text
    {{/x-config-tab/select}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
