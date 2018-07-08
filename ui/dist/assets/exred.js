"use strict";



define('exred/adapters/application', ['exports', 'ember-data', 'exred/config/environment', 'ember-simple-auth/mixins/data-adapter-mixin'], function (exports, _emberData, _environment, _dataAdapterMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPIAdapter.extend(_dataAdapterMixin.default, {
    host: _environment.default.DS.host || window.location.protocol + "//" + window.location.hostname + ":" + window.location.port,
    namespace: _environment.default.DS.namespace,
    authorizer: 'authorizer:oauth2',
    init: function init() {
      console.log('adapter host: ' + this.host);
      this._super.apply(this, arguments);
    },

    urlForCreateRecord: function urlForCreateRecord(modelName /*, snapshot*/) {
      switch (modelName) {
        case 'user':
        case 'users':
          return this._super.apply(this, arguments).replace('users', 'register');
        default:
          return this._super.apply(this, arguments);
      }
    }
  });
});
define('exred/app', ['exports', 'exred/resolver', 'ember-load-initializers', 'exred/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define("exred/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _lfGetOutletState) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _lfGetOutletState.default;
    }
  });
});
define('exred/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _basicDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _basicDropdown.default;
    }
  });
});
define('exred/components/basic-dropdown/content-element', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content-element'], function (exports, _contentElement) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contentElement.default;
    }
  });
});
define('exred/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('exred/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('exred/components/cp-panel-body', ['exports', 'ember-collapsible-panel/components/cp-panel-body/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('exred/components/cp-panel-toggle', ['exports', 'ember-collapsible-panel/components/cp-panel-toggle/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('exred/components/cp-panel', ['exports', 'ember-collapsible-panel/components/cp-panel/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('exred/components/cp-panels', ['exports', 'ember-collapsible-panel/components/cp-panels/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('exred/components/diagram-node', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    phoenixChannels: Ember.inject.service(),

    // contains the elementId of the node where the radio button was clicked on
    // we clear this right after the click
    firingNode: null,

    // passed in from parent component
    jspInstance: null,
    model: null, //node from store

    classNames: ["exred-diagram-node", "jtk-node"],
    classNameBindings: ['isEnabled:exred-enabled:exred-disabled', 'classNameForCategory'],

    attributeBindings: ['style'],

    isEnabled: true,

    classNameForCategory: Ember.computed('model.category', function () {
      var category = this.get('model').get('category');
      return 'exred-category-' + category;
    }),

    actions: {
      fire: function fire() {
        var nodeId = this.elementId;
        this.get('phoenixChannels').push('request', { action: 'fire', node_id: nodeId });
        this.debug("Fired:", this.elementId);
        this.set('firingNode', null);
      }
    },

    init: function init() {
      this._super.apply(this, arguments);

      var node = this.get('model');

      var style = ["left: ", node.get('x'), "px; ", "top: ", node.get('y'), "px; "].join('');

      this.set('style', Ember.String.htmlSafe(style));
      this.set('elementId', this.model.id);
    },

    didInsertElement: function didInsertElement() {
      var _this = this;

      var jspi = this.jspInstance;

      if (jspi) {

        // https://github.com/jsplumb/katavorio/wiki#draggables
        jspi.draggable(this.elementId, {
          grid: [20, 20],
          stop: function stop(params) {
            return _this._dragStop(params);
          }
        });

        var category = this.get('model').get('category');

        if (category != 'daemon') {
          // set up endpoints
          var endpoint_common = {
            endpoints: ["Rectangle", "Dot"],
            container: "canvas",
            isSource: true,
            isTarget: true,
            // connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
            connector: ["Bezier", { radius: 30 }],
            maxConnections: 10,
            //anchors:[ "Left", "Right" ],
            paintStyle: {
              stroke: "#446e99",
              fill: "#dddddd",
              radius: 5,
              strokeWidth: 2
            }
          };
          var leftEndpoint = jspi.addEndpoint(this.elementId, endpoint_common, { anchor: "Left" });
          var rightEndpoint = jspi.addEndpoint(this.elementId, endpoint_common, { anchor: "Right" });
        }
      }

      this.debug("created node:", this.elementId);
    },

    _dragStop: function _dragStop(params) {
      console.log('Stopped dragging. Time to update the node position!');
      console.log(params);
      //let currentX = Ember.$('#'+this.elementId)[0].offsetLeft;
      //let currentY = Ember.$('#'+this.elementId)[0].offsetTop;

      this.updateNodePositionXY(params.pos[0], params.pos[1]);
    },

    // willDestroyElement: function(){
    //   let node = this.get('model');
    //   let nodeX = node.get('x');
    //   let nodeY = node.get('y');
    // 
    //   let currentX = Ember.$('#'+this.elementId)[0].offsetLeft;
    //   let currentY = Ember.$('#'+this.elementId)[0].offsetTop;
    // 
    //   if (nodeX != currentX || nodeY != currentY){
    //     this.updateNodePositionXY(currentX, currentY);      
    //   }
    // },

    didDestroyElement: function didDestroyElement() {
      var jspi = this.jspInstance;
      jspi.removeAllEndpoints(this.elementId);
    }

  });
});
define('exred/components/editor-flownav', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    state: Ember.inject.service('global-state'),

    //flowNavOpen: null,
    currentFlowId: null,
    clickedFlow: null,

    actions: {
      toggle: function toggle(what) {
        var current = this.get(what);
        this.set(what, !current);
      },
      clickOnFlow: function clickOnFlow(flowId) {
        this.get('state').set('activeFlowId', flowId);
      }
    }
  });
});
define('exred/components/editor-flows', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('exred/components/editor-nodelist', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    state: Ember.inject.service('global-state'),

    actions: {
      clickOnNode: function clickOnNode(nodeId) {
        this.get('state').set('activeNodeId', nodeId);
      }
    }
  });
});
define('exred/components/editor-sidetabs', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('exred/components/editor-toolbar', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    phoenixChannels: Ember.inject.service(),
    paperToaster: Ember.inject.service(),
    state: Ember.inject.service('global-state'),

    actions: {
      log: function log(what) {
        this.debug(what);
      },
      requestDeploy: function requestDeploy() {
        this.get('paperToaster').show('Requesting Deploy', { duration: 2000, position: "top right" });
        this.get('phoenixChannels').push('request', { action: 'deploy' });
      }
    }
  });
});
define('exred/components/ember-ace-completion-tooltip', ['exports', 'ember-ace/components/ember-ace-completion-tooltip'], function (exports, _emberAceCompletionTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberAceCompletionTooltip.default;
    }
  });
});
define('exred/components/ember-ace', ['exports', 'ember-ace/components/ember-ace'], function (exports, _emberAce) {
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
define('exred/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('exred/components/from-elsewhere', ['exports', 'ember-elsewhere/components/from-elsewhere'], function (exports, _fromElsewhere) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fromElsewhere.default;
    }
  });
});
define('exred/components/frost-ajax-error-page', ['exports', 'ember-frost-core/components/frost-ajax-error-page'], function (exports, _frostAjaxErrorPage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostAjaxErrorPage.default;
    }
  });
});
define('exred/components/frost-bookends', ['exports', 'ember-frost-core/components/frost-bookends'], function (exports, _frostBookends) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostBookends.default;
    }
  });
});
define('exred/components/frost-button', ['exports', 'ember-frost-core/components/frost-button'], function (exports, _frostButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostButton.default;
    }
  });
});
define('exred/components/frost-checkbox', ['exports', 'ember-frost-core/components/frost-checkbox'], function (exports, _frostCheckbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostCheckbox.default;
    }
  });
});
define('exred/components/frost-combobox', ['exports', 'ember-frost-core/components/frost-combobox'], function (exports, _frostCombobox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostCombobox.default;
    }
  });
});
define('exred/components/frost-expand', ['exports', 'ember-frost-core/components/frost-expand'], function (exports, _frostExpand) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostExpand.default;
    }
  });
});
define('exred/components/frost-file-picker', ['exports', 'ember-frost-file-picker/components/frost-file-picker'], function (exports, _frostFilePicker) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostFilePicker.default;
    }
  });
});
define('exred/components/frost-icon', ['exports', 'ember-frost-core/components/frost-icon'], function (exports, _frostIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostIcon.default;
    }
  });
});
define('exred/components/frost-link', ['exports', 'ember-frost-core/components/frost-link'], function (exports, _frostLink) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostLink.default;
    }
  });
});
define('exred/components/frost-loading', ['exports', 'ember-frost-core/components/frost-loading'], function (exports, _frostLoading) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostLoading.default;
    }
  });
});
define('exred/components/frost-multi-select', ['exports', 'ember-frost-core/components/frost-multi-select'], function (exports, _frostMultiSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostMultiSelect.default;
    }
  });
});
define('exred/components/frost-password', ['exports', 'ember-frost-core/components/frost-password'], function (exports, _frostPassword) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostPassword.default;
    }
  });
});
define('exred/components/frost-radio-button', ['exports', 'ember-frost-core/components/frost-radio-button'], function (exports, _frostRadioButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostRadioButton.default;
    }
  });
});
define('exred/components/frost-radio-group', ['exports', 'ember-frost-core/components/frost-radio-group'], function (exports, _frostRadioGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostRadioGroup.default;
    }
  });
});
define('exred/components/frost-scroll', ['exports', 'ember-frost-core/components/frost-scroll'], function (exports, _frostScroll) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostScroll.default;
    }
  });
});
define('exred/components/frost-select-dropdown', ['exports', 'ember-frost-core/components/frost-select-dropdown'], function (exports, _frostSelectDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostSelectDropdown.default;
    }
  });
});
define('exred/components/frost-select-outlet', ['exports', 'ember-frost-core/components/frost-select-outlet'], function (exports, _frostSelectOutlet) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostSelectOutlet.default;
    }
  });
});
define('exred/components/frost-select', ['exports', 'ember-frost-core/components/frost-select'], function (exports, _frostSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostSelect.default;
    }
  });
});
define('exred/components/frost-text', ['exports', 'ember-frost-core/components/frost-text'], function (exports, _frostText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostText.default;
    }
  });
});
define('exred/components/frost-textarea', ['exports', 'ember-frost-core/components/frost-textarea'], function (exports, _frostTextarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostTextarea.default;
    }
  });
});
define('exred/components/frost-toggle', ['exports', 'ember-frost-core/components/frost-toggle'], function (exports, _frostToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _frostToggle.default;
    }
  });
});
define('exred/components/hookable-input', ['exports', 'ember-frost-core/components/hookable-input'], function (exports, _hookableInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hookableInput.default;
    }
  });
});
define('exred/components/hookable-textarea', ['exports', 'ember-frost-core/components/hookable-textarea'], function (exports, _hookableTextarea) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hookableTextarea.default;
    }
  });
});
define("exred/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _illiquidModel) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _illiquidModel.default;
    }
  });
});
define('exred/components/json-pretty', ['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    /*global Ember*/

    var JsonPrettyComponent = Ember.Component.extend({
        attributeBindings: ['obj', 'shouldHighlight'],
        classNames: ['json-pretty'],

        obj: null,
        shouldHighlight: true,

        preformattedText: Ember.computed('obj', function () {
            var obj = this.get('obj');
            var out;
            try {
                out = JSON.stringify(obj, null, 4);
            } catch (exc) {
                out = "Failed to parse input obj:\n" + obj;
            }
            if (out && this.get('shouldHighlight')) {
                out = this.highlightSyntax(out);
            }
            return new Ember.String.htmlSafe(out);
        }),

        //Thanks to: http://jsfiddle.net/KJQ9K/
        highlightSyntax: function highlightSyntax(json) {
            json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
            return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
                var cls = 'number';
                if (/^"/.test(match)) {
                    if (/:$/.test(match)) {
                        cls = 'key';
                    } else {
                        cls = 'string';
                    }
                } else if (/true|false/.test(match)) {
                    cls = 'boolean';
                } else if (/null/.test(match)) {
                    cls = 'null';
                }
                return '<span class="' + cls + '">' + match + '</span>';
            });
        }
    });

    exports.default = JsonPrettyComponent;
});
define("exred/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidBind) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidBind.default;
    }
  });
});
define("exred/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidChild) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidChild.default;
    }
  });
});
define("exred/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidContainer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidContainer.default;
    }
  });
});
define("exred/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidIf) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidIf.default;
    }
  });
});
define("exred/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidMeasured) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.default;
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function () {
      return _liquidMeasured.measure;
    }
  });
});
define("exred/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidOutlet) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidOutlet.default;
    }
  });
});
define("exred/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidSpacer) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidSpacer.default;
    }
  });
});
define('exred/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidSync) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _liquidSync.default;
    }
  });
});
define("exred/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidUnless) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidUnless.default;
    }
  });
});
define("exred/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidVersions) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function () {
      return _liquidVersions.default;
    }
  });
});
define('exred/components/markdown-to-html', ['exports', 'ember-cli-showdown/components/markdown-to-html'], function (exports, _markdownToHtml) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _markdownToHtml.default;
    }
  });
});
define('exred/components/multiple-from-elsewhere', ['exports', 'ember-elsewhere/components/multiple-from-elsewhere'], function (exports, _multipleFromElsewhere) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _multipleFromElsewhere.default;
    }
  });
});
define('exred/components/paper-autocomplete-content', ['exports', 'ember-paper/components/paper-autocomplete-content'], function (exports, _paperAutocompleteContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteContent.default;
});
define('exred/components/paper-autocomplete-dropdown', ['exports', 'ember-paper/components/paper-autocomplete-dropdown'], function (exports, _paperAutocompleteDropdown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteDropdown.default;
});
define('exred/components/paper-autocomplete-highlight', ['exports', 'ember-paper/components/paper-autocomplete-highlight'], function (exports, _paperAutocompleteHighlight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocompleteHighlight.default;
    }
  });
});
define('exred/components/paper-autocomplete-options', ['exports', 'ember-paper/components/paper-autocomplete-options'], function (exports, _paperAutocompleteOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocompleteOptions.default;
    }
  });
});
define('exred/components/paper-autocomplete-trigger-container', ['exports', 'ember-paper/components/paper-autocomplete-trigger-container'], function (exports, _paperAutocompleteTriggerContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteTriggerContainer.default;
});
define('exred/components/paper-autocomplete-trigger', ['exports', 'ember-paper/components/paper-autocomplete-trigger'], function (exports, _paperAutocompleteTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperAutocompleteTrigger.default;
});
define('exred/components/paper-autocomplete', ['exports', 'ember-paper/components/paper-autocomplete'], function (exports, _paperAutocomplete) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperAutocomplete.default;
    }
  });
});
define('exred/components/paper-backdrop', ['exports', 'ember-paper/components/paper-backdrop'], function (exports, _paperBackdrop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperBackdrop.default;
});
define('exred/components/paper-button', ['exports', 'ember-paper/components/paper-button'], function (exports, _paperButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperButton.default;
});
define('exred/components/paper-card-actions', ['exports', 'ember-paper/components/paper-card-actions'], function (exports, _paperCardActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardActions.default;
});
define('exred/components/paper-card-avatar', ['exports', 'ember-paper/components/paper-card-avatar'], function (exports, _paperCardAvatar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardAvatar.default;
});
define('exred/components/paper-card-content', ['exports', 'ember-paper/components/paper-card-content'], function (exports, _paperCardContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardContent.default;
});
define('exred/components/paper-card-header-headline', ['exports', 'ember-paper/components/paper-card-header-headline'], function (exports, _paperCardHeaderHeadline) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderHeadline.default;
});
define('exred/components/paper-card-header-subhead', ['exports', 'ember-paper/components/paper-card-header-subhead'], function (exports, _paperCardHeaderSubhead) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderSubhead.default;
});
define('exred/components/paper-card-header-text', ['exports', 'ember-paper/components/paper-card-header-text'], function (exports, _paperCardHeaderText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderText.default;
});
define('exred/components/paper-card-header-title', ['exports', 'ember-paper/components/paper-card-header-title'], function (exports, _paperCardHeaderTitle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeaderTitle.default;
});
define('exred/components/paper-card-header', ['exports', 'ember-paper/components/paper-card-header'], function (exports, _paperCardHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardHeader.default;
});
define('exred/components/paper-card-icon-actions', ['exports', 'ember-paper/components/paper-card-icon-actions'], function (exports, _paperCardIconActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardIconActions.default;
});
define('exred/components/paper-card-image', ['exports', 'ember-paper/components/paper-card-image'], function (exports, _paperCardImage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardImage.default;
});
define('exred/components/paper-card-media', ['exports', 'ember-paper/components/paper-card-media'], function (exports, _paperCardMedia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardMedia.default;
});
define('exred/components/paper-card-title-media', ['exports', 'ember-paper/components/paper-card-title-media'], function (exports, _paperCardTitleMedia) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitleMedia.default;
});
define('exred/components/paper-card-title-text', ['exports', 'ember-paper/components/paper-card-title-text'], function (exports, _paperCardTitleText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitleText.default;
});
define('exred/components/paper-card-title', ['exports', 'ember-paper/components/paper-card-title'], function (exports, _paperCardTitle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCardTitle.default;
});
define('exred/components/paper-card', ['exports', 'ember-paper/components/paper-card'], function (exports, _paperCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCard.default;
});
define('exred/components/paper-checkbox', ['exports', 'ember-paper/components/paper-checkbox'], function (exports, _paperCheckbox) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperCheckbox.default;
});
define('exred/components/paper-chips', ['exports', 'ember-paper/components/paper-chips'], function (exports, _paperChips) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperChips.default;
});
define('exred/components/paper-contact-chips', ['exports', 'ember-paper/components/paper-contact-chips'], function (exports, _paperContactChips) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperContactChips.default;
});
define('exred/components/paper-content', ['exports', 'ember-paper/components/paper-content'], function (exports, _paperContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperContent.default;
});
define('exred/components/paper-data-table-body', ['exports', 'paper-data-table/components/paper-data-table-body'], function (exports, _paperDataTableBody) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableBody.default;
    }
  });
});
define('exred/components/paper-data-table-cell', ['exports', 'paper-data-table/components/paper-data-table-cell'], function (exports, _paperDataTableCell) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableCell.default;
    }
  });
});
define('exred/components/paper-data-table-column', ['exports', 'paper-data-table/components/paper-data-table-column'], function (exports, _paperDataTableColumn) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableColumn.default;
    }
  });
});
define('exred/components/paper-data-table-dialog-inner', ['exports', 'paper-data-table/components/paper-data-table-dialog-inner'], function (exports, _paperDataTableDialogInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableDialogInner.default;
    }
  });
});
define('exred/components/paper-data-table-edit-dialog', ['exports', 'paper-data-table/components/paper-data-table-edit-dialog'], function (exports, _paperDataTableEditDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableEditDialog.default;
    }
  });
});
define('exred/components/paper-data-table-head', ['exports', 'paper-data-table/components/paper-data-table-head'], function (exports, _paperDataTableHead) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableHead.default;
    }
  });
});
define('exred/components/paper-data-table-pagination', ['exports', 'paper-data-table/components/paper-data-table-pagination'], function (exports, _paperDataTablePagination) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTablePagination.default;
    }
  });
});
define('exred/components/paper-data-table-row', ['exports', 'paper-data-table/components/paper-data-table-row'], function (exports, _paperDataTableRow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTableRow.default;
    }
  });
});
define('exred/components/paper-data-table', ['exports', 'paper-data-table/components/paper-data-table'], function (exports, _paperDataTable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDataTable.default;
    }
  });
});
define('exred/components/paper-dialog-actions', ['exports', 'ember-paper/components/paper-dialog-actions'], function (exports, _paperDialogActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogActions.default;
    }
  });
});
define('exred/components/paper-dialog-container', ['exports', 'ember-paper/components/paper-dialog-container'], function (exports, _paperDialogContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogContainer.default;
    }
  });
});
define('exred/components/paper-dialog-content', ['exports', 'ember-paper/components/paper-dialog-content'], function (exports, _paperDialogContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogContent.default;
    }
  });
});
define('exred/components/paper-dialog-inner', ['exports', 'ember-paper/components/paper-dialog-inner'], function (exports, _paperDialogInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialogInner.default;
    }
  });
});
define('exred/components/paper-dialog', ['exports', 'ember-paper/components/paper-dialog'], function (exports, _paperDialog) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperDialog.default;
    }
  });
});
define('exred/components/paper-divider', ['exports', 'ember-paper/components/paper-divider'], function (exports, _paperDivider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperDivider.default;
});
define('exred/components/paper-form', ['exports', 'ember-paper/components/paper-form'], function (exports, _paperForm) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperForm.default;
});
define('exred/components/paper-grid-list', ['exports', 'ember-paper/components/paper-grid-list'], function (exports, _paperGridList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridList.default;
    }
  });
});
define('exred/components/paper-grid-tile-footer', ['exports', 'ember-paper/components/paper-grid-tile-footer'], function (exports, _paperGridTileFooter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridTileFooter.default;
    }
  });
});
define('exred/components/paper-grid-tile', ['exports', 'ember-paper/components/paper-grid-tile'], function (exports, _paperGridTile) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperGridTile.default;
    }
  });
});
define('exred/components/paper-icon', ['exports', 'ember-paper/components/paper-icon'], function (exports, _paperIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperIcon.default;
});
define('exred/components/paper-ink-bar', ['exports', 'ember-paper/components/paper-ink-bar'], function (exports, _paperInkBar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperInkBar.default;
    }
  });
});
define('exred/components/paper-input', ['exports', 'ember-paper/components/paper-input'], function (exports, _paperInput) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperInput.default;
});
define('exred/components/paper-item', ['exports', 'ember-paper/components/paper-item'], function (exports, _paperItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperItem.default;
});
define('exred/components/paper-list', ['exports', 'ember-paper/components/paper-list'], function (exports, _paperList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperList.default;
});
define('exred/components/paper-menu-content-inner', ['exports', 'ember-paper/components/paper-menu-content-inner'], function (exports, _paperMenuContentInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuContentInner.default;
    }
  });
});
define('exred/components/paper-menu-content', ['exports', 'ember-paper/components/paper-menu-content'], function (exports, _paperMenuContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuContent.default;
    }
  });
});
define('exred/components/paper-menu-item', ['exports', 'ember-paper/components/paper-menu-item'], function (exports, _paperMenuItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenuItem.default;
    }
  });
});
define('exred/components/paper-menu', ['exports', 'ember-paper/components/paper-menu'], function (exports, _paperMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperMenu.default;
    }
  });
});
define('exred/components/paper-optgroup', ['exports', 'ember-paper/components/paper-optgroup'], function (exports, _paperOptgroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperOptgroup.default;
    }
  });
});
define('exred/components/paper-option', ['exports', 'ember-paper/components/paper-option'], function (exports, _paperOption) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperOption.default;
});
define('exred/components/paper-progress-circular', ['exports', 'ember-paper/components/paper-progress-circular'], function (exports, _paperProgressCircular) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperProgressCircular.default;
    }
  });
});
define('exred/components/paper-progress-linear', ['exports', 'ember-paper/components/paper-progress-linear'], function (exports, _paperProgressLinear) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperProgressLinear.default;
    }
  });
});
define('exred/components/paper-radio-group', ['exports', 'ember-paper/components/paper-radio-group'], function (exports, _paperRadioGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadioGroup.default;
    }
  });
});
define('exred/components/paper-radio-proxiable', ['exports', 'ember-paper/components/paper-radio-proxiable'], function (exports, _paperRadioProxiable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadioProxiable.default;
    }
  });
});
define('exred/components/paper-radio', ['exports', 'ember-paper/components/paper-radio'], function (exports, _paperRadio) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperRadio.default;
    }
  });
});
define('exred/components/paper-reset-button', ['exports', 'ember-paper/components/paper-reset-button'], function (exports, _paperResetButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperResetButton.default;
    }
  });
});
define('exred/components/paper-select-content', ['exports', 'ember-paper/components/paper-select-content'], function (exports, _paperSelectContent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectContent.default;
    }
  });
});
define('exred/components/paper-select-header', ['exports', 'ember-paper/components/paper-select-header'], function (exports, _paperSelectHeader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectHeader.default;
    }
  });
});
define('exred/components/paper-select-menu-inner', ['exports', 'ember-paper/components/paper-select-menu-inner'], function (exports, _paperSelectMenuInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectMenuInner.default;
    }
  });
});
define('exred/components/paper-select-menu-trigger', ['exports', 'ember-paper/components/paper-select-menu-trigger'], function (exports, _paperSelectMenuTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSelectMenuTrigger.default;
});
define('exred/components/paper-select-menu', ['exports', 'ember-paper/components/paper-select-menu'], function (exports, _paperSelectMenu) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectMenu.default;
    }
  });
});
define('exred/components/paper-select-options', ['exports', 'ember-paper/components/paper-select-options'], function (exports, _paperSelectOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectOptions.default;
    }
  });
});
define('exred/components/paper-select-search', ['exports', 'ember-paper/components/paper-select-search'], function (exports, _paperSelectSearch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectSearch.default;
    }
  });
});
define('exred/components/paper-select-trigger', ['exports', 'ember-paper/components/paper-select-trigger'], function (exports, _paperSelectTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSelectTrigger.default;
    }
  });
});
define('exred/components/paper-select', ['exports', 'ember-paper/components/paper-select'], function (exports, _paperSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSelect.default;
});
define('exred/components/paper-sidenav-container', ['exports', 'ember-paper/components/paper-sidenav-container'], function (exports, _paperSidenavContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSidenavContainer.default;
    }
  });
});
define('exred/components/paper-sidenav-inner', ['exports', 'ember-paper/components/paper-sidenav-inner'], function (exports, _paperSidenavInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenavInner.default;
});
define('exred/components/paper-sidenav-toggle', ['exports', 'ember-paper/components/paper-sidenav-toggle'], function (exports, _paperSidenavToggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenavToggle.default;
});
define('exred/components/paper-sidenav', ['exports', 'ember-paper/components/paper-sidenav'], function (exports, _paperSidenav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSidenav.default;
});
define('exred/components/paper-slider', ['exports', 'ember-paper/components/paper-slider'], function (exports, _paperSlider) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSlider.default;
});
define('exred/components/paper-snackbar-text', ['exports', 'ember-paper/components/paper-snackbar-text'], function (exports, _paperSnackbarText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSnackbarText.default;
    }
  });
});
define('exred/components/paper-speed-dial-actions-action', ['exports', 'ember-paper/components/paper-speed-dial-actions-action'], function (exports, _paperSpeedDialActionsAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialActionsAction.default;
    }
  });
});
define('exred/components/paper-speed-dial-actions', ['exports', 'ember-paper/components/paper-speed-dial-actions'], function (exports, _paperSpeedDialActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialActions.default;
    }
  });
});
define('exred/components/paper-speed-dial-trigger', ['exports', 'ember-paper/components/paper-speed-dial-trigger'], function (exports, _paperSpeedDialTrigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDialTrigger.default;
    }
  });
});
define('exred/components/paper-speed-dial', ['exports', 'ember-paper/components/paper-speed-dial'], function (exports, _paperSpeedDial) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSpeedDial.default;
    }
  });
});
define('exred/components/paper-subheader', ['exports', 'ember-paper/components/paper-subheader'], function (exports, _paperSubheader) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSubheader.default;
});
define('exred/components/paper-switch', ['exports', 'ember-paper/components/paper-switch'], function (exports, _paperSwitch) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperSwitch.default;
});
define('exred/components/paper-tab', ['exports', 'ember-paper/components/paper-tab'], function (exports, _paperTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTab.default;
    }
  });
});
define('exred/components/paper-table-select', ['exports', 'paper-data-table/components/paper-table-select'], function (exports, _paperTableSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTableSelect.default;
    }
  });
});
define('exred/components/paper-tabs', ['exports', 'ember-paper/components/paper-tabs'], function (exports, _paperTabs) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTabs.default;
    }
  });
});
define('exred/components/paper-toast-inner', ['exports', 'ember-paper/components/paper-toast-inner'], function (exports, _paperToastInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToastInner.default;
    }
  });
});
define('exred/components/paper-toast-text', ['exports', 'ember-paper/components/paper-toast-text'], function (exports, _paperToastText) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToastText.default;
    }
  });
});
define('exred/components/paper-toast', ['exports', 'ember-paper/components/paper-toast'], function (exports, _paperToast) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToast.default;
    }
  });
});
define('exred/components/paper-toaster', ['exports', 'ember-paper/components/paper-toaster'], function (exports, _paperToaster) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToaster.default;
    }
  });
});
define('exred/components/paper-toolbar-tools', ['exports', 'ember-paper/components/paper-toolbar-tools'], function (exports, _paperToolbarTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperToolbarTools.default;
});
define('exred/components/paper-toolbar', ['exports', 'ember-paper/components/paper-toolbar'], function (exports, _paperToolbar) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperToolbar.default;
});
define('exred/components/paper-tooltip-inner', ['exports', 'ember-paper/components/paper-tooltip-inner'], function (exports, _paperTooltipInner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTooltipInner.default;
    }
  });
});
define('exred/components/paper-tooltip', ['exports', 'ember-paper/components/paper-tooltip'], function (exports, _paperTooltip) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperTooltip.default;
    }
  });
});
define('exred/components/paper-virtual-repeat-scroller', ['exports', 'ember-paper/components/paper-virtual-repeat-scroller'], function (exports, _paperVirtualRepeatScroller) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperVirtualRepeatScroller.default;
});
define('exred/components/paper-virtual-repeat', ['exports', 'ember-paper/components/paper-virtual-repeat'], function (exports, _paperVirtualRepeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _paperVirtualRepeat.default;
});
define('exred/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _powerSelectMultiple) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectMultiple.default;
    }
  });
});
define('exred/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('exred/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _powerSelect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelect.default;
    }
  });
});
define('exred/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _beforeOptions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _beforeOptions.default;
    }
  });
});
define('exred/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _options) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _options.default;
    }
  });
});
define('exred/components/power-select/placeholder', ['exports', 'ember-power-select/components/power-select/placeholder'], function (exports, _placeholder) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _placeholder.default;
    }
  });
});
define('exred/components/power-select/power-select-group', ['exports', 'ember-power-select/components/power-select/power-select-group'], function (exports, _powerSelectGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _powerSelectGroup.default;
    }
  });
});
define('exred/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _searchMessage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _searchMessage.default;
    }
  });
});
define('exred/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _trigger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trigger.default;
    }
  });
});
define('exred/components/to-elsewhere', ['exports', 'ember-elsewhere/components/to-elsewhere'], function (exports, _toElsewhere) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toElsewhere.default;
    }
  });
});
define('exred/components/transition-group', ['exports', 'ember-css-transitions/components/transition-group'], function (exports, _transitionGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _transitionGroup.default;
    }
  });
});
define('exred/components/virtual-each', ['exports', 'virtual-each/components/virtual-each/component'], function (exports, _component) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _component.default;
    }
  });
});
define('exred/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('exred/components/x-config-tab', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    state: Ember.inject.service('global-state'),

    configBuffer: null,

    init: function init() {
      this._super.apply(this, arguments);
      this._clearConfigBuffer();
    },

    stateUpdate_activeNode: Ember.observer('state.activeNodeId', function () {
      this._clearConfigBuffer();
    }),

    actions: {
      configUpdate: function configUpdate(key, value) {
        this.debug("UPDATED CONFIG BUFFER", key);
        this.set("configBuffer." + key, value);
        this.get('state').set('configChanged', true);
      }
    },

    willDestroyElement: function willDestroyElement() {
      this._clearConfigBuffer();
    },

    _clearConfigBuffer: function _clearConfigBuffer() {
      var state = this.get('state');
      this.set('configBuffer', {});
      state.set('configChanged', false);
    }

  });
});
define('exred/components/x-config-tab/codeblock', ['exports', 'ember-computed-style'], function (exports, _emberComputedStyle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    style: (0, _emberComputedStyle.default)('styleProperties'),

    styleProperties: {
      minWidth: "400px",
      minHeight: "400px"
    },

    attributeBindings: ['style']
  });
});
define('exred/components/x-config-tab/filepicker', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('exred/components/x-config-tab/list-multiselect', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    init: function init() {
      this._super.apply(this, arguments);

      var value = this.get('value');

      // internal component property to store which items are enabled
      var itemlist = [];

      this.get('fieldAttrs.items').forEach(function (itemName) {
        var isEnabled = value.indexOf(itemName) != -1;
        itemlist.pushObject({ "name": itemName, "enabled": isEnabled });
      });
      this.set('itemlist', itemlist);
    },

    itemSelectChanged: Ember.observer('itemlist.@each.enabled', function () {
      this.debug(this.get('itemlist'));
      var itemlist = this.get('itemlist');
      var value = [];
      itemlist.forEach(function (item) {
        if (item.enabled) {
          value.push(item.name);
        };
      });
      this.debug("value", value);
      this.set('value', value);
      this.sendAction('configUpdate', this.get('key'), value);
    })
  });
});
define('exred/components/x-config-tab/list-singleselect', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    init: function init() {
      this._super.apply(this, arguments);

      var value = this.get('value');
      var items = this.get('fieldAttrs.items');

      this.set('itemlist', items);
      this.set('selectedItem', value);
    },

    itemSelectChanged: Ember.observer('selectedItem', function () {
      var value = this.get('selectedItem');
      this.set('value', value);
      this.sendAction('configUpdate', this.get('key'), value);
    })
  });
});
define('exred/components/x-config-tab/number', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    watchValue: Ember.observer('value', function () {
      var v = this.get('value');
      if (typeof v == 'string') {
        this.set('value', Number(v));
      }
    })
  });
});
define('exred/components/x-config-tab/select', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('exred/components/x-config-tab/string', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({});
});
define('exred/components/x-debug-item', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    // attrs: 
    //   item: {node_id, node_name, debug_data}
    // node_id and node_name references the node this debug messages
    // is coming from
    item: null,

    mouseEnter: function mouseEnter() {
      var item = this.get('item');
      Ember.$("#" + item.node_id).addClass("debugHoverOn");
    },

    mouseLeave: function mouseLeave() {
      var item = this.get('item');
      Ember.$("#" + item.node_id).removeClass("debugHoverOn");
    }

  });
});
define('exred/components/x-debug-tab', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    phoenixChannels: Ember.inject.service(),
    eventMsgList: [],

    maxListSize: 100,

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      this.set('msglist', []);

      var channel = this.get('phoenixChannels').joinChannel("event:debug", { verbosity: 3 });
      this.debug('joined debug channel');
      this.set('channel', channel);

      channel.on("notification", function (eventMsg) {
        console.log(eventMsg);_this._onNotification(eventMsg);
      });
    },

    willUpdate: function willUpdate() {
      this.debug("SCROLLING");

      var mydiv = this.$('#debug-list');
      console.log(mydiv[0].scrollHeight);
      mydiv.stop().animate({
        scrollTop: mydiv[0].scrollHeight
      }, 800);
    },

    willDestroyElement: function willDestroyElement() {
      this.debug("leaving event:debug channel");
      this.get('channel').leave();
    },

    _onNotification: function _onNotification(eventMsg) {
      this.debug('got event_msg:', eventMsg);
      var list = this.get('eventMsgList');
      if (list.length >= this.maxListSize) {
        list.removeAt(0, 10);
      }
      list.pushObject(eventMsg);
    }
  });
});
define('exred/components/x-editor', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    phoenixChannels: Ember.inject.service(),
    state: Ember.inject.service('global-state'),

    currentFlowId: null,
    currentFlow: null
  });
});
define('exred/components/x-info-tab', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    state: Ember.inject.service('global-state')
  });
});
define('exred/components/x-json', ['exports', 'renderjson'], function (exports, _renderjson) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({

    didInsertElement: function didInsertElement() {
      var value = this.get('value');
      var rendered = _renderjson.default.set_icons('+', '-').set_show_to_level(1)(value);
      this.$(".xjson").append(rendered);
    }
  });
});
define('exred/components/x-json2html', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    // attrs: json
    json: {},
    // didInsertElement(){
    //   const formatter = new JSONFormatter(this.json, 1);
    //   let v = formatter.render();
    //   this.$().append(v);
    // },
    // 
    html_out: Ember.computed('json', function () {
      var json_in = this.get('json');
      var html_out = Ember.String.htmlSafe("<span>" + JSON.stringify(json_in) + "</span>");
      return html_out;
    })
  });
});
define('exred/components/x-jsplumb', ['exports', 'ember-uuid'], function (exports, _emberUuid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    state: Ember.inject.service('global-state'),

    // template attributes:
    //   nodes: []
    //   connections: []

    //   addConnection: () => {}, 
    //   deleteConnection: () => {},
    //   nodeClick: () => {},
    //   updateNodePosition: () => {},

    jspInstance: null,

    actions: {
      clickOnNode: function clickOnNode(nodeId) {
        this.get('state').set('activeNodeId', nodeId);
      }
    },

    connEvents: {

      // called when a connection is added
      jspEventConnection: function jspEventConnection(connInfo, originalEvent, thisComponent) {
        thisComponent.debug('STARTED jspEventConnection');
        // check if the connection was established programatically (originalEvent is undefined)
        // or by using the mouse (originalEvent is defined)
        if (originalEvent) {
          connInfo.connection.endpoints.forEach(function (e) {
            return thisComponent.debug(e.anchor.type);
          });
          // add uuid to connection object
          var connId = (0, _emberUuid.v4)();
          connInfo.connection.connId = connId;
          thisComponent.debug("created connection through UI:", connInfo);

          var sourceAnchorType = connInfo.connection.endpoints[0].anchor.type;
          var targetAnchorType = connInfo.connection.endpoints[1].anchor.type;
          thisComponent.addConnection(connId, connInfo.sourceId, sourceAnchorType, connInfo.targetId, targetAnchorType);
        } else {
          thisComponent.debug("created connection from model:", connInfo.connection);
        }
      },

      jspEventClickDeleteLabel: function jspEventClickDeleteLabel(overlay, originalEvent, thisComponent) {
        console.log("clicked on delete overlay:", overlay);
        var conn = overlay.component;
        window.jsp.deleteConnection(conn); // delete it from the jsplumb instance
        thisComponent.deleteConnection(conn.connId); // call the delete function that was passed in to the component
      },

      jspEventClickFilterLabel: function jspEventClickFilterLabel() /*overlay, originalEvent*/{
        // console.log("ClickFilterLabel", connInfo);
        // console.log("originalEvent", originalEvent);
      }
    },

    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);

      var arrowConnOverlay = ["Arrow", {
        location: 1,
        visible: true,
        width: 15,
        length: 13,
        foldback: 1.0,
        id: "ARROW"
      }];

      var deleteLabelConnOverlay = ["Label", {
        label: "X",
        location: 0.5,
        id: "delete_label",
        cssClass: "diagramDeleteConnLabel",
        events: {
          click: function click(overlay, originalEvent) {
            return _this.connEvents.jspEventClickDeleteLabel(overlay, originalEvent, _this);
          }
        }
      }];

      var filterLabelConnOverlay = ["Label", {
        label: "",
        location: 0.2,
        id: "filter_label",
        cssClass: "diagramFilterConnLabel",
        events: { click: this.connEvents.jspEventClickFilterLabel }
      }];

      var thisComponent = this;

      jsPlumb.ready(function () {
        var instance = window.jsp = jsPlumb.getInstance({
          DragOptions: { cursor: 'pointer', zIndex: 2000 },
          ConnectionOverlays: [arrowConnOverlay, deleteLabelConnOverlay], //, filterLabelConnOverlay],
          Container: "canvas"
        });
        instance.bind("connection", function (connInfo, originalEvent) {
          return thisComponent.connEvents.jspEventConnection(connInfo, originalEvent, thisComponent);
        });
        instance.bind("connectionDetached", function (connInfo, originalEvent) {
          return thisComponent.connEvents.jspEventConnectionDetached(connInfo, originalEvent, thisComponent);
        });

        jsPlumb.fire("jsPlumbLoaded", instance);
        thisComponent.jspInstance = instance;
      });
    },

    // TODO this needs to run only on the initial render. 
    // currently it runs every time a node is dragged or anything else is happening
    // causes error by recreating the connections
    didRender: function didRender() {
      console.log("STARTED onDidRender");
      console.log("STARTED: onDidRender; connections: ", this.connections.length);
      // add connections to jsp instance  (this component only gets the connections
      // that belong to the currently visible flow so there's no need to filter or check against visible nodes)
      this.connections.forEach(function (connection) {
        // get('sourceId') actually returns the source node
        var sourceId = connection.get('sourceId').get('id');
        var targetId = connection.get('targetId').get('id');

        var existingConnCount = this.jspInstance.getConnections({ source: sourceId, target: targetId }).length;
        //console.log( 'getConnection', this.jspInstance.getConnections({source: sourceId, target: targetId}));
        if (existingConnCount == 0) {
          var srcEndpointSelection = this.jspInstance.selectEndpoints({ element: sourceId });
          var sourceEndpoint = null;
          for (var i = 0; i < srcEndpointSelection.length; i++) {
            var endp = srcEndpointSelection.get(i);
            if (endp.anchor.type == connection.get("sourceAnchorType")) {
              // found the endpoint we need to attach the connection source to
              //this.debug("connection add: FOUND ENDPOINT");
              sourceEndpoint = endp;
            }
          }

          var tgtEndpointSelection = this.jspInstance.selectEndpoints({ element: targetId });
          var targetEndpoint = null;
          for (var _i = 0; _i < tgtEndpointSelection.length; _i++) {
            var _endp = tgtEndpointSelection.get(_i);
            if (_endp.anchor.type == connection.get("targetAnchorType")) {
              // found the endpoint we need to attach the connection target to
              //this.debug("connection add: FOUND ENDPOINT");
              targetEndpoint = _endp;
            }
          }

          var newConn = this.jspInstance.connect({ source: sourceEndpoint, target: targetEndpoint });
          newConn.connId = connection.get('id');
        }
      }, this);
    },

    setup_old: function setup_old() {
      jsPlumb.ready(function () {
        var instance = window.jsp = jsPlumb.getInstance({
          // default drag options
          DragOptions: { cursor: 'pointer', zIndex: 2000 },
          // the overlays to decorate each connection with.  note that the label overlay uses a function to generate the label text; in this
          // case it returns the 'labelText' member that we set on each connection in the 'init' method below.
          ConnectionOverlays: [["Arrow", {
            location: 1,
            visible: true,
            width: 11,
            length: 11,
            id: "ARROW",
            events: {
              click: function click() {
                alert("you clicked on the arrow overlay");
              }
            }
          }], ["Label", {
            location: 0.1,
            id: "label",
            cssClass: "aLabel",
            events: {
              tap: function tap() {
                alert("hey");
              }
            }
          }]],
          Container: "canvas"
        });

        var basicType = {
          connector: "StateMachine",
          paintStyle: { stroke: "red", strokeWidth: 4 },
          hoverPaintStyle: { stroke: "blue" },
          overlays: ["Arrow"]
        };
        var endpoint_common = {
          endpoints: ["Dot", "Rectangle"],
          isSource: true,
          isTarget: true,
          // connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
          connector: ["Bezier", { radius: 30 }],
          maxConnections: 10,
          anchors: ["Left", "Right"],
          paintStyle: {
            stroke: "#7AB02C",
            fill: "transparent",
            radius: 7,
            strokeWidth: 2
          }
        };

        // instance.addEndpoint("testnode", endpoint_common);
        // instance.addEndpoint("testnode2", endpoint_common);
        // instance.addEndpoint("fabbutton", endpoint_common);
        // instance.draggable("testnode");
        // instance.draggable("testnode2");
        // instance.draggable("fabbutton");
        // instance.connect({source: "testnode", taget: "testnode2"});
        // instance.connect({
        //   source:"testnode2",
        //   target:"fabbutton",
        //   anchors:["Bottom", "Left" ],
        //   endpoint:"Rectangle",
        //   endpointStyle:{ fill: "yellow" }
        // });

        instance.addEndpoint("77", endpoint_common, { anchor: "LeftMiddle" });
        instance.addEndpoint("77", endpoint_common, { anchor: "RightMiddle" });
        instance.addEndpoint("88", endpoint_common);
        instance.addEndpoint("99", endpoint_common);
        instance.draggable(instance.selectEndpoints([".diagramNode"]), { grid: [20, 20] });
        // instance.draggable("99");
        // instance.draggable("88");
        // instance.draggable("77");


        // instance.addEndpoint(["77", "88", "99"], endpoint_common);
        //instance.addEndpoint("99", endpoint_common);
        //instance.draggable("99");

        //instance.draggable(".diagramNode", {containment: "parent"});


        instance.registerConnectionType("basic", basicType);

        //
        // // this is the paint style for the connecting lines..
        // var connectorPaintStyle = {
        //         strokeWidth: 2,
        //         stroke: "#61B7CF",
        //         joinstyle: "round",
        //         outlineStroke: "white",
        //         outlineWidth: 2
        //     },
        // // .. and this is the hover style.
        //     connectorHoverStyle = {
        //         strokeWidth: 3,
        //         stroke: "#216477",
        //         outlineWidth: 5,
        //         outlineStroke: "white"
        //     },
        //     endpointHoverStyle = {
        //         fill: "#216477",
        //         stroke: "#216477"
        //     },
        // // the definition of source endpoints (the small blue ones)
        //     sourceEndpoint = {
        //         endpoint: "Dot",
        //         paintStyle: {
        //             stroke: "#7AB02C",
        //             fill: "transparent",
        //             radius: 7,
        //             strokeWidth: 1
        //         },
        //         isSource: true,
        //         connector: [ "Flowchart", { stub: [40, 60], gap: 10, cornerRadius: 5, alwaysRespectStubs: true } ],
        //         connectorStyle: connectorPaintStyle,
        //         hoverPaintStyle: endpointHoverStyle,
        //         connectorHoverStyle: connectorHoverStyle,
        //         dragOptions: {},
        //         overlays: [
        //             [ "Label", {
        //                 location: [0.5, 1.5],
        //                 label: "Drag",
        //                 cssClass: "endpointSourceLabel",
        //                 visible:false
        //             } ]
        //         ]
        //     },
        // // the definition of target endpoints (will appear when the user drags a connection)
        //     targetEndpoint = {
        //         endpoint: "Dot",
        //         paintStyle: { fill: "#7AB02C", radius: 7 },
        //         hoverPaintStyle: endpointHoverStyle,
        //         maxConnections: -1,
        //         dropOptions: { hoverClass: "hover", activeClass: "active" },
        //         isTarget: true,
        //         overlays: [
        //             [ "Label", { location: [0.5, -0.5], label: "Drop", cssClass: "endpointTargetLabel", visible:false } ]
        //         ]
        //     },
        //     init = function (connection) {
        //         connection.getOverlay("label").setLabel(connection.sourceId.substring(15) + "-" + connection.targetId.substring(15));
        //     };
        //
        // var _addEndpoints = function (toId, sourceAnchors, targetAnchors) {
        //     for (var i = 0; i < sourceAnchors.length; i++) {
        //         var sourceUUID = toId + sourceAnchors[i];
        //         instance.addEndpoint("flowchart" + toId, sourceEndpoint, {
        //             anchor: sourceAnchors[i], uuid: sourceUUID
        //         });
        //     }
        //     for (var j = 0; j < targetAnchors.length; j++) {
        //         var targetUUID = toId + targetAnchors[j];
        //         instance.addEndpoint("flowchart" + toId, targetEndpoint, { anchor: targetAnchors[j], uuid: targetUUID });
        //     }
        // };
        //
        // // suspend drawing and initialise.
        // instance.batch(function () {
        //
        //     _addEndpoints("Window4", ["TopCenter", "BottomCenter"], ["LeftMiddle", "RightMiddle"]);
        //     _addEndpoints("Window2", ["LeftMiddle", "BottomCenter"], ["TopCenter", "RightMiddle"]);
        //     _addEndpoints("Window3", ["RightMiddle", "BottomCenter"], ["LeftMiddle", "TopCenter"]);
        //     _addEndpoints("Window1", ["LeftMiddle", "RightMiddle"], ["TopCenter", "BottomCenter"]);
        //
        //     // listen for new connections; initialise them the same way we initialise the connections at startup.
        //     instance.bind("connection", function (connInfo, originalEvent) {
        //         init(connInfo.connection);
        //     });
        //
        //     // make all the window divs draggable
        //     instance.draggable(jsPlumb.getSelector(".flowchart-demo .window"), { grid: [20, 20] });
        //     // THIS DEMO ONLY USES getSelector FOR CONVENIENCE. Use your library's appropriate selector
        //     // method, or document.querySelectorAll:
        //     //jsPlumb.draggable(document.querySelectorAll(".window"), { grid: [20, 20] });
        //
        //     // connect a few up
        //     instance.connect({uuids: ["Window2BottomCenter", "Window3TopCenter"], editable: true});
        //     instance.connect({uuids: ["Window2LeftMiddle", "Window4LeftMiddle"], editable: true});
        //     instance.connect({uuids: ["Window4TopCenter", "Window4RightMiddle"], editable: true});
        //     instance.connect({uuids: ["Window3RightMiddle", "Window2RightMiddle"], editable: true});
        //     instance.connect({uuids: ["Window4BottomCenter", "Window1TopCenter"], editable: true});
        //     instance.connect({uuids: ["Window3BottomCenter", "Window1BottomCenter"], editable: true});
        //     //
        //
        //     //
        //     // listen for clicks on connections, and offer to delete connections on click.
        //     //
        //     instance.bind("click", function (conn, originalEvent) {
        //        // if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
        //          //   instance.detach(conn);
        //         conn.toggleType("basic");
        //     });
        //
        //     instance.bind("connectionDrag", function (connection) {
        //         console.log("connection " + connection.id + " is being dragged. suspendedElement is ", connection.suspendedElement, " of type ", connection.suspendedElementType);
        //     });
        //
        //     instance.bind("connectionDragStop", function (connection) {
        //         console.log("connection " + connection.id + " was dragged");
        //     });
        //
        //     instance.bind("connectionMoved", function (params) {
        //         console.log("connection " + params.connection.id + " was moved");
        //     });
        // });

        jsPlumb.fire("jsPlumbDemoLoaded", instance);
        this.jspInstance = instance;
      });
    } //.on('didInsertElement')
  });
});
define('exred/controllers/app/index', ['exports', 'ember-uuid'], function (exports, _emberUuid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({
    phoenixChannels: Ember.inject.service(),
    paperToaster: Ember.inject.service(),
    state: Ember.inject.service('global-state'),

    init: function init() {
      this._super.apply(this, arguments);

      this.get('state'); // apparently this is supposed to trigger the observers on state

      this.get('phoenixChannels').connect();

      this.setProperties({
        flowNavOpen: false
      });
    },

    stateUpdate_activeNode: Ember.observer('state.activeNodeId', function () {
      var state = this.get('state');
      var id = state.get('activeNodeId');
      var node = this.model.nodes.findBy('id', id);
      state.set('activeNode', node);
      this.debug('state (activeNodeId changed)', state);
    }),

    stateUpdate_activeFlow: Ember.observer('state.activeFlowId', function () {
      var state = this.get('state');
      var id = state.get('activeFlowId');
      var flow = this.model.flows.findBy('id', id);
      state.set('activeFlow', flow);
      this.debug('state (activeFlowId changed )', state);
    }),

    stateChange_configChanged: Ember.observer('state.configChanged', function () {
      var state = this.get('state');
      this.debug('state', state);
    }),

    currentFlow: Ember.computed('currentFlowId', function () {
      var cfid = this.get('currentFlowId');
      var cf = this.model.flows.findBy('id', cfid);
      return cf;
    }),

    actions: {
      toggleFlowNav: function toggleFlowNav() {
        this.set('flowNavOpen', !this.get('flowNavOpen'));
      },

      deleteActive: function deleteActive() {
        this.debug("deleting active node");
        var state = this.get('state');
        var store = this.get('store');

        var activeNodeId = state.get('activeNodeId');

        if (activeNodeId) {
          store.findRecord('node', activeNodeId, { backgroundReload: false }).then(function (node) {
            node.destroyRecord();
            state.set('activeNodeId', null);
          });
        }
      },

      addConnection: function addConnection(connId, sourceId, sourceAnchorType, targetId, targetAnchorType) {
        var _this = this;

        this.debug("adding connection:", [sourceId, targetId]);
        var store = this.get('store');
        var state = this.get('state');

        var flow = store.peekRecord('flow', state.get('activeFlowId'));
        var sourceNode = store.peekRecord('node', sourceId);
        var targetNode = store.peekRecord('node', targetId);

        var conn = {
          id: connId,
          config: {},
          flowId: flow,
          sourceId: sourceNode,
          targetId: targetNode,
          sourceAnchorType: sourceAnchorType,
          targetAnchorType: targetAnchorType
        };
        var connRecord = store.createRecord('connection', conn);
        this.debug("created connection:", connRecord.get('id'));

        connRecord.save().then(function () {
          _this.debug("saved connection");
        }).catch(function (err) {
          // remove from Store
          _this.get('store').unloadRecord(connRecord);
          _this.debug("ERROR failed to create connection", err.errors);
        });
      },

      deleteConnection: function deleteConnection(connId) {
        this.debug('deleteing connection:', connId);
        this.get('store').findRecord('connection', connId, { backgroundReload: false }).then(function (conn) {
          conn.destroyRecord();
        });
      },

      updateNodePosition: function updateNodePosition(nodeId, x, y) {
        this.debug('Updating Node Position');
        this.get('store').findRecord('node', nodeId).then(function (node) {
          node.set('x', x);
          node.set('y', y);
          node.save();
        });
      },

      createDNode: function createDNode(nodeId) {
        var _this2 = this;

        this.debug("creating diagram node from prototype:", nodeId);

        var state = this.get('state');
        var store = this.get('store');
        var activeFlowId = state.get('activeFlowId');

        var prototype = store.peekRecord('node', nodeId);
        var flow = store.peekRecord('flow', activeFlowId);

        var instance = {
          id: (0, _emberUuid.v4)(),
          isPrototype: false,
          flowId: flow,
          name: prototype.get('name'),
          info: prototype.get('info'),
          category: prototype.get('category'),
          module: prototype.get('module'),
          config: Ember.$.extend(true, {}, prototype.get('config')),
          ui_attributes: prototype.get('ui_attributes'),
          x: 0,
          y: 0
        };

        var dnode = store.createRecord('node', instance);

        this.debug("created node:", dnode.get('id'), dnode.get('name'));

        dnode.save().then(function () {
          _this2.debug("saved node");
        }).catch(function (err) {
          // remove from Store
          store.unloadRecord(dnode);
          _this2.debug("ERROR failed to create node", err.errors);
        });

        // // Clear any existing error messages
        // this.set('currentModel.newRoom.errors', []);
        //
        // room.save().then(() => { // Successful creation
        //   // Notification of success!
        //   this.get('flashMessages').success(`Created room: ${data.name}`);
        //   this.set('currentModel.newRoom.name', ''); // Clear the input
        // }).catch((err) => { // Server-side error message
        //   // Remove the ember-data record from the Store
        //   this.store.unloadRecord(room);
        //   // Pass any error messages (i.e., server-side validation) into the UI
        //   this.set('currentModel.newRoom.errors', (err.errors || []).mapBy('detail'));
        //   // Notification of failure!
        //   this.get('flashMessages').danger(`Problem creating room: ${data.name}`);
        // });
        //
      },

      saveNewConfig: function saveNewConfig(newConfig) {
        var t = this;
        t.debug('Updating selected node with: ', newConfig);

        var state = this.get('state');
        var paperToaster = this.get('paperToaster');
        var store = this.get('store');
        var activeNodeId = state.get('activeNodeId');

        store.findRecord('node', activeNodeId).then(function (node) {
          t.debug('found node record');

          for (var key in newConfig) {
            if (newConfig.hasOwnProperty(key)) {
              node.set("config." + key + ".value", newConfig[key]);
              t.debug("SET config." + key + ".value", newConfig[key]);
            }
          }

          node.save().then(function () {
            t.debug("Updated node");
            state.set('configChanged', false);
          }).catch(function (err) {
            // remove from Store
            store.unloadRecord(node);
            t.debug("ERROR failed to update node", err.errors);
            paperToaster.show('Error saving update', { duration: 2000, position: "top right" });
          });
        });

        //this.selectednode.setProperties(newConfig);
        // for (var key in newConfig){
        //   if (newConfig.hasOwnProperty(key)){
        //     this.selectedNode.set("config."+key+".value", newConfig[key]);
        //     this.debug("SET config."+key+".value", newConfig[key]);
        //   }
        // }
        // this.debug("selectednode.config", this.selectedNode.get('config'));
        // this.selectedNode.save().then(() => {
        //   this.debug("updated node");
        //   this.set('configChanged', false);
        // }).catch((err) => {
        //   // remove from Store
        //   this.store.unloadRecord(dnode);
        //   this.debug("ERROR failed to update node", err.errors);
        //   this.get('paperToaster').show('Error saving update', {duration: 2000, position: "top right"});
        // });
      }
    }
  });
});
define('exred/helpers/-paper-underscore', ['exports', 'ember-paper/helpers/underscore'], function (exports, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _underscore.default;
    }
  });
  Object.defineProperty(exports, 'underscore', {
    enumerable: true,
    get: function () {
      return _underscore.underscore;
    }
  });
});
define('exred/helpers/and', ['exports', 'ember-truth-helpers/helpers/and'], function (exports, _and) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_and.andHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_and.andHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/app-version', ['exports', 'exred/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;
  var version = _environment.default.APP.version;
  function appVersion(_) {
    var hash = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('exred/helpers/append', ['exports', 'ember-composable-helpers/helpers/append'], function (exports, _append) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _append.default;
    }
  });
  Object.defineProperty(exports, 'append', {
    enumerable: true,
    get: function () {
      return _append.append;
    }
  });
});
define('exred/helpers/array', ['exports', 'ember-frost-core/helpers/array'], function (exports, _array) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _array.default;
    }
  });
  Object.defineProperty(exports, 'array', {
    enumerable: true,
    get: function () {
      return _array.array;
    }
  });
});
define('exred/helpers/camelize', ['exports', 'ember-cli-string-helpers/helpers/camelize'], function (exports, _camelize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _camelize.default;
    }
  });
  Object.defineProperty(exports, 'camelize', {
    enumerable: true,
    get: function () {
      return _camelize.camelize;
    }
  });
});
define('exred/helpers/cancel-all', ['exports', 'ember-concurrency/-helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.cancelHelper = cancelHelper;
  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      Ember.assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _helpers.taskHelperClosure)('cancelAll', args);
  }

  exports.default = Ember.Helper.helper(cancelHelper);
});
define('exred/helpers/capitalize', ['exports', 'ember-cli-string-helpers/helpers/capitalize'], function (exports, _capitalize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _capitalize.default;
    }
  });
  Object.defineProperty(exports, 'capitalize', {
    enumerable: true,
    get: function () {
      return _capitalize.capitalize;
    }
  });
});
define('exred/helpers/chunk', ['exports', 'ember-composable-helpers/helpers/chunk'], function (exports, _chunk) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _chunk.default;
    }
  });
  Object.defineProperty(exports, 'chunk', {
    enumerable: true,
    get: function () {
      return _chunk.chunk;
    }
  });
});
define('exred/helpers/classify', ['exports', 'ember-cli-string-helpers/helpers/classify'], function (exports, _classify) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _classify.default;
    }
  });
  Object.defineProperty(exports, 'classify', {
    enumerable: true,
    get: function () {
      return _classify.classify;
    }
  });
});
define('exred/helpers/compact', ['exports', 'ember-composable-helpers/helpers/compact'], function (exports, _compact) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compact.default;
    }
  });
  Object.defineProperty(exports, 'compact', {
    enumerable: true,
    get: function () {
      return _compact.compact;
    }
  });
});
define('exred/helpers/compute', ['exports', 'ember-composable-helpers/helpers/compute'], function (exports, _compute) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _compute.default;
    }
  });
  Object.defineProperty(exports, 'compute', {
    enumerable: true,
    get: function () {
      return _compute.compute;
    }
  });
});
define('exred/helpers/contains', ['exports', 'ember-composable-helpers/helpers/contains'], function (exports, _contains) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _contains.default;
    }
  });
  Object.defineProperty(exports, 'contains', {
    enumerable: true,
    get: function () {
      return _contains.contains;
    }
  });
});
define('exred/helpers/dasherize', ['exports', 'ember-cli-string-helpers/helpers/dasherize'], function (exports, _dasherize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dasherize.default;
    }
  });
  Object.defineProperty(exports, 'dasherize', {
    enumerable: true,
    get: function () {
      return _dasherize.dasherize;
    }
  });
});
define('exred/helpers/dec', ['exports', 'ember-composable-helpers/helpers/dec'], function (exports, _dec) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dec.default;
    }
  });
  Object.defineProperty(exports, 'dec', {
    enumerable: true,
    get: function () {
      return _dec.dec;
    }
  });
});
define('exred/helpers/drop', ['exports', 'ember-composable-helpers/helpers/drop'], function (exports, _drop) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drop.default;
    }
  });
  Object.defineProperty(exports, 'drop', {
    enumerable: true,
    get: function () {
      return _drop.drop;
    }
  });
});
define('exred/helpers/ehook', ['exports', 'ember-frost-core/helpers/ehook'], function (exports, _ehook) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ehook.default;
    }
  });
  Object.defineProperty(exports, 'ehook', {
    enumerable: true,
    get: function () {
      return _ehook.ehook;
    }
  });
});
define('exred/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectIsGroup) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('exred/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectIsSelected) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('exred/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectTrueStringIfPresent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.default;
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function () {
      return _emberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('exred/helpers/eq', ['exports', 'ember-truth-helpers/helpers/equal'], function (exports, _equal) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_equal.equalHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_equal.equalHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/extend', ['exports', 'ember-frost-core/helpers/extend'], function (exports, _extend) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _extend.default;
    }
  });
  Object.defineProperty(exports, 'extend', {
    enumerable: true,
    get: function () {
      return _extend.extend;
    }
  });
});
define('exred/helpers/filter-by', ['exports', 'ember-composable-helpers/helpers/filter-by'], function (exports, _filterBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filterBy.default;
    }
  });
  Object.defineProperty(exports, 'filterBy', {
    enumerable: true,
    get: function () {
      return _filterBy.filterBy;
    }
  });
});
define('exred/helpers/filter', ['exports', 'ember-composable-helpers/helpers/filter'], function (exports, _filter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _filter.default;
    }
  });
  Object.defineProperty(exports, 'filter', {
    enumerable: true,
    get: function () {
      return _filter.filter;
    }
  });
});
define('exred/helpers/find-by', ['exports', 'ember-composable-helpers/helpers/find-by'], function (exports, _findBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _findBy.default;
    }
  });
  Object.defineProperty(exports, 'findBy', {
    enumerable: true,
    get: function () {
      return _findBy.findBy;
    }
  });
});
define('exred/helpers/flatten', ['exports', 'ember-composable-helpers/helpers/flatten'], function (exports, _flatten) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flatten.default;
    }
  });
  Object.defineProperty(exports, 'flatten', {
    enumerable: true,
    get: function () {
      return _flatten.flatten;
    }
  });
});
define('exred/helpers/group-by', ['exports', 'ember-composable-helpers/helpers/group-by'], function (exports, _groupBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _groupBy.default;
    }
  });
  Object.defineProperty(exports, 'groupBy', {
    enumerable: true,
    get: function () {
      return _groupBy.groupBy;
    }
  });
});
define('exred/helpers/gt', ['exports', 'ember-truth-helpers/helpers/gt'], function (exports, _gt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_gt.gtHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_gt.gtHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/gte', ['exports', 'ember-truth-helpers/helpers/gte'], function (exports, _gte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_gte.gteHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_gte.gteHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/has-next', ['exports', 'ember-composable-helpers/helpers/has-next'], function (exports, _hasNext) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasNext.default;
    }
  });
  Object.defineProperty(exports, 'hasNext', {
    enumerable: true,
    get: function () {
      return _hasNext.hasNext;
    }
  });
});
define('exred/helpers/has-previous', ['exports', 'ember-composable-helpers/helpers/has-previous'], function (exports, _hasPrevious) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasPrevious.default;
    }
  });
  Object.defineProperty(exports, 'hasPrevious', {
    enumerable: true,
    get: function () {
      return _hasPrevious.hasPrevious;
    }
  });
});
define('exred/helpers/hook', ['exports', 'ember-hook/helpers/hook'], function (exports, _hook) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hook.default;
    }
  });
  Object.defineProperty(exports, 'hook', {
    enumerable: true,
    get: function () {
      return _hook.hook;
    }
  });
});
define('exred/helpers/html-safe', ['exports', 'ember-cli-string-helpers/helpers/html-safe'], function (exports, _htmlSafe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _htmlSafe.default;
    }
  });
  Object.defineProperty(exports, 'htmlSafe', {
    enumerable: true,
    get: function () {
      return _htmlSafe.htmlSafe;
    }
  });
});
define('exred/helpers/humanize', ['exports', 'ember-cli-string-helpers/helpers/humanize'], function (exports, _humanize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _humanize.default;
    }
  });
  Object.defineProperty(exports, 'humanize', {
    enumerable: true,
    get: function () {
      return _humanize.humanize;
    }
  });
});
define('exred/helpers/inc', ['exports', 'ember-composable-helpers/helpers/inc'], function (exports, _inc) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inc.default;
    }
  });
  Object.defineProperty(exports, 'inc', {
    enumerable: true,
    get: function () {
      return _inc.inc;
    }
  });
});
define('exred/helpers/intersect', ['exports', 'ember-composable-helpers/helpers/intersect'], function (exports, _intersect) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _intersect.default;
    }
  });
  Object.defineProperty(exports, 'intersect', {
    enumerable: true,
    get: function () {
      return _intersect.intersect;
    }
  });
});
define('exred/helpers/invoke', ['exports', 'ember-composable-helpers/helpers/invoke'], function (exports, _invoke) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _invoke.default;
    }
  });
  Object.defineProperty(exports, 'invoke', {
    enumerable: true,
    get: function () {
      return _invoke.invoke;
    }
  });
});
define('exred/helpers/is-array', ['exports', 'ember-truth-helpers/helpers/is-array'], function (exports, _isArray) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_isArray.isArrayHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_isArray.isArrayHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _isEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _isEqual.default;
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function () {
      return _isEqual.isEqual;
    }
  });
});
define('exred/helpers/join', ['exports', 'ember-composable-helpers/helpers/join'], function (exports, _join) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _join.default;
    }
  });
  Object.defineProperty(exports, 'join', {
    enumerable: true,
    get: function () {
      return _join.join;
    }
  });
});
define('exred/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _lfLockModel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfLockModel.default;
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function () {
      return _lfLockModel.lfLockModel;
    }
  });
});
define('exred/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _lfOr) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lfOr.default;
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function () {
      return _lfOr.lfOr;
    }
  });
});
define('exred/helpers/lowercase', ['exports', 'ember-cli-string-helpers/helpers/lowercase'], function (exports, _lowercase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _lowercase.default;
    }
  });
  Object.defineProperty(exports, 'lowercase', {
    enumerable: true,
    get: function () {
      return _lowercase.lowercase;
    }
  });
});
define('exred/helpers/lt', ['exports', 'ember-truth-helpers/helpers/lt'], function (exports, _lt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_lt.ltHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_lt.ltHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/lte', ['exports', 'ember-truth-helpers/helpers/lte'], function (exports, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_lte.lteHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_lte.lteHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/map-by', ['exports', 'ember-composable-helpers/helpers/map-by'], function (exports, _mapBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _mapBy.default;
    }
  });
  Object.defineProperty(exports, 'mapBy', {
    enumerable: true,
    get: function () {
      return _mapBy.mapBy;
    }
  });
});
define('exred/helpers/map', ['exports', 'ember-composable-helpers/helpers/map'], function (exports, _map) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _map.default;
    }
  });
  Object.defineProperty(exports, 'map', {
    enumerable: true,
    get: function () {
      return _map.map;
    }
  });
});
define('exred/helpers/next', ['exports', 'ember-composable-helpers/helpers/next'], function (exports, _next) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _next.default;
    }
  });
  Object.defineProperty(exports, 'next', {
    enumerable: true,
    get: function () {
      return _next.next;
    }
  });
});
define('exred/helpers/not-eq', ['exports', 'ember-truth-helpers/helpers/not-equal'], function (exports, _notEqual) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_notEqual.notEqualHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_notEqual.notEqualHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/not', ['exports', 'ember-truth-helpers/helpers/not'], function (exports, _not) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_not.notHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_not.notHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/object-at', ['exports', 'ember-composable-helpers/helpers/object-at'], function (exports, _objectAt) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _objectAt.default;
    }
  });
  Object.defineProperty(exports, 'objectAt', {
    enumerable: true,
    get: function () {
      return _objectAt.objectAt;
    }
  });
});
define('exred/helpers/object', ['exports', 'ember-frost-core/helpers/object'], function (exports, _object) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _object.default;
    }
  });
  Object.defineProperty(exports, 'object', {
    enumerable: true,
    get: function () {
      return _object.object;
    }
  });
});
define('exred/helpers/optional', ['exports', 'ember-composable-helpers/helpers/optional'], function (exports, _optional) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _optional.default;
    }
  });
  Object.defineProperty(exports, 'optional', {
    enumerable: true,
    get: function () {
      return _optional.optional;
    }
  });
});
define('exred/helpers/or', ['exports', 'ember-truth-helpers/helpers/or'], function (exports, _or) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_or.orHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_or.orHelper);
  }

  exports.default = forExport;
});
define('exred/helpers/perform', ['exports', 'ember-concurrency/-helpers'], function (exports, _helpers) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.performHelper = performHelper;
  function performHelper(args, hash) {
    return (0, _helpers.taskHelperClosure)('perform', args, hash);
  }

  exports.default = Ember.Helper.helper(performHelper);
});
define('exred/helpers/pipe-action', ['exports', 'ember-composable-helpers/helpers/pipe-action'], function (exports, _pipeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipeAction.default;
    }
  });
});
define('exred/helpers/pipe', ['exports', 'ember-composable-helpers/helpers/pipe'], function (exports, _pipe) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pipe.default;
    }
  });
  Object.defineProperty(exports, 'pipe', {
    enumerable: true,
    get: function () {
      return _pipe.pipe;
    }
  });
});
define('exred/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('exred/helpers/previous', ['exports', 'ember-composable-helpers/helpers/previous'], function (exports, _previous) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _previous.default;
    }
  });
  Object.defineProperty(exports, 'previous', {
    enumerable: true,
    get: function () {
      return _previous.previous;
    }
  });
});
define('exred/helpers/queue', ['exports', 'ember-composable-helpers/helpers/queue'], function (exports, _queue) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _queue.default;
    }
  });
  Object.defineProperty(exports, 'queue', {
    enumerable: true,
    get: function () {
      return _queue.queue;
    }
  });
});
define('exred/helpers/range', ['exports', 'ember-composable-helpers/helpers/range'], function (exports, _range) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _range.default;
    }
  });
  Object.defineProperty(exports, 'range', {
    enumerable: true,
    get: function () {
      return _range.range;
    }
  });
});
define('exred/helpers/reduce', ['exports', 'ember-composable-helpers/helpers/reduce'], function (exports, _reduce) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reduce.default;
    }
  });
  Object.defineProperty(exports, 'reduce', {
    enumerable: true,
    get: function () {
      return _reduce.reduce;
    }
  });
});
define('exred/helpers/reject-by', ['exports', 'ember-composable-helpers/helpers/reject-by'], function (exports, _rejectBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _rejectBy.default;
    }
  });
  Object.defineProperty(exports, 'rejectBy', {
    enumerable: true,
    get: function () {
      return _rejectBy.rejectBy;
    }
  });
});
define('exred/helpers/repeat', ['exports', 'ember-composable-helpers/helpers/repeat'], function (exports, _repeat) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _repeat.default;
    }
  });
  Object.defineProperty(exports, 'repeat', {
    enumerable: true,
    get: function () {
      return _repeat.repeat;
    }
  });
});
define('exred/helpers/reverse', ['exports', 'ember-composable-helpers/helpers/reverse'], function (exports, _reverse) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _reverse.default;
    }
  });
  Object.defineProperty(exports, 'reverse', {
    enumerable: true,
    get: function () {
      return _reverse.reverse;
    }
  });
});
define('exred/helpers/route-action', ['exports', 'ember-route-action-helper/helpers/route-action'], function (exports, _routeAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _routeAction.default;
    }
  });
});
define('exred/helpers/shuffle', ['exports', 'ember-composable-helpers/helpers/shuffle'], function (exports, _shuffle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _shuffle.default;
    }
  });
  Object.defineProperty(exports, 'shuffle', {
    enumerable: true,
    get: function () {
      return _shuffle.shuffle;
    }
  });
});
define('exred/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define('exred/helpers/slice', ['exports', 'ember-composable-helpers/helpers/slice'], function (exports, _slice) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _slice.default;
    }
  });
  Object.defineProperty(exports, 'slice', {
    enumerable: true,
    get: function () {
      return _slice.slice;
    }
  });
});
define('exred/helpers/sort-by', ['exports', 'ember-composable-helpers/helpers/sort-by'], function (exports, _sortBy) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _sortBy.default;
    }
  });
  Object.defineProperty(exports, 'sortBy', {
    enumerable: true,
    get: function () {
      return _sortBy.sortBy;
    }
  });
});
define('exred/helpers/take', ['exports', 'ember-composable-helpers/helpers/take'], function (exports, _take) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _take.default;
    }
  });
  Object.defineProperty(exports, 'take', {
    enumerable: true,
    get: function () {
      return _take.take;
    }
  });
});
define('exred/helpers/task', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  function _toArray(arr) {
    return Array.isArray(arr) ? arr : Array.from(arr);
  }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref),
        task = _ref2[0],
        args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports.default = Ember.Helper.helper(taskHelper);
});
define('exred/helpers/titleize', ['exports', 'ember-cli-string-helpers/helpers/titleize'], function (exports, _titleize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
  Object.defineProperty(exports, 'titleize', {
    enumerable: true,
    get: function () {
      return _titleize.titleize;
    }
  });
});
define('exred/helpers/toggle-action', ['exports', 'ember-composable-helpers/helpers/toggle-action'], function (exports, _toggleAction) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggleAction.default;
    }
  });
});
define('exred/helpers/toggle', ['exports', 'ember-composable-helpers/helpers/toggle'], function (exports, _toggle) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toggle.default;
    }
  });
  Object.defineProperty(exports, 'toggle', {
    enumerable: true,
    get: function () {
      return _toggle.toggle;
    }
  });
});
define('exred/helpers/trim', ['exports', 'ember-cli-string-helpers/helpers/trim'], function (exports, _trim) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _trim.default;
    }
  });
  Object.defineProperty(exports, 'trim', {
    enumerable: true,
    get: function () {
      return _trim.trim;
    }
  });
});
define('exred/helpers/truncate', ['exports', 'ember-cli-string-helpers/helpers/truncate'], function (exports, _truncate) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _truncate.default;
    }
  });
  Object.defineProperty(exports, 'truncate', {
    enumerable: true,
    get: function () {
      return _truncate.truncate;
    }
  });
});
define('exred/helpers/underscore', ['exports', 'ember-cli-string-helpers/helpers/underscore'], function (exports, _underscore) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _underscore.default;
    }
  });
  Object.defineProperty(exports, 'underscore', {
    enumerable: true,
    get: function () {
      return _underscore.underscore;
    }
  });
});
define('exred/helpers/union', ['exports', 'ember-composable-helpers/helpers/union'], function (exports, _union) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _union.default;
    }
  });
  Object.defineProperty(exports, 'union', {
    enumerable: true,
    get: function () {
      return _union.union;
    }
  });
});
define('exred/helpers/uppercase', ['exports', 'ember-cli-string-helpers/helpers/uppercase'], function (exports, _uppercase) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uppercase.default;
    }
  });
  Object.defineProperty(exports, 'uppercase', {
    enumerable: true,
    get: function () {
      return _uppercase.uppercase;
    }
  });
});
define('exred/helpers/w', ['exports', 'ember-cli-string-helpers/helpers/w'], function (exports, _w) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _w.default;
    }
  });
  Object.defineProperty(exports, 'w', {
    enumerable: true,
    get: function () {
      return _w.w;
    }
  });
});
define('exred/helpers/without', ['exports', 'ember-composable-helpers/helpers/without'], function (exports, _without) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _without.default;
    }
  });
  Object.defineProperty(exports, 'without', {
    enumerable: true,
    get: function () {
      return _without.without;
    }
  });
});
define('exred/helpers/xor', ['exports', 'ember-truth-helpers/helpers/xor'], function (exports, _xor) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var forExport = null;

  if (Ember.Helper) {
    forExport = Ember.Helper.helper(_xor.xorHelper);
  } else if (Ember.HTMLBars.makeBoundHelper) {
    forExport = Ember.HTMLBars.makeBoundHelper(_xor.xorHelper);
  }

  exports.default = forExport;
});
define('exred/index', ['exports', 'ember-uuid'], function (exports, _emberUuid) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'v4', {
    enumerable: true,
    get: function () {
      return _emberUuid.v4;
    }
  });
  Object.defineProperty(exports, 'v1', {
    enumerable: true,
    get: function () {
      return _emberUuid.v1;
    }
  });
  Object.defineProperty(exports, 'parse', {
    enumerable: true,
    get: function () {
      return _emberUuid.parse;
    }
  });
  Object.defineProperty(exports, 'unparse', {
    enumerable: true,
    get: function () {
      return _emberUuid.unparse;
    }
  });
});
define('exred/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'exred/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var name = void 0,
      version = void 0;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('exred/initializers/component-prop-types', ['exports', 'ember-prop-types/initializers/component-prop-types'], function (exports, _componentPropTypes) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _componentPropTypes.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _componentPropTypes.initialize;
    }
  });
});
define('exred/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('exred/initializers/data-adapter', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'data-adapter',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('exred/initializers/debug-helpers', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize(application) {
    // application.inject('route', 'foo', 'service:foo');
    application.store = application.__container__.lookup('service:store');
    window.App = application; // or window.Whatever
  }

  exports.default = {
    name: 'global',
    initialize: initialize
  };
});
define('exred/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
define('exred/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('exred/initializers/ember-hook/initialize', ['exports', 'ember-hook/initializers/ember-hook/initialize'], function (exports, _initialize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _initialize.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _initialize.initialize;
    }
  });
});
define('exred/initializers/ember-simple-auth', ['exports', 'exred/config/environment', 'ember-simple-auth/configuration', 'ember-simple-auth/initializers/setup-session', 'ember-simple-auth/initializers/setup-session-service'], function (exports, _environment, _configuration, _setupSession, _setupSessionService) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(registry) {
      var config = _environment.default['ember-simple-auth'] || {};
      config.baseURL = _environment.default.rootURL || _environment.default.baseURL;
      _configuration.default.load(config);

      (0, _setupSession.default)(registry);
      (0, _setupSessionService.default)(registry);
    }
  };
});
define('exred/initializers/export-application-global', ['exports', 'exred/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('exred/initializers/injectStore', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'injectStore',
    before: 'store',
    initialize: function initialize() {}
  };
});
define("exred/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals", "liquid-fire/velocity-ext"], function (exports, _emberInternals) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  (0, _emberInternals.initialize)();

  exports.default = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('exred/initializers/store', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'store',
    after: 'ember-data',
    initialize: function initialize() {}
  };
});
define('exred/initializers/transforms', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'transforms',
    before: 'store',
    initialize: function initialize() {}
  };
});
define('exred/initializers/truth-helpers', ['exports', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _registerHelper, _and, _or, _equal, _not, _isArray, _notEqual, _gt, _gte, _lt, _lte) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (Ember.Helper) {
      return;
    }

    (0, _registerHelper.registerHelper)('and', _and.andHelper);
    (0, _registerHelper.registerHelper)('or', _or.orHelper);
    (0, _registerHelper.registerHelper)('eq', _equal.equalHelper);
    (0, _registerHelper.registerHelper)('not', _not.notHelper);
    (0, _registerHelper.registerHelper)('is-array', _isArray.isArrayHelper);
    (0, _registerHelper.registerHelper)('not-eq', _notEqual.notEqualHelper);
    (0, _registerHelper.registerHelper)('gt', _gt.gtHelper);
    (0, _registerHelper.registerHelper)('gte', _gte.gteHelper);
    (0, _registerHelper.registerHelper)('lt', _lt.ltHelper);
    (0, _registerHelper.registerHelper)('lte', _lte.lteHelper);
  }

  exports.default = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define('exred/instance-initializers/clear-double-boot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "clear-double-boot",

    initialize: function initialize(instance) {
      if (typeof FastBoot === 'undefined') {
        var originalDidCreateRootView = instance.didCreateRootView;

        instance.didCreateRootView = function () {
          var elements = document.querySelectorAll(instance.rootElement + ' .ember-view');
          for (var i = 0; i < elements.length; i++) {
            var element = elements[i];
            element.parentNode.removeChild(element);
          }

          originalDidCreateRootView.apply(instance, arguments);
        };
      }
    }
  };
});
define('exred/instance-initializers/debug-logger', ['exports', 'ember-debug-logger/instance-initializers/debug-logger'], function (exports, _debugLogger) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _debugLogger.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _debugLogger.initialize;
    }
  });
});
define("exred/instance-initializers/ember-data", ["exports", "ember-data/instance-initializers/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('exred/instance-initializers/ember-simple-auth', ['exports', 'ember-simple-auth/instance-initializers/setup-session-restoration'], function (exports, _setupSessionRestoration) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-simple-auth',

    initialize: function initialize(instance) {
      (0, _setupSessionRestoration.default)(instance);
    }
  };
});
define('exred/instance-initializers/svg-use-polyfill', ['exports', 'ember-frost-core/instance-initializers/svg-use-polyfill'], function (exports, _svgUsePolyfill) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _svgUsePolyfill.default;
    }
  });
  Object.defineProperty(exports, 'initialize', {
    enumerable: true,
    get: function () {
      return _svgUsePolyfill.initialize;
    }
  });
});
define('exred/locations/none', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var computed = Ember.computed,
      _Ember$computed = Ember.computed,
      bool = _Ember$computed.bool,
      readOnly = _Ember$computed.readOnly,
      service = Ember.inject.service,
      get = Ember.get,
      getOwner = Ember.getOwner;


  var TEMPORARY_REDIRECT_CODE = 307;

  exports.default = Ember.NoneLocation.extend({
    implementation: 'fastboot',
    fastboot: service(),

    _config: computed(function () {
      return getOwner(this).resolveRegistration('config:environment');
    }),

    _fastbootHeadersEnabled: bool('_config.fastboot.fastbootHeaders'),

    _redirectCode: computed(function () {
      return get(this, '_config.fastboot.redirectCode') || TEMPORARY_REDIRECT_CODE;
    }),

    _response: readOnly('fastboot.response'),
    _request: readOnly('fastboot.request'),

    setURL: function setURL(path) {
      if (get(this, 'fastboot.isFastBoot')) {
        var response = get(this, '_response');
        var currentPath = get(this, 'path');
        var isInitialPath = !currentPath || currentPath.length === 0;

        if (!isInitialPath) {
          path = this.formatURL(path);
          var isTransitioning = currentPath !== path;

          if (isTransitioning) {
            var host = get(this, '_request.host');
            var redirectURL = '//' + host + path;

            response.statusCode = this.get('_redirectCode');
            response.headers.set('location', redirectURL);
          }
        }

        // for testing and debugging
        if (get(this, '_fastbootHeadersEnabled')) {
          response.headers.set('x-fastboot-path', path);
        }
      }

      this._super.apply(this, arguments);
    }
  });
});
define('exred/mirage-models/link', ['exports', 'ember-frost-core/mirage-models/link'], function (exports, _link) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _link.default;
    }
  });
});
define('exred/mixins/transition-mixin', ['exports', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _transitionMixin) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _transitionMixin.default;
    }
  });
});
define('exred/models/connection', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    config: _emberData.default.attr(),
    flowId: _emberData.default.belongsTo('flow'),
    sourceId: _emberData.default.belongsTo('node', { inverse: 'out_conns' }),
    targetId: _emberData.default.belongsTo('node', { inverse: 'in_conns' }),
    sourceAnchorType: _emberData.default.attr('string'),
    targetAnchorType: _emberData.default.attr('string')
  });
});
define('exred/models/flow', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    info: _emberData.default.attr('string'),
    config: _emberData.default.attr(),

    serviceId: _emberData.default.belongsTo('service'),

    nodes: _emberData.default.hasMany('node'),
    connections: _emberData.default.hasMany('connection')
  });
});
define('exred/models/node', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    category: _emberData.default.attr('string'),
    module: _emberData.default.attr('string'),
    config: _emberData.default.attr(),
    info: _emberData.default.attr('string'),
    isPrototype: _emberData.default.attr('boolean'),
    x: _emberData.default.attr('number'),
    y: _emberData.default.attr('number'),
    ui_attributes: _emberData.default.attr(),

    flowId: _emberData.default.belongsTo('flow'),
    in_conns: _emberData.default.hasMany('connections', { inverse: 'targetId' }),
    out_conns: _emberData.default.hasMany('connections', { inverse: 'sourceId' }),

    jsPlumbEndpoints: _emberData.default.attr(),

    visibleName: Ember.computed("name", "config.name.value", function () {
      var config = this.get('config');

      if (config && config.name && config.name.value) {
        return config.name.value;
      } else {
        return this.get('name');
      }
    })

  });
});
define('exred/models/service', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.Model.extend({
    name: _emberData.default.attr('string'),
    info: _emberData.default.attr('string'),
    config: _emberData.default.attr(),

    flows: _emberData.default.hasMany('flow')
  });
});
define('exred/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('exred/router', ['exports', 'exred/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  var Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {
    this.route('app', function () {});
    this.route('auth', function () {
      this.route('login');
      this.route('register');
    });
  });

  exports.default = Router;
});
define('exred/routes/app', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('exred/routes/app/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    state: Ember.inject.service('global-state'),

    model: function model() {
      return Ember.RSVP.hash({
        services: this.store.findAll('service'),
        flows: this.store.findAll('flow'),
        nodes: this.store.findAll('node'),
        connections: this.store.findAll('connection')
      });
    },


    setupController: function setupController(controller, model) {
      controller.set('model', model);
      controller.set('currentFlowId', model.flows.get('firstObject').id);

      var firstFlow = model.flows.get('firstObject');
      this.get('state').set('activeFlowId', firstFlow.id);
    }
  });
});
define('exred/routes/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('exred/routes/auth', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('exred/routes/auth/login', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('exred/routes/auth/register', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({});
});
define('exred/routes/index', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Route.extend({
    beforeModel: function beforeModel() /* transition */{
      this.transitionTo('app'); // Implicitly aborts the on-going transition.
    }
  });
});
define('exred/serializers/application', ['exports', 'ember-data'], function (exports, _emberData) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberData.default.JSONAPISerializer.extend({
    // attrs:{
    //   isPrototype: 'isPrototype'
    // }
  });
});
define('exred/serializers/node', ['exports', 'exred/serializers/application'], function (exports, _application) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _application.default.extend({
    attrs: {
      jsPlumbEndpoints: { serialize: false }
    }
  });
});
define('exred/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define('exred/services/constants', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Service = Ember.Service,
      inject = Ember.inject,
      computed = Ember.computed,
      EObject = Ember.Object;
  exports.default = Service.extend({

    sniffer: inject.service('sniffer'),

    webkit: computed(function () {
      return (/webkit/i.test(this.get('sniffer.vendorPrefix'))
      );
    }),

    vendorProperty: function vendorProperty(name) {
      var prefix = this.get('sniffer.vendorPrefix').toLowerCase();
      return this.get('webkit') ? '-webkit-' + name.charAt(0) + name.substring(1) : name;
    },


    CSS: computed('webkit', function () {
      var webkit = this.get('webkit');
      return {
        /* Constants */
        TRANSITIONEND: 'transitionend' + (webkit ? ' webkitTransitionEnd' : ''),
        ANIMATIONEND: 'animationend' + (webkit ? ' webkitAnimationEnd' : ''),

        TRANSFORM: this.vendorProperty('transform'),
        TRANSFORM_ORIGIN: this.vendorProperty('transformOrigin'),
        TRANSITION: this.vendorProperty('transition'),
        TRANSITION_DURATION: this.vendorProperty('transitionDuration'),
        ANIMATION_PLAY_STATE: this.vendorProperty('animationPlayState'),
        ANIMATION_DURATION: this.vendorProperty('animationDuration'),
        ANIMATION_NAME: this.vendorProperty('animationName'),
        ANIMATION_TIMING: this.vendorProperty('animationTimingFunction'),
        ANIMATION_DIRECTION: this.vendorProperty('animationDirection')
      };
    }),

    KEYCODE: EObject.create({
      ENTER: 13,
      ESCAPE: 27,
      SPACE: 32,
      LEFT_ARROW: 37,
      UP_ARROW: 38,
      RIGHT_ARROW: 39,
      DOWN_ARROW: 40,
      TAB: 9
    }),

    MEDIA: {
      'xs': '(max-width: 599px)',
      'gt-xs': '(min-width: 600px)',
      'sm': '(min-width: 600px) and (max-width: 959px)',
      'gt-sm': '(min-width: 960px)',
      'md': '(min-width: 960px) and (max-width: 1279px)',
      'gt-md': '(min-width: 1280px)',
      'lg': '(min-width: 1280px) and (max-width: 1919px)',
      'gt-lg': '(min-width: 1920px)',
      'xl': '(min-width: 1920px)',
      'print': 'print'
    },

    MEDIA_PRIORITY: ['xl', 'gt-lg', 'lg', 'gt-md', 'md', 'gt-sm', 'sm', 'gt-xs', 'xs', 'print']
  });
});
define('exred/services/cookies', ['exports', 'ember-cookies/services/cookies'], function (exports, _cookies) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookies.default;
});
define('exred/services/dependency-checker', ['exports', 'exred/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({

    hasLiquidFire: Ember.computed('', function () {
      return _environment.default['ember-collapsible-panel'].hasLiquidFire;
    })

  });
});
define('exred/services/ember-elsewhere', ['exports', 'ember-elsewhere/services/ember-elsewhere'], function (exports, _emberElsewhere) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberElsewhere.default;
    }
  });
});
define('exred/services/fastboot', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var deprecate = Ember.deprecate,
      computed = Ember.computed,
      get = Ember.get,
      assert = Ember.assert;
  var deprecatingAlias = computed.deprecatingAlias,
      readOnly = computed.readOnly;


  var RequestObject = Ember.Object.extend({
    init: function init() {
      this._super.apply(this, arguments);

      var request = this.request;
      delete this.request;

      this.method = request.method;
      this.body = request.body;
      this.cookies = request.cookies;
      this.headers = request.headers;
      this.queryParams = request.queryParams;
      this.path = request.path;
      this.protocol = request.protocol;
      this._host = function () {
        return request.host();
      };
    },


    host: computed(function () {
      return this._host();
    })
  });

  var Shoebox = Ember.Object.extend({
    put: function put(key, value) {
      assert('shoebox.put is only invoked from the FastBoot rendered application', this.get('fastboot.isFastBoot'));
      assert('the provided key is a string', typeof key === 'string');

      var fastbootInfo = this.get('fastboot._fastbootInfo');
      if (!fastbootInfo.shoebox) {
        fastbootInfo.shoebox = {};
      }

      fastbootInfo.shoebox[key] = value;
    },
    retrieve: function retrieve(key) {
      if (this.get('fastboot.isFastBoot')) {
        var shoebox = this.get('fastboot._fastbootInfo.shoebox');
        if (!shoebox) {
          return;
        }

        return shoebox[key];
      }

      var shoeboxItem = this.get(key);
      if (shoeboxItem) {
        return shoeboxItem;
      }

      var el = document.querySelector('#shoebox-' + key);
      if (!el) {
        return;
      }
      var valueString = el.textContent;
      if (!valueString) {
        return;
      }

      shoeboxItem = JSON.parse(valueString);
      this.set(key, shoeboxItem);

      return shoeboxItem;
    }
  });

  var FastBootService = Ember.Service.extend({
    cookies: deprecatingAlias('request.cookies', { id: 'fastboot.cookies-to-request', until: '0.9.9' }),
    headers: deprecatingAlias('request.headers', { id: 'fastboot.headers-to-request', until: '0.9.9' }),
    isFastBoot: typeof FastBoot !== 'undefined',

    init: function init() {
      this._super.apply(this, arguments);

      var shoebox = Shoebox.create({ fastboot: this });
      this.set('shoebox', shoebox);
    },


    host: computed(function () {
      deprecate('Usage of fastboot service\'s `host` property is deprecated.  Please use `request.host` instead.', false, { id: 'fastboot.host-to-request', until: '0.9.9' });

      return this._fastbootInfo.request.host();
    }),

    response: readOnly('_fastbootInfo.response'),
    metadata: readOnly('_fastbootInfo.metadata'),

    request: computed(function () {
      if (!this.isFastBoot) return null;
      return RequestObject.create({ request: get(this, '_fastbootInfo.request') });
    }),

    deferRendering: function deferRendering(promise) {
      assert('deferRendering requires a promise or thennable object', typeof promise.then === 'function');
      this._fastbootInfo.deferRendering(promise);
    }
  });

  exports.default = FastBootService;
});
define('exred/services/global-state', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Service.extend({
    init: function init() {
      this.setProperties({
        activeNodeId: null,
        activeNode: null,
        activeFlowId: null,
        activeFlow: null,
        configChanged: false
      });
    },


    changeActiveNode: function changeActiveNode(nodeId) {
      this.set('activeNodeId', nodeId);
    }

  });
});
define("exred/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _transitionMap) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _transitionMap.default;
});
define('exred/services/panel-actions', ['exports', 'ember-collapsible-panel/services/panel-actions'], function (exports, _panelActions) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _panelActions.default;
    }
  });
});
define('exred/services/paper-sidenav', ['exports', 'ember-paper/services/paper-sidenav'], function (exports, _paperSidenav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperSidenav.default;
    }
  });
});
define('exred/services/paper-toaster', ['exports', 'ember-paper/services/paper-toaster'], function (exports, _paperToaster) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _paperToaster.default;
    }
  });
});
define('exred/services/phoenix-channels', ['exports', 'exred/config/environment', 'phoenix/services/phoenix-socket'], function (exports, _environment, _phoenixSocket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _phoenixSocket.default.extend({

    paperToaster: Ember.inject.service(),

    init: function init() {
      // You may listen to open, "close" and "error"
      this.on('open', function () {
        console.log('Socket was opened!');
      });
      this.on('error', function () {
        console.log('Phoenix Socket error');
      });
    },
    connect: function connect() /*url, options*/{
      var _this = this;

      // const myjwt = "abacnwih12eh12...";

      // infer connection url from the ember data connection parameters OR
      // from the window location
      var host = (_environment.default.DS.host || "ws://" + window.location.hostname + ":" + window.location.port).replace(/^http/, 'ws');
      var socketUrl = host + "/socket";
      console.log('PhoenixSocket attempting to connect to: ' + socketUrl);
      // connect the socket
      this._super(socketUrl, {
        //params: {token: myjwt}
      });

      // join a channel
      var channel = this.joinChannel("cmd:general", {
        nickname: "Mike"
      });

      this.set('channel', channel);

      // add message handlers
      channel.on("notification", function (msg) {
        return _this._onNotification(msg);
      });
    },


    push: function push(event, msg) {
      this.get('channel').push(event, msg).receive("ok", function (msg) {
        return console.log("PhoenixChannel: message sent, received ok", msg);
      }).receive("error", function (reasons) {
        return console.log("PhoenixChannel: message sent, received error", reasons);
      }).receive("timeout", function () {
        return console.log("PhoenixChannel: message send failed");
      });
    },

    _onNotification: function _onNotification(message) {
      console.log('PhoenixChannel got: ', message);
      this.get('paperToaster').show(message.msg, { duration: 5000, position: "top right", toastClass: "toastInSuccess" });
    }
  });
});
define('exred/services/phoenix-socket', ['exports', 'phoenix/services/phoenix-socket'], function (exports, _phoenixSocket) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _phoenixSocket.default;
    }
  });
});
define('exred/services/session', ['exports', 'ember-simple-auth/services/session'], function (exports, _session) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _session.default;
});
define('exred/services/sniffer', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Service = Ember.Service,
      computed = Ember.computed;


  var isString = function isString(value) {
    return typeof value === 'string';
  };

  var lowercase = function lowercase(string) {
    return isString(string) ? string.toLowerCase() : string;
  };

  var toInt = function toInt(str) {
    return parseInt(str, 10);
  };

  exports.default = Service.extend({
    vendorPrefix: '',
    transitions: false,
    animations: false,
    _document: null,
    _window: null,

    android: computed('', function () {
      return toInt((/android (\d+)/.exec(lowercase((this.get('_window').navigator || {}).userAgent)) || [])[1]);
    }),

    init: function init() {
      this._super.apply(this, arguments);
      if (typeof FastBoot !== 'undefined') {
        return;
      }

      var _document = document;
      var _window = window;

      this.setProperties({
        _document: _document,
        _window: _window
      });

      var bodyStyle = _document.body && _document.body.style;
      var vendorPrefix = void 0;
      var vendorRegex = /^(Moz|webkit|ms)(?=[A-Z])/;

      var transitions = false;
      var animations = false;
      var match = void 0;

      if (bodyStyle) {
        for (var prop in bodyStyle) {
          if (match = vendorRegex.exec(prop)) {
            vendorPrefix = match[0];
            vendorPrefix = vendorPrefix.substr(0, 1).toUpperCase() + vendorPrefix.substr(1);
            break;
          }
        }

        if (!vendorPrefix) {
          vendorPrefix = 'WebkitOpacity' in bodyStyle && 'webkit';
        }

        transitions = !!('transition' in bodyStyle || vendorPrefix + 'Transition' in bodyStyle);
        animations = !!('animation' in bodyStyle || vendorPrefix + 'Animation' in bodyStyle);

        if (this.get('android') && (!transitions || !animations)) {
          transitions = isString(bodyStyle.webkitTransition);
          animations = isString(bodyStyle.webkitAnimation);
        }
      }

      this.set('transitions', transitions);
      this.set('animations', animations);

      this.set('vendorPrefix', vendorPrefix);
    }
  });
});
define('exred/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _textMeasurer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _textMeasurer.default;
    }
  });
});
define('exred/services/util', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  var Service = Ember.Service,
      $ = Ember.$;


  var Util = Service.extend({
    disableScrollAround: function disableScrollAround(element) {
      var util = this;
      var $document = $(window.document);

      util.disableScrollAround._count = util.disableScrollAround._count || 0;
      ++util.disableScrollAround._count;
      if (util.disableScrollAround._enableScrolling) {
        return util.disableScrollAround._enableScrolling;
      }

      var _$document$get = $document.get(0),
          body = _$document$get.body;

      var restoreBody = disableBodyScroll();
      var restoreElement = disableElementScroll();

      return util.disableScrollAround._enableScrolling = function () {
        if (! --util.disableScrollAround._count) {
          restoreBody();
          restoreElement();
          delete util.disableScrollAround._enableScrolling;
        }
      };

      // Creates a virtual scrolling mask to absorb touchmove, keyboard, scrollbar clicking, and wheel events
      function disableElementScroll() {
        var zIndex = 50;
        var scrollMask = $('<div class="md-scroll-mask" style="z-index: ' + zIndex + '">\n          <div class="md-scroll-mask-bar"></div>\n        </div>');
        body.appendChild(scrollMask[0]);

        scrollMask.on('wheel', preventDefault);
        scrollMask.on('touchmove', preventDefault);
        $document.on('keydown', disableKeyNav);

        return function restoreScroll() {
          scrollMask.off('wheel');
          scrollMask.off('touchmove');
          scrollMask[0].parentNode.removeChild(scrollMask[0]);
          $document.off('keydown', disableKeyNav);
          delete util.disableScrollAround._enableScrolling;
        };

        // Prevent keypresses from elements inside the body
        // used to stop the keypresses that could cause the page to scroll
        // (arrow keys, spacebar, tab, etc).
        function disableKeyNav(e) {
          // -- temporarily removed this logic, will possibly re-add at a later date
          return;
          if (!element[0].contains(e.target)) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        }

        function preventDefault(e) {
          e.preventDefault();
        }
      }

      // Converts the body to a position fixed block and translate it to the proper scroll
      // position
      function disableBodyScroll() {
        var htmlNode = body.parentNode;
        var restoreHtmlStyle = htmlNode.getAttribute('style') || '';
        var restoreBodyStyle = body.getAttribute('style') || '';
        var scrollOffset = body.scrollTop + body.parentElement.scrollTop;
        var clientWidth = body.clientWidth;


        if (body.scrollHeight > body.clientHeight) {
          applyStyles(body, {
            position: 'fixed',
            width: '100%',
            top: -scrollOffset + 'px'
          });

          applyStyles(htmlNode, {
            overflowY: 'scroll'
          });
        }

        if (body.clientWidth < clientWidth) {
          applyStyles(body, { overflow: 'hidden' });
        }

        return function restoreScroll() {
          body.setAttribute('style', restoreBodyStyle);
          htmlNode.setAttribute('style', restoreHtmlStyle);
          body.scrollTop = scrollOffset;
        };
      }

      function applyStyles(el, styles) {
        for (var key in styles) {
          el.style[key] = styles[key];
        }
      }
    },
    enableScrolling: function enableScrolling() {
      var method = this.disableScrollAround._enableScrolling;
      method && method();
    },
    supplant: function supplant(template, values, pattern) {
      pattern = pattern || /\{([^\{\}]*)\}/g;
      return template.replace(pattern, function (a, b) {
        var p = b.split('.');
        var r = values;
        try {
          for (var s in p) {
            if (p.hasOwnProperty(s)) {
              r = r[p[s]];
            }
          }
        } catch (e) {
          r = a;
        }
        return typeof r === 'string' || typeof r === 'number' ? r : a;
      });
    },

    nextTick: function (window, prefixes, i, p, fnc) {
      while (!fnc && i < prefixes.length) {
        fnc = window[prefixes[i++] + 'equestAnimationFrame'];
      }
      return fnc && fnc.bind(window) || window.setImmediate || function (fnc) {
        window.setTimeout(fnc, 0);
      };
    }(window, 'r webkitR mozR msR oR'.split(' '), 0)

  });

  exports.default = Util;
});
define('exred/session-stores/application', ['exports', 'ember-simple-auth/session-stores/cookie'], function (exports, _cookie) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _cookie.default.extend();
});
define("exred/templates/app", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "IzWoDFle", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/app.hbs" } });
});
define("exred/templates/app/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "VqXK8heJ", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"x-editor\",null,[[\"model\",\"selectedNode\",\"flowNavOpen\",\"currentFlowId\",\"currentFlow\",\"configChanged\",\"toggleFlowNav\",\"addConnection\",\"deleteConnection\",\"saveNewConfig\",\"updateNodePosition\",\"nodeDoubleClick\",\"deleteActive\"],[[20,[\"model\"]],[20,[\"selectedNode\"]],[20,[\"flowNavOpen\"]],[20,[\"currentFlowId\"]],[25,\"readonly\",[[20,[\"currentFlow\"]]],null],[20,[\"configChanged\"]],[25,\"action\",[[19,0,[]],\"toggleFlowNav\"],null],[25,\"action\",[[19,0,[]],\"addConnection\"],null],[25,\"action\",[[19,0,[]],\"deleteConnection\"],null],[25,\"action\",[[19,0,[]],\"saveNewConfig\"],null],[25,\"action\",[[19,0,[]],\"updateNodePosition\"],null],[25,\"action\",[[19,0,[]],\"createDNode\"],null],[25,\"action\",[[19,0,[]],\"deleteActive\"],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/app/index.hbs" } });
});
define("exred/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "AT1cO6HL", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/application.hbs" } });
});
define("exred/templates/auth", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "Zm232raN", "block": "{\"symbols\":[],\"statements\":[[0,\"AUTH\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/auth.hbs" } });
});
define("exred/templates/auth/login", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "qq1t2I+p", "block": "{\"symbols\":[],\"statements\":[[0,\"LOGIN\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/auth/login.hbs" } });
});
define("exred/templates/auth/register", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eXUuDYG/", "block": "{\"symbols\":[],\"statements\":[[0,\"REGISTER\\n\\n\"],[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/auth/register.hbs" } });
});
define("exred/templates/components/diagram-node", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "puyLB8q0", "block": "{\"symbols\":[],\"statements\":[[4,\"if\",[[20,[\"model\",\"ui_attributes\",\"fire_button\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"fire-button\"],[7],[0,\"\\n    \"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],\"fire\"],null]]],{\"statements\":[[1,[25,\"paper-icon\",[\"play_arrow\"],[[\"size\"],[22]]],false]],\"parameters\":[]},null],[0,\"\\n  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[20,[\"model\",\"ui_attributes\",\"left_icon\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"left-icon\"],[7],[0,\" \"],[1,[25,\"paper-icon\",[[20,[\"model\",\"ui_attributes\",\"left_icon\"]]],[[\"size\"],[22]]],false],[0,\" \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[6,\"span\"],[9,\"class\",\"node-name\"],[7],[0,\"\\n  \"],[1,[20,[\"model\",\"visibleName\"]],false],[0,\"\\n\"],[8],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"model\",\"ui_attributes\",\"right_icon\"]]],null,{\"statements\":[[0,\"  \"],[6,\"div\"],[9,\"class\",\"right-icon\"],[7],[0,\" \"],[1,[25,\"paper-icon\",[[20,[\"model\",\"ui_attributes\",\"right_icon\"]]],[[\"size\"],[22]]],false],[0,\" \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/diagram-node.hbs" } });
});
define("exred/templates/components/editor-flownav", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "FdrErO+0", "block": "{\"symbols\":[\"service\",\"flow\",\"controls\",\"menu\",\"content\",\"menu\",\"content\",\"toolbar\",\"&default\"],\"statements\":[[4,\"paper-sidenav-container\",null,[[\"class\"],[\"inner-sidenav\"]],{\"statements\":[[0,\"\\n\"],[4,\"paper-sidenav\",null,[[\"class\",\"name\",\"lockedOpen\"],[\"md-whiteframe-z2\",\"leftnav\",[20,[\"flowNavOpen\"]]]],{\"statements\":[[0,\"\\n\"],[4,\"paper-toolbar\",null,[[\"accent\"],[true]],{\"statements\":[[0,\"      \"],[4,\"paper-toolbar-tools\",null,null,{\"statements\":[[0,\"Flows\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[8]},null],[0,\"\\n\"],[4,\"paper-content\",null,[[\"padding\"],[true]],{\"statements\":[[4,\"each\",[[20,[\"services\"]]],null,{\"statements\":[[0,\"\\n\"],[0,\"          \"],[6,\"strong\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n\\n\"],[4,\"paper-menu\",null,null,{\"statements\":[[4,\"component\",[[19,6,[\"trigger\"]]],null,{\"statements\":[[4,\"paper-button\",null,[[\"iconButton\"],[true]],{\"statements\":[[0,\"                \"],[1,[25,\"paper-icon\",[\"more vert\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"component\",[[19,6,[\"content\"]]],[[\"width\"],[2]],{\"statements\":[[4,\"component\",[[19,7,[\"menu-item\"]]],[[\"onClick\"],[\"openSomething\"]],{\"statements\":[[0,\"                \"],[1,[25,\"paper-icon\",[\"edit\"],null],false],[6,\"span\"],[7],[0,\"Edit\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"component\",[[19,7,[\"menu-item\"]]],[[\"onClick\"],[\"openSomething\"]],{\"statements\":[[0,\"                \"],[1,[25,\"paper-icon\",[\"delete\"],null],false],[6,\"span\"],[7],[0,\"Delete\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n              \"],[1,[18,\"paper-divider\"],false],[0,\"\\n\\n\"],[4,\"component\",[[19,7,[\"menu-item\"]]],[[\"onClick\",\"disabled\"],[\"openSomething\",false]],{\"statements\":[[0,\"                \"],[1,[25,\"paper-icon\",[\"add\"],null],false],[6,\"span\"],[7],[0,\"Add Flow\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[7]},null]],\"parameters\":[6]},null],[0,\"\\n\\n\"],[4,\"paper-list\",null,null,{\"statements\":[[4,\"each\",[[19,1,[\"flows\"]]],null,{\"statements\":[[0,\"\\n\"],[4,\"paper-item\",null,[[\"class\",\"onClick\"],[\"md-1-line\",[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"clickedFlow\"]]],null]],null]]],{\"statements\":[[0,\"                \"],[1,[25,\"component\",[[19,3,[\"radio\"]]],[[\"groupValue\",\"value\",\"label\",\"secondary\",\"onChange\"],[[20,[\"currentFlowId\"]],[19,2,[\"id\"]],[19,2,[\"name\"]],true,[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"currentFlowId\"]]],null]],null],[25,\"action\",[[19,0,[]],\"clickOnFlow\",[20,[\"currentFlowId\"]]],null]],null]],null]]]],false],[0,\"\\n\\n                \"],[6,\"div\"],[9,\"class\",\"md-secondary-container\"],[7],[0,\"\\n\"],[4,\"paper-menu\",null,[[\"position\"],[\"target-right target\"]],{\"statements\":[[4,\"component\",[[19,4,[\"trigger\"]]],null,{\"statements\":[[4,\"paper-button\",null,[[\"iconButton\"],[true]],{\"statements\":[[0,\"                        \"],[1,[25,\"paper-icon\",[\"more vert\"],[[\"class\"],[\"md-menu-origin\"]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[4,\"component\",[[19,4,[\"content\"]]],[[\"width\"],[2]],{\"statements\":[[4,\"component\",[[19,5,[\"menu-item\"]]],[[\"onClick\"],[\"openSomething\"]],{\"statements\":[[0,\"                        \"],[1,[25,\"paper-icon\",[\"edit\"],[[\"class\"],[\"md-menu-align-target\"]]],false],[0,\" \"],[6,\"span\"],[7],[0,\"Edit\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"component\",[[19,5,[\"menu-item\"]]],[[\"onClick\"],[\"openSomething\"]],{\"statements\":[[0,\"                        \"],[1,[25,\"paper-icon\",[\"delete\"],[[\"class\"],[\"md-menu-align-target\"]]],false],[0,\" \"],[6,\"span\"],[7],[0,\"Delete\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[5]},null]],\"parameters\":[4]},null],[0,\"                \"],[8],[0,\"\\n\"]],\"parameters\":[3]},null],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"paper-content\",null,null,{\"statements\":[[0,\"      \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\"],[4,\"paper-button\",null,[[\"raised\",\"fab\"],[true,true]],{\"statements\":[[0,\"        \"],[1,[25,\"paper-icon\",[\"add\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"paper-card-content\",null,[[\"class\"],[\"flex\"]],{\"statements\":[[0,\"    \"],[11,9],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/editor-flownav.hbs" } });
});
define("exred/templates/components/editor-flows", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "mdJvHq5O", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"x-jsplumb\",null,[[\"nodes\",\"connections\",\"addConnection\",\"deleteConnection\",\"updateNodePosition\"],[[20,[\"nodeInstances\"]],[20,[\"connections\"]],[25,\"action\",[[19,0,[]],[20,[\"addConnection\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"deleteConnection\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"updateNodePosition\"]]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/editor-flows.hbs" } });
});
define("exred/templates/components/editor-nodelist", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "+tK9lzAA", "block": "{\"symbols\":[\"panels\",\"category\",\"nodelist\",\"panel\",\"node\",\"controls\",\"toolbar\"],\"statements\":[[4,\"paper-toolbar\",null,[[\"accent\"],[true]],{\"statements\":[[0,\"  \"],[4,\"paper-toolbar-tools\",null,null,{\"statements\":[[0,\"Node Types\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[7]},null],[0,\"\\n\\n\"],[4,\"cp-panels\",null,[[\"accordion\"],[false]],{\"statements\":[[0,\"\\n\"],[4,\"each\",[[25,\"-each-in\",[[25,\"group-by\",[\"category\",[25,\"sort-by\",[\"category\",[20,[\"nodelist\"]]],null]],null]],null]],null,{\"statements\":[[4,\"component\",[[19,1,[\"panel\"]]],null,{\"statements\":[[4,\"component\",[[19,4,[\"toggle\"]]],null,{\"statements\":[[0,\"        \"],[6,\"p\"],[7],[1,[25,\"titleize\",[[19,2,[]]],null],false],[8],[0,\"\\n\"]],\"parameters\":[]},null],[4,\"component\",[[19,4,[\"body\"]]],null,{\"statements\":[[4,\"paper-list\",null,null,{\"statements\":[[4,\"each\",[[19,3,[]]],null,{\"statements\":[[4,\"paper-item\",null,[[\"click\",\"doubleClick\"],[[25,\"action\",[[19,0,[]],\"clickOnNode\",[19,5,[\"id\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"nodeDoubleClick\"]],[19,5,[\"id\"]]],null]]],{\"statements\":[[0,\"              \\n              \"],[6,\"div\"],[10,\"class\",[25,\"concat\",[\"nodelist-item exred-diagram-node \",\"exred-category-\",[19,5,[\"category\"]]],null],null],[7],[0,\"\\n\"],[4,\"if\",[[19,5,[\"ui_attributes\",\"fire_button\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"fire-button\"],[7],[0,\"\\n                    \"],[4,\"paper-button\",null,[[\"iconButton\",\"noink\"],[true,true]],{\"statements\":[[1,[25,\"paper-icon\",[\"play_arrow\"],[[\"size\"],[24]]],false]],\"parameters\":[]},null],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[19,5,[\"ui_attributes\",\"left_icon\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"left-icon\"],[7],[0,\"\\n                    \"],[1,[25,\"paper-icon\",[[19,5,[\"ui_attributes\",\"left_icon\"]]],[[\"size\"],[22]]],false],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[0,\"                \"],[6,\"span\"],[9,\"class\",\"node-name\"],[7],[0,\"\\n                  \"],[1,[19,5,[\"name\"]],false],[0,\"\\n                \"],[8],[0,\"\\n\\n\"],[4,\"if\",[[19,5,[\"ui_attributes\",\"right_icon\"]]],null,{\"statements\":[[0,\"                  \"],[6,\"div\"],[9,\"class\",\"right-icon\"],[7],[0,\"\\n                    \"],[1,[25,\"paper-icon\",[[19,5,[\"ui_attributes\",\"right_icon\"]]],[[\"size\"],[22]]],false],[0,\"\\n                  \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"              \"],[8],[0,\"\\n\"]],\"parameters\":[6]},null]],\"parameters\":[5]},null]],\"parameters\":[]},null],[0,\"        \\n        \\n\"]],\"parameters\":[]},null]],\"parameters\":[4]},null]],\"parameters\":[2,3]},null],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n\\n\\n\\n\"],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/editor-nodelist.hbs" } });
});
define("exred/templates/components/editor-sidetabs", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "piDniAhH", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/editor-sidetabs.hbs" } });
});
define("exred/templates/components/editor-toolbar", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "eH7besz+", "block": "{\"symbols\":[],\"statements\":[[4,\"paper-toolbar\",null,null,{\"statements\":[[4,\"paper-toolbar-tools\",null,null,{\"statements\":[[0,\"\\n\"],[4,\"paper-button\",null,[[\"iconButton\",\"click\"],[true,[25,\"action\",[[19,0,[]],[20,[\"toggleFlowNav\"]]],null]]],{\"statements\":[[0,\"      \"],[1,[25,\"paper-icon\",[[25,\"if\",[[20,[\"flowNavOpen\"]],\"keyboard_arrow_left\",\"keyboard_arrow_right\"],null]],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n    \"],[6,\"h3\"],[7],[6,\"b\"],[7],[0,\"ExRed\"],[8],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n    \\n    \"],[6,\"h4\"],[7],[1,[20,[\"state\",\"activeFlow\",\"name\"]],false],[0,\" / \"],[1,[20,[\"state\",\"activeNode\",\"visibleName\"]],false],[8],[0,\"\\n    \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\\n\"],[4,\"paper-button\",null,[[\"raised\",\"primary\",\"accent\",\"onClick\"],[true,false,true,[25,\"action\",[[19,0,[]],\"log\",[20,[\"state\"]]],null]]],{\"statements\":[[0,\"      \"],[6,\"h3\"],[7],[0,\"log state\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"paper-button\",null,[[\"raised\",\"primary\",\"accent\",\"onClick\"],[true,true,false,[25,\"action\",[[19,0,[]],\"requestDeploy\"],null]]],{\"statements\":[[0,\"      \"],[6,\"h3\"],[7],[0,\"Deploy\"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"paper-button\",null,[[\"iconButton\"],[true]],{\"statements\":[[0,\"      \"],[1,[25,\"paper-icon\",[\"menu\"],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/editor-toolbar.hbs" } });
});
define("exred/templates/components/json-pretty", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "kYdQkv40", "block": "{\"symbols\":[],\"statements\":[[6,\"pre\"],[7],[1,[18,\"preformattedText\"],false],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/json-pretty.hbs" } });
});
define("exred/templates/components/transition-group", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "r2iebK9o", "block": "{\"symbols\":[\"&default\"],\"statements\":[[11,1],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/transition-group.hbs" } });
});
define("exred/templates/components/x-config-tab", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "o0ZajBl9", "block": "{\"symbols\":[\"configKey\",\"configDefinition\"],\"statements\":[[6,\"div\"],[9,\"class\",\"layout-row flex\"],[7],[0,\"\\n  \"],[6,\"h2\"],[7],[1,[20,[\"state\",\"activeNode\",\"visibleName\"]],false],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"state\",\"activeNode\"]]],null,{\"statements\":[[0,\"    \"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null]]],{\"statements\":[[1,[25,\"paper-icon\",[\"delete\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"layout-row layout-wrap\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"state\",\"activeNode\",\"ui_attributes\",\"config_order\"]]],null,{\"statements\":[[4,\"with\",[[25,\"get\",[[20,[\"state\",\"activeNode\",\"config\"]],[19,1,[]]],null]],null,{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"config-tile\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"layout-column\"],[7],[0,\"\\n\"],[4,\"if\",[[19,2,[\"info\"]]],null,{\"statements\":[[0,\"        \"],[4,\"paper-tooltip\",null,[[\"position\",\"class\"],[\"top\",\"exred-tooltip\"]],{\"statements\":[[1,[19,2,[\"info\"]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"      \"],[1,[25,\"component\",[[25,\"concat\",[\"x-config-tab/\",[19,2,[\"type\"]]],null]],[[\"key\",\"value\",\"configUpdate\",\"fieldAttrs\"],[[25,\"readonly\",[[19,1,[]]],null],[25,\"readonly\",[[19,2,[\"value\"]]],null],[25,\"action\",[[19,0,[]],\"configUpdate\"],null],[19,2,[\"attrs\"]]]]],false],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[2]},null]],\"parameters\":[1]},null],[0,\"  \\n\"],[8],[0,\"\\n\\n\\n\"],[6,\"div\"],[9,\"class\",\"layout-column\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"state\",\"configChanged\"]]],null,{\"statements\":[[0,\"    \"],[1,[18,\"paper-divider\"],false],[0,\"\\n    \"],[4,\"paper-button\",null,[[\"raised\",\"primary\",\"onClick\"],[true,true,[25,\"action\",[[19,0,[]],[20,[\"saveNewConfig\"]],[20,[\"configBuffer\"]]],null]]],{\"statements\":[[0,\"Save\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab.hbs" } });
});
define("exred/templates/components/x-config-tab/codeblock", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "/m8SXMDF", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[7],[0,\"\\n  \"],[1,[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],false],[0,\"\\n\"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],[25,\"toggle\",[\"isExpanded\",[19,0,[]]],null]],null]]],{\"statements\":[[0,\"    \"],[1,[25,\"paper-icon\",[\"open_in_new\"],[[\"size\"],[14]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\\n\"],[4,\"if\",[[20,[\"isExpanded\"]]],null,{\"statements\":[[4,\"paper-dialog\",null,[[\"fullscreen\",\"clickOutsideToClose\",\"onClose\"],[[20,[\"fullscreen\"]],true,[25,\"action\",[[19,0,[]],[25,\"toggle\",[\"isExpanded\",[19,0,[]]],null]],null]]],{\"statements\":[[4,\"paper-dialog-content\",null,null,{\"statements\":[[0,\"        \"],[6,\"div\"],[9,\"class\",\"exred-big-editor\"],[7],[0,\"\\n        \"],[1,[25,\"ember-ace\",null,[[\"minLines\",\"maxLines\",\"tabSize\",\"highlightActiveLine\",\"showInvisibles\",\"showLineNumbers\",\"editorClass\",\"enableDefaultAutocompletion\",\"enableLiveAutoCompletion\",\"value\",\"mode\",\"update\"],[10,20,2,true,true,true,\"exred-codeblock-editor\",true,true,[20,[\"value\"]],\"ace/mode/elixir\",[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[]},null],[0,\"\\n\\n\"],[1,[25,\"ember-ace\",null,[[\"minLines\",\"maxLines\",\"tabSize\",\"highlightActiveLine\",\"showInvisibles\",\"showLineNumbers\",\"editorClass\",\"enableDefaultAutocompletion\",\"enableLiveAutoCompletion\",\"value\",\"mode\",\"update\"],[10,20,2,true,true,true,\"exred-codeblock-editor\",true,true,[20,[\"value\"]],\"ace/mode/elixir\",[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/codeblock.hbs" } });
});
define("exred/templates/components/x-config-tab/filepicker", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "7GNrOpWa", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"frost-file-picker\",null,[[\"value\",\"accept\",\"placeholderText\",\"onChange\"],[[20,[\"value\"]],[20,[\"fieldAttrs\",\"accept\"]],[20,[\"value\"]],[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/filepicker.hbs" } });
});
define("exred/templates/components/x-config-tab/list-multiselect", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "1nPv1lt9", "block": "{\"symbols\":[\"item\",\"controls\"],\"statements\":[[4,\"paper-list\",null,null,{\"statements\":[[0,\"  \"],[4,\"paper-subheader\",null,null,{\"statements\":[[1,[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],false]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"itemlist\"]]],null,{\"statements\":[[4,\"paper-item\",null,null,{\"statements\":[[0,\"      \"],[6,\"p\"],[7],[1,[19,1,[\"name\"]],false],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"md-secondary-container\"],[7],[0,\"\\n        \"],[1,[25,\"component\",[[19,2,[\"checkbox\"]]],[[\"value\",\"secondary\",\"onChange\"],[[19,1,[\"enabled\"]],true,[25,\"action\",[[19,0,[]],[25,\"mut\",[[19,1,[\"enabled\"]]],null]],null]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[1]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/list-multiselect.hbs" } });
});
define("exred/templates/components/x-config-tab/list-singleselect", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "oGFt1wQS", "block": "{\"symbols\":[\"item\",\"controls\"],\"statements\":[[4,\"paper-list\",null,null,{\"statements\":[[0,\"  \"],[4,\"paper-subheader\",null,null,{\"statements\":[[1,[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],false]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"each\",[[20,[\"itemlist\"]]],null,{\"statements\":[[4,\"paper-item\",null,null,{\"statements\":[[0,\"      \"],[6,\"p\"],[7],[1,[25,\"humanize\",[[19,1,[]]],null],false],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"md-secondary-container\"],[7],[0,\"\\n        \"],[1,[25,\"component\",[[19,2,[\"radio\"]]],[[\"groupValue\",\"value\",\"secondary\",\"onChange\"],[[20,[\"selectedItem\"]],[19,1,[]],true,[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"selectedItem\"]]],null]],null]]]],false],[0,\"\\n      \"],[8],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[1]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/list-singleselect.hbs" } });
});
define("exred/templates/components/x-config-tab/number", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pSjmfgZU", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"paper-input\",null,[[\"label\",\"value\",\"type\",\"min\",\"max\",\"onChange\"],[[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],[20,[\"value\"]],\"number\",[20,[\"fieldAttrs\",\"min\"]],[20,[\"fieldAttrs\",\"max\"]],[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/number.hbs" } });
});
define("exred/templates/components/x-config-tab/select", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "9olyCM9X", "block": "{\"symbols\":[\"sel\"],\"statements\":[[4,\"paper-select\",null,[[\"placeholder\",\"label\",\"selected\",\"options\",\"onchange\"],[[20,[\"key\"]],[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],[20,[\"value\"]],[20,[\"fieldAttrs\",\"options\"]],[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]],{\"statements\":[[0,\"  \"],[1,[19,1,[]],false],[0,\"\\n\"]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/select.hbs" } });
});
define("exred/templates/components/x-config-tab/string", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "CO814Lsq", "block": "{\"symbols\":[],\"statements\":[[1,[25,\"paper-input\",null,[[\"class\",\"label\",\"value\",\"type\",\"maxlength\",\"onChange\"],[\"flex-80\",[25,\"uppercase\",[[25,\"humanize\",[[20,[\"key\"]]],null]],null],[20,[\"value\"]],\"text\",[20,[\"fieldAttrs\",\"max\"]],[25,\"action\",[[19,0,[]],[25,\"queue\",[[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"value\"]]],null]],null],[25,\"action\",[[19,0,[]],[20,[\"configUpdate\"]],[20,[\"key\"]],[20,[\"value\"]]],null]],null]],null]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab/string.hbs" } });
});
define("exred/templates/components/x-config-tab0", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "pbOVLtny", "block": "{\"symbols\":[\"card\",\"table\",\"body\",\"configKey\",\"configDefinition\",\"row\"],\"statements\":[[6,\"div\"],[9,\"class\",\"layout-row flex\"],[7],[0,\"\\n  \"],[6,\"h2\"],[7],[1,[20,[\"state\",\"activeNode\",\"visibleName\"]],false],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"state\",\"activeNode\"]]],null,{\"statements\":[[0,\"    \"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null]]],{\"statements\":[[1,[25,\"paper-icon\",[\"delete\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\\n\"],[4,\"paper-card\",null,null,{\"statements\":[[4,\"component\",[[19,1,[\"content\"]]],null,{\"statements\":[[0,\"\\n\"],[4,\"paper-data-table\",null,null,{\"statements\":[[0,\"\\n\"],[4,\"component\",[[19,2,[\"body\"]]],null,{\"statements\":[[4,\"each\",[[20,[\"state\",\"activeNode\",\"ui_attributes\",\"config_order\"]]],null,{\"statements\":[[4,\"with\",[[25,\"get\",[[20,[\"state\",\"activeNode\",\"config\"]],[19,4,[]]],null]],null,{\"statements\":[[0,\"\\n\"],[4,\"component\",[[19,3,[\"row\"]]],null,{\"statements\":[[4,\"component\",[[19,6,[\"cell\"]]],null,{\"statements\":[[4,\"if\",[[20,[\"configVal\",\"info\"]]],null,{\"statements\":[[0,\"              \"],[4,\"paper-tooltip\",null,[[\"position\",\"class\"],[\"top\",\"exred-tooltip\"]],{\"statements\":[[1,[20,[\"configVal\",\"info\"]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[1,[25,\"titleize\",[[25,\"humanize\",[[19,4,[]]],null]],null],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"component\",[[19,6,[\"cell\"]]],null,{\"statements\":[[0,\"            \"],[6,\"div\"],[9,\"class\",\"flex-80\"],[7],[0,\"\\n              \"],[1,[25,\"component\",[[25,\"concat\",[\"x-config-tab/\",[19,5,[\"type\"]]],null]],[[\"key\",\"value\",\"configUpdate\",\"fieldAttrs\"],[[25,\"readonly\",[[19,4,[]]],null],[25,\"readonly\",[[19,5,[\"value\"]]],null],[25,\"action\",[[19,0,[]],\"configUpdate\"],null],[19,5,[\"attrs\"]]]]],false],[0,\"\\n            \"],[8],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[6]},null],[0,\"\\n\"]],\"parameters\":[5]},null]],\"parameters\":[4]},null]],\"parameters\":[3]},null],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"layout layout-column\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"state\",\"configChanged\"]]],null,{\"statements\":[[0,\"    \"],[1,[18,\"paper-divider\"],false],[0,\"\\n    \"],[4,\"paper-button\",null,[[\"raised\",\"primary\",\"onClick\"],[true,true,[25,\"action\",[[19,0,[]],[20,[\"saveNewConfig\"]],[20,[\"configBuffer\"]]],null]]],{\"statements\":[[0,\"Save\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab0.hbs" } });
});
define("exred/templates/components/x-config-tab1", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "fz0v+FqU", "block": "{\"symbols\":[\"card\",\"grid\",\"configKey\",\"configDefinition\",\"tile\"],\"statements\":[[6,\"div\"],[9,\"class\",\"layout-row flex\"],[7],[0,\"\\n  \"],[6,\"h2\"],[7],[1,[20,[\"state\",\"activeNode\",\"visibleName\"]],false],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"state\",\"activeNode\"]]],null,{\"statements\":[[0,\"    \"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null]]],{\"statements\":[[1,[25,\"paper-icon\",[\"delete\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\\n\"],[4,\"paper-card\",null,null,{\"statements\":[[4,\"component\",[[19,1,[\"content\"]]],null,{\"statements\":[[4,\"paper-grid-list\",null,[[\"cols\",\"rowHeight\",\"gutter\"],[\"1 md-2 gt-md-6\",\"gt-md-1:1 2:2\",\"12px gt-sm-8px\"]],{\"statements\":[[0,\"    \\n\"],[4,\"each\",[[20,[\"state\",\"activeNode\",\"ui_attributes\",\"config_order\"]]],null,{\"statements\":[[4,\"with\",[[25,\"get\",[[20,[\"state\",\"activeNode\",\"config\"]],[19,3,[]]],null]],null,{\"statements\":[[4,\"component\",[[19,2,[\"tile\"]]],[[\"class\",\"colspan\",\"rowspan\"],[\"config-tile\",[25,\"if\",[[25,\"get\",[[20,[\"colspan\"]],[19,3,[]]],null],[25,\"get\",[[20,[\"colspan\"]],[19,3,[]]],null],2],null],[25,\"if\",[[25,\"get\",[[20,[\"rowspan\"]],[19,3,[]]],null],[25,\"get\",[[20,[\"rowspan\"]],[19,3,[]]],null],2],null]]],{\"statements\":[[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"layout-column\"],[7],[0,\"\\n          \"],[6,\"strong\"],[7],[0,\" \"],[1,[25,\"titleize\",[[25,\"humanize\",[[19,3,[]]],null]],null],false],[0,\" \"],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"configVal\",\"info\"]]],null,{\"statements\":[[0,\"            \"],[4,\"paper-tooltip\",null,[[\"position\",\"class\"],[\"top\",\"exred-tooltip\"]],{\"statements\":[[1,[20,[\"configVal\",\"info\"]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"          \"],[1,[25,\"component\",[[25,\"concat\",[\"x-config-tab/\",[19,4,[\"type\"]]],null]],[[\"key\",\"value\",\"configUpdate\",\"fieldAttrs\"],[[25,\"readonly\",[[19,3,[]]],null],[25,\"readonly\",[[19,4,[\"value\"]]],null],[25,\"action\",[[19,0,[]],\"configUpdate\"],null],[19,4,[\"attrs\"]]]]],false],[0,\"\\n        \"],[8],[0,\"\\n\\n\"]],\"parameters\":[5]},null]],\"parameters\":[4]},null]],\"parameters\":[3]},null],[0,\"\\n\"]],\"parameters\":[2]},null]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"\\n\\n\"],[6,\"div\"],[9,\"class\",\"layout layout-column\"],[7],[0,\"\\n\\n\"],[4,\"if\",[[20,[\"state\",\"configChanged\"]]],null,{\"statements\":[[0,\"    \"],[1,[18,\"paper-divider\"],false],[0,\"\\n    \"],[4,\"paper-button\",null,[[\"raised\",\"primary\",\"onClick\"],[true,true,[25,\"action\",[[19,0,[]],[20,[\"saveNewConfig\"]],[20,[\"configBuffer\"]]],null]]],{\"statements\":[[0,\"Save\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-config-tab1.hbs" } });
});
define("exred/templates/components/x-debug-item", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "GVWaQaJk", "block": "{\"symbols\":[],\"statements\":[[6,\"strong\"],[7],[1,[20,[\"item\",\"node_name\"]],false],[8],[0,\"\\n\"],[1,[25,\"x-json\",null,[[\"value\"],[[20,[\"item\",\"debug_data\"]]]]],false],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-debug-item.hbs" } });
});
define("exred/templates/components/x-debug-tab", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "V8R9bZ8+", "block": "{\"symbols\":[\"eventMsg\"],\"statements\":[[6,\"div\"],[9,\"id\",\"debug-list\"],[9,\"class\",\"layout-column\"],[9,\"style\",\"height: 80vh; overflow: auto; border: solid 1px;\"],[7],[0,\"\\n\\n\"],[4,\"paper-list\",null,[[\"class\"],[\"flex-nogrow\"]],{\"statements\":[[4,\"each\",[[20,[\"eventMsgList\"]]],null,{\"statements\":[[4,\"paper-item\",null,null,{\"statements\":[[0,\"        \"],[1,[25,\"x-debug-item\",null,[[\"item\"],[[19,1,[]]]]],false],[0,\"\\n        \"],[1,[18,\"paper-divider\"],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null]],\"parameters\":[]},null],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-debug-tab.hbs" } });
});
define("exred/templates/components/x-editor", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "8ixwXeL9", "block": "{\"symbols\":[\"current\",\"tabs\"],\"statements\":[[1,[18,\"paper-toaster\"],false],[0,\"\\n\\n\"],[1,[25,\"editor-toolbar\",null,[[\"toggleFlowNav\",\"flowNavOpen\",\"selectedNodeId\",\"currentFlowId\"],[[25,\"action\",[[19,0,[]],[20,[\"toggleFlowNav\"]]],null],[25,\"readonly\",[[20,[\"flowNavOpen\"]]],null],[20,[\"selectedNode\",\"id\"]],[20,[\"currentFlowId\"]]]]],false],[0,\"\\n\\n\"],[4,\"editor-flownav\",null,[[\"flowNavOpen\",\"currentFlowId\",\"services\",\"flows\"],[[25,\"readonly\",[[20,[\"flowNavOpen\"]]],null],[20,[\"state\",\"activeFlowId\"]],[20,[\"model\",\"services\"]],[20,[\"model\",\"flows\"]]]],{\"statements\":[[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"layout-row\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"class\",\"flex-10\"],[7],[0,\"\\n      \"],[1,[25,\"editor-nodelist\",null,[[\"nodelist\",\"nodeDoubleClick\"],[[25,\"filter-by\",[\"isPrototype\",true,[20,[\"model\",\"nodes\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"nodeDoubleClick\"]]],null]]]],false],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"flex-70\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"layout-column\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"class\",\"flex-90\"],[7],[0,\"\\n          \"],[1,[25,\"editor-flows\",null,[[\"nodeInstances\",\"connections\",\"updateNodePosition\",\"addConnection\",\"deleteConnection\"],[[20,[\"state\",\"activeFlow\",\"nodes\"]],[20,[\"state\",\"activeFlow\",\"connections\"]],[25,\"action\",[[19,0,[]],[20,[\"updateNodePosition\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"addConnection\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"deleteConnection\"]]],null]]]],false],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n    \"],[6,\"div\"],[9,\"class\",\"flex-20\"],[7],[0,\"\\n\\n\"],[4,\"paper-tabs\",null,[[\"primary\",\"center\",\"stretch\",\"borderBottom\",\"selected\",\"onChange\"],[false,false,true,true,[20,[\"selectedTab\"]],[25,\"action\",[[19,0,[]],[25,\"mut\",[[20,[\"selectedTab\"]]],null]],null]]],{\"statements\":[[0,\"        \"],[4,\"component\",[[19,2,[\"tab\"]]],null,{\"statements\":[[0,\"Info\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"component\",[[19,2,[\"tab\"]]],null,{\"statements\":[[0,\"Config\"]],\"parameters\":[]},null],[0,\"\\n        \"],[4,\"component\",[[19,2,[\"tab\"]]],null,{\"statements\":[[0,\"Debug\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n\"],[4,\"liquid-bind\",[[25,\"hash\",null,[[\"tab\"],[[20,[\"selectedTab\"]]]]]],[[\"class\"],[\"md-padding tab-animation\"]],{\"statements\":[[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,1,[\"tab\"]],0],null]],null,{\"statements\":[[0,\"          \"],[1,[25,\"x-info-tab\",null,[[\"selectedNode\",\"deleteActive\"],[[20,[\"selectedNode\"]],[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null]]]],false],[0,\" \\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,1,[\"tab\"]],1],null]],null,{\"statements\":[[0,\"          \"],[1,[25,\"x-config-tab\",null,[[\"selectedNode\",\"deleteActive\",\"saveNewConfig\"],[[20,[\"selectedNode\"]],[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"saveNewConfig\"]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"],[4,\"if\",[[25,\"eq\",[[19,1,[\"tab\"]],2],null]],null,{\"statements\":[[0,\"          \"],[1,[18,\"x-debug-tab\"],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"\\n    \"],[8],[0,\"\\n  \"],[8],[0,\"\\n\\n\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-editor.hbs" } });
});
define("exred/templates/components/x-info-tab", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "F4Mp3kDR", "block": "{\"symbols\":[\"card\",\"table\",\"body\",\"configKey\",\"configVal\",\"row\",\"attrsTable\",\"attrsBody\",\"attrName\",\"attrValue\",\"attrsRow\",\"head\",\"card\"],\"statements\":[[6,\"div\"],[9,\"class\",\"layout-row flex\"],[7],[0,\"\\n  \"],[6,\"h2\"],[7],[1,[20,[\"state\",\"activeNode\",\"visibleName\"]],false],[8],[0,\"\\n  \"],[6,\"span\"],[9,\"class\",\"flex\"],[7],[8],[0,\"\\n\"],[4,\"if\",[[20,[\"state\",\"activeNode\"]]],null,{\"statements\":[[0,\"    \"],[4,\"paper-button\",null,[[\"iconButton\",\"onClick\"],[true,[25,\"action\",[[19,0,[]],[20,[\"deleteActive\"]]],null]]],{\"statements\":[[1,[25,\"paper-icon\",[\"delete\"],null],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[8],[0,\"\\n\\n\\n\"],[4,\"paper-card\",null,null,{\"statements\":[[4,\"component\",[[19,13,[\"content\"]]],null,{\"statements\":[[0,\"      \"],[1,[25,\"markdown-to-html\",[[20,[\"state\",\"activeNode\",\"info\"]]],null],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[13]},null],[0,\"\\n\\n\"],[4,\"paper-card\",null,null,{\"statements\":[[4,\"component\",[[19,1,[\"content\"]]],null,{\"statements\":[[0,\"\\n\"],[4,\"paper-data-table\",null,null,{\"statements\":[[0,\"\\n\"],[4,\"component\",[[19,2,[\"head\"]]],null,{\"statements\":[[0,\"      \"],[4,\"component\",[[19,12,[\"column\"]]],null,{\"statements\":[[0,\"Config Field\"]],\"parameters\":[]},null],[0,\"\\n      \"],[4,\"component\",[[19,12,[\"column\"]]],null,{\"statements\":[[0,\"Type\"]],\"parameters\":[]},null],[0,\"\\n      \"],[4,\"component\",[[19,12,[\"column\"]]],null,{\"statements\":[[0,\"Attributes\"]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[12]},null],[0,\"\\n\"],[4,\"component\",[[19,2,[\"body\"]]],null,{\"statements\":[[4,\"each\",[[20,[\"state\",\"activeNode\",\"ui_attributes\",\"config_order\"]]],null,{\"statements\":[[4,\"with\",[[25,\"get\",[[20,[\"state\",\"activeNode\",\"config\"]],[19,4,[]]],null]],null,{\"statements\":[[0,\"\\n\"],[4,\"component\",[[19,3,[\"row\"]]],null,{\"statements\":[[4,\"component\",[[19,6,[\"cell\"]]],null,{\"statements\":[[4,\"if\",[[19,5,[\"info\"]]],null,{\"statements\":[[0,\"              \"],[4,\"paper-tooltip\",null,[[\"position\",\"class\"],[\"top\",\"exred-tooltip\"]],{\"statements\":[[1,[19,5,[\"info\"]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"            \"],[1,[19,4,[]],false],[0,\"\\n\"]],\"parameters\":[]},null],[0,\"\\n          \"],[4,\"component\",[[19,6,[\"cell\"]]],null,{\"statements\":[[1,[19,5,[\"type\"]],false]],\"parameters\":[]},null],[0,\"\\n\\n\"],[4,\"component\",[[19,6,[\"cell\"]]],null,{\"statements\":[[4,\"if\",[[19,5,[\"attrs\"]]],null,{\"statements\":[[4,\"paper-data-table\",null,null,{\"statements\":[[4,\"component\",[[19,7,[\"body\"]]],null,{\"statements\":[[4,\"each\",[[25,\"-each-in\",[[19,5,[\"attrs\"]]],null]],null,{\"statements\":[[4,\"component\",[[19,8,[\"row\"]]],null,{\"statements\":[[0,\"                    \"],[4,\"component\",[[19,11,[\"cell\"]]],null,{\"statements\":[[1,[19,9,[]],false]],\"parameters\":[]},null],[0,\"\\n                    \"],[4,\"component\",[[19,11,[\"cell\"]]],null,{\"statements\":[[1,[19,10,[]],false]],\"parameters\":[]},null],[0,\"\\n\"]],\"parameters\":[11]},null]],\"parameters\":[9,10]},null]],\"parameters\":[8]},null]],\"parameters\":[7]},null]],\"parameters\":[]},null]],\"parameters\":[]},null]],\"parameters\":[6]},null],[0,\"\\n\"]],\"parameters\":[5]},null]],\"parameters\":[4]},null]],\"parameters\":[3]},null],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-info-tab.hbs" } });
});
define("exred/templates/components/x-json", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "DgkrQqjO", "block": "{\"symbols\":[],\"statements\":[[6,\"div\"],[9,\"class\",\"xjson\"],[7],[0,\"\\n\"],[8]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-json.hbs" } });
});
define("exred/templates/components/x-json2html", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "iej43cEj", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"html_out\"],true]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-json2html.hbs" } });
});
define("exred/templates/components/x-jsplumb", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "KrZAPw1/", "block": "{\"symbols\":[\"node\"],\"statements\":[[6,\"div\"],[9,\"class\",\"jtk-demo-canvas canvas-wide jtk-surface jtk-surface-nopan\"],[9,\"id\",\"canvas\"],[7],[0,\"\\n\"],[4,\"each\",[[20,[\"nodes\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"diagram-node\",null,[[\"jspInstance\",\"model\",\"click\",\"updateNodePositionXY\"],[[20,[\"jspInstance\"]],[19,1,[]],[25,\"action\",[[19,0,[]],\"clickOnNode\",[19,1,[\"id\"]]],null],[25,\"action\",[[19,0,[]],[20,[\"updateNodePosition\"]],[19,1,[\"id\"]]],null]]]],false],[0,\"\\n    \"],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[6,\"br\"],[7],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[8],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/components/x-jsplumb.hbs" } });
});
define("exred/templates/index", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "lK6j+dtM", "block": "{\"symbols\":[],\"statements\":[[1,[18,\"outlet\"],false]],\"hasEval\":false}", "meta": { "moduleName": "exred/templates/index.hbs" } });
});
define('exred/transitions', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function () {
    this.transition(this.hasClass('tab-animation'), this.toValue(function (to, from) {
      return to.tab > from.tab;
    }), this.use('toLeft'));
    this.transition(this.hasClass('tab-animation'), this.toValue(function (to, from) {
      return to.tab < from.tab;
    }), this.use('toRight'));
  };
});
define('exred/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _crossFade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _crossFade.default;
    }
  });
});
define('exred/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _default) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _default.default;
    }
  });
});
define('exred/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _explode) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _explode.default;
    }
  });
});
define('exred/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _fade) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _fade.default;
    }
  });
});
define('exred/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _flexGrow) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flexGrow.default;
    }
  });
});
define('exred/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _flyTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _flyTo.default;
    }
  });
});
define('exred/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _moveOver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _moveOver.default;
    }
  });
});
define('exred/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _scale) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scale.default;
    }
  });
});
define('exred/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _scrollThen) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _scrollThen.default;
    }
  });
});
define('exred/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _toDown) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toDown.default;
    }
  });
});
define('exred/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _toLeft) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toLeft.default;
    }
  });
});
define('exred/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _toRight) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toRight.default;
    }
  });
});
define('exred/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _toUp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _toUp.default;
    }
  });
});
define('exred/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _wait) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _wait.default;
    }
  });
});
define('exred/utils/clamp', ['exports', 'ember-paper/utils/clamp'], function (exports, _clamp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _clamp.default;
    }
  });
});
define('exred/utils/key-codes', ['exports', 'ember-frost-core/utils'], function (exports, _utils) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'keyCodes', {
    enumerable: true,
    get: function () {
      return _utils.keyCodes;
    }
  });
});
define('exred/utils/titleize', ['exports', 'ember-cli-string-helpers/utils/titleize'], function (exports, _titleize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _titleize.default;
    }
  });
});
define('exred/utils/uuid-generator', ['exports', 'ember-uuid/utils/uuid-generator'], function (exports, _uuidGenerator) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _uuidGenerator.default;
    }
  });
  Object.defineProperty(exports, 'v4', {
    enumerable: true,
    get: function () {
      return _uuidGenerator.v4;
    }
  });
  Object.defineProperty(exports, 'v1', {
    enumerable: true,
    get: function () {
      return _uuidGenerator.v1;
    }
  });
  Object.defineProperty(exports, 'parse', {
    enumerable: true,
    get: function () {
      return _uuidGenerator.parse;
    }
  });
  Object.defineProperty(exports, 'unparse', {
    enumerable: true,
    get: function () {
      return _uuidGenerator.unparse;
    }
  });
});
define('exred/validators/alias', ['exports', 'ember-cp-validations/validators/alias'], function (exports, _alias) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _alias.default;
    }
  });
});
define('exred/validators/belongs-to', ['exports', 'ember-cp-validations/validators/belongs-to'], function (exports, _belongsTo) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _belongsTo.default;
    }
  });
});
define('exred/validators/collection', ['exports', 'ember-cp-validations/validators/collection'], function (exports, _collection) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _collection.default;
    }
  });
});
define('exred/validators/confirmation', ['exports', 'ember-cp-validations/validators/confirmation'], function (exports, _confirmation) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _confirmation.default;
    }
  });
});
define('exred/validators/date', ['exports', 'ember-cp-validations/validators/date'], function (exports, _date) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _date.default;
    }
  });
});
define('exred/validators/dependent', ['exports', 'ember-cp-validations/validators/dependent'], function (exports, _dependent) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dependent.default;
    }
  });
});
define('exred/validators/ds-error', ['exports', 'ember-cp-validations/validators/ds-error'], function (exports, _dsError) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _dsError.default;
    }
  });
});
define('exred/validators/exclusion', ['exports', 'ember-cp-validations/validators/exclusion'], function (exports, _exclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _exclusion.default;
    }
  });
});
define('exred/validators/format', ['exports', 'ember-cp-validations/validators/format'], function (exports, _format) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _format.default;
    }
  });
});
define('exred/validators/has-many', ['exports', 'ember-cp-validations/validators/has-many'], function (exports, _hasMany) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _hasMany.default;
    }
  });
});
define('exred/validators/inclusion', ['exports', 'ember-cp-validations/validators/inclusion'], function (exports, _inclusion) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _inclusion.default;
    }
  });
});
define('exred/validators/length', ['exports', 'ember-cp-validations/validators/length'], function (exports, _length) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _length.default;
    }
  });
});
define('exred/validators/messages', ['exports', 'ember-cp-validations/validators/messages'], function (exports, _messages) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _messages.default;
    }
  });
});
define('exred/validators/number', ['exports', 'ember-cp-validations/validators/number'], function (exports, _number) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _number.default;
    }
  });
});
define('exred/validators/presence', ['exports', 'ember-cp-validations/validators/presence'], function (exports, _presence) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _presence.default;
    }
  });
});


define('exred/config/environment', [], function() {
  if (typeof FastBoot !== 'undefined') {
return FastBoot.config('exred');
} else {
var prefix = 'exred';try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

}
});


if (typeof FastBoot === 'undefined') {
  if (!runningTests) {
    require('exred/app')['default'].create({"LOG_RESOLVER":true,"LOG_TRANSITIONS":true,"LOG_TRANSITIONS_INTERNAL":true,"LOG_VIEW_LOOKUPS":true,"name":"exred","version":"0.0.0+50123e84"});
  }
}

define('~fastboot/app-factory', ['exred/app', 'exred/config/environment'], function(App, config) {
  App = App['default'];
  config = config['default'];

  return {
    'default': function() {
      return App.create(config.APP);
    }
  };
});

//# sourceMappingURL=exred.map
