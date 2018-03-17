/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    ace: {
      themes: ['ambiance', 'chaos'],
      modes: ['javascript', 'elixir'],
      workers: ['javascript']
    }
  });

  app.import('node_modules/jsplumb/dist/css/jsplumbtoolkit-defaults.css');
  app.import('vendor/jsplumbtoolkit-demo.css');
  app.import('node_modules/jsplumb/dist/js/jsplumb.min.js');
  //app.import('bower_components/json-formatter-js/dist/json-formatter.js');
  // Add options here });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
