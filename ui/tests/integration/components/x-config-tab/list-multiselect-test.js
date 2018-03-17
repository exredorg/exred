import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('x-config-tab/list-multiselect', 'Integration | Component | x config tab/list multiselect', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{x-config-tab/list-multiselect}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#x-config-tab/list-multiselect}}
      template block text
    {{/x-config-tab/list-multiselect}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
