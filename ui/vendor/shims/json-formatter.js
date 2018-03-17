(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['json-formatter'],
      __esModule: true,
    };
  }

  define('json-formatter', [], vendorModule);
})();
