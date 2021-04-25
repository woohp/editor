// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"4tRWO":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "c6b67f9198e614ba5678859aa9a6e6a6";
// @flow
/*global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE*/
/*::
import type {
HMRAsset,
HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
(string): mixed;
cache: {|[string]: ParcelModule|};
hotData: mixed;
Module: any;
parent: ?ParcelRequire;
isParcelRequire: true;
modules: {|[string]: [Function, {|[string]: string|}]|};
HMR_BUNDLE_ID: string;
root: ParcelRequire;
}
interface ParcelModule {
hot: {|
data: mixed,
accept(cb: (Function) => void): void,
dispose(cb: (mixed) => void): void,
// accept(deps: Array<string> | string, cb: (Function) => void): void,
// decline(): void,
_acceptCallbacks: Array<(Function) => void>,
_disposeCallbacks: Array<(mixed) => void>,
|};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || (function () {}));
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets, /*: {|[string]: boolean|}*/
acceptedAssets, /*: {|[string]: boolean|}*/
/*: {|[string]: boolean|}*/
assetsToAccept;
function getHostname() {
  return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
  return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = getHostname();
  var port = getPort();
  var protocol = HMR_SECURE || location.protocol == 'https:' && !(/localhost|127.0.0.1|0.0.0.0/).test(hostname) ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
  // $FlowFixMe
  ws.onmessage = function (event) /*: {data: string, ...}*/
  {
    checkedAssets = {
      /*: {|[string]: boolean|}*/
    };
    acceptedAssets = {
      /*: {|[string]: boolean|}*/
    };
    assetsToAccept = [];
    var data = /*: HMRMessage*/
    JSON.parse(event.data);
    if (data.type === 'update') {
      // Remove error overlay if there is one
      removeErrorOverlay();
      let assets = data.assets.filter(asset => asset.envHash === HMR_ENV_HASH);
      // Handle HMR Update
      var handled = false;
      assets.forEach(asset => {
        var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
        if (didAccept) {
          handled = true;
        }
      });
      if (handled) {
        console.clear();
        assets.forEach(function (asset) {
          hmrApply(module.bundle.root, asset);
        });
        for (var i = 0; i < assetsToAccept.length; i++) {
          var id = assetsToAccept[i][1];
          if (!acceptedAssets[id]) {
            hmrAcceptRun(assetsToAccept[i][0], id);
          }
        }
      } else {
        window.location.reload();
      }
    }
    if (data.type === 'error') {
      // Log parcel errors to console
      for (let ansiDiagnostic of data.diagnostics.ansi) {
        let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
        console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
      }
      // Render the fancy html overlay
      removeErrorOverlay();
      var overlay = createErrorOverlay(data.diagnostics.html);
      // $FlowFixMe
      document.body.appendChild(overlay);
    }
  };
  ws.onerror = function (e) {
    console.error(e.message);
  };
  ws.onclose = function (e) {
    if (undefined !== 'test') {
      console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
    console.log('[parcel] ✨ Error resolved');
  }
}
function createErrorOverlay(diagnostics) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;
  let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
  for (let diagnostic of diagnostics) {
    let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
    errorHTML += `
      <div>
        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">
          🚨 ${diagnostic.message}
        </div>
        <pre>
          ${stack}
        </pre>
        <div>
          ${diagnostic.hints.map(hint => '<div>' + hint + '</div>').join('')}
        </div>
      </div>
    `;
  }
  errorHTML += '</div>';
  overlay.innerHTML = errorHTML;
  return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]>*/
{
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push([bundle, k]);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function updateLink(link) {
  var newLink = link.cloneNode();
  newLink.onload = function () {
    if (link.parentNode !== null) {
      // $FlowFixMe
      link.parentNode.removeChild(link);
    }
  };
  newLink.setAttribute('href', // $FlowFixMe
  link.getAttribute('href').split('?')[0] + '?' + Date.now());
  // $FlowFixMe
  link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
  if (cssTimeout) {
    return;
  }
  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');
    for (var i = 0; i < links.length; i++) {
      // $FlowFixMe[incompatible-type]
      var href = /*: string*/
      links[i].getAttribute('href');
      var hostname = getHostname();
      var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
      var absolute = (/^https?:\/\//i).test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
      if (!absolute) {
        updateLink(links[i]);
      }
    }
    cssTimeout = null;
  }, 50);
}
function hmrApply(bundle, /*: ParcelRequire*/
asset) /*:  HMRAsset*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (asset.type === 'css') {
    reloadCSS();
    return;
  }
  let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
  if (deps) {
    var fn = new Function('require', 'module', 'exports', asset.output);
    modules[asset.id] = [fn, deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, /*: ParcelRequire*/
