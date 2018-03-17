import Component from '@ember/component';

import { observer } from '@ember/object';

export default Component.extend({
  watchValue: observer('value', function(){
    let v = this.get('value');
    if (typeof v == 'string') {
      this.set('value', Number(v));
    }
  })
});
