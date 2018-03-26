(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['renderjson'],
      __esModule: true,
    };
  }

  define('renderjson', [], vendorModule);
})();
