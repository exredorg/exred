import { moduleForModel, test } from 'ember-qunit';

moduleForModel('connection', 'Unit | Model | connection', {
  // Specify the other units that are required for this test.
  needs: ['model:flow', 'model:node']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
