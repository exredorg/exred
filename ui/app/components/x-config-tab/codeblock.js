import Component from '@ember/component';
import computedStyle from 'ember-computed-style';

export default Component.extend({
  
  style: computedStyle('styleProperties'),

  styleProperties: {
    minWidth: "400px",
    minHeight: "400px"
  },

  attributeBindings: ['style']
});
