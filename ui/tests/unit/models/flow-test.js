import { moduleForModel, test } from 'ember-qunit';

moduleForModel('flow', 'Unit | Model | flow', {
  // Specify the other units that are required for this test.
  needs: ['model:service', 'model:node', 'model:connection']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