id, /*: ParcelRequire*/
/*: string*/
depsByBundle) /*: ?{ [string]: { [string]: string } }*/
{
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
    // If we reached the root bundle without finding where the asset should go,
    // there's nothing to do. Mark as "accepted" so we don't reload the page.
    if (!bundle.parent) {
      return true;
    }
    return hmrAcceptCheck(bundle.parent, id, depsByBundle);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(module.bundle.root, id).some(function (v) {
    return hmrAcceptCheck(v[0], v[1], null);
  });
}
function hmrAcceptRun(bundle, /*: ParcelRequire*/
id) /*: string*/
{
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached && cached.hot) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      var assetsToAlsoAccept = cb(function () {
        return getParents(module.bundle.root, id);
      });
      if (assetsToAlsoAccept && assetsToAccept.length) {
        assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
      }
    });
  }
  acceptedAssets[id] = true;
}

},{}],"7uHqP":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "setupTypeScript", function () {
  return setupTypeScript;
});
_parcelHelpers.export(exports, "setupJavaScript", function () {
  return setupJavaScript;
});
_parcelHelpers.export(exports, "getJavaScriptWorker", function () {
  return getJavaScriptWorker;
});
_parcelHelpers.export(exports, "getTypeScriptWorker", function () {
  return getTypeScriptWorker;
});
var _workerManagerJs = require('./workerManager.js');
var _languageFeaturesJs = require('./languageFeatures.js');
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
var javaScriptWorker;
var typeScriptWorker;
function setupTypeScript(defaults) {
  typeScriptWorker = setupMode(defaults, 'typescript');
}
function setupJavaScript(defaults) {
  javaScriptWorker = setupMode(defaults, 'javascript');
}
function getJavaScriptWorker() {
  return new Promise(function (resolve, reject) {
    if (!javaScriptWorker) {
      return reject('JavaScript not registered!');
    }
    resolve(javaScriptWorker);
  });
}
function getTypeScriptWorker() {
  return new Promise(function (resolve, reject) {
    if (!typeScriptWorker) {
      return reject('TypeScript not registered!');
    }
    resolve(typeScriptWorker);
  });
}
function setupMode(defaults, modeId) {
  var client = new _workerManagerJs.WorkerManager(modeId, defaults);
  var worker = function () {
    var uris = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      uris[_i] = arguments[_i];
    }
    return client.getLanguageServiceWorker.apply(client, uris);
  };
  var libFiles = new _languageFeaturesJs.LibFiles(worker);
  _fillersMonacoEditorCoreJs.languages.registerCompletionItemProvider(modeId, new _languageFeaturesJs.SuggestAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerSignatureHelpProvider(modeId, new _languageFeaturesJs.SignatureHelpAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerHoverProvider(modeId, new _languageFeaturesJs.QuickInfoAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerDocumentHighlightProvider(modeId, new _languageFeaturesJs.OccurrencesAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerDefinitionProvider(modeId, new _languageFeaturesJs.DefinitionAdapter(libFiles, worker));
  _fillersMonacoEditorCoreJs.languages.registerReferenceProvider(modeId, new _languageFeaturesJs.ReferenceAdapter(libFiles, worker));
  _fillersMonacoEditorCoreJs.languages.registerDocumentSymbolProvider(modeId, new _languageFeaturesJs.OutlineAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerDocumentRangeFormattingEditProvider(modeId, new _languageFeaturesJs.FormatAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerOnTypeFormattingEditProvider(modeId, new _languageFeaturesJs.FormatOnTypeAdapter(worker));
  _fillersMonacoEditorCoreJs.languages.registerCodeActionProvider(modeId, new _languageFeaturesJs.CodeActionAdaptor(worker));
  _fillersMonacoEditorCoreJs.languages.registerRenameProvider(modeId, new _languageFeaturesJs.RenameAdapter(worker));
  new _languageFeaturesJs.DiagnosticsAdapter(libFiles, defaults, modeId, worker);
  return worker;
}

},{"./workerManager.js":"6FnF6","./languageFeatures.js":"t9fGt","./fillers/monaco-editor-core.js":"7msiB","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6FnF6":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "WorkerManager", function () {
  return WorkerManager;
});
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
var __awaiter = undefined && undefined.__awaiter || (function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
});
var __generator = undefined && undefined.__generator || (function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return (g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g);
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if ((f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
      if ((y = 0, t)) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
});
var WorkerManager = /** @class*/
(function () {
  function WorkerManager(modeId, defaults) {
    var _this = this;
    this._modeId = modeId;
    this._defaults = defaults;
    this._worker = null;
    this._client = null;
    this._configChangeListener = this._defaults.onDidChange(function () {
      return _this._stopWorker();
    });
    this._updateExtraLibsToken = 0;
    this._extraLibsChangeListener = this._defaults.onDidExtraLibsChange(function () {
      return _this._updateExtraLibs();
    });
  }
  WorkerManager.prototype._stopWorker = function () {
    if (this._worker) {
      this._worker.dispose();
      this._worker = null;
    }
    this._client = null;
  };
  WorkerManager.prototype.dispose = function () {
    this._configChangeListener.dispose();
    this._extraLibsChangeListener.dispose();
    this._stopWorker();
  };
  WorkerManager.prototype._updateExtraLibs = function () {
    return __awaiter(this, void 0, void 0, function () {
      var myToken, proxy;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this._worker) {
              return [2];
            }
            myToken = ++this._updateExtraLibsToken;
            return [4, /*yield*/
            this._worker.getProxy()];
          case 1:
            proxy = _a.sent();
            if (this._updateExtraLibsToken !== myToken) {
              // avoid multiple calls
              return [2];
            }
            proxy.updateExtraLibs(this._defaults.getExtraLibs());
            return [2];
        }
      });
    });
  };
  WorkerManager.prototype._getClient = function () {
    var _this = this;
    if (!this._client) {
      this._worker = _fillersMonacoEditorCoreJs.editor.createWebWorker({
        // module that exports the create() method and returns a `TypeScriptWorker` instance
        moduleId: 'vs/language/typescript/tsWorker',
        label: this._modeId,
        keepIdleModels: true,
        // passed in to the create() method
        createData: {
          compilerOptions: this._defaults.getCompilerOptions(),
          extraLibs: this._defaults.getExtraLibs(),
          customWorkerPath: this._defaults.workerOptions.customWorkerPath
        }
      });
      var p = this._worker.getProxy();
      if (this._defaults.getEagerModelSync()) {
        p = p.then(function (worker) {
          if (_this._worker) {
            return _this._worker.withSyncedResources(_fillersMonacoEditorCoreJs.editor.getModels().filter(function (model) {
              return model.getModeId() === _this._modeId;
            }).map(function (model) {
              return model.uri;
            }));
          }
          return worker;
        });
      }
      this._client = p;
    }
    return this._client;
  };
  WorkerManager.prototype.getLanguageServiceWorker = function () {
    var _this = this;
    var resources = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      resources[_i] = arguments[_i];
    }
    var _client;
    return this._getClient().then(function (client) {
      _client = client;
    }).then(function (_) {
      if (_this._worker) {
        return _this._worker.withSyncedResources(resources);
      }
    }).then(function (_) {
      return _client;
    });
  };
  return WorkerManager;
})();

},{"./fillers/monaco-editor-core.js":"7msiB","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"t9fGt":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "flattenDiagnosticMessageText", function () {
  return flattenDiagnosticMessageText;
});
_parcelHelpers.export(exports, "Adapter", function () {
  return Adapter;
});
_parcelHelpers.export(exports, "LibFiles", function () {
  return LibFiles;
});
_parcelHelpers.export(exports, "DiagnosticsAdapter", function () {
  return DiagnosticsAdapter;
});
_parcelHelpers.export(exports, "SuggestAdapter", function () {
  return SuggestAdapter;
});
_parcelHelpers.export(exports, "SignatureHelpAdapter", function () {
  return SignatureHelpAdapter;
});
_parcelHelpers.export(exports, "QuickInfoAdapter", function () {
  return QuickInfoAdapter;
});
_parcelHelpers.export(exports, "OccurrencesAdapter", function () {
  return OccurrencesAdapter;
});
_parcelHelpers.export(exports, "DefinitionAdapter", function () {
  return DefinitionAdapter;
});
_parcelHelpers.export(exports, "ReferenceAdapter", function () {
  return ReferenceAdapter;
});
_parcelHelpers.export(exports, "OutlineAdapter", function () {
  return OutlineAdapter;
});
_parcelHelpers.export(exports, "Kind", function () {
  return Kind;
});
_parcelHelpers.export(exports, "FormatHelper", function () {
  return FormatHelper;
});
_parcelHelpers.export(exports, "FormatAdapter", function () {
  return FormatAdapter;
});
_parcelHelpers.export(exports, "FormatOnTypeAdapter", function () {
  return FormatOnTypeAdapter;
});
_parcelHelpers.export(exports, "CodeActionAdaptor", function () {
  return CodeActionAdaptor;
});
_parcelHelpers.export(exports, "RenameAdapter", function () {
  return RenameAdapter;
});
var _libLibIndexJs = require('./lib/lib.index.js');
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
var __extends = undefined && undefined.__extends || (function () {
  var extendStatics = function (d, b) {
    extendStatics = Object.setPrototypeOf || ({
      __proto__: []
    }) instanceof Array && (function (d, b) {
      d.__proto__ = b;
    }) || (function (d, b) {
      for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
    });
    return extendStatics(d, b);
  };
  return function (d, b) {
    if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var __awaiter = undefined && undefined.__awaiter || (function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
});
var __generator = undefined && undefined.__generator || (function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return (g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g);
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if ((f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
      if ((y = 0, t)) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
});
// #region utils copied from typescript to prevent loading the entire typescriptServices ---
var IndentStyle;
(function (IndentStyle) {
  IndentStyle[IndentStyle["None"] = 0] = "None";
  IndentStyle[IndentStyle["Block"] = 1] = "Block";
  IndentStyle[IndentStyle["Smart"] = 2] = "Smart";
})(IndentStyle || (IndentStyle = {}));
function flattenDiagnosticMessageText(diag, newLine, indent) {
  if (indent === void 0) {
    indent = 0;
  }
  if (typeof diag === 'string') {
    return diag;
  } else if (diag === undefined) {
    return '';
  }
  var result = '';
  if (indent) {
    result += newLine;
    for (var i = 0; i < indent; i++) {
      result += '  ';
    }
  }
  result += diag.messageText;
  indent++;
  if (diag.next) {
    for (var _i = 0, _a = diag.next; _i < _a.length; _i++) {
      var kid = _a[_i];
      result += flattenDiagnosticMessageText(kid, newLine, indent);
    }
  }
  return result;
}
function displayPartsToString(displayParts) {
  if (displayParts) {
    return displayParts.map(function (displayPart) {
      return displayPart.text;
    }).join('');
  }
  return '';
}
// #endregion
var Adapter = /** @class*/
(function () {
  function Adapter(_worker) {
    this._worker = _worker;
  }
  // protected _positionToOffset(model: editor.ITextModel, position: monaco.IPosition): number {
  // return model.getOffsetAt(position);
  // }
  // protected _offsetToPosition(model: editor.ITextModel, offset: number): monaco.IPosition {
  // return model.getPositionAt(offset);
  // }
  Adapter.prototype._textSpanToRange = function (model, span) {
    var p1 = model.getPositionAt(span.start);
    var p2 = model.getPositionAt(span.start + span.length);
    var startLineNumber = p1.lineNumber, startColumn = p1.column;
    var endLineNumber = p2.lineNumber, endColumn = p2.column;
    return {
      startLineNumber: startLineNumber,
      startColumn: startColumn,
      endLineNumber: endLineNumber,
      endColumn: endColumn
    };
  };
  return Adapter;
})();
// --- lib files
var LibFiles = /** @class*/
(function () {
  function LibFiles(_worker) {
    this._worker = _worker;
    this._libFiles = {};
    this._hasFetchedLibFiles = false;
    this._fetchLibFilesPromise = null;
  }
  LibFiles.prototype.isLibFile = function (uri) {
    if (!uri) {
      return false;
    }
    if (uri.path.indexOf('/lib.') === 0) {
      return !!_libLibIndexJs.libFileSet[uri.path.slice(1)];
    }
    return false;
  };
  LibFiles.prototype.getOrCreateModel = function (uri) {
    var model = _fillersMonacoEditorCoreJs.editor.getModel(uri);
    if (model) {
      return model;
    }
    if (this.isLibFile(uri) && this._hasFetchedLibFiles) {
      return _fillersMonacoEditorCoreJs.editor.createModel(this._libFiles[uri.path.slice(1)], 'typescript', uri);
    }
    return null;
  };
  LibFiles.prototype._containsLibFile = function (uris) {
    for (var _i = 0, uris_1 = uris; _i < uris_1.length; _i++) {
      var uri = uris_1[_i];
      if (this.isLibFile(uri)) {
        return true;
      }
    }
    return false;
  };
  LibFiles.prototype.fetchLibFilesIfNecessary = function (uris) {
    return __awaiter(this, void 0, void 0, function () {
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            if (!this._containsLibFile(uris)) {
              // no lib files necessary
              return [2];
            }
            return [4, /*yield*/
            this._fetchLibFiles()];
          case 1:
            _a.sent();
            return [2];
        }
      });
    });
  };
  LibFiles.prototype._fetchLibFiles = function () {
    var _this = this;
    if (!this._fetchLibFilesPromise) {
      this._fetchLibFilesPromise = this._worker().then(function (w) {
        return w.getLibFiles();
      }).then(function (libFiles) {
        _this._hasFetchedLibFiles = true;
        _this._libFiles = libFiles;
      });
    }
    return this._fetchLibFilesPromise;
  };
  return LibFiles;
})();
// --- diagnostics --- ---
var DiagnosticCategory;
(function (DiagnosticCategory) {
  DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
  DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
  DiagnosticCategory[DiagnosticCategory["Suggestion"] = 2] = "Suggestion";
  DiagnosticCategory[DiagnosticCategory["Message"] = 3] = "Message";
})(DiagnosticCategory || (DiagnosticCategory = {}));
var DiagnosticsAdapter = /** @class*/
(function (_super) {
  __extends(DiagnosticsAdapter, _super);
  function DiagnosticsAdapter(_libFiles, _defaults, _selector, worker) {
    var _this = _super.call(this, worker) || this;
    _this._libFiles = _libFiles;
    _this._defaults = _defaults;
    _this._selector = _selector;
    _this._disposables = [];
    _this._listener = Object.create(null);
    var onModelAdd = function (model) {
      if (model.getModeId() !== _selector) {
        return;
      }
      var handle;
      var changeSubscription = model.onDidChangeContent(function () {
        clearTimeout(handle);
        handle = setTimeout(function () {
          return _this._doValidate(model);
        }, 500);
      });
      _this._listener[model.uri.toString()] = {
        dispose: function () {
          changeSubscription.dispose();
          clearTimeout(handle);
        }
      };
      _this._doValidate(model);
    };
    var onModelRemoved = function (model) {
      _fillersMonacoEditorCoreJs.editor.setModelMarkers(model, _this._selector, []);
      var key = model.uri.toString();
      if (_this._listener[key]) {
        _this._listener[key].dispose();
        delete _this._listener[key];
      }
    };
    _this._disposables.push(_fillersMonacoEditorCoreJs.editor.onDidCreateModel(onModelAdd));
    _this._disposables.push(_fillersMonacoEditorCoreJs.editor.onWillDisposeModel(onModelRemoved));
    _this._disposables.push(_fillersMonacoEditorCoreJs.editor.onDidChangeModelLanguage(function (event) {
      onModelRemoved(event.model);
      onModelAdd(event.model);
    }));
    _this._disposables.push({
      dispose: function () {
        for (var _i = 0, _a = _fillersMonacoEditorCoreJs.editor.getModels(); _i < _a.length; _i++) {
          var model = _a[_i];
          onModelRemoved(model);
        }
      }
    });
    var recomputeDiagostics = function () {
      // redo diagnostics when options change
      for (var _i = 0, _a = _fillersMonacoEditorCoreJs.editor.getModels(); _i < _a.length; _i++) {
        var model = _a[_i];
        onModelRemoved(model);
        onModelAdd(model);
      }
    };
    _this._disposables.push(_this._defaults.onDidChange(recomputeDiagostics));
    _this._disposables.push(_this._defaults.onDidExtraLibsChange(recomputeDiagostics));
    _fillersMonacoEditorCoreJs.editor.getModels().forEach(onModelAdd);
    return _this;
  }
  DiagnosticsAdapter.prototype.dispose = function () {
    this._disposables.forEach(function (d) {
      return d && d.dispose();
    });
    this._disposables = [];
  };
  DiagnosticsAdapter.prototype._doValidate = function (model) {
    return __awaiter(this, void 0, void 0, function () {
      var worker, promises, _a, noSyntaxValidation, noSemanticValidation, noSuggestionDiagnostics, allDiagnostics, diagnostics, relatedUris;
      var _this = this;
      return __generator(this, function (_b) {
        switch (_b.label) {
          case 0:
            return [4, /*yield*/
            this._worker(model.uri)];
          case 1:
            worker = _b.sent();
            if (model.isDisposed()) {
              // model was disposed in the meantime
              return [2];
            }
            promises = [];
            (_a = this._defaults.getDiagnosticsOptions(), noSyntaxValidation = _a.noSyntaxValidation, noSemanticValidation = _a.noSemanticValidation, noSuggestionDiagnostics = _a.noSuggestionDiagnostics);
            if (!noSyntaxValidation) {
              promises.push(worker.getSyntacticDiagnostics(model.uri.toString()));
            }
            if (!noSemanticValidation) {
              promises.push(worker.getSemanticDiagnostics(model.uri.toString()));
            }
            if (!noSuggestionDiagnostics) {
              promises.push(worker.getSuggestionDiagnostics(model.uri.toString()));
            }
            return [4, /*yield*/
            Promise.all(promises)];
          case 2:
            allDiagnostics = _b.sent();
            if (!allDiagnostics || model.isDisposed()) {
              // model was disposed in the meantime
              return [2];
            }
            diagnostics = allDiagnostics.reduce(function (p, c) {
              return c.concat(p);
            }, []).filter(function (d) {
              return (_this._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore || []).indexOf(d.code) === -1;
            });
            relatedUris = diagnostics.map(function (d) {
              return d.relatedInformation || [];
            }).reduce(function (p, c) {
              return c.concat(p);
            }, []).map(function (relatedInformation) {
              return relatedInformation.file ? _fillersMonacoEditorCoreJs.Uri.parse(relatedInformation.file.fileName) : null;
            });
            return [4, /*yield*/
            this._libFiles.fetchLibFilesIfNecessary(relatedUris)];
          case 3:
            _b.sent();
            if (model.isDisposed()) {
              // model was disposed in the meantime
              return [2];
            }
            _fillersMonacoEditorCoreJs.editor.setModelMarkers(model, this._selector, diagnostics.map(function (d) {
              return _this._convertDiagnostics(model, d);
            }));
            return [2];
        }
      });
    });
  };
  DiagnosticsAdapter.prototype._convertDiagnostics = function (model, diag) {
    var diagStart = diag.start || 0;
    var diagLength = diag.length || 1;
    var _a = model.getPositionAt(diagStart), startLineNumber = _a.lineNumber, startColumn = _a.column;
    var _b = model.getPositionAt(diagStart + diagLength), endLineNumber = _b.lineNumber, endColumn = _b.column;
    var tags = [];
    if (diag.reportsUnnecessary) {
      tags.push(_fillersMonacoEditorCoreJs.MarkerTag.Unnecessary);
    }
    if (diag.reportsDeprecated) {
      tags.push(_fillersMonacoEditorCoreJs.MarkerTag.Deprecated);
    }
    return {
      severity: this._tsDiagnosticCategoryToMarkerSeverity(diag.category),
      startLineNumber: startLineNumber,
      startColumn: startColumn,
      endLineNumber: endLineNumber,
      endColumn: endColumn,
      message: flattenDiagnosticMessageText(diag.messageText, '\n'),
      code: diag.code.toString(),
      tags: tags,
      relatedInformation: this._convertRelatedInformation(model, diag.relatedInformation)
    };
  };
  DiagnosticsAdapter.prototype._convertRelatedInformation = function (model, relatedInformation) {
    var _this = this;
    if (!relatedInformation) {
      return;
    }
    var result = [];
    relatedInformation.forEach(function (info) {
      var relatedResource = model;
      if (info.file) {
        var relatedResourceUri = _fillersMonacoEditorCoreJs.Uri.parse(info.file.fileName);
        relatedResource = _this._libFiles.getOrCreateModel(relatedResourceUri);
      }
      if (!relatedResource) {
        return;
      }
      var infoStart = info.start || 0;
      var infoLength = info.length || 1;
      var _a = relatedResource.getPositionAt(infoStart), startLineNumber = _a.lineNumber, startColumn = _a.column;
      var _b = relatedResource.getPositionAt(infoStart + infoLength), endLineNumber = _b.lineNumber, endColumn = _b.column;
      result.push({
        resource: relatedResource.uri,
        startLineNumber: startLineNumber,
        startColumn: startColumn,
        endLineNumber: endLineNumber,
        endColumn: endColumn,
        message: flattenDiagnosticMessageText(info.messageText, '\n')
      });
    });
    return result;
  };
  DiagnosticsAdapter.prototype._tsDiagnosticCategoryToMarkerSeverity = function (category) {
    switch (category) {
      case DiagnosticCategory.Error:
        return _fillersMonacoEditorCoreJs.MarkerSeverity.Error;
      case DiagnosticCategory.Message:
        return _fillersMonacoEditorCoreJs.MarkerSeverity.Info;
      case DiagnosticCategory.Warning:
        return _fillersMonacoEditorCoreJs.MarkerSeverity.Warning;
      case DiagnosticCategory.Suggestion:
        return _fillersMonacoEditorCoreJs.MarkerSeverity.Hint;
    }
    return _fillersMonacoEditorCoreJs.MarkerSeverity.Info;
  };
  return DiagnosticsAdapter;
})(Adapter);
var SuggestAdapter = /** @class*/
(function (_super) {
  __extends(SuggestAdapter, _super);
  function SuggestAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Object.defineProperty(SuggestAdapter.prototype, "triggerCharacters", {
    get: function () {
      return ['.'];
    },
    enumerable: false,
    configurable: true
  });
  SuggestAdapter.prototype.provideCompletionItems = function (model, position, _context, token) {
    return __awaiter(this, void 0, void 0, function () {
      var wordInfo, wordRange, resource, offset, worker, info, suggestions;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            wordInfo = model.getWordUntilPosition(position);
            wordRange = new _fillersMonacoEditorCoreJs.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getCompletionsAtPosition(resource.toString(), offset)];
          case 2:
            info = _a.sent();
            if (!info || model.isDisposed()) {
              return [2];
            }
            suggestions = info.entries.map(function (entry) {
              var _a;
              var range = wordRange;
              if (entry.replacementSpan) {
                var p1 = model.getPositionAt(entry.replacementSpan.start);
                var p2 = model.getPositionAt(entry.replacementSpan.start + entry.replacementSpan.length);
                range = new _fillersMonacoEditorCoreJs.Range(p1.lineNumber, p1.column, p2.lineNumber, p2.column);
              }
              var tags = [];
              if (((_a = entry.kindModifiers) === null || _a === void 0 ? void 0 : _a.indexOf('deprecated')) !== -1) {
                tags.push(_fillersMonacoEditorCoreJs.languages.CompletionItemTag.Deprecated);
              }
              return {
                uri: resource,
                position: position,
                offset: offset,
                range: range,
                label: entry.name,
                insertText: entry.name,
                sortText: entry.sortText,
                kind: SuggestAdapter.convertKind(entry.kind),
                tags: tags
              };
            });
            return [2, /*return*/
            {
              suggestions: suggestions
            }];
        }
      });
    });
  };
  SuggestAdapter.prototype.resolveCompletionItem = function (item, token) {
    return __awaiter(this, void 0, void 0, function () {
      var myItem, resource, position, offset, worker, details;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            myItem = item;
            resource = myItem.uri;
            position = myItem.position;
            offset = myItem.offset;
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            return [4, /*yield*/
            worker.getCompletionEntryDetails(resource.toString(), offset, myItem.label)];
          case 2:
            details = _a.sent();
            if (!details) {
              return [2, /*return*/
              myItem];
            }
            return [2, /*return*/
            {
              uri: resource,
              position: position,
              label: details.name,
              kind: SuggestAdapter.convertKind(details.kind),
              detail: displayPartsToString(details.displayParts),
              documentation: {
                value: SuggestAdapter.createDocumentationString(details)
              }
            }];
        }
      });
    });
  };
  SuggestAdapter.convertKind = function (kind) {
    switch (kind) {
      case Kind.primitiveType:
      case Kind.keyword:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Keyword;
      case Kind.variable:
      case Kind.localVariable:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Variable;
      case Kind.memberVariable:
      case Kind.memberGetAccessor:
      case Kind.memberSetAccessor:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Field;
      case Kind.function:
      case Kind.memberFunction:
      case Kind.constructSignature:
      case Kind.callSignature:
      case Kind.indexSignature:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Function;
      case Kind.enum:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Enum;
      case Kind.module:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Module;
      case Kind.class:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Class;
      case Kind.interface:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Interface;
      case Kind.warning:
        return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.File;
    }
    return _fillersMonacoEditorCoreJs.languages.CompletionItemKind.Property;
  };
  SuggestAdapter.createDocumentationString = function (details) {
    var documentationString = displayPartsToString(details.documentation);
    if (details.tags) {
      for (var _i = 0, _a = details.tags; _i < _a.length; _i++) {
        var tag = _a[_i];
        documentationString += "\n\n" + tagToString(tag);
      }
    }
    return documentationString;
  };
  return SuggestAdapter;
})(Adapter);
function tagToString(tag) {
  var tagLabel = "*@" + tag.name + "*";
  if (tag.name === 'param' && tag.text) {
    var _a = tag.text.split(' '), paramName = _a[0], rest = _a.slice(1);
    tagLabel += "`" + paramName + "`";
    if (rest.length > 0) tagLabel += " \u2014 " + rest.join(' ');
  } else if (tag.text) {
    tagLabel += " \u2014 " + tag.text;
  }
  return tagLabel;
}
var SignatureHelpAdapter = /** @class*/
(function (_super) {
  __extends(SignatureHelpAdapter, _super);
  function SignatureHelpAdapter() {
    var _this = _super !== null && _super.apply(this, arguments) || this;
    _this.signatureHelpTriggerCharacters = ['(', ','];
    return _this;
  }
  SignatureHelpAdapter._toSignatureHelpTriggerReason = function (context) {
    switch (context.triggerKind) {
      case _fillersMonacoEditorCoreJs.languages.SignatureHelpTriggerKind.TriggerCharacter:
        if (context.triggerCharacter) {
          if (context.isRetrigger) {
            return {
              kind: 'retrigger',
              triggerCharacter: context.triggerCharacter
            };
          } else {
            return {
              kind: 'characterTyped',
              triggerCharacter: context.triggerCharacter
            };
          }
        } else {
          return {
            kind: 'invoked'
          };
        }
      case _fillersMonacoEditorCoreJs.languages.SignatureHelpTriggerKind.ContentChange:
        return context.isRetrigger ? {
          kind: 'retrigger'
        } : {
          kind: 'invoked'
        };
      case _fillersMonacoEditorCoreJs.languages.SignatureHelpTriggerKind.Invoke:
      default:
        return {
          kind: 'invoked'
        };
    }
  };
  SignatureHelpAdapter.prototype.provideSignatureHelp = function (model, position, token, context) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, info, ret;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getSignatureHelpItems(resource.toString(), offset, {
              triggerReason: SignatureHelpAdapter._toSignatureHelpTriggerReason(context)
            })];
          case 2:
            info = _a.sent();
            if (!info || model.isDisposed()) {
              return [2];
            }
            ret = {
              activeSignature: info.selectedItemIndex,
              activeParameter: info.argumentIndex,
              signatures: []
            };
            info.items.forEach(function (item) {
              var signature = {
                label: '',
                parameters: []
              };
              signature.documentation = {
                value: displayPartsToString(item.documentation)
              };
              signature.label += displayPartsToString(item.prefixDisplayParts);
              item.parameters.forEach(function (p, i, a) {
                var label = displayPartsToString(p.displayParts);
                var parameter = {
                  label: label,
                  documentation: {
                    value: displayPartsToString(p.documentation)
                  }
                };
                signature.label += label;
                signature.parameters.push(parameter);
                if (i < a.length - 1) {
                  signature.label += displayPartsToString(item.separatorDisplayParts);
                }
              });
              signature.label += displayPartsToString(item.suffixDisplayParts);
              ret.signatures.push(signature);
            });
            return [2, /*return*/
            {
              value: ret,
              dispose: function () {}
            }];
        }
      });
    });
  };
  return SignatureHelpAdapter;
})(Adapter);
// --- hover ------
var QuickInfoAdapter = /** @class*/
(function (_super) {
  __extends(QuickInfoAdapter, _super);
  function QuickInfoAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  QuickInfoAdapter.prototype.provideHover = function (model, position, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, info, documentation, tags, contents;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getQuickInfoAtPosition(resource.toString(), offset)];
          case 2:
            info = _a.sent();
            if (!info || model.isDisposed()) {
              return [2];
            }
            documentation = displayPartsToString(info.documentation);
            tags = info.tags ? info.tags.map(function (tag) {
              return tagToString(tag);
            }).join('  \n\n') : '';
            contents = displayPartsToString(info.displayParts);
            return [2, /*return*/
            {
              range: this._textSpanToRange(model, info.textSpan),
              contents: [{
                value: '```typescript\n' + contents + '\n```\n'
              }, {
                value: documentation + (tags ? '\n\n' + tags : '')
              }]
            }];
        }
      });
    });
  };
  return QuickInfoAdapter;
})(Adapter);
// --- occurrences ------
var OccurrencesAdapter = /** @class*/
(function (_super) {
  __extends(OccurrencesAdapter, _super);
  function OccurrencesAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  OccurrencesAdapter.prototype.provideDocumentHighlights = function (model, position, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, entries;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getOccurrencesAtPosition(resource.toString(), offset)];
          case 2:
            entries = _a.sent();
            if (!entries || model.isDisposed()) {
              return [2];
            }
            return [2, /*return*/
            entries.map(function (entry) {
              return {
                range: _this._textSpanToRange(model, entry.textSpan),
                kind: entry.isWriteAccess ? _fillersMonacoEditorCoreJs.languages.DocumentHighlightKind.Write : _fillersMonacoEditorCoreJs.languages.DocumentHighlightKind.Text
              };
            })];
        }
      });
    });
  };
  return OccurrencesAdapter;
})(Adapter);
// --- definition ------
var DefinitionAdapter = /** @class*/
(function (_super) {
  __extends(DefinitionAdapter, _super);
  function DefinitionAdapter(_libFiles, worker) {
    var _this = _super.call(this, worker) || this;
    _this._libFiles = _libFiles;
    return _this;
  }
  DefinitionAdapter.prototype.provideDefinition = function (model, position, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, entries, result, _i, entries_1, entry, uri, refModel;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getDefinitionAtPosition(resource.toString(), offset)];
          case 2:
            entries = _a.sent();
            if (!entries || model.isDisposed()) {
              return [2];
            }
            // Fetch lib files if necessary
            return [4, /*yield*/
            this._libFiles.fetchLibFilesIfNecessary(entries.map(function (entry) {
              return _fillersMonacoEditorCoreJs.Uri.parse(entry.fileName);
            }))];
          case 3:
            // Fetch lib files if necessary
            _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            result = [];
            for ((_i = 0, entries_1 = entries); _i < entries_1.length; _i++) {
              entry = entries_1[_i];
              uri = _fillersMonacoEditorCoreJs.Uri.parse(entry.fileName);
              refModel = this._libFiles.getOrCreateModel(uri);
              if (refModel) {
                result.push({
                  uri: uri,
                  range: this._textSpanToRange(refModel, entry.textSpan)
                });
              }
            }
            return [2, /*return*/
            result];
        }
      });
    });
  };
  return DefinitionAdapter;
})(Adapter);
// --- references ------
var ReferenceAdapter = /** @class*/
(function (_super) {
  __extends(ReferenceAdapter, _super);
  function ReferenceAdapter(_libFiles, worker) {
    var _this = _super.call(this, worker) || this;
    _this._libFiles = _libFiles;
    return _this;
  }
  ReferenceAdapter.prototype.provideReferences = function (model, position, context, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, entries, result, _i, entries_2, entry, uri, refModel;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getReferencesAtPosition(resource.toString(), offset)];
          case 2:
            entries = _a.sent();
            if (!entries || model.isDisposed()) {
              return [2];
            }
            // Fetch lib files if necessary
            return [4, /*yield*/
            this._libFiles.fetchLibFilesIfNecessary(entries.map(function (entry) {
              return _fillersMonacoEditorCoreJs.Uri.parse(entry.fileName);
            }))];
          case 3:
            // Fetch lib files if necessary
            _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            result = [];
            for ((_i = 0, entries_2 = entries); _i < entries_2.length; _i++) {
              entry = entries_2[_i];
              uri = _fillersMonacoEditorCoreJs.Uri.parse(entry.fileName);
              refModel = this._libFiles.getOrCreateModel(uri);
              if (refModel) {
                result.push({
                  uri: uri,
                  range: this._textSpanToRange(refModel, entry.textSpan)
                });
              }
            }
            return [2, /*return*/
            result];
        }
      });
    });
  };
  return ReferenceAdapter;
})(Adapter);
// --- outline ------
var OutlineAdapter = /** @class*/
(function (_super) {
  __extends(OutlineAdapter, _super);
  function OutlineAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  OutlineAdapter.prototype.provideDocumentSymbols = function (model, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, worker, items, convert, result;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getNavigationBarItems(resource.toString())];
          case 2:
            items = _a.sent();
            if (!items || model.isDisposed()) {
              return [2];
            }
            convert = function (bucket, item, containerLabel) {
              var result = {
                name: item.text,
                detail: '',
                kind: outlineTypeTable[item.kind] || _fillersMonacoEditorCoreJs.languages.SymbolKind.Variable,
                range: _this._textSpanToRange(model, item.spans[0]),
                selectionRange: _this._textSpanToRange(model, item.spans[0]),
                tags: [],
                containerName: containerLabel
              };
              if (item.childItems && item.childItems.length > 0) {
                for (var _i = 0, _a = item.childItems; _i < _a.length; _i++) {
                  var child = _a[_i];
                  convert(bucket, child, result.name);
                }
              }
              bucket.push(result);
            };
            result = [];
            items.forEach(function (item) {
              return convert(result, item);
            });
            return [2, /*return*/
            result];
        }
      });
    });
  };
  return OutlineAdapter;
})(Adapter);
var Kind = /** @class*/
(function () {
  function Kind() {}
  Kind.unknown = '';
  Kind.keyword = 'keyword';
  Kind.script = 'script';
  Kind.module = 'module';
  Kind.class = 'class';
  Kind.interface = 'interface';
  Kind.type = 'type';
  Kind.enum = 'enum';
  Kind.variable = 'var';
  Kind.localVariable = 'local var';
  Kind.function = 'function';
  Kind.localFunction = 'local function';
  Kind.memberFunction = 'method';
  Kind.memberGetAccessor = 'getter';
  Kind.memberSetAccessor = 'setter';
  Kind.memberVariable = 'property';
  Kind.constructorImplementation = 'constructor';
  Kind.callSignature = 'call';
  Kind.indexSignature = 'index';
  Kind.constructSignature = 'construct';
  Kind.parameter = 'parameter';
  Kind.typeParameter = 'type parameter';
  Kind.primitiveType = 'primitive type';
  Kind.label = 'label';
  Kind.alias = 'alias';
  Kind.const = 'const';
  Kind.let = 'let';
  Kind.warning = 'warning';
  return Kind;
})();
var outlineTypeTable = Object.create(null);
outlineTypeTable[Kind.module] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Module;
outlineTypeTable[Kind.class] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Class;
outlineTypeTable[Kind.enum] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Enum;
outlineTypeTable[Kind.interface] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Interface;
outlineTypeTable[Kind.memberFunction] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Method;
outlineTypeTable[Kind.memberVariable] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Property;
outlineTypeTable[Kind.memberGetAccessor] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Property;
outlineTypeTable[Kind.memberSetAccessor] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Property;
outlineTypeTable[Kind.variable] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Variable;
outlineTypeTable[Kind.const] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Variable;
outlineTypeTable[Kind.localVariable] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Variable;
outlineTypeTable[Kind.variable] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Variable;
outlineTypeTable[Kind.function] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Function;
outlineTypeTable[Kind.localFunction] = _fillersMonacoEditorCoreJs.languages.SymbolKind.Function;
// --- formatting ----
var FormatHelper = /** @class*/
(function (_super) {
  __extends(FormatHelper, _super);
  function FormatHelper() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FormatHelper._convertOptions = function (options) {
    return {
      ConvertTabsToSpaces: options.insertSpaces,
      TabSize: options.tabSize,
      IndentSize: options.tabSize,
      IndentStyle: IndentStyle.Smart,
      NewLineCharacter: '\n',
      InsertSpaceAfterCommaDelimiter: true,
      InsertSpaceAfterSemicolonInForStatements: true,
      InsertSpaceBeforeAndAfterBinaryOperators: true,
      InsertSpaceAfterKeywordsInControlFlowStatements: true,
      InsertSpaceAfterFunctionKeywordForAnonymousFunctions: true,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis: false,
      InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets: false,
      InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces: false,
      PlaceOpenBraceOnNewLineForControlBlocks: false,
      PlaceOpenBraceOnNewLineForFunctions: false
    };
  };
  FormatHelper.prototype._convertTextChanges = function (model, change) {
    return {
      text: change.newText,
      range: this._textSpanToRange(model, change.span)
    };
  };
  return FormatHelper;
})(Adapter);
var FormatAdapter = /** @class*/
(function (_super) {
  __extends(FormatAdapter, _super);
  function FormatAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  FormatAdapter.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, startOffset, endOffset, worker, edits;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            startOffset = model.getOffsetAt({
              lineNumber: range.startLineNumber,
              column: range.startColumn
            });
            endOffset = model.getOffsetAt({
              lineNumber: range.endLineNumber,
              column: range.endColumn
            });
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getFormattingEditsForRange(resource.toString(), startOffset, endOffset, FormatHelper._convertOptions(options))];
          case 2:
            edits = _a.sent();
            if (!edits || model.isDisposed()) {
              return [2];
            }
            return [2, /*return*/
            edits.map(function (edit) {
              return _this._convertTextChanges(model, edit);
            })];
        }
      });
    });
  };
  return FormatAdapter;
})(FormatHelper);
var FormatOnTypeAdapter = /** @class*/
(function (_super) {
  __extends(FormatOnTypeAdapter, _super);
  function FormatOnTypeAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  Object.defineProperty(FormatOnTypeAdapter.prototype, "autoFormatTriggerCharacters", {
    get: function () {
      return [';', '}', '\n'];
    },
    enumerable: false,
    configurable: true
  });
  FormatOnTypeAdapter.prototype.provideOnTypeFormattingEdits = function (model, position, ch, options, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, offset, worker, edits;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getFormattingEditsAfterKeystroke(resource.toString(), offset, ch, FormatHelper._convertOptions(options))];
          case 2:
            edits = _a.sent();
            if (!edits || model.isDisposed()) {
              return [2];
            }
            return [2, /*return*/
            edits.map(function (edit) {
              return _this._convertTextChanges(model, edit);
            })];
        }
      });
    });
  };
  return FormatOnTypeAdapter;
})(FormatHelper);
// --- code actions ------
var CodeActionAdaptor = /** @class*/
(function (_super) {
  __extends(CodeActionAdaptor, _super);
  function CodeActionAdaptor() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  CodeActionAdaptor.prototype.provideCodeActions = function (model, range, context, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, start, end, formatOptions, errorCodes, worker, codeFixes, actions;
      var _this = this;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            start = model.getOffsetAt({
              lineNumber: range.startLineNumber,
              column: range.startColumn
            });
            end = model.getOffsetAt({
              lineNumber: range.endLineNumber,
              column: range.endColumn
            });
            formatOptions = FormatHelper._convertOptions(model.getOptions());
            errorCodes = context.markers.filter(function (m) {
              return m.code;
            }).map(function (m) {
              return m.code;
            }).map(Number);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getCodeFixesAtPosition(resource.toString(), start, end, errorCodes, formatOptions)];
          case 2:
            codeFixes = _a.sent();
            if (!codeFixes || model.isDisposed()) {
              return [2, /*return*/
              {
                actions: [],
                dispose: function () {}
              }];
            }
            actions = codeFixes.filter(function (fix) {
              // Removes any 'make a new file'-type code fix
              return fix.changes.filter(function (change) {
                return change.isNewFile;
              }).length === 0;
            }).map(function (fix) {
              return _this._tsCodeFixActionToMonacoCodeAction(model, context, fix);
            });
            return [2, /*return*/
            {
              actions: actions,
              dispose: function () {}
            }];
        }
      });
    });
  };
  CodeActionAdaptor.prototype._tsCodeFixActionToMonacoCodeAction = function (model, context, codeFix) {
    var edits = [];
    for (var _i = 0, _a = codeFix.changes; _i < _a.length; _i++) {
      var change = _a[_i];
      for (var _b = 0, _c = change.textChanges; _b < _c.length; _b++) {
        var textChange = _c[_b];
        edits.push({
          resource: model.uri,
          edit: {
            range: this._textSpanToRange(model, textChange.span),
            text: textChange.newText
          }
        });
      }
    }
    var action = {
      title: codeFix.description,
      edit: {
        edits: edits
      },
      diagnostics: context.markers,
      kind: 'quickfix'
    };
    return action;
  };
  return CodeActionAdaptor;
})(FormatHelper);
// --- rename ----
var RenameAdapter = /** @class*/
(function (_super) {
  __extends(RenameAdapter, _super);
  function RenameAdapter() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  RenameAdapter.prototype.provideRenameEdits = function (model, position, newName, token) {
    return __awaiter(this, void 0, void 0, function () {
      var resource, fileName, offset, worker, renameInfo, renameLocations, edits, _i, renameLocations_1, renameLocation, resource_1, model_1;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            resource = model.uri;
            fileName = resource.toString();
            offset = model.getOffsetAt(position);
            return [4, /*yield*/
            this._worker(resource)];
          case 1:
            worker = _a.sent();
            if (model.isDisposed()) {
              return [2];
            }
            return [4, /*yield*/
            worker.getRenameInfo(fileName, offset, {
              allowRenameOfImportPath: false
            })];
          case 2:
            renameInfo = _a.sent();
            if (renameInfo.canRename === false) {
              // use explicit comparison so that the discriminated union gets resolved properly
              return [2, /*return*/
              {
                edits: [],
                rejectReason: renameInfo.localizedErrorMessage
              }];
            }
            if (renameInfo.fileToRename !== undefined) {
              throw new Error('Renaming files is not supported.');
            }
            return [4, /*yield*/
            worker.findRenameLocations(fileName, offset, /*strings*/
            false, /*comments*/
            false, /*prefixAndSuffix*/
            false)];
          case 3:
            renameLocations = _a.sent();
            if (!renameLocations || model.isDisposed()) {
              return [2];
            }
            edits = [];
            for ((_i = 0, renameLocations_1 = renameLocations); _i < renameLocations_1.length; _i++) {
              renameLocation = renameLocations_1[_i];
              resource_1 = _fillersMonacoEditorCoreJs.Uri.parse(renameLocation.fileName);
              model_1 = _fillersMonacoEditorCoreJs.editor.getModel(resource_1);
              if (model_1) {
                edits.push({
                  resource: resource_1,
                  edit: {
                    range: this._textSpanToRange(model_1, renameLocation.textSpan),
                    text: newName
                  }
                });
              } else {
                throw new Error("Unknown URI " + resource_1 + ".");
              }
            }
            return [2, /*return*/
            {
              edits: edits
            }];
        }
      });
    });
  };
  return RenameAdapter;
})(Adapter);

},{"./lib/lib.index.js":"1Mesm","./fillers/monaco-editor-core.js":"7msiB","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1Mesm":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "libFileSet", function () {
  return libFileSet;
});
var libFileSet = {};
libFileSet['lib.d.ts'] = true;
libFileSet['lib.dom.d.ts'] = true;
libFileSet['lib.dom.iterable.d.ts'] = true;
libFileSet['lib.es2015.collection.d.ts'] = true;
libFileSet['lib.es2015.core.d.ts'] = true;
libFileSet['lib.es2015.d.ts'] = true;
libFileSet['lib.es2015.generator.d.ts'] = true;
libFileSet['lib.es2015.iterable.d.ts'] = true;
libFileSet['lib.es2015.promise.d.ts'] = true;
libFileSet['lib.es2015.proxy.d.ts'] = true;
libFileSet['lib.es2015.reflect.d.ts'] = true;
libFileSet['lib.es2015.symbol.d.ts'] = true;
libFileSet['lib.es2015.symbol.wellknown.d.ts'] = true;
libFileSet['lib.es2016.array.include.d.ts'] = true;
libFileSet['lib.es2016.d.ts'] = true;
libFileSet['lib.es2016.full.d.ts'] = true;
libFileSet['lib.es2017.d.ts'] = true;
libFileSet['lib.es2017.full.d.ts'] = true;
libFileSet['lib.es2017.intl.d.ts'] = true;
libFileSet['lib.es2017.object.d.ts'] = true;
libFileSet['lib.es2017.sharedmemory.d.ts'] = true;
libFileSet['lib.es2017.string.d.ts'] = true;
libFileSet['lib.es2017.typedarrays.d.ts'] = true;
libFileSet['lib.es2018.asyncgenerator.d.ts'] = true;
libFileSet['lib.es2018.asynciterable.d.ts'] = true;
libFileSet['lib.es2018.d.ts'] = true;
libFileSet['lib.es2018.full.d.ts'] = true;
libFileSet['lib.es2018.intl.d.ts'] = true;
libFileSet['lib.es2018.promise.d.ts'] = true;
libFileSet['lib.es2018.regexp.d.ts'] = true;
libFileSet['lib.es2019.array.d.ts'] = true;
libFileSet['lib.es2019.d.ts'] = true;
libFileSet['lib.es2019.full.d.ts'] = true;
libFileSet['lib.es2019.object.d.ts'] = true;
libFileSet['lib.es2019.string.d.ts'] = true;
libFileSet['lib.es2019.symbol.d.ts'] = true;
libFileSet['lib.es2020.bigint.d.ts'] = true;
libFileSet['lib.es2020.d.ts'] = true;
libFileSet['lib.es2020.full.d.ts'] = true;
libFileSet['lib.es2020.intl.d.ts'] = true;
libFileSet['lib.es2020.promise.d.ts'] = true;
libFileSet['lib.es2020.sharedmemory.d.ts'] = true;
libFileSet['lib.es2020.string.d.ts'] = true;
libFileSet['lib.es2020.symbol.wellknown.d.ts'] = true;
libFileSet['lib.es5.d.ts'] = true;
libFileSet['lib.es6.d.ts'] = true;
libFileSet['lib.esnext.d.ts'] = true;
libFileSet['lib.esnext.full.d.ts'] = true;
libFileSet['lib.esnext.intl.d.ts'] = true;
libFileSet['lib.esnext.promise.d.ts'] = true;
libFileSet['lib.esnext.string.d.ts'] = true;
libFileSet['lib.esnext.weakref.d.ts'] = true;
libFileSet['lib.scripthost.d.ts'] = true;
libFileSet['lib.webworker.d.ts'] = true;
libFileSet['lib.webworker.importscripts.d.ts'] = true;
libFileSet['lib.webworker.iterable.d.ts'] = true;

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["4tRWO"], null, "parcelRequire1b1f")

//# sourceMappingURL=tsMode.a9a6e6a6.js.map
