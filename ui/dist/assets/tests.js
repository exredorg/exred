'use strict';

define('exred/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('adapters/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'adapters/application.js should pass ESLint\n\n');
  });

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/diagram-node.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/diagram-node.js should pass ESLint\n\n87:11 - \'leftEndpoint\' is assigned a value but never used. (no-unused-vars)\n88:11 - \'rightEndpoint\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('components/editor-flownav.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/editor-flownav.js should pass ESLint\n\n');
  });

  QUnit.test('components/editor-flows.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/editor-flows.js should pass ESLint\n\n');
  });

  QUnit.test('components/editor-nodelist.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/editor-nodelist.js should pass ESLint\n\n');
  });

  QUnit.test('components/editor-sidetabs.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/editor-sidetabs.js should pass ESLint\n\n');
  });

  QUnit.test('components/editor-toolbar.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/editor-toolbar.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/codeblock.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/codeblock.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/filepicker.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/filepicker.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/list-multiselect.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/x-config-tab/list-multiselect.js should pass ESLint\n\n25:76 - Unnecessary semicolon. (no-extra-semi)');
  });

  QUnit.test('components/x-config-tab/list-singleselect.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/list-singleselect.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/number.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/number.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/select.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/select.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-config-tab/string.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-config-tab/string.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-debug-item.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-debug-item.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-debug-tab.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-debug-tab.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-editor.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-editor.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-info-tab.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-info-tab.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-json.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/x-json.js should pass ESLint\n\n11:7 - Unexpected newline between function and ( of function call. (no-unexpected-multiline)');
  });

  QUnit.test('components/x-json2html.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'components/x-json2html.js should pass ESLint\n\n');
  });

  QUnit.test('components/x-jsplumb.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/x-jsplumb.js should pass ESLint\n\n87:9 - \'filterLabelConnOverlay\' is assigned a value but never used. (no-unused-vars)');
  });

  QUnit.test('controllers/app/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/app/index.js should pass ESLint\n\n');
  });

  QUnit.test('initializers/debug-helpers.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'initializers/debug-helpers.js should pass ESLint\n\n');
  });

  QUnit.test('models/connection.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/connection.js should pass ESLint\n\n');
  });

  QUnit.test('models/flow.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/flow.js should pass ESLint\n\n');
  });

  QUnit.test('models/node.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/node.js should pass ESLint\n\n');
  });

  QUnit.test('models/service.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'models/service.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });

  QUnit.test('routes/app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app.js should pass ESLint\n\n');
  });

  QUnit.test('routes/app/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/app/index.js should pass ESLint\n\n');
  });

  QUnit.test('routes/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/application.js should pass ESLint\n\n');
  });

  QUnit.test('routes/auth.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/auth.js should pass ESLint\n\n');
  });

  QUnit.test('routes/auth/login.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/auth/login.js should pass ESLint\n\n');
  });

  QUnit.test('routes/auth/register.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/auth/register.js should pass ESLint\n\n');
  });

  QUnit.test('routes/index.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'routes/index.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/application.js should pass ESLint\n\n');
  });

  QUnit.test('serializers/node.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'serializers/node.js should pass ESLint\n\n');
  });

  QUnit.test('services/global-state.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/global-state.js should pass ESLint\n\n');
  });

  QUnit.test('services/phoenix-channels.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'services/phoenix-channels.js should pass ESLint\n\n');
  });

  QUnit.test('session-stores/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'session-stores/application.js should pass ESLint\n\n');
  });

  QUnit.test('transitions.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'transitions.js should pass ESLint\n\n');
  });
});
define('exred/tests/components/ember-ace', ['exports', 'ember-ace/test-support/components/ember-ace'], function (exports, _emberAce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberAce.default;
    }
  });
});
define('exred/tests/helpers/destroy-app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = destroyApp;
  function destroyApp(application) {
    Ember.run(application, 'destroy');
  }
});
define('exred/tests/helpers/ember-basic-dropdown', ['exports', 'ember-basic-dropdown/test-support/helpers', 'ember-native-dom-helpers'], function (exports, _helpers, _emberNativeDomHelpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.nativeClick = exports.fireKeydown = exports.tapTrigger = exports.clickTrigger = exports.nativeTap = undefined;
  Object.defineProperty(exports, 'nativeTap', {
    enumerable: true,
    get: function () {
      return _helpers.nativeTap;
    }
  });
  Object.defineProperty(exports, 'clickTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.clickTrigger;
    }
  });
  Object.defineProperty(exports, 'tapTrigger', {
    enumerable: true,
    get: function () {
      return _helpers.tapTrigger;
    }
  });
  Object.defineProperty(exports, 'fireKeydown', {
    enumerable: true,
    get: function () {
      return _helpers.fireKeydown;
    }
  });
  exports.default = _helpers.default;
  var nativeClick = exports.nativeClick = _emberNativeDomHelpers.click;
});
define('exred/tests/helpers/ember-frost-core', ['exports', 'ember-hook', 'exred/tests/helpers/ember-frost-core/frost-button', 'exred/tests/helpers/ember-frost-core/frost-select', 'exred/tests/helpers/ember-frost-core/frost-text'], function (exports, _emberHook, _frostButton, _frostSelect, _frostText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.findTextInputs = exports.findButtons = exports.filterSelect = exports.expectTextInputWithState = exports.expectSelectWithState = exports.expectButtonWithState = undefined;
  exports.click = click;
  exports.fillIn = fillIn;
  exports.focusout = focusout;
  var $ = Ember.$,
      typeOf = Ember.typeOf;


  var assign = Object.assign || Ember.assign || Ember.merge; // eslint-disable-line

  /**
   * Click on element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   */
  function click(element) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.click();
  }

  /**
   * Fill in an element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   * @param {String} value - value to fill in
   */
  function fillIn(element, value) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.val(value).trigger('input');
  }

  /**
   * Remove focus from element
   * @param {jQuery|String} element - name of Ember hook or jQuery instance
   */
  function focusout(element) {
    var $element = typeOf(element) === 'string' ? (0, _emberHook.$hook)(element) : element;
    $element.focusout();
  }

  // TODO: Remove these as part of next major release, expecting consumers to
  // import {expectWithState} from 'dummy/tests/helpers/ember-frost-core/frost-select'
  // instead so we don't have to manange this import/re-export madness.
  var expectButtonWithState = exports.expectButtonWithState = _frostButton.expectWithState;
  var expectSelectWithState = exports.expectSelectWithState = _frostSelect.expectWithState;
  var expectTextInputWithState = exports.expectTextInputWithState = _frostText.expectWithState;
  var filterSelect = exports.filterSelect = _frostSelect.filter;
  var findButtons = exports.findButtons = _frostButton.find;
  var findTextInputs = exports.findTextInputs = _frostText.find;

  exports.default = {
    click: click,
    expectButtonWithState: expectButtonWithState,
    expectSelectWithState: expectSelectWithState,
    expectTextInputWithState: expectTextInputWithState,
    fillIn: fillIn,
    findButtons: findButtons,
    findTextInputs: findTextInputs,
    focusout: focusout
  };
});
define('exred/tests/helpers/ember-frost-core/frost-button', ['exports', 'chai', 'ember-hook', 'exred/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _emberHook, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.expectWithState = expectWithState;
  exports.find = find;
  var $ = Ember.$,
      typeOf = Ember.typeOf;


  var assign = Object.assign || Ember.assign || Ember.merge; // eslint-disable-line

  /**
   * Verify button exists with expected state
   * @param {jQuery|String} button - name of Ember hook or jQuery instance
   * @param {FrostButtonState} state - expected button state
   */
  function expectWithState(button, state) {
    var defaults = {
      disabled: false,
      pack: 'frost'
    };

    var $button = typeOf(button) === 'string' ? (0, _emberHook.$hook)(button) : button;
    state = assign(defaults, state);

    (0, _utils.expectDisabledState)($button, state.disabled, 'button');

    if (state.icon && state.pack) {
      (0, _chai.expect)($button.find('.frost-icon-' + state.pack + '-' + state.icon), 'button has expected icon').to.have.length(1);
    }

    if (state.text) {
      (0, _chai.expect)($button.find('.text:not(.icon-text)').text().trim(), 'button has expected text').to.equal(state.text);
    }
  }

  /**
   * Get list of buttons
   * @returns {jQuery} buttons
   */
  function find() {
    return $('.frost-button');
  }
});
define('exred/tests/helpers/ember-frost-core/frost-select', ['exports', 'chai', 'ember-hook', 'ember-test-helpers/wait', 'exred/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _emberHook, _wait, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.expectWithState = expectWithState;
  exports.filter = filter;
  exports.open = open;
  exports.close = close;
  exports.selectItemAtIndex = selectItemAtIndex;
  var $ = Ember.$,
      RSVP = Ember.RSVP,
      run = Ember.run,
      typeOf = Ember.typeOf;


  var assign = Object.assign || Ember.assign || Ember.merge; // eslint-disable-line

  /* eslint-disable complexity */
  /**
   * Verify select exists with expected state
   * @param {jQuery|String} select - name of Ember hook or jQuery instance
   * @param {FrostSelectState} state - expected select state
   */
  function expectWithState(select, state) {
    var defaults = {
      disabled: false,
      error: false,
      opened: false,
      tabIndex: 0,
      text: ''
    };

    var $select = typeOf(select) === 'string' ? (0, _emberHook.$hook)(select) : select;
    state = assign(defaults, state);

    (0, _chai.expect)($select.hasClass('frost-select'), 'has frost-select class').to.equal(true);

    (0, _utils.expectToggleClass)($select, 'frost-select-disabled', state.disabled);
    (0, _utils.expectToggleClass)($select, 'frost-select-error', state.error);
    (0, _utils.expectToggleClass)($select, 'frost-select-focused', state.focused);
    (0, _utils.expectToggleClass)($select, 'frost-select-opened', state.opened);

    (0, _chai.expect)($select.prop('tabindex'), 'has expected tab index').to.equal(state.disabled ? -1 : state.tabIndex);

    if (state.focusedItem) {
      (0, _chai.expect)($('.frost-select-list-item-focused .frost-select-list-item-text').data('text'), 'is focused on expected item').to.equal(state.focusedItem);
    }

    var $emptyMessage = $('.frost-select-dropdown-empty-msg');

    if (state.items && state.items.length !== 0) {
      var labels = $('.frost-select-dropdown li').toArray().map(function (element) {
        return $(element).find('.frost-select-list-item-text').data('text');
      });

      (0, _chai.expect)(labels, 'has expected items').to.eql(state.items);
      (0, _chai.expect)($emptyMessage, 'does not show empty message').to.have.length(0);

      if (state.secondaryLabels) {
        var secondaryLabels = $('.frost-select-dropdown li').toArray().map(function (element) {
          return $(element).find('.frost-select-list-secondary-item-text').data('text');
        });

        (0, _chai.expect)(secondaryLabels, 'has expected items').to.eql(state.secondaryLabels);
      }
    } else if (state.opened) {
      (0, _chai.expect)($emptyMessage, 'shows empty message').to.have.length(1);
    }

    (0, _chai.expect)($select.find('.frost-select-text').text().trim(), 'has expected text').to.equal(state.text);
  }
  /* eslint-disable complexity */

  /**
   * Filter frost-select
   * @param {String} filter - filter to apply to select
   */
  function filter(filter) {
    $(window).trigger('resize'); // For some reason we need to do this in Ember 2.3
    $('.frost-select-dropdown .frost-text-input').val(filter).trigger('input');
  }

  /**
   * Open frost-select dropdown
   * @param {String} [hook='select'] - frost-select hook
   * @returns {Promise} the resolved promise from ember-test-helpers/wait
   */
  function open() {
    var hook = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select';

    // In a real browser when you click on the select with your mouse a
    // focusin event is fired on the component. However when using jQuery's
    // click() method the focusin is not fired so we are programitcally
    // triggering that in this test.
    (0, _emberHook.$hook)(hook).click().trigger('focusin');
    return (0, _wait.default)();
  }

  /**
   * Close frost-select dropdown
   * @param {String} [hook='select'] - frost-select hook
   * @returns {Promise} the resolved promise from ember-test-helpers/wait
   */
  function close() {
    var hook = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'select';

    (0, _emberHook.$hook)(hook).click().trigger('focusout');
    return (0, _wait.default)();
  }

  /**
   * Select item in select dropdown at given index
   * NOTE: using done() instead of Promise based because promised based causes
   * select to lose focus for some reason. This may have something to with with
   * how mocha is handling done vs promise returns.
   * @param {String} hook - frost-select hook
   * @param {Number} index - index of item to select
   * @param {Function} done - mocha done callback
   */
  function selectItemAtIndex(hook, index, done) {
    (0, _emberHook.$hook)(hook + '-item', { index: index }).trigger('mousedown');
    run.next(function () {
      done();
    });
  }
});
define('exred/tests/helpers/ember-frost-core/frost-text', ['exports', 'chai', 'ember-hook', 'exred/tests/helpers/ember-frost-core/utils'], function (exports, _chai, _emberHook, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.expectWithState = expectWithState;
  exports.find = find;
  var $ = Ember.$,
      typeOf = Ember.typeOf;


  var assign = Object.assign || Ember.assign || Ember.merge; // eslint-disable-line

  /**
   * Verify text input exists with expected state
   * @param {jQuery|String} input - name of Ember hook or jQuery instance
   * @param {FrostTextState} state - expected input state
   */
  function expectWithState(input, state) {
    var defaults = {
      align: 'left',
      disabled: false,
      error: false,
      tabIndex: 0,
      type: 'text'
    };

    var $input = typeOf(input) === 'string' ? (0, _emberHook.$hook)(input) : input;
    state = assign(defaults, state);

    (0, _chai.expect)($input.hasClass(state.align), 'input has correct text alignment').to.equal(true);

    (0, _utils.expectDisabledState)($input, state.disabled, 'input');

    (0, _chai.expect)($input.hasClass('error'), 'input ' + (state.error ? 'has' : 'does not have') + ' error class').to.equal(state.error);['placeholder', 'tabIndex', 'type'].forEach(function (key) {
      if (state[key]) {
        (0, _chai.expect)($input.prop(key), 'input as expected ' + key).to.equal(state[key]);
      }
    });

    if (state.value) {
      (0, _chai.expect)($input.val(), 'input has expected value').to.equal(state.value);
    }
  }

  /**
   * Get list of text inputs
   * @returns {jQuery} text inputs
   * @param {FrostTextState} state - find inputs with state
   */
  function find(state) {
    var $inputs = $('.frost-text input');

    if (typeOf(state) !== 'object') {
      return $inputs;
    }

    return $inputs.filter(function (index, input) {
      if ('disabled' in state && input.disabled !== state.disabled || 'type' in state && input.type !== state.type) {
        return false;
      }

      return true;
    });
  }
});
define('exred/tests/helpers/ember-frost-core/utils', ['exports', 'chai'], function (exports, _chai) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.expectDisabledState = expectDisabledState;
  exports.expectToggleClass = expectToggleClass;


  /**
   * Expect element to have disabled state
   * @param {jQuery} $element - element
   * @param {Boolean} disabled - disabled
   * @param {String} [type='element'] - type of element
   */
  function expectDisabledState($element, disabled) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'element';

    (0, _chai.expect)($element.is(':disabled'), type + ' is ' + (disabled ? 'disabled' : 'enabled')).to.equal(disabled);
  }

  /**
   * Expect class on element depending on boolean state
   * @param {jQuery} $element - element to check for class on
   * @param {String} className - name of class
   * @param {Boolean} state - whether or not class should be present
   */
  function expectToggleClass($element, className, state) {
    if (state === undefined) {
      return;
    }

    (0, _chai.expect)($element.hasClass(className), (state ? 'has' : 'does not have') + ' ' + className + ' class').to.equal(state);
  }
});
define('exred/tests/helpers/ember-power-select', ['exports', 'ember-power-select/test-support/helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.selectChoose = exports.touchTrigger = exports.nativeTouch = exports.clickTrigger = exports.typeInSearch = exports.triggerKeydown = exports.nativeMouseUp = exports.nativeMouseDown = exports.findContains = undefined;
  exports.default = deprecatedRegisterHelpers;


  function deprecateHelper(fn, name) {
    return function () {
      (true && !(false) && Ember.deprecate('DEPRECATED `import { ' + name + ' } from \'../../tests/helpers/ember-power-select\';` is deprecated. Please, replace it with `import { ' + name + ' } from \'ember-power-select/test-support/helpers\';`', false, { until: '1.11.0', id: 'ember-power-select-test-support-' + name }));

      return fn.apply(undefined, arguments);
    };
  }

  var findContains = deprecateHelper(_helpers.findContains, 'findContains');
  var nativeMouseDown = deprecateHelper(_helpers.nativeMouseDown, 'nativeMouseDown');
  var nativeMouseUp = deprecateHelper(_helpers.nativeMouseUp, 'nativeMouseUp');
  var triggerKeydown = deprecateHelper(_helpers.triggerKeydown, 'triggerKeydown');
  var typeInSearch = deprecateHelper(_helpers.typeInSearch, 'typeInSearch');
  var clickTrigger = deprecateHelper(_helpers.clickTrigger, 'clickTrigger');
  var nativeTouch = deprecateHelper(_helpers.nativeTouch, 'nativeTouch');
  var touchTrigger = deprecateHelper(_helpers.touchTrigger, 'touchTrigger');
  var selectChoose = deprecateHelper(_helpers.selectChoose, 'selectChoose');

  function deprecatedRegisterHelpers() {
    (true && !(false) && Ember.deprecate("DEPRECATED `import registerPowerSelectHelpers from '../../tests/helpers/ember-power-select';` is deprecated. Please, replace it with `import registerPowerSelectHelpers from 'ember-power-select/test-support/helpers';`", false, { until: '1.11.0', id: 'ember-power-select-test-support-register-helpers' }));

    return (0, _helpers.default)();
  }

  exports.findContains = findContains;
  exports.nativeMouseDown = nativeMouseDown;
  exports.nativeMouseUp = nativeMouseUp;
  exports.triggerKeydown = triggerKeydown;
  exports.typeInSearch = typeInSearch;
  exports.clickTrigger = clickTrigger;
  exports.nativeTouch = nativeTouch;
  exports.touchTrigger = touchTrigger;
  exports.selectChoose = selectChoose;
});
define('exred/tests/helpers/ember-prop-types', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.createComponent = createComponent;

  var _slicedToArray = function () {
    function sliceIterator(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;

      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);

          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"]) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }

      return _arr;
    }

    return function (arr, i) {
      if (Array.isArray(arr)) {
        return arr;
      } else if (Symbol.iterator in Object(arr)) {
        return sliceIterator(arr, i);
      } else {
        throw new TypeError("Invalid attempt to destructure non-iterable instance");
      }
    };
  }();

  var VERSION = Ember.VERSION;


  /**
   * Determine if we are on a version of Ember that includes Glimmer 2
   * @returns {Boolean} whether or not we are on Glimmer 2
   */
  function isGlimmer2() {
    var _VERSION$split = VERSION.split('.'),
        _VERSION$split2 = _slicedToArray(_VERSION$split, 2),
        major = _VERSION$split2[0],
        minor = _VERSION$split2[1];

    return parseInt(major) > 1 && parseInt(minor) > 9;
  }

  /**
   * Programitcally instantiate instance of component class
   * @param {Ember.Component} component - component class to instantiate
   * @returns {Ember.Component} instance of component class
   */
  function createComponent(component) {
    if (isGlimmer2()) {
      return component.create({ renderer: {} });
    }

    return component.create();
  }
});
define('exred/tests/helpers/ember-simple-auth', ['exports', 'ember-simple-auth/authenticators/test'], function (exports, _test) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.authenticateSession = authenticateSession;
  exports.currentSession = currentSession;
  exports.invalidateSession = invalidateSession;


  var TEST_CONTAINER_KEY = 'authenticator:test'; /* global wait */

  function ensureAuthenticator(app, container) {
    var authenticator = container.lookup(TEST_CONTAINER_KEY);
    if (!authenticator) {
      app.register(TEST_CONTAINER_KEY, _test.default);
    }
  }

  function authenticateSession(app, sessionData) {
    var container = app.__container__;

    var session = container.lookup('service:session');
    ensureAuthenticator(app, container);
    session.authenticate(TEST_CONTAINER_KEY, sessionData);
    return wait();
  }

  function currentSession(app) {
    return app.__container__.lookup('service:session');
  }

  function invalidateSession(app) {
    var session = app.__container__.lookup('service:session');
    if (session.get('isAuthenticated')) {
      session.invalidate();
    }
    return wait();
  }
});
define('exred/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'exred/tests/helpers/start-app', 'exred/tests/helpers/destroy-app'], function (exports, _qunit, _startApp, _destroyApp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (name) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _startApp.default)();

        if (options.beforeEach) {
          return options.beforeEach.apply(this, arguments);
        }
      },
      afterEach: function afterEach() {
        var _this = this;

        var afterEach = options.afterEach && options.afterEach.apply(this, arguments);
        return Ember.RSVP.resolve(afterEach).then(function () {
          return (0, _destroyApp.default)(_this.application);
        });
      }
    });
  };
});
define('exred/tests/helpers/start-app', ['exports', 'exred/app', 'exred/config/environment'], function (exports, _app, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = startApp;
  function startApp(attrs) {
    var attributes = Ember.merge({}, _environment.default.APP);
    attributes = Ember.merge(attributes, attrs); // use defaults, but you can override;

    return Ember.run(function () {
      var application = _app.default.create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
      return application;
    });
  }
});
define('exred/tests/integration/components/diagram-node-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('diagram-node', 'Integration | Component | diagram node', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "iioqA4DR",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"diagram-node\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "PkZ4abwi",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"diagram-node\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/editor-flownav-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('editor-flownav', 'Integration | Component | editor flownav', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wxyVLLAH",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"editor-flownav\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+anvpboV",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"editor-flownav\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/editor-flows-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('editor-flows', 'Integration | Component | editor flows', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wcDFcw8z",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"editor-flows\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2bil6yjC",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"editor-flows\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/editor-nodelist-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('editor-nodelist', 'Integration | Component | editor nodelist', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "oUXl1Yit",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"editor-nodelist\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Q2CMb0pf",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"editor-nodelist\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/editor-sidetabs-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('editor-sidetabs', 'Integration | Component | editor sidetabs', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "6rZBvubU",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"editor-sidetabs\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ahiPJzAY",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"editor-sidetabs\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/editor-toolbar-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('editor-toolbar', 'Integration | Component | editor toolbar', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Ycwaq9Ld",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"editor-toolbar\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Z728iML1",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"editor-toolbar\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab', 'Integration | Component | x config tab', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "ZgDX6Wa7",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "cHgKKfLo",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/codeblock-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/codeblock', 'Integration | Component | x config tab/codeblock', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Gg9uWuZD",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/codeblock\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "Gv8xY72N",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/codeblock\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/filepicker-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/filepicker', 'Integration | Component | x config tab/filepicker', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "XhH9LcCu",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/filepicker\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "P7kUXd9W",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/filepicker\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/list-multiselect-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/list-multiselect', 'Integration | Component | x config tab/list multiselect', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "8bl4lzS8",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/list-multiselect\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "ekCkTl4D",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/list-multiselect\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/list-singleselect-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/list-singleselect', 'Integration | Component | x config tab/list singleselect', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Xj58pMmg",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/list-singleselect\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "wsp34mDF",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/list-singleselect\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/number-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/number', 'Integration | Component | x config tab/number', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "gHZoJzkQ",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/number\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "C09xVVTP",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/number\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/select-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/select', 'Integration | Component | x config tab/select', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "rt3BIGvk",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/select\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "qiAci3Y5",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/select\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-config-tab/string-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-config-tab/string', 'Integration | Component | x config tab/string', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "39aPRcUR",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-config-tab/string\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "BSoXdoN6",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-config-tab/string\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-debug-item-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-debug-item', 'Integration | Component | x debug item', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "zNd1APlE",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-debug-item\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "AWGxs2QN",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-debug-item\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-debug-tab-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-debug-tab', 'Integration | Component | x debug tab', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "wZmaWI4n",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-debug-tab\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "rWcZ/Zyo",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-debug-tab\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-editor-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-editor', 'Integration | Component | x editor', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "b/TWtmCF",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-editor\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "5h4D9zxU",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-editor\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-info-tab-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-info-tab', 'Integration | Component | x info tab', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "Lxw0XoL4",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-info-tab\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "E4ozbdhT",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-info-tab\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-json-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-json', 'Integration | Component | x json', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "+W/B6Dxs",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-json\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "+wC1aACL",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-json\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-json2html-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-json2html', 'Integration | Component | x json2html', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "UINlc/9e",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-json2html\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "RzlOpqrO",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-json2html\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/integration/components/x-jsplumb-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForComponent)('x-jsplumb', 'Integration | Component | x jsplumb', {
    integration: true
  });

  (0, _emberQunit.test)('it renders', function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.on('myAction', function(val) { ... });

    this.render(Ember.HTMLBars.template({
      "id": "3DEA9CzC",
      "block": "{\"symbols\":[],\"statements\":[[1,[18,\"x-jsplumb\"],false]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), '');

    // Template block usage:
    this.render(Ember.HTMLBars.template({
      "id": "2cfDEPTR",
      "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"x-jsplumb\",null,null,{\"statements\":[[0,\"      template block text\\n\"]],\"parameters\":[]},null],[0,\"  \"]],\"hasEval\":false}",
      "meta": {}
    }));

    assert.equal(this.$().text().trim(), 'template block text');
  });
});
define('exred/tests/test-helper', ['exred/app', '@ember/test-helpers', 'ember-qunit'], function (_app, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create({ autoboot: false }));

  (0, _emberQunit.start)();
});
define('exred/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('helpers/destroy-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/module-for-acceptance.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/start-app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/diagram-node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/diagram-node-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/editor-flownav-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/editor-flownav-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/editor-flows-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/editor-flows-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/editor-nodelist-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/editor-nodelist-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/editor-sidetabs-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/editor-sidetabs-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/editor-toolbar-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/editor-toolbar-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/codeblock-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/codeblock-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/filepicker-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/filepicker-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/list-multiselect-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/list-multiselect-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/list-singleselect-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/list-singleselect-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/number-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/number-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/select-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/select-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-config-tab/string-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-config-tab/string-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-debug-item-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-debug-item-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-debug-tab-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-debug-tab-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-editor-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-editor-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-info-tab-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-info-tab-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-json-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-json-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-json2html-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-json2html-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/x-jsplumb-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/x-jsplumb-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/adapters/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/adapters/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/app/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/app/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/initializers/debug-helpers-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/initializers/debug-helpers-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/connection-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/connection-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/flow-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/flow-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/models/service-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/models/service-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/app-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/app/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/app/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/auth-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/auth-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/auth/login-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/auth/login-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/auth/register-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/auth/register-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/routes/index-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/routes/index-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/application-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/serializers/node-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/serializers/node-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/global-state-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/global-state-test.js should pass ESLint\n\n');
  });

  QUnit.test('unit/services/phoenix-channels-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/services/phoenix-channels-test.js should pass ESLint\n\n');
  });
});
define('exred/tests/unit/adapters/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('adapter:application', 'Unit | Adapter | application', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var adapter = this.subject();
    assert.ok(adapter);
  });
});
define('exred/tests/unit/controllers/app/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('controller:app/index', 'Unit | Controller | app/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var controller = this.subject();
    assert.ok(controller);
  });
});
define('exred/tests/unit/initializers/debug-helpers-test', ['exred/initializers/debug-helpers', 'qunit', 'exred/tests/helpers/destroy-app'], function (_debugHelpers, _qunit, _destroyApp) {
  'use strict';

  (0, _qunit.module)('Unit | Initializer | debug helpers', {
    beforeEach: function beforeEach() {
      var _this = this;

      Ember.run(function () {
        _this.application = Ember.Application.create();
        _this.application.deferReadiness();
      });
    },
    afterEach: function afterEach() {
      (0, _destroyApp.default)(this.application);
    }
  });

  // Replace this with your real tests.
  (0, _qunit.test)('it works', function (assert) {
    (0, _debugHelpers.initialize)(this.application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
define('exred/tests/unit/models/connection-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('connection', 'Unit | Model | connection', {
    // Specify the other units that are required for this test.
    needs: ['model:flow', 'model:node']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('exred/tests/unit/models/flow-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('flow', 'Unit | Model | flow', {
    // Specify the other units that are required for this test.
    needs: ['model:service', 'model:node', 'model:connection']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('exred/tests/unit/models/node-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('node', 'Unit | Model | node', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('exred/tests/unit/models/service-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('service', 'Unit | Model | service', {
    // Specify the other units that are required for this test.
    needs: []
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('exred/tests/unit/routes/app-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:app', 'Unit | Route | app', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/app/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:app/index', 'Unit | Route | app/index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:application', 'Unit | Route | application', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/auth-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:auth', 'Unit | Route | auth', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/auth/login-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:auth/login', 'Unit | Route | auth/login', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/auth/register-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:auth/register', 'Unit | Route | auth/register', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/routes/index-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('exred/tests/unit/serializers/application-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('application', 'Unit | Serializer | application', {
    // Specify the other units that are required for this test.
    needs: ['serializer:application']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('exred/tests/unit/serializers/node-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleForModel)('node', 'Unit | Serializer | node', {
    // Specify the other units that are required for this test.
    needs: ['serializer:node']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it serializes records', function (assert) {
    var record = this.subject();

    var serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
define('exred/tests/unit/services/global-state-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:global-state', 'Unit | Service | global state', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
define('exred/tests/unit/services/phoenix-channels-test', ['ember-qunit'], function (_emberQunit) {
  'use strict';

  (0, _emberQunit.moduleFor)('service:phoenix-channels', 'Unit | Service | phoenix channels', {
    // Specify the other units that are required for this test.
    // needs: ['service:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var service = this.subject();
    assert.ok(service);
  });
});
require('exred/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map
