import Component from '@ember/component';
import renderjson from 'renderjson';

export default Component.extend({

  didInsertElement: function(){
    let value = this.get('value');
    let rendered = renderjson
      .set_icons('+', '-')
      .set_show_to_level(1)(value)
    this.$(".xjson").append( rendered );
  }
});
