import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('editor-nodelist', 'Integration | Component | editor nodelist', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{editor-nodelist}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#editor-nodelist}}
      template block text
    {{/editor-nodelist}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
