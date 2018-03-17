import Component from '@ember/component';
import { htmlSafe } from "@ember/string";
import { computed } from '@ember/object';
//import JSONFormatter from 'json-formatter';


export default Component.extend({
  // attrs: json
  json: {},
  // didInsertElement(){
  //   const formatter = new JSONFormatter(this.json, 1);
  //   let v = formatter.render();
  //   this.$().append(v);
  // },
  // 
  html_out: computed('json', function(){
    let json_in = this.get('json');
    let html_out = htmlSafe("<span>" + JSON.stringify(json_in) + "</span>");
    return html_out;
  })
});
