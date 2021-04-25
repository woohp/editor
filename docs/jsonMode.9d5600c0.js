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
})({"46ia3":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = 1234;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "172f917896efa6954a168c7e9d5600c0";
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

},{}],"6jpA8":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "setupMode", function () {
  return setupMode;
});
var _workerManagerJs = require('./workerManager.js');
var _languageFeaturesJs = require('./languageFeatures.js');
var _tokenizationJs = require('./tokenization.js');
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
function setupMode(defaults) {
  var disposables = [];
  var providers = [];
  var client = new _workerManagerJs.WorkerManager(defaults);
  disposables.push(client);
  var worker = function () {
    var uris = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      uris[_i] = arguments[_i];
    }
    return client.getLanguageServiceWorker.apply(client, uris);
  };
  function registerProviders() {
    var languageId = defaults.languageId, modeConfiguration = defaults.modeConfiguration;
    disposeAll(providers);
    if (modeConfiguration.documentFormattingEdits) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerDocumentFormattingEditProvider(languageId, new _languageFeaturesJs.DocumentFormattingEditProvider(worker)));
    }
    if (modeConfiguration.documentRangeFormattingEdits) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerDocumentRangeFormattingEditProvider(languageId, new _languageFeaturesJs.DocumentRangeFormattingEditProvider(worker)));
    }
    if (modeConfiguration.completionItems) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerCompletionItemProvider(languageId, new _languageFeaturesJs.CompletionAdapter(worker)));
    }
    if (modeConfiguration.hovers) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerHoverProvider(languageId, new _languageFeaturesJs.HoverAdapter(worker)));
    }
    if (modeConfiguration.documentSymbols) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerDocumentSymbolProvider(languageId, new _languageFeaturesJs.DocumentSymbolAdapter(worker)));
    }
    if (modeConfiguration.tokens) {
      providers.push(_fillersMonacoEditorCoreJs.languages.setTokensProvider(languageId, _tokenizationJs.createTokenizationSupport(true)));
    }
    if (modeConfiguration.colors) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerColorProvider(languageId, new _languageFeaturesJs.DocumentColorAdapter(worker)));
    }
    if (modeConfiguration.foldingRanges) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerFoldingRangeProvider(languageId, new _languageFeaturesJs.FoldingRangeAdapter(worker)));
    }
    if (modeConfiguration.diagnostics) {
      providers.push(new _languageFeaturesJs.DiagnosticsAdapter(languageId, worker, defaults));
    }
    if (modeConfiguration.selectionRanges) {
      providers.push(_fillersMonacoEditorCoreJs.languages.registerSelectionRangeProvider(languageId, new _languageFeaturesJs.SelectionRangeAdapter(worker)));
    }
  }
  registerProviders();
  disposables.push(_fillersMonacoEditorCoreJs.languages.setLanguageConfiguration(defaults.languageId, richEditConfiguration));
  var modeConfiguration = defaults.modeConfiguration;
  defaults.onDidChange(function (newDefaults) {
    if (newDefaults.modeConfiguration !== modeConfiguration) {
      modeConfiguration = newDefaults.modeConfiguration;
      registerProviders();
    }
  });
  disposables.push(asDisposable(providers));
  return asDisposable(disposables);
}
function asDisposable(disposables) {
  return {
    dispose: function () {
      return disposeAll(disposables);
    }
  };
}
function disposeAll(disposables) {
  while (disposables.length) {
    disposables.pop().dispose();
  }
}
var richEditConfiguration = {
  wordPattern: /(-?\d*\.\d\w*)|([^\[\{\]\}\:\"\,\s]+)/g,
  comments: {
    lineComment: '//',
    blockComment: ['/*', '*/']
  },
  brackets: [['{', '}'], ['[', ']']],
  autoClosingPairs: [{
    open: '{',
    close: '}',
    notIn: ['string']
  }, {
    open: '[',
    close: ']',
    notIn: ['string']
  }, {
    open: '"',
    close: '"',
    notIn: ['string']
  }]
};

},{"./workerManager.js":"4mB7e","./languageFeatures.js":"6dc3a","./tokenization.js":"3DDEu","./fillers/monaco-editor-core.js":"3sODp","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4mB7e":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "WorkerManager", function () {
  return WorkerManager;
});
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
var STOP_WHEN_IDLE_FOR = 2 * 60 * 1000;
// 2min
var WorkerManager = /** @class*/
(function () {
  function WorkerManager(defaults) {
    var _this = this;
    this._defaults = defaults;
    this._worker = null;
    this._idleCheckInterval = setInterval(function () {
      return _this._checkIfIdle();
    }, 30 * 1000);
    this._lastUsedTime = 0;
    this._configChangeListener = this._defaults.onDidChange(function () {
      return _this._stopWorker();
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
    clearInterval(this._idleCheckInterval);
    this._configChangeListener.dispose();
    this._stopWorker();
  };
  WorkerManager.prototype._checkIfIdle = function () {
    if (!this._worker) {
      return;
    }
    var timePassedSinceLastUsed = Date.now() - this._lastUsedTime;
    if (timePassedSinceLastUsed > STOP_WHEN_IDLE_FOR) {
      this._stopWorker();
    }
  };
  WorkerManager.prototype._getClient = function () {
    this._lastUsedTime = Date.now();
    if (!this._client) {
      this._worker = _fillersMonacoEditorCoreJs.editor.createWebWorker({
        // module that exports the create() method and returns a `JSONWorker` instance
        moduleId: 'vs/language/json/jsonWorker',
        label: this._defaults.languageId,
        // passed in to the create() method
        createData: {
          languageSettings: this._defaults.diagnosticsOptions,
          languageId: this._defaults.languageId,
          enableSchemaRequest: this._defaults.diagnosticsOptions.enableSchemaRequest
        }
      });
      this._client = this._worker.getProxy();
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
      return _this._worker.withSyncedResources(resources);
    }).then(function (_) {
      return _client;
    });
  };
  return WorkerManager;
})();

},{"./fillers/monaco-editor-core.js":"3sODp","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6dc3a":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "DiagnosticsAdapter", function () {
  return DiagnosticsAdapter;
});
_parcelHelpers.export(exports, "CompletionAdapter", function () {
  return CompletionAdapter;
});
_parcelHelpers.export(exports, "HoverAdapter", function () {
  return HoverAdapter;
});
_parcelHelpers.export(exports, "DocumentSymbolAdapter", function () {
  return DocumentSymbolAdapter;
});
_parcelHelpers.export(exports, "DocumentFormattingEditProvider", function () {
  return DocumentFormattingEditProvider;
});
_parcelHelpers.export(exports, "DocumentRangeFormattingEditProvider", function () {
  return DocumentRangeFormattingEditProvider;
});
_parcelHelpers.export(exports, "DocumentColorAdapter", function () {
  return DocumentColorAdapter;
});
_parcelHelpers.export(exports, "FoldingRangeAdapter", function () {
  return FoldingRangeAdapter;
});
_parcelHelpers.export(exports, "SelectionRangeAdapter", function () {
  return SelectionRangeAdapter;
});
var _fillersMonacoEditorCoreJs = require('./fillers/monaco-editor-core.js');
var _depsVscodeJsonLanguageserviceJsonLanguageServiceJs = require('./_deps/vscode-json-languageservice/jsonLanguageService.js');
// --- diagnostics --- ---
var DiagnosticsAdapter = /** @class*/
(function () {
  function DiagnosticsAdapter(_languageId, _worker, defaults) {
    var _this = this;
    this._languageId = _languageId;
    this._worker = _worker;
    this._disposables = [];
    this._listener = Object.create(null);
    var onModelAdd = function (model) {
      var modeId = model.getModeId();
      if (modeId !== _this._languageId) {
        return;
      }
      var handle;
      _this._listener[model.uri.toString()] = model.onDidChangeContent(function () {
        clearTimeout(handle);
        handle = setTimeout(function () {
          return _this._doValidate(model.uri, modeId);
        }, 500);
      });
      _this._doValidate(model.uri, modeId);
    };
    var onModelRemoved = function (model) {
      _fillersMonacoEditorCoreJs.editor.setModelMarkers(model, _this._languageId, []);
      var uriStr = model.uri.toString();
      var listener = _this._listener[uriStr];
      if (listener) {
        listener.dispose();
        delete _this._listener[uriStr];
      }
    };
    this._disposables.push(_fillersMonacoEditorCoreJs.editor.onDidCreateModel(onModelAdd));
    this._disposables.push(_fillersMonacoEditorCoreJs.editor.onWillDisposeModel(function (model) {
      onModelRemoved(model);
      _this._resetSchema(model.uri);
    }));
    this._disposables.push(_fillersMonacoEditorCoreJs.editor.onDidChangeModelLanguage(function (event) {
      onModelRemoved(event.model);
      onModelAdd(event.model);
      _this._resetSchema(event.model.uri);
    }));
    this._disposables.push(defaults.onDidChange(function (_) {
      _fillersMonacoEditorCoreJs.editor.getModels().forEach(function (model) {
        if (model.getModeId() === _this._languageId) {
          onModelRemoved(model);
          onModelAdd(model);
        }
      });
    }));
    this._disposables.push({
      dispose: function () {
        _fillersMonacoEditorCoreJs.editor.getModels().forEach(onModelRemoved);
        for (var key in _this._listener) {
          _this._listener[key].dispose();
        }
      }
    });
    _fillersMonacoEditorCoreJs.editor.getModels().forEach(onModelAdd);
  }
  DiagnosticsAdapter.prototype.dispose = function () {
    this._disposables.forEach(function (d) {
      return d && d.dispose();
    });
    this._disposables = [];
  };
  DiagnosticsAdapter.prototype._resetSchema = function (resource) {
    this._worker().then(function (worker) {
      worker.resetSchema(resource.toString());
    });
  };
  DiagnosticsAdapter.prototype._doValidate = function (resource, languageId) {
    this._worker(resource).then(function (worker) {
      return worker.doValidation(resource.toString()).then(function (diagnostics) {
        var markers = diagnostics.map(function (d) {
          return toDiagnostics(resource, d);
        });
        var model = _fillersMonacoEditorCoreJs.editor.getModel(resource);
        if (model && model.getModeId() === languageId) {
          _fillersMonacoEditorCoreJs.editor.setModelMarkers(model, languageId, markers);
        }
      });
    }).then(undefined, function (err) {
      console.error(err);
    });
  };
  return DiagnosticsAdapter;
})();
function toSeverity(lsSeverity) {
  switch (lsSeverity) {
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.DiagnosticSeverity.Error:
      return _fillersMonacoEditorCoreJs.MarkerSeverity.Error;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.DiagnosticSeverity.Warning:
      return _fillersMonacoEditorCoreJs.MarkerSeverity.Warning;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.DiagnosticSeverity.Information:
      return _fillersMonacoEditorCoreJs.MarkerSeverity.Info;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.DiagnosticSeverity.Hint:
      return _fillersMonacoEditorCoreJs.MarkerSeverity.Hint;
    default:
      return _fillersMonacoEditorCoreJs.MarkerSeverity.Info;
  }
}
function toDiagnostics(resource, diag) {
  var code = typeof diag.code === 'number' ? String(diag.code) : diag.code;
  return {
    severity: toSeverity(diag.severity),
    startLineNumber: diag.range.start.line + 1,
    startColumn: diag.range.start.character + 1,
    endLineNumber: diag.range.end.line + 1,
    endColumn: diag.range.end.character + 1,
    message: diag.message,
    code: code,
    source: diag.source
  };
}
// --- completion ------
function fromPosition(position) {
  if (!position) {
    return void 0;
  }
  return {
    character: position.column - 1,
    line: position.lineNumber - 1
  };
}
function fromRange(range) {
  if (!range) {
    return void 0;
  }
  return {
    start: {
      line: range.startLineNumber - 1,
      character: range.startColumn - 1
    },
    end: {
      line: range.endLineNumber - 1,
      character: range.endColumn - 1
    }
  };
}
function toRange(range) {
  if (!range) {
    return void 0;
  }
  return new _fillersMonacoEditorCoreJs.Range(range.start.line + 1, range.start.character + 1, range.end.line + 1, range.end.character + 1);
}
function isInsertReplaceEdit(edit) {
  return typeof edit.insert !== 'undefined' && typeof edit.replace !== 'undefined';
}
function toCompletionItemKind(kind) {
  var mItemKind = _fillersMonacoEditorCoreJs.languages.CompletionItemKind;
  switch (kind) {
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Text:
      return mItemKind.Text;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Method:
      return mItemKind.Method;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Function:
      return mItemKind.Function;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Constructor:
      return mItemKind.Constructor;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Field:
      return mItemKind.Field;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Variable:
      return mItemKind.Variable;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Class:
      return mItemKind.Class;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Interface:
      return mItemKind.Interface;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Module:
      return mItemKind.Module;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Property:
      return mItemKind.Property;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Unit:
      return mItemKind.Unit;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Value:
      return mItemKind.Value;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Enum:
      return mItemKind.Enum;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Keyword:
      return mItemKind.Keyword;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Snippet:
      return mItemKind.Snippet;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Color:
      return mItemKind.Color;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.File:
      return mItemKind.File;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Reference:
      return mItemKind.Reference;
  }
  return mItemKind.Property;
}
function fromCompletionItemKind(kind) {
  var mItemKind = _fillersMonacoEditorCoreJs.languages.CompletionItemKind;
  switch (kind) {
    case mItemKind.Text:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Text;
    case mItemKind.Method:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Method;
    case mItemKind.Function:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Function;
    case mItemKind.Constructor:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Constructor;
    case mItemKind.Field:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Field;
    case mItemKind.Variable:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Variable;
    case mItemKind.Class:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Class;
    case mItemKind.Interface:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Interface;
    case mItemKind.Module:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Module;
    case mItemKind.Property:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Property;
    case mItemKind.Unit:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Unit;
    case mItemKind.Value:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Value;
    case mItemKind.Enum:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Enum;
    case mItemKind.Keyword:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Keyword;
    case mItemKind.Snippet:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Snippet;
    case mItemKind.Color:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Color;
    case mItemKind.File:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.File;
    case mItemKind.Reference:
      return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Reference;
  }
  return _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.CompletionItemKind.Property;
}
function toTextEdit(textEdit) {
  if (!textEdit) {
    return void 0;
  }
  return {
    range: toRange(textEdit.range),
    text: textEdit.newText
  };
}
var CompletionAdapter = /** @class*/
(function () {
  function CompletionAdapter(_worker) {
    this._worker = _worker;
  }
  Object.defineProperty(CompletionAdapter.prototype, "triggerCharacters", {
    get: function () {
      return [' ', ':'];
    },
    enumerable: false,
    configurable: true
  });
  CompletionAdapter.prototype.provideCompletionItems = function (model, position, context, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.doComplete(resource.toString(), fromPosition(position));
    }).then(function (info) {
      if (!info) {
        return;
      }
      var wordInfo = model.getWordUntilPosition(position);
      var wordRange = new _fillersMonacoEditorCoreJs.Range(position.lineNumber, wordInfo.startColumn, position.lineNumber, wordInfo.endColumn);
      var items = info.items.map(function (entry) {
        var item = {
          label: entry.label,
          insertText: entry.insertText || entry.label,
          sortText: entry.sortText,
          filterText: entry.filterText,
          documentation: entry.documentation,
          detail: entry.detail,
          range: wordRange,
          kind: toCompletionItemKind(entry.kind)
        };
        if (entry.textEdit) {
          if (isInsertReplaceEdit(entry.textEdit)) {
            item.range = {
              insert: toRange(entry.textEdit.insert),
              replace: toRange(entry.textEdit.replace)
            };
          } else {
            item.range = toRange(entry.textEdit.range);
          }
          item.insertText = entry.textEdit.newText;
        }
        if (entry.additionalTextEdits) {
          item.additionalTextEdits = entry.additionalTextEdits.map(toTextEdit);
        }
        if (entry.insertTextFormat === _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.InsertTextFormat.Snippet) {
          item.insertTextRules = _fillersMonacoEditorCoreJs.languages.CompletionItemInsertTextRule.InsertAsSnippet;
        }
        return item;
      });
      return {
        isIncomplete: info.isIncomplete,
        suggestions: items
      };
    });
  };
  return CompletionAdapter;
})();
function isMarkupContent(thing) {
  return thing && typeof thing === 'object' && typeof thing.kind === 'string';
}
function toMarkdownString(entry) {
  if (typeof entry === 'string') {
    return {
      value: entry
    };
  }
  if (isMarkupContent(entry)) {
    if (entry.kind === 'plaintext') {
      return {
        value: entry.value.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&')
      };
    }
    return {
      value: entry.value
    };
  }
  return {
    value: '```' + entry.language + '\n' + entry.value + '\n```\n'
  };
}
function toMarkedStringArray(contents) {
  if (!contents) {
    return void 0;
  }
  if (Array.isArray(contents)) {
    return contents.map(toMarkdownString);
  }
  return [toMarkdownString(contents)];
}
// --- hover ------
var HoverAdapter = /** @class*/
(function () {
  function HoverAdapter(_worker) {
    this._worker = _worker;
  }
  HoverAdapter.prototype.provideHover = function (model, position, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.doHover(resource.toString(), fromPosition(position));
    }).then(function (info) {
      if (!info) {
        return;
      }
      return {
        range: toRange(info.range),
        contents: toMarkedStringArray(info.contents)
      };
    });
  };
  return HoverAdapter;
})();
// --- definition ------
function toLocation(location) {
  return {
    uri: _fillersMonacoEditorCoreJs.Uri.parse(location.uri),
    range: toRange(location.range)
  };
}
// --- document symbols ------
function toSymbolKind(kind) {
  var mKind = _fillersMonacoEditorCoreJs.languages.SymbolKind;
  switch (kind) {
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.File:
      return mKind.Array;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Module:
      return mKind.Module;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Namespace:
      return mKind.Namespace;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Package:
      return mKind.Package;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Class:
      return mKind.Class;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Method:
      return mKind.Method;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Property:
      return mKind.Property;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Field:
      return mKind.Field;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Constructor:
      return mKind.Constructor;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Enum:
      return mKind.Enum;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Interface:
      return mKind.Interface;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Function:
      return mKind.Function;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Variable:
      return mKind.Variable;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Constant:
      return mKind.Constant;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.String:
      return mKind.String;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Number:
      return mKind.Number;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Boolean:
      return mKind.Boolean;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.SymbolKind.Array:
      return mKind.Array;
  }
  return mKind.Function;
}
var DocumentSymbolAdapter = /** @class*/
(function () {
  function DocumentSymbolAdapter(_worker) {
    this._worker = _worker;
  }
  DocumentSymbolAdapter.prototype.provideDocumentSymbols = function (model, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.findDocumentSymbols(resource.toString());
    }).then(function (items) {
      if (!items) {
        return;
      }
      return items.map(function (item) {
        return {
          name: item.name,
          detail: '',
          containerName: item.containerName,
          kind: toSymbolKind(item.kind),
          range: toRange(item.location.range),
          selectionRange: toRange(item.location.range),
          tags: []
        };
      });
    });
  };
  return DocumentSymbolAdapter;
})();
function fromFormattingOptions(options) {
  return {
    tabSize: options.tabSize,
    insertSpaces: options.insertSpaces
  };
}
var DocumentFormattingEditProvider = /** @class*/
(function () {
  function DocumentFormattingEditProvider(_worker) {
    this._worker = _worker;
  }
  DocumentFormattingEditProvider.prototype.provideDocumentFormattingEdits = function (model, options, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.format(resource.toString(), null, fromFormattingOptions(options)).then(function (edits) {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  };
  return DocumentFormattingEditProvider;
})();
var DocumentRangeFormattingEditProvider = /** @class*/
(function () {
  function DocumentRangeFormattingEditProvider(_worker) {
    this._worker = _worker;
  }
  DocumentRangeFormattingEditProvider.prototype.provideDocumentRangeFormattingEdits = function (model, range, options, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.format(resource.toString(), fromRange(range), fromFormattingOptions(options)).then(function (edits) {
        if (!edits || edits.length === 0) {
          return;
        }
        return edits.map(toTextEdit);
      });
    });
  };
  return DocumentRangeFormattingEditProvider;
})();
var DocumentColorAdapter = /** @class*/
(function () {
  function DocumentColorAdapter(_worker) {
    this._worker = _worker;
  }
  DocumentColorAdapter.prototype.provideDocumentColors = function (model, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.findDocumentColors(resource.toString());
    }).then(function (infos) {
      if (!infos) {
        return;
      }
      return infos.map(function (item) {
        return {
          color: item.color,
          range: toRange(item.range)
        };
      });
    });
  };
  DocumentColorAdapter.prototype.provideColorPresentations = function (model, info, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.getColorPresentations(resource.toString(), info.color, fromRange(info.range));
    }).then(function (presentations) {
      if (!presentations) {
        return;
      }
      return presentations.map(function (presentation) {
        var item = {
          label: presentation.label
        };
        if (presentation.textEdit) {
          item.textEdit = toTextEdit(presentation.textEdit);
        }
        if (presentation.additionalTextEdits) {
          item.additionalTextEdits = presentation.additionalTextEdits.map(toTextEdit);
        }
        return item;
      });
    });
  };
  return DocumentColorAdapter;
})();
var FoldingRangeAdapter = /** @class*/
(function () {
  function FoldingRangeAdapter(_worker) {
    this._worker = _worker;
  }
  FoldingRangeAdapter.prototype.provideFoldingRanges = function (model, context, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.getFoldingRanges(resource.toString(), context);
    }).then(function (ranges) {
      if (!ranges) {
        return;
      }
      return ranges.map(function (range) {
        var result = {
          start: range.startLine + 1,
          end: range.endLine + 1
        };
        if (typeof range.kind !== 'undefined') {
          result.kind = toFoldingRangeKind(range.kind);
        }
        return result;
      });
    });
  };
  return FoldingRangeAdapter;
})();
function toFoldingRangeKind(kind) {
  switch (kind) {
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.FoldingRangeKind.Comment:
      return _fillersMonacoEditorCoreJs.languages.FoldingRangeKind.Comment;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.FoldingRangeKind.Imports:
      return _fillersMonacoEditorCoreJs.languages.FoldingRangeKind.Imports;
    case _depsVscodeJsonLanguageserviceJsonLanguageServiceJs.FoldingRangeKind.Region:
      return _fillersMonacoEditorCoreJs.languages.FoldingRangeKind.Region;
  }
  return void 0;
}
var SelectionRangeAdapter = /** @class*/
(function () {
  function SelectionRangeAdapter(_worker) {
    this._worker = _worker;
  }
  SelectionRangeAdapter.prototype.provideSelectionRanges = function (model, positions, token) {
    var resource = model.uri;
    return this._worker(resource).then(function (worker) {
      return worker.getSelectionRanges(resource.toString(), positions.map(fromPosition));
    }).then(function (selectionRanges) {
      if (!selectionRanges) {
        return;
      }
      return selectionRanges.map(function (selectionRange) {
        var result = [];
        while (selectionRange) {
          result.push({
            range: toRange(selectionRange.range)
          });
          selectionRange = selectionRange.parent;
        }
        return result;
      });
    });
  };
  return SelectionRangeAdapter;
})();

},{"./fillers/monaco-editor-core.js":"3sODp","./_deps/vscode-json-languageservice/jsonLanguageService.js":"2jATe","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2jATe":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getLanguageService", function () {
  return getLanguageService;
});
var _servicesJsonCompletionJs = require('./services/jsonCompletion.js');
var _servicesJsonHoverJs = require('./services/jsonHover.js');
var _servicesJsonValidationJs = require('./services/jsonValidation.js');
var _servicesJsonDocumentSymbolsJs = require('./services/jsonDocumentSymbols.js');
var _parserJsonParserJs = require('./parser/jsonParser.js');
var _servicesConfigurationJs = require('./services/configuration.js');
var _servicesJsonSchemaServiceJs = require('./services/jsonSchemaService.js');
var _servicesJsonFoldingJs = require('./services/jsonFolding.js');
var _servicesJsonSelectionRangesJs = require('./services/jsonSelectionRanges.js');
var _jsoncParserMainJs = require('./../jsonc-parser/main.js');
var _jsonLanguageTypesJs = require('./jsonLanguageTypes.js');
var _servicesJsonLinksJs = require('./services/jsonLinks.js');
_parcelHelpers.exportAll(_jsonLanguageTypesJs, exports);
function getLanguageService(params) {
  var promise = params.promiseConstructor || Promise;
  var jsonSchemaService = new _servicesJsonSchemaServiceJs.JSONSchemaService(params.schemaRequestService, params.workspaceContext, promise);
  jsonSchemaService.setSchemaContributions(_servicesConfigurationJs.schemaContributions);
  var jsonCompletion = new _servicesJsonCompletionJs.JSONCompletion(jsonSchemaService, params.contributions, promise, params.clientCapabilities);
  var jsonHover = new _servicesJsonHoverJs.JSONHover(jsonSchemaService, params.contributions, promise);
  var jsonDocumentSymbols = new _servicesJsonDocumentSymbolsJs.JSONDocumentSymbols(jsonSchemaService);
  var jsonValidation = new _servicesJsonValidationJs.JSONValidation(jsonSchemaService, promise);
  return {
    configure: function (settings) {
      jsonSchemaService.clearExternalSchemas();
      if (settings.schemas) {
        settings.schemas.forEach(function (settings) {
          jsonSchemaService.registerExternalSchema(settings.uri, settings.fileMatch, settings.schema);
        });
      }
      jsonValidation.configure(settings);
    },
    resetSchema: function (uri) {
      return jsonSchemaService.onResourceChange(uri);
    },
    doValidation: jsonValidation.doValidation.bind(jsonValidation),
    parseJSONDocument: function (document) {
      return _parserJsonParserJs.parse(document, {
        collectComments: true
      });
    },
    newJSONDocument: function (root, diagnostics) {
      return _parserJsonParserJs.newJSONDocument(root, diagnostics);
    },
    getMatchingSchemas: jsonSchemaService.getMatchingSchemas.bind(jsonSchemaService),
    doResolve: jsonCompletion.doResolve.bind(jsonCompletion),
    doComplete: jsonCompletion.doComplete.bind(jsonCompletion),
    findDocumentSymbols: jsonDocumentSymbols.findDocumentSymbols.bind(jsonDocumentSymbols),
    findDocumentSymbols2: jsonDocumentSymbols.findDocumentSymbols2.bind(jsonDocumentSymbols),
    findDocumentColors: jsonDocumentSymbols.findDocumentColors.bind(jsonDocumentSymbols),
    getColorPresentations: jsonDocumentSymbols.getColorPresentations.bind(jsonDocumentSymbols),
    doHover: jsonHover.doHover.bind(jsonHover),
    getFoldingRanges: _servicesJsonFoldingJs.getFoldingRanges,
    getSelectionRanges: _servicesJsonSelectionRangesJs.getSelectionRanges,
    findDefinition: function () {
      return Promise.resolve([]);
    },
    findLinks: _servicesJsonLinksJs.findLinks,
    format: function (d, r, o) {
      var range = undefined;
      if (r) {
        var offset = d.offsetAt(r.start);
        var length = d.offsetAt(r.end) - offset;
        range = {
          offset: offset,
          length: length
        };
      }
      var options = {
        tabSize: o ? o.tabSize : 4,
        insertSpaces: (o === null || o === void 0 ? void 0 : o.insertSpaces) === true,
        insertFinalNewline: (o === null || o === void 0 ? void 0 : o.insertFinalNewline) === true,
        eol: '\n'
      };
      return _jsoncParserMainJs.format(d.getText(), range, options).map(function (e) {
        return _jsonLanguageTypesJs.TextEdit.replace(_jsonLanguageTypesJs.Range.create(d.positionAt(e.offset), d.positionAt(e.offset + e.length)), e.content);
      });
    }
  };
}

},{"./services/jsonCompletion.js":"7J9Ft","./services/jsonHover.js":"4l1dL","./services/jsonValidation.js":"hqhIh","./services/jsonDocumentSymbols.js":"5IMVL","./parser/jsonParser.js":"23R5j","./services/configuration.js":"7rBEC","./services/jsonSchemaService.js":"XsrrN","./services/jsonFolding.js":"3b11d","./services/jsonSelectionRanges.js":"4dXTR","./../jsonc-parser/main.js":"7Foak","./jsonLanguageTypes.js":"7JR1I","./services/jsonLinks.js":"6LZ1w","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7J9Ft":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "JSONCompletion", function () {
  return JSONCompletion;
});
var _parserJsonParserJs = require('../parser/jsonParser.js');
var _jsoncParserMainJs = require('./../../jsonc-parser/main.js');
var _utilsJsonJs = require('../utils/json.js');
var _utilsStringsJs = require('../utils/strings.js');
var _utilsObjectsJs = require('../utils/objects.js');
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
var _fillersVscodeNlsJs = require('./../../../fillers/vscode-nls.js');
var localize = _fillersVscodeNlsJs.loadMessageBundle();
var valueCommitCharacters = [',', '}', ']'];
var propertyCommitCharacters = [':'];
var JSONCompletion = /** @class*/
(function () {
  function JSONCompletion(schemaService, contributions, promiseConstructor, clientCapabilities) {
    if (contributions === void 0) {
      contributions = [];
    }
    if (promiseConstructor === void 0) {
      promiseConstructor = Promise;
    }
    if (clientCapabilities === void 0) {
      clientCapabilities = {};
    }
    this.schemaService = schemaService;
    this.contributions = contributions;
    this.promiseConstructor = promiseConstructor;
    this.clientCapabilities = clientCapabilities;
  }
  JSONCompletion.prototype.doResolve = function (item) {
    for (var i = this.contributions.length - 1; i >= 0; i--) {
      var resolveCompletion = this.contributions[i].resolveCompletion;
      if (resolveCompletion) {
        var resolver = resolveCompletion(item);
        if (resolver) {
          return resolver;
        }
      }
    }
    return this.promiseConstructor.resolve(item);
  };
  JSONCompletion.prototype.doComplete = function (document, position, doc) {
    var _this = this;
    var result = {
      items: [],
      isIncomplete: false
    };
    var text = document.getText();
    var offset = document.offsetAt(position);
    var node = doc.getNodeFromOffset(offset, true);
    if (this.isInComment(document, node ? node.offset : 0, offset)) {
      return Promise.resolve(result);
    }
    if (node && offset === node.offset + node.length && offset > 0) {
      var ch = text[offset - 1];
      if (node.type === 'object' && ch === '}' || node.type === 'array' && ch === ']') {
        // after ] or }
        node = node.parent;
      }
    }
    var currentWord = this.getCurrentWord(document, offset);
    var overwriteRange;
    if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
      overwriteRange = _jsonLanguageTypesJs.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
    } else {
      var overwriteStart = offset - currentWord.length;
      if (overwriteStart > 0 && text[overwriteStart - 1] === '"') {
        overwriteStart--;
      }
      overwriteRange = _jsonLanguageTypesJs.Range.create(document.positionAt(overwriteStart), position);
    }
    var supportsCommitCharacters = false;
    // this.doesSupportsCommitCharacters(); disabled for now, waiting for new API: https://github.com/microsoft/vscode/issues/42544
    var proposed = {};
    var collector = {
      add: function (suggestion) {
        var label = suggestion.label;
        var existing = proposed[label];
        if (!existing) {
          label = label.replace(/[\n]/g, '↵');
          if (label.length > 60) {
            var shortendedLabel = label.substr(0, 57).trim() + '...';
            if (!proposed[shortendedLabel]) {
              label = shortendedLabel;
            }
          }
          if (overwriteRange && suggestion.insertText !== undefined) {
            suggestion.textEdit = _jsonLanguageTypesJs.TextEdit.replace(overwriteRange, suggestion.insertText);
          }
          if (supportsCommitCharacters) {
            suggestion.commitCharacters = suggestion.kind === _jsonLanguageTypesJs.CompletionItemKind.Property ? propertyCommitCharacters : valueCommitCharacters;
          }
          suggestion.label = label;
          proposed[label] = suggestion;
          result.items.push(suggestion);
        } else {
          if (!existing.documentation) {
            existing.documentation = suggestion.documentation;
          }
          if (!existing.detail) {
            existing.detail = suggestion.detail;
          }
        }
      },
      setAsIncomplete: function () {
        result.isIncomplete = true;
      },
      error: function (message) {
        console.error(message);
      },
      log: function (message) {
        console.log(message);
      },
      getNumberOfProposals: function () {
        return result.items.length;
      }
    };
    return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
      var collectionPromises = [];
      var addValue = true;
      var currentKey = '';
      var currentProperty = undefined;
      if (node) {
        if (node.type === 'string') {
          var parent = node.parent;
          if (parent && parent.type === 'property' && parent.keyNode === node) {
            addValue = !parent.valueNode;
            currentProperty = parent;
            currentKey = text.substr(node.offset + 1, node.length - 2);
            if (parent) {
              node = parent.parent;
            }
          }
        }
      }
      // proposals for properties
      if (node && node.type === 'object') {
        // don't suggest keys when the cursor is just before the opening curly brace
        if (node.offset === offset) {
          return result;
        }
        // don't suggest properties that are already present
        var properties = node.properties;
        properties.forEach(function (p) {
          if (!currentProperty || currentProperty !== p) {
            proposed[p.keyNode.value] = _jsonLanguageTypesJs.CompletionItem.create('__');
          }
        });
        var separatorAfter_1 = '';
        if (addValue) {
          separatorAfter_1 = _this.evaluateSeparatorAfter(document, document.offsetAt(overwriteRange.end));
        }
        if (schema) {
          // property proposals with schema
          _this.getPropertyCompletions(schema, doc, node, addValue, separatorAfter_1, collector);
        } else {
          // property proposals without schema
          _this.getSchemaLessPropertyCompletions(doc, node, currentKey, collector);
        }
        var location_1 = _parserJsonParserJs.getNodePath(node);
        _this.contributions.forEach(function (contribution) {
          var collectPromise = contribution.collectPropertyCompletions(document.uri, location_1, currentWord, addValue, separatorAfter_1 === '', collector);
          if (collectPromise) {
            collectionPromises.push(collectPromise);
          }
        });
        if (!schema && currentWord.length > 0 && text.charAt(offset - currentWord.length - 1) !== '"') {
          collector.add({
            kind: _jsonLanguageTypesJs.CompletionItemKind.Property,
            label: _this.getLabelForValue(currentWord),
            insertText: _this.getInsertTextForProperty(currentWord, undefined, false, separatorAfter_1),
            insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
            documentation: ''
          });
          collector.setAsIncomplete();
        }
      }
      // proposals for values
      var types = {};
      if (schema) {
        // value proposals with schema
        _this.getValueCompletions(schema, doc, node, offset, document, collector, types);
      } else {
        // value proposals without schema
        _this.getSchemaLessValueCompletions(doc, node, offset, document, collector);
      }
      if (_this.contributions.length > 0) {
        _this.getContributedValueCompletions(doc, node, offset, document, collector, collectionPromises);
      }
      return _this.promiseConstructor.all(collectionPromises).then(function () {
        if (collector.getNumberOfProposals() === 0) {
          var offsetForSeparator = offset;
          if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
            offsetForSeparator = node.offset + node.length;
          }
          var separatorAfter = _this.evaluateSeparatorAfter(document, offsetForSeparator);
          _this.addFillerValueCompletions(types, separatorAfter, collector);
        }
        return result;
      });
    });
  };
  JSONCompletion.prototype.getPropertyCompletions = function (schema, doc, node, addValue, separatorAfter, collector) {
    var _this = this;
    var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
    matchingSchemas.forEach(function (s) {
      if (s.node === node && !s.inverted) {
        var schemaProperties_1 = s.schema.properties;
        if (schemaProperties_1) {
          Object.keys(schemaProperties_1).forEach(function (key) {
            var propertySchema = schemaProperties_1[key];
            if (typeof propertySchema === 'object' && !propertySchema.deprecationMessage && !propertySchema.doNotSuggest) {
              var proposal = {
                kind: _jsonLanguageTypesJs.CompletionItemKind.Property,
                label: key,
                insertText: _this.getInsertTextForProperty(key, propertySchema, addValue, separatorAfter),
                insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
                filterText: _this.getFilterTextForValue(key),
                documentation: _this.fromMarkup(propertySchema.markdownDescription) || propertySchema.description || ''
              };
              if (propertySchema.suggestSortText !== undefined) {
                proposal.sortText = propertySchema.suggestSortText;
              }
              if (proposal.insertText && _utilsStringsJs.endsWith(proposal.insertText, "$1" + separatorAfter)) {
                proposal.command = {
                  title: 'Suggest',
                  command: 'editor.action.triggerSuggest'
                };
              }
              collector.add(proposal);
            }
          });
        }
        var schemaPropertyNames_1 = s.schema.propertyNames;
        if (typeof schemaPropertyNames_1 === 'object' && !schemaPropertyNames_1.deprecationMessage && !schemaPropertyNames_1.doNotSuggest) {
          var propertyNameCompletionItem = function (name, enumDescription) {
            if (enumDescription === void 0) {
              enumDescription = undefined;
            }
            var proposal = {
              kind: _jsonLanguageTypesJs.CompletionItemKind.Property,
              label: name,
              insertText: _this.getInsertTextForProperty(name, undefined, addValue, separatorAfter),
              insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
              filterText: _this.getFilterTextForValue(name),
              documentation: enumDescription || _this.fromMarkup(schemaPropertyNames_1.markdownDescription) || schemaPropertyNames_1.description || ''
            };
            if (schemaPropertyNames_1.suggestSortText !== undefined) {
              proposal.sortText = schemaPropertyNames_1.suggestSortText;
            }
            if (proposal.insertText && _utilsStringsJs.endsWith(proposal.insertText, "$1" + separatorAfter)) {
              proposal.command = {
                title: 'Suggest',
                command: 'editor.action.triggerSuggest'
              };
            }
            collector.add(proposal);
          };
          if (schemaPropertyNames_1.enum) {
            for (var i = 0; i < schemaPropertyNames_1.enum.length; i++) {
              var enumDescription = undefined;
              if (schemaPropertyNames_1.markdownEnumDescriptions && i < schemaPropertyNames_1.markdownEnumDescriptions.length) {
                enumDescription = _this.fromMarkup(schemaPropertyNames_1.markdownEnumDescriptions[i]);
              } else if (schemaPropertyNames_1.enumDescriptions && i < schemaPropertyNames_1.enumDescriptions.length) {
                enumDescription = schemaPropertyNames_1.enumDescriptions[i];
              }
              propertyNameCompletionItem(schemaPropertyNames_1.enum[i], enumDescription);
            }
          }
          if (schemaPropertyNames_1.const) {
            propertyNameCompletionItem(schemaPropertyNames_1.const);
          }
        }
      }
    });
  };
  JSONCompletion.prototype.getSchemaLessPropertyCompletions = function (doc, node, currentKey, collector) {
    var _this = this;
    var collectCompletionsForSimilarObject = function (obj) {
      obj.properties.forEach(function (p) {
        var key = p.keyNode.value;
        collector.add({
          kind: _jsonLanguageTypesJs.CompletionItemKind.Property,
          label: key,
          insertText: _this.getInsertTextForValue(key, ''),
          insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
          filterText: _this.getFilterTextForValue(key),
          documentation: ''
        });
      });
    };
    if (node.parent) {
      if (node.parent.type === 'property') {
        // if the object is a property value, check the tree for other objects that hang under a property of the same name
        var parentKey_1 = node.parent.keyNode.value;
        doc.visit(function (n) {
          if (n.type === 'property' && n !== node.parent && n.keyNode.value === parentKey_1 && n.valueNode && n.valueNode.type === 'object') {
            collectCompletionsForSimilarObject(n.valueNode);
          }
          return true;
        });
      } else if (node.parent.type === 'array') {
        // if the object is in an array, use all other array elements as similar objects
        node.parent.items.forEach(function (n) {
          if (n.type === 'object' && n !== node) {
            collectCompletionsForSimilarObject(n);
          }
        });
      }
    } else if (node.type === 'object') {
      collector.add({
        kind: _jsonLanguageTypesJs.CompletionItemKind.Property,
        label: '$schema',
        insertText: this.getInsertTextForProperty('$schema', undefined, true, ''),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        documentation: '',
        filterText: this.getFilterTextForValue("$schema")
      });
    }
  };
  JSONCompletion.prototype.getSchemaLessValueCompletions = function (doc, node, offset, document, collector) {
    var _this = this;
    var offsetForSeparator = offset;
    if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
      offsetForSeparator = node.offset + node.length;
      node = node.parent;
    }
    if (!node) {
      collector.add({
        kind: this.getSuggestionKind('object'),
        label: 'Empty object',
        insertText: this.getInsertTextForValue({}, ''),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        documentation: ''
      });
      collector.add({
        kind: this.getSuggestionKind('array'),
        label: 'Empty array',
        insertText: this.getInsertTextForValue([], ''),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        documentation: ''
      });
      return;
    }
    var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
    var collectSuggestionsForValues = function (value) {
      if (value.parent && !_parserJsonParserJs.contains(value.parent, offset, true)) {
        collector.add({
          kind: _this.getSuggestionKind(value.type),
          label: _this.getLabelTextForMatchingNode(value, document),
          insertText: _this.getInsertTextForMatchingNode(value, document, separatorAfter),
          insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
          documentation: ''
        });
      }
      if (value.type === 'boolean') {
        _this.addBooleanValueCompletion(!value.value, separatorAfter, collector);
      }
    };
    if (node.type === 'property') {
      if (offset > (node.colonOffset || 0)) {
        var valueNode = node.valueNode;
        if (valueNode && (offset > valueNode.offset + valueNode.length || valueNode.type === 'object' || valueNode.type === 'array')) {
          return;
        }
        // suggest values at the same key
        var parentKey_2 = node.keyNode.value;
        doc.visit(function (n) {
          if (n.type === 'property' && n.keyNode.value === parentKey_2 && n.valueNode) {
            collectSuggestionsForValues(n.valueNode);
          }
          return true;
        });
        if (parentKey_2 === '$schema' && node.parent && !node.parent.parent) {
          this.addDollarSchemaCompletions(separatorAfter, collector);
        }
      }
    }
    if (node.type === 'array') {
      if (node.parent && node.parent.type === 'property') {
        // suggest items of an array at the same key
        var parentKey_3 = node.parent.keyNode.value;
        doc.visit(function (n) {
          if (n.type === 'property' && n.keyNode.value === parentKey_3 && n.valueNode && n.valueNode.type === 'array') {
            n.valueNode.items.forEach(collectSuggestionsForValues);
          }
          return true;
        });
      } else {
        // suggest items in the same array
        node.items.forEach(collectSuggestionsForValues);
      }
    }
  };
  JSONCompletion.prototype.getValueCompletions = function (schema, doc, node, offset, document, collector, types) {
    var offsetForSeparator = offset;
    var parentKey = undefined;
    var valueNode = undefined;
    if (node && (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null')) {
      offsetForSeparator = node.offset + node.length;
      valueNode = node;
      node = node.parent;
    }
    if (!node) {
      this.addSchemaValueCompletions(schema.schema, '', collector, types);
      return;
    }
    if (node.type === 'property' && offset > (node.colonOffset || 0)) {
      var valueNode_1 = node.valueNode;
      if (valueNode_1 && offset > valueNode_1.offset + valueNode_1.length) {
        return;
      }
      parentKey = node.keyNode.value;
      node = node.parent;
    }
    if (node && (parentKey !== undefined || node.type === 'array')) {
      var separatorAfter = this.evaluateSeparatorAfter(document, offsetForSeparator);
      var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset, valueNode);
      for (var _i = 0, matchingSchemas_1 = matchingSchemas; _i < matchingSchemas_1.length; _i++) {
        var s = matchingSchemas_1[_i];
        if (s.node === node && !s.inverted && s.schema) {
          if (node.type === 'array' && s.schema.items) {
            if (Array.isArray(s.schema.items)) {
              var index = this.findItemAtOffset(node, document, offset);
              if (index < s.schema.items.length) {
                this.addSchemaValueCompletions(s.schema.items[index], separatorAfter, collector, types);
              }
            } else {
              this.addSchemaValueCompletions(s.schema.items, separatorAfter, collector, types);
            }
          }
          if (parentKey !== undefined) {
            var propertyMatched = false;
            if (s.schema.properties) {
              var propertySchema = s.schema.properties[parentKey];
              if (propertySchema) {
                propertyMatched = true;
                this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
              }
            }
            if (s.schema.patternProperties && !propertyMatched) {
              for (var _a = 0, _b = Object.keys(s.schema.patternProperties); _a < _b.length; _a++) {
                var pattern = _b[_a];
                var regex = new RegExp(pattern);
                if (regex.test(parentKey)) {
                  propertyMatched = true;
                  var propertySchema = s.schema.patternProperties[pattern];
                  this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
                }
              }
            }
            if (s.schema.additionalProperties && !propertyMatched) {
              var propertySchema = s.schema.additionalProperties;
              this.addSchemaValueCompletions(propertySchema, separatorAfter, collector, types);
            }
          }
        }
      }
      if (parentKey === '$schema' && !node.parent) {
        this.addDollarSchemaCompletions(separatorAfter, collector);
      }
      if (types['boolean']) {
        this.addBooleanValueCompletion(true, separatorAfter, collector);
        this.addBooleanValueCompletion(false, separatorAfter, collector);
      }
      if (types['null']) {
        this.addNullValueCompletion(separatorAfter, collector);
      }
    }
  };
  JSONCompletion.prototype.getContributedValueCompletions = function (doc, node, offset, document, collector, collectionPromises) {
    if (!node) {
      this.contributions.forEach(function (contribution) {
        var collectPromise = contribution.collectDefaultCompletions(document.uri, collector);
        if (collectPromise) {
          collectionPromises.push(collectPromise);
        }
      });
    } else {
      if (node.type === 'string' || node.type === 'number' || node.type === 'boolean' || node.type === 'null') {
        node = node.parent;
      }
      if (node && node.type === 'property' && offset > (node.colonOffset || 0)) {
        var parentKey_4 = node.keyNode.value;
        var valueNode = node.valueNode;
        if ((!valueNode || offset <= valueNode.offset + valueNode.length) && node.parent) {
          var location_2 = _parserJsonParserJs.getNodePath(node.parent);
          this.contributions.forEach(function (contribution) {
            var collectPromise = contribution.collectValueCompletions(document.uri, location_2, parentKey_4, collector);
            if (collectPromise) {
              collectionPromises.push(collectPromise);
            }
          });
        }
      }
    }
  };
  JSONCompletion.prototype.addSchemaValueCompletions = function (schema, separatorAfter, collector, types) {
    var _this = this;
    if (typeof schema === 'object') {
      this.addEnumValueCompletions(schema, separatorAfter, collector);
      this.addDefaultValueCompletions(schema, separatorAfter, collector);
      this.collectTypes(schema, types);
      if (Array.isArray(schema.allOf)) {
        schema.allOf.forEach(function (s) {
          return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
        });
      }
      if (Array.isArray(schema.anyOf)) {
        schema.anyOf.forEach(function (s) {
          return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
        });
      }
      if (Array.isArray(schema.oneOf)) {
        schema.oneOf.forEach(function (s) {
          return _this.addSchemaValueCompletions(s, separatorAfter, collector, types);
        });
      }
    }
  };
  JSONCompletion.prototype.addDefaultValueCompletions = function (schema, separatorAfter, collector, arrayDepth) {
    var _this = this;
    if (arrayDepth === void 0) {
      arrayDepth = 0;
    }
    var hasProposals = false;
    if (_utilsObjectsJs.isDefined(schema.default)) {
      var type = schema.type;
      var value = schema.default;
      for (var i = arrayDepth; i > 0; i--) {
        value = [value];
        type = 'array';
      }
      collector.add({
        kind: this.getSuggestionKind(type),
        label: this.getLabelForValue(value),
        insertText: this.getInsertTextForValue(value, separatorAfter),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        detail: localize('json.suggest.default', 'Default value')
      });
      hasProposals = true;
    }
    if (Array.isArray(schema.examples)) {
      schema.examples.forEach(function (example) {
        var type = schema.type;
        var value = example;
        for (var i = arrayDepth; i > 0; i--) {
          value = [value];
          type = 'array';
        }
        collector.add({
          kind: _this.getSuggestionKind(type),
          label: _this.getLabelForValue(value),
          insertText: _this.getInsertTextForValue(value, separatorAfter),
          insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet
        });
        hasProposals = true;
      });
    }
    if (Array.isArray(schema.defaultSnippets)) {
      schema.defaultSnippets.forEach(function (s) {
        var type = schema.type;
        var value = s.body;
        var label = s.label;
        var insertText;
        var filterText;
        if (_utilsObjectsJs.isDefined(value)) {
          var type_1 = schema.type;
          for (var i = arrayDepth; i > 0; i--) {
            value = [value];
            type_1 = 'array';
          }
          insertText = _this.getInsertTextForSnippetValue(value, separatorAfter);
          filterText = _this.getFilterTextForSnippetValue(value);
          label = label || _this.getLabelForSnippetValue(value);
        } else if (typeof s.bodyText === 'string') {
          var prefix = '', suffix = '', indent = '';
          for (var i = arrayDepth; i > 0; i--) {
            prefix = prefix + indent + '[\n';
            suffix = suffix + '\n' + indent + ']';
            indent += '\t';
            type = 'array';
          }
          insertText = prefix + indent + s.bodyText.split('\n').join('\n' + indent) + suffix + separatorAfter;
          (label = label || insertText, filterText = insertText.replace(/[\n]/g, ''));
        } else {
          return;
        }
        collector.add({
          kind: _this.getSuggestionKind(type),
          label: label,
          documentation: _this.fromMarkup(s.markdownDescription) || s.description,
          insertText: insertText,
          insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
          filterText: filterText
        });
        hasProposals = true;
      });
    }
    if (!hasProposals && typeof schema.items === 'object' && !Array.isArray(schema.items) && arrayDepth < 5) /*beware of recursion*/
    {
      this.addDefaultValueCompletions(schema.items, separatorAfter, collector, arrayDepth + 1);
    }
  };
  JSONCompletion.prototype.addEnumValueCompletions = function (schema, separatorAfter, collector) {
    if (_utilsObjectsJs.isDefined(schema.const)) {
      collector.add({
        kind: this.getSuggestionKind(schema.type),
        label: this.getLabelForValue(schema.const),
        insertText: this.getInsertTextForValue(schema.const, separatorAfter),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        documentation: this.fromMarkup(schema.markdownDescription) || schema.description
      });
    }
    if (Array.isArray(schema.enum)) {
      for (var i = 0, length = schema.enum.length; i < length; i++) {
        var enm = schema.enum[i];
        var documentation = this.fromMarkup(schema.markdownDescription) || schema.description;
        if (schema.markdownEnumDescriptions && i < schema.markdownEnumDescriptions.length && this.doesSupportMarkdown()) {
          documentation = this.fromMarkup(schema.markdownEnumDescriptions[i]);
        } else if (schema.enumDescriptions && i < schema.enumDescriptions.length) {
          documentation = schema.enumDescriptions[i];
        }
        collector.add({
          kind: this.getSuggestionKind(schema.type),
          label: this.getLabelForValue(enm),
          insertText: this.getInsertTextForValue(enm, separatorAfter),
          insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
          documentation: documentation
        });
      }
    }
  };
  JSONCompletion.prototype.collectTypes = function (schema, types) {
    if (Array.isArray(schema.enum) || _utilsObjectsJs.isDefined(schema.const)) {
      return;
    }
    var type = schema.type;
    if (Array.isArray(type)) {
      type.forEach(function (t) {
        return types[t] = true;
      });
    } else if (type) {
      types[type] = true;
    }
  };
  JSONCompletion.prototype.addFillerValueCompletions = function (types, separatorAfter, collector) {
    if (types['object']) {
      collector.add({
        kind: this.getSuggestionKind('object'),
        label: '{}',
        insertText: this.getInsertTextForGuessedValue({}, separatorAfter),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        detail: localize('defaults.object', 'New object'),
        documentation: ''
      });
    }
    if (types['array']) {
      collector.add({
        kind: this.getSuggestionKind('array'),
        label: '[]',
        insertText: this.getInsertTextForGuessedValue([], separatorAfter),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        detail: localize('defaults.array', 'New array'),
        documentation: ''
      });
    }
  };
  JSONCompletion.prototype.addBooleanValueCompletion = function (value, separatorAfter, collector) {
    collector.add({
      kind: this.getSuggestionKind('boolean'),
      label: value ? 'true' : 'false',
      insertText: this.getInsertTextForValue(value, separatorAfter),
      insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
      documentation: ''
    });
  };
  JSONCompletion.prototype.addNullValueCompletion = function (separatorAfter, collector) {
    collector.add({
      kind: this.getSuggestionKind('null'),
      label: 'null',
      insertText: 'null' + separatorAfter,
      insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
      documentation: ''
    });
  };
  JSONCompletion.prototype.addDollarSchemaCompletions = function (separatorAfter, collector) {
    var _this = this;
    var schemaIds = this.schemaService.getRegisteredSchemaIds(function (schema) {
      return schema === 'http' || schema === 'https';
    });
    schemaIds.forEach(function (schemaId) {
      return collector.add({
        kind: _jsonLanguageTypesJs.CompletionItemKind.Module,
        label: _this.getLabelForValue(schemaId),
        filterText: _this.getFilterTextForValue(schemaId),
        insertText: _this.getInsertTextForValue(schemaId, separatorAfter),
        insertTextFormat: _jsonLanguageTypesJs.InsertTextFormat.Snippet,
        documentation: ''
      });
    });
  };
  JSONCompletion.prototype.getLabelForValue = function (value) {
    return JSON.stringify(value);
  };
  JSONCompletion.prototype.getFilterTextForValue = function (value) {
    return JSON.stringify(value);
  };
  JSONCompletion.prototype.getFilterTextForSnippetValue = function (value) {
    return JSON.stringify(value).replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
  };
  JSONCompletion.prototype.getLabelForSnippetValue = function (value) {
    var label = JSON.stringify(value);
    return label.replace(/\$\{\d+:([^}]+)\}|\$\d+/g, '$1');
  };
  JSONCompletion.prototype.getInsertTextForPlainText = function (text) {
    return text.replace(/[\\\$\}]/g, '\\$&');
  };
  JSONCompletion.prototype.getInsertTextForValue = function (value, separatorAfter) {
    var text = JSON.stringify(value, null, '\t');
    if (text === '{}') {
      return '{$1}' + separatorAfter;
    } else if (text === '[]') {
      return '[$1]' + separatorAfter;
    }
    return this.getInsertTextForPlainText(text + separatorAfter);
  };
  JSONCompletion.prototype.getInsertTextForSnippetValue = function (value, separatorAfter) {
    var replacer = function (value) {
      if (typeof value === 'string') {
        if (value[0] === '^') {
          return value.substr(1);
        }
      }
      return JSON.stringify(value);
    };
    return _utilsJsonJs.stringifyObject(value, '', replacer) + separatorAfter;
  };
  JSONCompletion.prototype.getInsertTextForGuessedValue = function (value, separatorAfter) {
    switch (typeof value) {
      case 'object':
        if (value === null) {
          return '${1:null}' + separatorAfter;
        }
        return this.getInsertTextForValue(value, separatorAfter);
      case 'string':
        var snippetValue = JSON.stringify(value);
        snippetValue = snippetValue.substr(1, snippetValue.length - 2);
        // remove quotes
        snippetValue = this.getInsertTextForPlainText(snippetValue);
        // escape \ and }
        return '"${1:' + snippetValue + '}"' + separatorAfter;
      case 'number':
      case 'boolean':
        return '${1:' + JSON.stringify(value) + '}' + separatorAfter;
    }
    return this.getInsertTextForValue(value, separatorAfter);
  };
  JSONCompletion.prototype.getSuggestionKind = function (type) {
    if (Array.isArray(type)) {
      var array = type;
      type = array.length > 0 ? array[0] : undefined;
    }
    if (!type) {
      return _jsonLanguageTypesJs.CompletionItemKind.Value;
    }
    switch (type) {
      case 'string':
        return _jsonLanguageTypesJs.CompletionItemKind.Value;
      case 'object':
        return _jsonLanguageTypesJs.CompletionItemKind.Module;
      case 'property':
        return _jsonLanguageTypesJs.CompletionItemKind.Property;
      default:
        return _jsonLanguageTypesJs.CompletionItemKind.Value;
    }
  };
  JSONCompletion.prototype.getLabelTextForMatchingNode = function (node, document) {
    switch (node.type) {
      case 'array':
        return '[]';
      case 'object':
        return '{}';
      default:
        var content = document.getText().substr(node.offset, node.length);
        return content;
    }
  };
  JSONCompletion.prototype.getInsertTextForMatchingNode = function (node, document, separatorAfter) {
    switch (node.type) {
      case 'array':
        return this.getInsertTextForValue([], separatorAfter);
      case 'object':
        return this.getInsertTextForValue({}, separatorAfter);
      default:
        var content = document.getText().substr(node.offset, node.length) + separatorAfter;
        return this.getInsertTextForPlainText(content);
    }
  };
  JSONCompletion.prototype.getInsertTextForProperty = function (key, propertySchema, addValue, separatorAfter) {
    var propertyText = this.getInsertTextForValue(key, '');
    if (!addValue) {
      return propertyText;
    }
    var resultText = propertyText + ': ';
    var value;
    var nValueProposals = 0;
    if (propertySchema) {
      if (Array.isArray(propertySchema.defaultSnippets)) {
        if (propertySchema.defaultSnippets.length === 1) {
          var body = propertySchema.defaultSnippets[0].body;
          if (_utilsObjectsJs.isDefined(body)) {
            value = this.getInsertTextForSnippetValue(body, '');
          }
        }
        nValueProposals += propertySchema.defaultSnippets.length;
      }
      if (propertySchema.enum) {
        if (!value && propertySchema.enum.length === 1) {
          value = this.getInsertTextForGuessedValue(propertySchema.enum[0], '');
        }
        nValueProposals += propertySchema.enum.length;
      }
      if (_utilsObjectsJs.isDefined(propertySchema.default)) {
        if (!value) {
          value = this.getInsertTextForGuessedValue(propertySchema.default, '');
        }
        nValueProposals++;
      }
      if (Array.isArray(propertySchema.examples) && propertySchema.examples.length) {
        if (!value) {
          value = this.getInsertTextForGuessedValue(propertySchema.examples[0], '');
        }
        nValueProposals += propertySchema.examples.length;
      }
      if (nValueProposals === 0) {
        var type = Array.isArray(propertySchema.type) ? propertySchema.type[0] : propertySchema.type;
        if (!type) {
          if (propertySchema.properties) {
            type = 'object';
          } else if (propertySchema.items) {
            type = 'array';
          }
        }
        switch (type) {
          case 'boolean':
            value = '$1';
            break;
          case 'string':
            value = '"$1"';
            break;
          case 'object':
            value = '{$1}';
            break;
          case 'array':
            value = '[$1]';
            break;
          case 'number':
          case 'integer':
            value = '${1:0}';
            break;
          case 'null':
            value = '${1:null}';
            break;
          default:
            return propertyText;
        }
      }
    }
    if (!value || nValueProposals > 1) {
      value = '$1';
    }
    return resultText + value + separatorAfter;
  };
  JSONCompletion.prototype.getCurrentWord = function (document, offset) {
    var i = offset - 1;
    var text = document.getText();
    while (i >= 0 && (' \t\n\r\v":{[,]}').indexOf(text.charAt(i)) === -1) {
      i--;
    }
    return text.substring(i + 1, offset);
  };
  JSONCompletion.prototype.evaluateSeparatorAfter = function (document, offset) {
    var scanner = _jsoncParserMainJs.createScanner(document.getText(), true);
    scanner.setPosition(offset);
    var token = scanner.scan();
    switch (token) {
      case 5:
      case 2:
      case 4:
      case 17:
        /*EOF*/
        return '';
      default:
        return ',';
    }
  };
  JSONCompletion.prototype.findItemAtOffset = function (node, document, offset) {
    var scanner = _jsoncParserMainJs.createScanner(document.getText(), true);
    var children = node.items;
    for (var i = children.length - 1; i >= 0; i--) {
      var child = children[i];
      if (offset > child.offset + child.length) {
        scanner.setPosition(child.offset + child.length);
        var token = scanner.scan();
        if (token === 5 && /*CommaToken*/
        offset >= scanner.getTokenOffset() + scanner.getTokenLength()) {
          return i + 1;
        }
        return i;
      } else if (offset >= child.offset) {
        return i;
      }
    }
    return 0;
  };
  JSONCompletion.prototype.isInComment = function (document, start, offset) {
    var scanner = _jsoncParserMainJs.createScanner(document.getText(), false);
    scanner.setPosition(start);
    var token = scanner.scan();
    while (token !== 17 && /*EOF*/
    scanner.getTokenOffset() + scanner.getTokenLength() < offset) {
      token = scanner.scan();
    }
    return (token === 12 || /*LineCommentTrivia*/
    token === 13) && /*BlockCommentTrivia*/
    scanner.getTokenOffset() <= offset;
  };
  JSONCompletion.prototype.fromMarkup = function (markupString) {
    if (markupString && this.doesSupportMarkdown()) {
      return {
        kind: _jsonLanguageTypesJs.MarkupKind.Markdown,
        value: markupString
      };
    }
    return undefined;
  };
  JSONCompletion.prototype.doesSupportMarkdown = function () {
    if (!_utilsObjectsJs.isDefined(this.supportsMarkdown)) {
      var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
      this.supportsMarkdown = completion && completion.completionItem && Array.isArray(completion.completionItem.documentationFormat) && completion.completionItem.documentationFormat.indexOf(_jsonLanguageTypesJs.MarkupKind.Markdown) !== -1;
    }
    return this.supportsMarkdown;
  };
  JSONCompletion.prototype.doesSupportsCommitCharacters = function () {
    if (!_utilsObjectsJs.isDefined(this.supportsCommitCharacters)) {
      var completion = this.clientCapabilities.textDocument && this.clientCapabilities.textDocument.completion;
      this.supportsCommitCharacters = completion && completion.completionItem && !!completion.completionItem.commitCharactersSupport;
    }
    return this.supportsCommitCharacters;
  };
  return JSONCompletion;
})();

},{"../parser/jsonParser.js":"23R5j","./../../jsonc-parser/main.js":"7Foak","../utils/json.js":"6ucPP","../utils/strings.js":"WOW9E","../utils/objects.js":"2EsVe","../jsonLanguageTypes.js":"7JR1I","./../../../fillers/vscode-nls.js":"Io1zy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"23R5j":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "asSchema", function () {
  return asSchema;
});
_parcelHelpers.export(exports, "EnumMatch", function () {
  return EnumMatch;
});
_parcelHelpers.export(exports, "newJSONDocument", function () {
  return newJSONDocument;
});
_parcelHelpers.export(exports, "getNodeValue", function () {
  return getNodeValue;
});
_parcelHelpers.export(exports, "getNodePath", function () {
  return getNodePath;
});
_parcelHelpers.export(exports, "contains", function () {
  return contains;
});
_parcelHelpers.export(exports, "parse", function () {
  return parse;
});
_parcelHelpers.export(exports, "ASTNodeImpl", function () {
  return ASTNodeImpl;
});
_parcelHelpers.export(exports, "NullASTNodeImpl", function () {
  return NullASTNodeImpl;
});
_parcelHelpers.export(exports, "BooleanASTNodeImpl", function () {
  return BooleanASTNodeImpl;
});
_parcelHelpers.export(exports, "ArrayASTNodeImpl", function () {
  return ArrayASTNodeImpl;
});
_parcelHelpers.export(exports, "NumberASTNodeImpl", function () {
  return NumberASTNodeImpl;
});
_parcelHelpers.export(exports, "StringASTNodeImpl", function () {
  return StringASTNodeImpl;
});
_parcelHelpers.export(exports, "PropertyASTNodeImpl", function () {
  return PropertyASTNodeImpl;
});
_parcelHelpers.export(exports, "ObjectASTNodeImpl", function () {
  return ObjectASTNodeImpl;
});
_parcelHelpers.export(exports, "ValidationResult", function () {
  return ValidationResult;
});
_parcelHelpers.export(exports, "JSONDocument", function () {
  return JSONDocument;
});
var _jsoncParserMainJs = require('./../../jsonc-parser/main.js');
var _utilsObjectsJs = require('../utils/objects.js');
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
var _fillersVscodeNlsJs = require('./../../../fillers/vscode-nls.js');
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
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
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
})();
var localize = _fillersVscodeNlsJs.loadMessageBundle();
var formats = {
  'color-hex': {
    errorMessage: localize('colorHexFormatWarning', 'Invalid color format. Use #RGB, #RGBA, #RRGGBB or #RRGGBBAA.'),
    pattern: /^#([0-9A-Fa-f]{3,4}|([0-9A-Fa-f]{2}){3,4})$/
  },
  'date-time': {
    errorMessage: localize('dateTimeFormatWarning', 'String is not a RFC3339 date-time.'),
    pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
  },
  'date': {
    errorMessage: localize('dateFormatWarning', 'String is not a RFC3339 date.'),
    pattern: /^(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/i
  },
  'time': {
    errorMessage: localize('timeFormatWarning', 'String is not a RFC3339 time.'),
    pattern: /^([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9]))$/i
  },
  'email': {
    errorMessage: localize('emailFormatWarning', 'String is not an e-mail address.'),
    pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  }
};
var ASTNodeImpl = /** @class*/
(function () {
  function ASTNodeImpl(parent, offset, length) {
    if (length === void 0) {
      length = 0;
    }
    this.offset = offset;
    this.length = length;
    this.parent = parent;
  }
  Object.defineProperty(ASTNodeImpl.prototype, "children", {
    get: function () {
      return [];
    },
    enumerable: false,
    configurable: true
  });
  ASTNodeImpl.prototype.toString = function () {
    return 'type: ' + this.type + ' (' + this.offset + '/' + this.length + ')' + (this.parent ? ' parent: {' + this.parent.toString() + '}' : '');
  };
  return ASTNodeImpl;
})();
var NullASTNodeImpl = /** @class*/
(function (_super) {
  __extends(NullASTNodeImpl, _super);
  function NullASTNodeImpl(parent, offset) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'null';
    _this.value = null;
    return _this;
  }
  return NullASTNodeImpl;
})(ASTNodeImpl);
var BooleanASTNodeImpl = /** @class*/
(function (_super) {
  __extends(BooleanASTNodeImpl, _super);
  function BooleanASTNodeImpl(parent, boolValue, offset) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'boolean';
    _this.value = boolValue;
    return _this;
  }
  return BooleanASTNodeImpl;
})(ASTNodeImpl);
var ArrayASTNodeImpl = /** @class*/
(function (_super) {
  __extends(ArrayASTNodeImpl, _super);
  function ArrayASTNodeImpl(parent, offset) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'array';
    _this.items = [];
    return _this;
  }
  Object.defineProperty(ArrayASTNodeImpl.prototype, "children", {
    get: function () {
      return this.items;
    },
    enumerable: false,
    configurable: true
  });
  return ArrayASTNodeImpl;
})(ASTNodeImpl);
var NumberASTNodeImpl = /** @class*/
(function (_super) {
  __extends(NumberASTNodeImpl, _super);
  function NumberASTNodeImpl(parent, offset) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'number';
    _this.isInteger = true;
    _this.value = Number.NaN;
    return _this;
  }
  return NumberASTNodeImpl;
})(ASTNodeImpl);
var StringASTNodeImpl = /** @class*/
(function (_super) {
  __extends(StringASTNodeImpl, _super);
  function StringASTNodeImpl(parent, offset, length) {
    var _this = _super.call(this, parent, offset, length) || this;
    _this.type = 'string';
    _this.value = '';
    return _this;
  }
  return StringASTNodeImpl;
})(ASTNodeImpl);
var PropertyASTNodeImpl = /** @class*/
(function (_super) {
  __extends(PropertyASTNodeImpl, _super);
  function PropertyASTNodeImpl(parent, offset, keyNode) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'property';
    _this.colonOffset = -1;
    _this.keyNode = keyNode;
    return _this;
  }
  Object.defineProperty(PropertyASTNodeImpl.prototype, "children", {
    get: function () {
      return this.valueNode ? [this.keyNode, this.valueNode] : [this.keyNode];
    },
    enumerable: false,
    configurable: true
  });
  return PropertyASTNodeImpl;
})(ASTNodeImpl);
var ObjectASTNodeImpl = /** @class*/
(function (_super) {
  __extends(ObjectASTNodeImpl, _super);
  function ObjectASTNodeImpl(parent, offset) {
    var _this = _super.call(this, parent, offset) || this;
    _this.type = 'object';
    _this.properties = [];
    return _this;
  }
  Object.defineProperty(ObjectASTNodeImpl.prototype, "children", {
    get: function () {
      return this.properties;
    },
    enumerable: false,
    configurable: true
  });
  return ObjectASTNodeImpl;
})(ASTNodeImpl);
function asSchema(schema) {
  if (_utilsObjectsJs.isBoolean(schema)) {
    return schema ? {} : {
      "not": {}
    };
  }
  return schema;
}
var EnumMatch;
(function (EnumMatch) {
  EnumMatch[EnumMatch["Key"] = 0] = "Key";
  EnumMatch[EnumMatch["Enum"] = 1] = "Enum";
})(EnumMatch || (EnumMatch = {}));
var SchemaCollector = /** @class*/
(function () {
  function SchemaCollector(focusOffset, exclude) {
    if (focusOffset === void 0) {
      focusOffset = -1;
    }
    this.focusOffset = focusOffset;
    this.exclude = exclude;
    this.schemas = [];
  }
  SchemaCollector.prototype.add = function (schema) {
    this.schemas.push(schema);
  };
  SchemaCollector.prototype.merge = function (other) {
    Array.prototype.push.apply(this.schemas, other.schemas);
  };
  SchemaCollector.prototype.include = function (node) {
    return (this.focusOffset === -1 || contains(node, this.focusOffset)) && node !== this.exclude;
  };
  SchemaCollector.prototype.newSub = function () {
    return new SchemaCollector(-1, this.exclude);
  };
  return SchemaCollector;
})();
var NoOpSchemaCollector = /** @class*/
(function () {
  function NoOpSchemaCollector() {}
  Object.defineProperty(NoOpSchemaCollector.prototype, "schemas", {
    get: function () {
      return [];
    },
    enumerable: false,
    configurable: true
  });
  NoOpSchemaCollector.prototype.add = function (schema) {};
  NoOpSchemaCollector.prototype.merge = function (other) {};
  NoOpSchemaCollector.prototype.include = function (node) {
    return true;
  };
  NoOpSchemaCollector.prototype.newSub = function () {
    return this;
  };
  NoOpSchemaCollector.instance = new NoOpSchemaCollector();
  return NoOpSchemaCollector;
})();
var ValidationResult = /** @class*/
(function () {
  function ValidationResult() {
    this.problems = [];
    this.propertiesMatches = 0;
    this.propertiesValueMatches = 0;
    this.primaryValueMatches = 0;
    this.enumValueMatch = false;
    this.enumValues = undefined;
  }
  ValidationResult.prototype.hasProblems = function () {
    return !!this.problems.length;
  };
  ValidationResult.prototype.mergeAll = function (validationResults) {
    for (var _i = 0, validationResults_1 = validationResults; _i < validationResults_1.length; _i++) {
      var validationResult = validationResults_1[_i];
      this.merge(validationResult);
    }
  };
  ValidationResult.prototype.merge = function (validationResult) {
    this.problems = this.problems.concat(validationResult.problems);
  };
  ValidationResult.prototype.mergeEnumValues = function (validationResult) {
    if (!this.enumValueMatch && !validationResult.enumValueMatch && this.enumValues && validationResult.enumValues) {
      this.enumValues = this.enumValues.concat(validationResult.enumValues);
      for (var _i = 0, _a = this.problems; _i < _a.length; _i++) {
        var error = _a[_i];
        if (error.code === _jsonLanguageTypesJs.ErrorCode.EnumValueMismatch) {
          error.message = localize('enumWarning', 'Value is not accepted. Valid values: {0}.', this.enumValues.map(function (v) {
            return JSON.stringify(v);
          }).join(', '));
        }
      }
    }
  };
  ValidationResult.prototype.mergePropertyMatch = function (propertyValidationResult) {
    this.merge(propertyValidationResult);
    this.propertiesMatches++;
    if (propertyValidationResult.enumValueMatch || !propertyValidationResult.hasProblems() && propertyValidationResult.propertiesMatches) {
      this.propertiesValueMatches++;
    }
    if (propertyValidationResult.enumValueMatch && propertyValidationResult.enumValues && propertyValidationResult.enumValues.length === 1) {
      this.primaryValueMatches++;
    }
  };
  ValidationResult.prototype.compare = function (other) {
    var hasProblems = this.hasProblems();
    if (hasProblems !== other.hasProblems()) {
      return hasProblems ? -1 : 1;
    }
    if (this.enumValueMatch !== other.enumValueMatch) {
      return other.enumValueMatch ? -1 : 1;
    }
    if (this.primaryValueMatches !== other.primaryValueMatches) {
      return this.primaryValueMatches - other.primaryValueMatches;
    }
    if (this.propertiesValueMatches !== other.propertiesValueMatches) {
      return this.propertiesValueMatches - other.propertiesValueMatches;
    }
    return this.propertiesMatches - other.propertiesMatches;
  };
  return ValidationResult;
})();
function newJSONDocument(root, diagnostics) {
  if (diagnostics === void 0) {
    diagnostics = [];
  }
  return new JSONDocument(root, diagnostics, []);
}
function getNodeValue(node) {
  return _jsoncParserMainJs.getNodeValue(node);
}
function getNodePath(node) {
  return _jsoncParserMainJs.getNodePath(node);
}
function contains(node, offset, includeRightBound) {
  if (includeRightBound === void 0) {
    includeRightBound = false;
  }
  return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
var JSONDocument = /** @class*/
(function () {
  function JSONDocument(root, syntaxErrors, comments) {
    if (syntaxErrors === void 0) {
      syntaxErrors = [];
    }
    if (comments === void 0) {
      comments = [];
    }
    this.root = root;
    this.syntaxErrors = syntaxErrors;
    this.comments = comments;
  }
  JSONDocument.prototype.getNodeFromOffset = function (offset, includeRightBound) {
    if (includeRightBound === void 0) {
      includeRightBound = false;
    }
    if (this.root) {
      return _jsoncParserMainJs.findNodeAtOffset(this.root, offset, includeRightBound);
    }
    return undefined;
  };
  JSONDocument.prototype.visit = function (visitor) {
    if (this.root) {
      var doVisit_1 = function (node) {
        var ctn = visitor(node);
        var children = node.children;
        if (Array.isArray(children)) {
          for (var i = 0; i < children.length && ctn; i++) {
            ctn = doVisit_1(children[i]);
          }
        }
        return ctn;
      };
      doVisit_1(this.root);
    }
  };
  JSONDocument.prototype.validate = function (textDocument, schema, severity) {
    if (severity === void 0) {
      severity = _jsonLanguageTypesJs.DiagnosticSeverity.Warning;
    }
    if (this.root && schema) {
      var validationResult = new ValidationResult();
      validate(this.root, schema, validationResult, NoOpSchemaCollector.instance);
      return validationResult.problems.map(function (p) {
        var _a;
        var range = _jsonLanguageTypesJs.Range.create(textDocument.positionAt(p.location.offset), textDocument.positionAt(p.location.offset + p.location.length));
        return _jsonLanguageTypesJs.Diagnostic.create(range, p.message, (_a = p.severity) !== null && _a !== void 0 ? _a : severity, p.code);
      });
    }
    return undefined;
  };
  JSONDocument.prototype.getMatchingSchemas = function (schema, focusOffset, exclude) {
    if (focusOffset === void 0) {
      focusOffset = -1;
    }
    var matchingSchemas = new SchemaCollector(focusOffset, exclude);
    if (this.root && schema) {
      validate(this.root, schema, new ValidationResult(), matchingSchemas);
    }
    return matchingSchemas.schemas;
  };
  return JSONDocument;
})();
function validate(n, schema, validationResult, matchingSchemas) {
  if (!n || !matchingSchemas.include(n)) {
    return;
  }
  var node = n;
  switch (node.type) {
    case 'object':
      _validateObjectNode(node, schema, validationResult, matchingSchemas);
      break;
    case 'array':
      _validateArrayNode(node, schema, validationResult, matchingSchemas);
      break;
    case 'string':
      _validateStringNode(node, schema, validationResult, matchingSchemas);
      break;
    case 'number':
      _validateNumberNode(node, schema, validationResult, matchingSchemas);
      break;
    case 'property':
      return validate(node.valueNode, schema, validationResult, matchingSchemas);
  }
  _validateNode();
  matchingSchemas.add({
    node: node,
    schema: schema
  });
  function _validateNode() {
    function matchesType(type) {
      return node.type === type || type === 'integer' && node.type === 'number' && node.isInteger;
    }
    if (Array.isArray(schema.type)) {
      if (!schema.type.some(matchesType)) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: schema.errorMessage || localize('typeArrayMismatchWarning', 'Incorrect type. Expected one of {0}.', schema.type.join(', '))
        });
      }
    } else if (schema.type) {
      if (!matchesType(schema.type)) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: schema.errorMessage || localize('typeMismatchWarning', 'Incorrect type. Expected "{0}".', schema.type)
        });
      }
    }
    if (Array.isArray(schema.allOf)) {
      for (var _i = 0, _a = schema.allOf; _i < _a.length; _i++) {
        var subSchemaRef = _a[_i];
        validate(node, asSchema(subSchemaRef), validationResult, matchingSchemas);
      }
    }
    var notSchema = asSchema(schema.not);
    if (notSchema) {
      var subValidationResult = new ValidationResult();
      var subMatchingSchemas = matchingSchemas.newSub();
      validate(node, notSchema, subValidationResult, subMatchingSchemas);
      if (!subValidationResult.hasProblems()) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: localize('notSchemaWarning', "Matches a schema that is not allowed.")
        });
      }
      for (var _b = 0, _c = subMatchingSchemas.schemas; _b < _c.length; _b++) {
        var ms = _c[_b];
        ms.inverted = !ms.inverted;
        matchingSchemas.add(ms);
      }
    }
    var testAlternatives = function (alternatives, maxOneMatch) {
      var matches = [];
      // remember the best match that is used for error messages
      var bestMatch = undefined;
      for (var _i = 0, alternatives_1 = alternatives; _i < alternatives_1.length; _i++) {
        var subSchemaRef = alternatives_1[_i];
        var subSchema = asSchema(subSchemaRef);
        var subValidationResult = new ValidationResult();
        var subMatchingSchemas = matchingSchemas.newSub();
        validate(node, subSchema, subValidationResult, subMatchingSchemas);
        if (!subValidationResult.hasProblems()) {
          matches.push(subSchema);
        }
        if (!bestMatch) {
          bestMatch = {
            schema: subSchema,
            validationResult: subValidationResult,
            matchingSchemas: subMatchingSchemas
          };
        } else {
          if (!maxOneMatch && !subValidationResult.hasProblems() && !bestMatch.validationResult.hasProblems()) {
            // no errors, both are equally good matches
            bestMatch.matchingSchemas.merge(subMatchingSchemas);
            bestMatch.validationResult.propertiesMatches += subValidationResult.propertiesMatches;
            bestMatch.validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
          } else {
            var compareResult = subValidationResult.compare(bestMatch.validationResult);
            if (compareResult > 0) {
              // our node is the best matching so far
              bestMatch = {
                schema: subSchema,
                validationResult: subValidationResult,
                matchingSchemas: subMatchingSchemas
              };
            } else if (compareResult === 0) {
              // there's already a best matching but we are as good
              bestMatch.matchingSchemas.merge(subMatchingSchemas);
              bestMatch.validationResult.mergeEnumValues(subValidationResult);
            }
          }
        }
      }
      if (matches.length > 1 && maxOneMatch) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: 1
          },
          message: localize('oneOfWarning', "Matches multiple schemas when only one must validate.")
        });
      }
      if (bestMatch) {
        validationResult.merge(bestMatch.validationResult);
        validationResult.propertiesMatches += bestMatch.validationResult.propertiesMatches;
        validationResult.propertiesValueMatches += bestMatch.validationResult.propertiesValueMatches;
        matchingSchemas.merge(bestMatch.matchingSchemas);
      }
      return matches.length;
    };
    if (Array.isArray(schema.anyOf)) {
      testAlternatives(schema.anyOf, false);
    }
    if (Array.isArray(schema.oneOf)) {
      testAlternatives(schema.oneOf, true);
    }
    var testBranch = function (schema) {
      var subValidationResult = new ValidationResult();
      var subMatchingSchemas = matchingSchemas.newSub();
      validate(node, asSchema(schema), subValidationResult, subMatchingSchemas);
      validationResult.merge(subValidationResult);
      validationResult.propertiesMatches += subValidationResult.propertiesMatches;
      validationResult.propertiesValueMatches += subValidationResult.propertiesValueMatches;
      matchingSchemas.merge(subMatchingSchemas);
    };
    var testCondition = function (ifSchema, thenSchema, elseSchema) {
      var subSchema = asSchema(ifSchema);
      var subValidationResult = new ValidationResult();
      var subMatchingSchemas = matchingSchemas.newSub();
      validate(node, subSchema, subValidationResult, subMatchingSchemas);
      matchingSchemas.merge(subMatchingSchemas);
      if (!subValidationResult.hasProblems()) {
        if (thenSchema) {
          testBranch(thenSchema);
        }
      } else if (elseSchema) {
        testBranch(elseSchema);
      }
    };
    var ifSchema = asSchema(schema.if);
    if (ifSchema) {
      testCondition(ifSchema, asSchema(schema.then), asSchema(schema.else));
    }
    if (Array.isArray(schema.enum)) {
      var val = getNodeValue(node);
      var enumValueMatch = false;
      for (var _d = 0, _e = schema.enum; _d < _e.length; _d++) {
        var e = _e[_d];
        if (_utilsObjectsJs.equals(val, e)) {
          enumValueMatch = true;
          break;
        }
      }
      validationResult.enumValues = schema.enum;
      validationResult.enumValueMatch = enumValueMatch;
      if (!enumValueMatch) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          code: _jsonLanguageTypesJs.ErrorCode.EnumValueMismatch,
          message: schema.errorMessage || localize('enumWarning', 'Value is not accepted. Valid values: {0}.', schema.enum.map(function (v) {
            return JSON.stringify(v);
          }).join(', '))
        });
      }
    }
    if (_utilsObjectsJs.isDefined(schema.const)) {
      var val = getNodeValue(node);
      if (!_utilsObjectsJs.equals(val, schema.const)) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          code: _jsonLanguageTypesJs.ErrorCode.EnumValueMismatch,
          message: schema.errorMessage || localize('constWarning', 'Value must be {0}.', JSON.stringify(schema.const))
        });
        validationResult.enumValueMatch = false;
      } else {
        validationResult.enumValueMatch = true;
      }
      validationResult.enumValues = [schema.const];
    }
    if (schema.deprecationMessage && node.parent) {
      validationResult.problems.push({
        location: {
          offset: node.parent.offset,
          length: node.parent.length
        },
        severity: _jsonLanguageTypesJs.DiagnosticSeverity.Warning,
        message: schema.deprecationMessage,
        code: _jsonLanguageTypesJs.ErrorCode.Deprecated
      });
    }
  }
  function _validateNumberNode(node, schema, validationResult, matchingSchemas) {
    var val = node.value;
    function normalizeFloats(float) {
      var _a;
      var parts = (/^(-?\d+)(?:\.(\d+))?(?:e([-+]\d+))?$/).exec(float.toString());
      return parts && ({
        value: Number(parts[1] + (parts[2] || '')),
        multiplier: (((_a = parts[2]) === null || _a === void 0 ? void 0 : _a.length) || 0) - (parseInt(parts[3]) || 0)
      });
    }
    ;
    if (_utilsObjectsJs.isNumber(schema.multipleOf)) {
      var remainder = -1;
      if (Number.isInteger(schema.multipleOf)) {
        remainder = val % schema.multipleOf;
      } else {
        var normMultipleOf = normalizeFloats(schema.multipleOf);
        var normValue = normalizeFloats(val);
        if (normMultipleOf && normValue) {
          var multiplier = Math.pow(10, Math.abs(normValue.multiplier - normMultipleOf.multiplier));
          if (normValue.multiplier < normMultipleOf.multiplier) {
            normValue.value *= multiplier;
          } else {
            normMultipleOf.value *= multiplier;
          }
          remainder = normValue.value % normMultipleOf.value;
        }
      }
      if (remainder !== 0) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: localize('multipleOfWarning', 'Value is not divisible by {0}.', schema.multipleOf)
        });
      }
    }
    function getExclusiveLimit(limit, exclusive) {
      if (_utilsObjectsJs.isNumber(exclusive)) {
        return exclusive;
      }
      if (_utilsObjectsJs.isBoolean(exclusive) && exclusive) {
        return limit;
      }
      return undefined;
    }
    function getLimit(limit, exclusive) {
      if (!_utilsObjectsJs.isBoolean(exclusive) || !exclusive) {
        return limit;
      }
      return undefined;
    }
    var exclusiveMinimum = getExclusiveLimit(schema.minimum, schema.exclusiveMinimum);
    if (_utilsObjectsJs.isNumber(exclusiveMinimum) && val <= exclusiveMinimum) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('exclusiveMinimumWarning', 'Value is below the exclusive minimum of {0}.', exclusiveMinimum)
      });
    }
    var exclusiveMaximum = getExclusiveLimit(schema.maximum, schema.exclusiveMaximum);
    if (_utilsObjectsJs.isNumber(exclusiveMaximum) && val >= exclusiveMaximum) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('exclusiveMaximumWarning', 'Value is above the exclusive maximum of {0}.', exclusiveMaximum)
      });
    }
    var minimum = getLimit(schema.minimum, schema.exclusiveMinimum);
    if (_utilsObjectsJs.isNumber(minimum) && val < minimum) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('minimumWarning', 'Value is below the minimum of {0}.', minimum)
      });
    }
    var maximum = getLimit(schema.maximum, schema.exclusiveMaximum);
    if (_utilsObjectsJs.isNumber(maximum) && val > maximum) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('maximumWarning', 'Value is above the maximum of {0}.', maximum)
      });
    }
  }
  function _validateStringNode(node, schema, validationResult, matchingSchemas) {
    if (_utilsObjectsJs.isNumber(schema.minLength) && node.value.length < schema.minLength) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('minLengthWarning', 'String is shorter than the minimum length of {0}.', schema.minLength)
      });
    }
    if (_utilsObjectsJs.isNumber(schema.maxLength) && node.value.length > schema.maxLength) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('maxLengthWarning', 'String is longer than the maximum length of {0}.', schema.maxLength)
      });
    }
    if (_utilsObjectsJs.isString(schema.pattern)) {
      var regex = new RegExp(schema.pattern);
      if (!regex.test(node.value)) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: schema.patternErrorMessage || schema.errorMessage || localize('patternWarning', 'String does not match the pattern of "{0}".', schema.pattern)
        });
      }
    }
    if (schema.format) {
      switch (schema.format) {
        case 'uri':
        case 'uri-reference':
          {
            var errorMessage = void 0;
            if (!node.value) {
              errorMessage = localize('uriEmpty', 'URI expected.');
            } else {
              var match = (/^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/).exec(node.value);
              if (!match) {
                errorMessage = localize('uriMissing', 'URI is expected.');
              } else if (!match[2] && schema.format === 'uri') {
                errorMessage = localize('uriSchemeMissing', 'URI with a scheme is expected.');
              }
            }
            if (errorMessage) {
              validationResult.problems.push({
                location: {
                  offset: node.offset,
                  length: node.length
                },
                message: schema.patternErrorMessage || schema.errorMessage || localize('uriFormatWarning', 'String is not a URI: {0}', errorMessage)
              });
            }
          }
          break;
        case 'color-hex':
        case 'date-time':
        case 'date':
        case 'time':
        case 'email':
          var format = formats[schema.format];
          if (!node.value || !format.pattern.exec(node.value)) {
            validationResult.problems.push({
              location: {
                offset: node.offset,
                length: node.length
              },
              message: schema.patternErrorMessage || schema.errorMessage || format.errorMessage
            });
          }
        default:
      }
    }
  }
  function _validateArrayNode(node, schema, validationResult, matchingSchemas) {
    if (Array.isArray(schema.items)) {
      var subSchemas = schema.items;
      for (var index = 0; index < subSchemas.length; index++) {
        var subSchemaRef = subSchemas[index];
        var subSchema = asSchema(subSchemaRef);
        var itemValidationResult = new ValidationResult();
        var item = node.items[index];
        if (item) {
          validate(item, subSchema, itemValidationResult, matchingSchemas);
          validationResult.mergePropertyMatch(itemValidationResult);
        } else if (node.items.length >= subSchemas.length) {
          validationResult.propertiesValueMatches++;
        }
      }
      if (node.items.length > subSchemas.length) {
        if (typeof schema.additionalItems === 'object') {
          for (var i = subSchemas.length; i < node.items.length; i++) {
            var itemValidationResult = new ValidationResult();
            validate(node.items[i], schema.additionalItems, itemValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(itemValidationResult);
          }
        } else if (schema.additionalItems === false) {
          validationResult.problems.push({
            location: {
              offset: node.offset,
              length: node.length
            },
            message: localize('additionalItemsWarning', 'Array has too many items according to schema. Expected {0} or fewer.', subSchemas.length)
          });
        }
      }
    } else {
      var itemSchema = asSchema(schema.items);
      if (itemSchema) {
        for (var _i = 0, _a = node.items; _i < _a.length; _i++) {
          var item = _a[_i];
          var itemValidationResult = new ValidationResult();
          validate(item, itemSchema, itemValidationResult, matchingSchemas);
          validationResult.mergePropertyMatch(itemValidationResult);
        }
      }
    }
    var containsSchema = asSchema(schema.contains);
    if (containsSchema) {
      var doesContain = node.items.some(function (item) {
        var itemValidationResult = new ValidationResult();
        validate(item, containsSchema, itemValidationResult, NoOpSchemaCollector.instance);
        return !itemValidationResult.hasProblems();
      });
      if (!doesContain) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: schema.errorMessage || localize('requiredItemMissingWarning', 'Array does not contain required item.')
        });
      }
    }
    if (_utilsObjectsJs.isNumber(schema.minItems) && node.items.length < schema.minItems) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('minItemsWarning', 'Array has too few items. Expected {0} or more.', schema.minItems)
      });
    }
    if (_utilsObjectsJs.isNumber(schema.maxItems) && node.items.length > schema.maxItems) {
      validationResult.problems.push({
        location: {
          offset: node.offset,
          length: node.length
        },
        message: localize('maxItemsWarning', 'Array has too many items. Expected {0} or fewer.', schema.maxItems)
      });
    }
    if (schema.uniqueItems === true) {
      var values_1 = getNodeValue(node);
      var duplicates = values_1.some(function (value, index) {
        return index !== values_1.lastIndexOf(value);
      });
      if (duplicates) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: localize('uniqueItemsWarning', 'Array has duplicate items.')
        });
      }
    }
  }
  function _validateObjectNode(node, schema, validationResult, matchingSchemas) {
    var seenKeys = Object.create(null);
    var unprocessedProperties = [];
    for (var _i = 0, _a = node.properties; _i < _a.length; _i++) {
      var propertyNode = _a[_i];
      var key = propertyNode.keyNode.value;
      seenKeys[key] = propertyNode.valueNode;
      unprocessedProperties.push(key);
    }
    if (Array.isArray(schema.required)) {
      for (var _b = 0, _c = schema.required; _b < _c.length; _b++) {
        var propertyName = _c[_b];
        if (!seenKeys[propertyName]) {
          var keyNode = node.parent && node.parent.type === 'property' && node.parent.keyNode;
          var location = keyNode ? {
            offset: keyNode.offset,
            length: keyNode.length
          } : {
            offset: node.offset,
            length: 1
          };
          validationResult.problems.push({
            location: location,
            message: localize('MissingRequiredPropWarning', 'Missing property "{0}".', propertyName)
          });
        }
      }
    }
    var propertyProcessed = function (prop) {
      var index = unprocessedProperties.indexOf(prop);
      while (index >= 0) {
        unprocessedProperties.splice(index, 1);
        index = unprocessedProperties.indexOf(prop);
      }
    };
    if (schema.properties) {
      for (var _d = 0, _e = Object.keys(schema.properties); _d < _e.length; _d++) {
        var propertyName = _e[_d];
        propertyProcessed(propertyName);
        var propertySchema = schema.properties[propertyName];
        var child = seenKeys[propertyName];
        if (child) {
          if (_utilsObjectsJs.isBoolean(propertySchema)) {
            if (!propertySchema) {
              var propertyNode = child.parent;
              validationResult.problems.push({
                location: {
                  offset: propertyNode.keyNode.offset,
                  length: propertyNode.keyNode.length
                },
                message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
              });
            } else {
              validationResult.propertiesMatches++;
              validationResult.propertiesValueMatches++;
            }
          } else {
            var propertyValidationResult = new ValidationResult();
            validate(child, propertySchema, propertyValidationResult, matchingSchemas);
            validationResult.mergePropertyMatch(propertyValidationResult);
          }
        }
      }
    }
    if (schema.patternProperties) {
      for (var _f = 0, _g = Object.keys(schema.patternProperties); _f < _g.length; _f++) {
        var propertyPattern = _g[_f];
        var regex = new RegExp(propertyPattern);
        for (var _h = 0, _j = unprocessedProperties.slice(0); _h < _j.length; _h++) {
          var propertyName = _j[_h];
          if (regex.test(propertyName)) {
            propertyProcessed(propertyName);
            var child = seenKeys[propertyName];
            if (child) {
              var propertySchema = schema.patternProperties[propertyPattern];
              if (_utilsObjectsJs.isBoolean(propertySchema)) {
                if (!propertySchema) {
                  var propertyNode = child.parent;
                  validationResult.problems.push({
                    location: {
                      offset: propertyNode.keyNode.offset,
                      length: propertyNode.keyNode.length
                    },
                    message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
                  });
                } else {
                  validationResult.propertiesMatches++;
                  validationResult.propertiesValueMatches++;
                }
              } else {
                var propertyValidationResult = new ValidationResult();
                validate(child, propertySchema, propertyValidationResult, matchingSchemas);
                validationResult.mergePropertyMatch(propertyValidationResult);
              }
            }
          }
        }
      }
    }
    if (typeof schema.additionalProperties === 'object') {
      for (var _k = 0, unprocessedProperties_1 = unprocessedProperties; _k < unprocessedProperties_1.length; _k++) {
        var propertyName = unprocessedProperties_1[_k];
        var child = seenKeys[propertyName];
        if (child) {
          var propertyValidationResult = new ValidationResult();
          validate(child, schema.additionalProperties, propertyValidationResult, matchingSchemas);
          validationResult.mergePropertyMatch(propertyValidationResult);
        }
      }
    } else if (schema.additionalProperties === false) {
      if (unprocessedProperties.length > 0) {
        for (var _l = 0, unprocessedProperties_2 = unprocessedProperties; _l < unprocessedProperties_2.length; _l++) {
          var propertyName = unprocessedProperties_2[_l];
          var child = seenKeys[propertyName];
          if (child) {
            var propertyNode = child.parent;
            validationResult.problems.push({
              location: {
                offset: propertyNode.keyNode.offset,
                length: propertyNode.keyNode.length
              },
              message: schema.errorMessage || localize('DisallowedExtraPropWarning', 'Property {0} is not allowed.', propertyName)
            });
          }
        }
      }
    }
    if (_utilsObjectsJs.isNumber(schema.maxProperties)) {
      if (node.properties.length > schema.maxProperties) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: localize('MaxPropWarning', 'Object has more properties than limit of {0}.', schema.maxProperties)
        });
      }
    }
    if (_utilsObjectsJs.isNumber(schema.minProperties)) {
      if (node.properties.length < schema.minProperties) {
        validationResult.problems.push({
          location: {
            offset: node.offset,
            length: node.length
          },
          message: localize('MinPropWarning', 'Object has fewer properties than the required number of {0}', schema.minProperties)
        });
      }
    }
    if (schema.dependencies) {
      for (var _m = 0, _o = Object.keys(schema.dependencies); _m < _o.length; _m++) {
        var key = _o[_m];
        var prop = seenKeys[key];
        if (prop) {
          var propertyDep = schema.dependencies[key];
          if (Array.isArray(propertyDep)) {
            for (var _p = 0, propertyDep_1 = propertyDep; _p < propertyDep_1.length; _p++) {
              var requiredProp = propertyDep_1[_p];
              if (!seenKeys[requiredProp]) {
                validationResult.problems.push({
                  location: {
                    offset: node.offset,
                    length: node.length
                  },
                  message: localize('RequiredDependentPropWarning', 'Object is missing property {0} required by property {1}.', requiredProp, key)
                });
              } else {
                validationResult.propertiesValueMatches++;
              }
            }
          } else {
            var propertySchema = asSchema(propertyDep);
            if (propertySchema) {
              var propertyValidationResult = new ValidationResult();
              validate(node, propertySchema, propertyValidationResult, matchingSchemas);
              validationResult.mergePropertyMatch(propertyValidationResult);
            }
          }
        }
      }
    }
    var propertyNames = asSchema(schema.propertyNames);
    if (propertyNames) {
      for (var _q = 0, _r = node.properties; _q < _r.length; _q++) {
        var f = _r[_q];
        var key = f.keyNode;
        if (key) {
          validate(key, propertyNames, validationResult, NoOpSchemaCollector.instance);
        }
      }
    }
  }
}
function parse(textDocument, config) {
  var problems = [];
  var lastProblemOffset = -1;
  var text = textDocument.getText();
  var scanner = _jsoncParserMainJs.createScanner(text, false);
  var commentRanges = config && config.collectComments ? [] : undefined;
  function _scanNext() {
    while (true) {
      var token_1 = scanner.scan();
      _checkScanError();
      switch (token_1) {
        case 12:
        case 13:
          /*BlockCommentTrivia*/
          if (Array.isArray(commentRanges)) {
            commentRanges.push(_jsonLanguageTypesJs.Range.create(textDocument.positionAt(scanner.getTokenOffset()), textDocument.positionAt(scanner.getTokenOffset() + scanner.getTokenLength())));
          }
          break;
        case 15:
        case 14:
          /*LineBreakTrivia*/
          break;
        default:
          return token_1;
      }
    }
  }
  function _accept(token) {
    if (scanner.getToken() === token) {
      _scanNext();
      return true;
    }
    return false;
  }
  function _errorAtRange(message, code, startOffset, endOffset, severity) {
    if (severity === void 0) {
      severity = _jsonLanguageTypesJs.DiagnosticSeverity.Error;
    }
    if (problems.length === 0 || startOffset !== lastProblemOffset) {
      var range = _jsonLanguageTypesJs.Range.create(textDocument.positionAt(startOffset), textDocument.positionAt(endOffset));
      problems.push(_jsonLanguageTypesJs.Diagnostic.create(range, message, severity, code, textDocument.languageId));
      lastProblemOffset = startOffset;
    }
  }
  function _error(message, code, node, skipUntilAfter, skipUntil) {
    if (node === void 0) {
      node = undefined;
    }
    if (skipUntilAfter === void 0) {
      skipUntilAfter = [];
    }
    if (skipUntil === void 0) {
      skipUntil = [];
    }
    var start = scanner.getTokenOffset();
    var end = scanner.getTokenOffset() + scanner.getTokenLength();
    if (start === end && start > 0) {
      start--;
      while (start > 0 && (/\s/).test(text.charAt(start))) {
        start--;
      }
      end = start + 1;
    }
    _errorAtRange(message, code, start, end);
    if (node) {
      _finalize(node, false);
    }
    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token_2 = scanner.getToken();
      while (token_2 !== 17) /*EOF*/
      {
        if (skipUntilAfter.indexOf(token_2) !== -1) {
          _scanNext();
          break;
        } else if (skipUntil.indexOf(token_2) !== -1) {
          break;
        }
        token_2 = _scanNext();
      }
    }
    return node;
  }
  function _checkScanError() {
    switch (scanner.getTokenError()) {
      case 4:
        /*InvalidUnicode*/
        _error(localize('InvalidUnicode', 'Invalid unicode sequence in string.'), _jsonLanguageTypesJs.ErrorCode.InvalidUnicode);
        return true;
      case 5:
        /*InvalidEscapeCharacter*/
        _error(localize('InvalidEscapeCharacter', 'Invalid escape character in string.'), _jsonLanguageTypesJs.ErrorCode.InvalidEscapeCharacter);
        return true;
      case 3:
        /*UnexpectedEndOfNumber*/
        _error(localize('UnexpectedEndOfNumber', 'Unexpected end of number.'), _jsonLanguageTypesJs.ErrorCode.UnexpectedEndOfNumber);
        return true;
      case 1:
        /*UnexpectedEndOfComment*/
        _error(localize('UnexpectedEndOfComment', 'Unexpected end of comment.'), _jsonLanguageTypesJs.ErrorCode.UnexpectedEndOfComment);
        return true;
      case 2:
        /*UnexpectedEndOfString*/
        _error(localize('UnexpectedEndOfString', 'Unexpected end of string.'), _jsonLanguageTypesJs.ErrorCode.UnexpectedEndOfString);
        return true;
      case 6:
        /*InvalidCharacter*/
        _error(localize('InvalidCharacter', 'Invalid characters in string. Control characters must be escaped.'), _jsonLanguageTypesJs.ErrorCode.InvalidCharacter);
        return true;
    }
    return false;
  }
  function _finalize(node, scanNext) {
    node.length = scanner.getTokenOffset() + scanner.getTokenLength() - node.offset;
    if (scanNext) {
      _scanNext();
    }
    return node;
  }
  function _parseArray(parent) {
    if (scanner.getToken() !== 3) /*OpenBracketToken*/
    {
      return undefined;
    }
    var node = new ArrayASTNodeImpl(parent, scanner.getTokenOffset());
    _scanNext();
    // consume OpenBracketToken
    var count = 0;
    var needsComma = false;
    while (scanner.getToken() !== 4 && /*CloseBracketToken*/
    scanner.getToken() !== 17) /*EOF*/
    {
      if (scanner.getToken() === 5) /*CommaToken*/
      {
        if (!needsComma) {
          _error(localize('ValueExpected', 'Value expected'), _jsonLanguageTypesJs.ErrorCode.ValueExpected);
        }
        var commaOffset = scanner.getTokenOffset();
        _scanNext();
        // consume comma
        if (scanner.getToken() === 4) /*CloseBracketToken*/
        {
          if (needsComma) {
            _errorAtRange(localize('TrailingComma', 'Trailing comma'), _jsonLanguageTypesJs.ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
          }
          continue;
        }
      } else if (needsComma) {
        _error(localize('ExpectedComma', 'Expected comma'), _jsonLanguageTypesJs.ErrorCode.CommaExpected);
      }
      var item = _parseValue(node);
      if (!item) {
        _error(localize('PropertyExpected', 'Value expected'), _jsonLanguageTypesJs.ErrorCode.ValueExpected, undefined, [], [4, /*CloseBracketToken*/
        5]);
      } else {
        node.items.push(item);
      }
      needsComma = true;
    }
    if (scanner.getToken() !== 4) /*CloseBracketToken*/
    {
      return _error(localize('ExpectedCloseBracket', 'Expected comma or closing bracket'), _jsonLanguageTypesJs.ErrorCode.CommaOrCloseBacketExpected, node);
    }
    return _finalize(node, true);
  }
  var keyPlaceholder = new StringASTNodeImpl(undefined, 0, 0);
  function _parseProperty(parent, keysSeen) {
    var node = new PropertyASTNodeImpl(parent, scanner.getTokenOffset(), keyPlaceholder);
    var key = _parseString(node);
    if (!key) {
      if (scanner.getToken() === 16) /*Unknown*/
      {
        // give a more helpful error message
        _error(localize('DoubleQuotesExpected', 'Property keys must be doublequoted'), _jsonLanguageTypesJs.ErrorCode.Undefined);
        var keyNode = new StringASTNodeImpl(node, scanner.getTokenOffset(), scanner.getTokenLength());
        keyNode.value = scanner.getTokenValue();
        key = keyNode;
        _scanNext();
      } else {
        return undefined;
      }
    }
    node.keyNode = key;
    var seen = keysSeen[key.value];
    if (seen) {
      _errorAtRange(localize('DuplicateKeyWarning', "Duplicate object key"), _jsonLanguageTypesJs.ErrorCode.DuplicateKey, node.keyNode.offset, node.keyNode.offset + node.keyNode.length, _jsonLanguageTypesJs.DiagnosticSeverity.Warning);
      if (typeof seen === 'object') {
        _errorAtRange(localize('DuplicateKeyWarning', "Duplicate object key"), _jsonLanguageTypesJs.ErrorCode.DuplicateKey, seen.keyNode.offset, seen.keyNode.offset + seen.keyNode.length, _jsonLanguageTypesJs.DiagnosticSeverity.Warning);
      }
      keysSeen[key.value] = true;
    } else {
      keysSeen[key.value] = node;
    }
    if (scanner.getToken() === 6) /*ColonToken*/
    {
      node.colonOffset = scanner.getTokenOffset();
      _scanNext();
    } else {
      _error(localize('ColonExpected', 'Colon expected'), _jsonLanguageTypesJs.ErrorCode.ColonExpected);
      if (scanner.getToken() === 10 && /*StringLiteral*/
      textDocument.positionAt(key.offset + key.length).line < textDocument.positionAt(scanner.getTokenOffset()).line) {
        node.length = key.length;
        return node;
      }
    }
    var value = _parseValue(node);
    if (!value) {
      return _error(localize('ValueExpected', 'Value expected'), _jsonLanguageTypesJs.ErrorCode.ValueExpected, node, [], [2, /*CloseBraceToken*/
      5]);
    }
    node.valueNode = value;
    node.length = value.offset + value.length - node.offset;
    return node;
  }
  function _parseObject(parent) {
    if (scanner.getToken() !== 1) /*OpenBraceToken*/
    {
      return undefined;
    }
    var node = new ObjectASTNodeImpl(parent, scanner.getTokenOffset());
    var keysSeen = Object.create(null);
    _scanNext();
    // consume OpenBraceToken
    var needsComma = false;
    while (scanner.getToken() !== 2 && /*CloseBraceToken*/
    scanner.getToken() !== 17) /*EOF*/
    {
      if (scanner.getToken() === 5) /*CommaToken*/
      {
        if (!needsComma) {
          _error(localize('PropertyExpected', 'Property expected'), _jsonLanguageTypesJs.ErrorCode.PropertyExpected);
        }
        var commaOffset = scanner.getTokenOffset();
        _scanNext();
        // consume comma
        if (scanner.getToken() === 2) /*CloseBraceToken*/
        {
          if (needsComma) {
            _errorAtRange(localize('TrailingComma', 'Trailing comma'), _jsonLanguageTypesJs.ErrorCode.TrailingComma, commaOffset, commaOffset + 1);
          }
          continue;
        }
      } else if (needsComma) {
        _error(localize('ExpectedComma', 'Expected comma'), _jsonLanguageTypesJs.ErrorCode.CommaExpected);
      }
      var property = _parseProperty(node, keysSeen);
      if (!property) {
        _error(localize('PropertyExpected', 'Property expected'), _jsonLanguageTypesJs.ErrorCode.PropertyExpected, undefined, [], [2, /*CloseBraceToken*/
        5]);
      } else {
        node.properties.push(property);
      }
      needsComma = true;
    }
    if (scanner.getToken() !== 2) /*CloseBraceToken*/
    {
      return _error(localize('ExpectedCloseBrace', 'Expected comma or closing brace'), _jsonLanguageTypesJs.ErrorCode.CommaOrCloseBraceExpected, node);
    }
    return _finalize(node, true);
  }
  function _parseString(parent) {
    if (scanner.getToken() !== 10) /*StringLiteral*/
    {
      return undefined;
    }
    var node = new StringASTNodeImpl(parent, scanner.getTokenOffset());
    node.value = scanner.getTokenValue();
    return _finalize(node, true);
  }
  function _parseNumber(parent) {
    if (scanner.getToken() !== 11) /*NumericLiteral*/
    {
      return undefined;
    }
    var node = new NumberASTNodeImpl(parent, scanner.getTokenOffset());
    if (scanner.getTokenError() === 0) /*None*/
    {
      var tokenValue = scanner.getTokenValue();
      try {
        var numberValue = JSON.parse(tokenValue);
        if (!_utilsObjectsJs.isNumber(numberValue)) {
          return _error(localize('InvalidNumberFormat', 'Invalid number format.'), _jsonLanguageTypesJs.ErrorCode.Undefined, node);
        }
        node.value = numberValue;
      } catch (e) {
        return _error(localize('InvalidNumberFormat', 'Invalid number format.'), _jsonLanguageTypesJs.ErrorCode.Undefined, node);
      }
      node.isInteger = tokenValue.indexOf('.') === -1;
    }
    return _finalize(node, true);
  }
  function _parseLiteral(parent) {
    var node;
    switch (scanner.getToken()) {
      case 7:
        /*NullKeyword*/
        return _finalize(new NullASTNodeImpl(parent, scanner.getTokenOffset()), true);
      case 8:
        /*TrueKeyword*/
        return _finalize(new BooleanASTNodeImpl(parent, true, scanner.getTokenOffset()), true);
      case 9:
        /*FalseKeyword*/
        return _finalize(new BooleanASTNodeImpl(parent, false, scanner.getTokenOffset()), true);
      default:
        return undefined;
    }
  }
  function _parseValue(parent) {
    return _parseArray(parent) || _parseObject(parent) || _parseString(parent) || _parseNumber(parent) || _parseLiteral(parent);
  }
  var _root = undefined;
  var token = _scanNext();
  if (token !== 17) /*EOF*/
  {
    _root = _parseValue(_root);
    if (!_root) {
      _error(localize('Invalid symbol', 'Expected a JSON object, array or literal.'), _jsonLanguageTypesJs.ErrorCode.Undefined);
    } else if (scanner.getToken() !== 17) /*EOF*/
    {
      _error(localize('End of file expected', 'End of file expected.'), _jsonLanguageTypesJs.ErrorCode.Undefined);
    }
  }
  return new JSONDocument(_root, problems, commentRanges);
}

},{"./../../jsonc-parser/main.js":"7Foak","../utils/objects.js":"2EsVe","../jsonLanguageTypes.js":"7JR1I","./../../../fillers/vscode-nls.js":"Io1zy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7Foak":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "createScanner", function () {
  return createScanner;
});
_parcelHelpers.export(exports, "getLocation", function () {
  return getLocation;
});
_parcelHelpers.export(exports, "parse", function () {
  return parse;
});
_parcelHelpers.export(exports, "parseTree", function () {
  return parseTree;
});
_parcelHelpers.export(exports, "findNodeAtLocation", function () {
  return findNodeAtLocation;
});
_parcelHelpers.export(exports, "findNodeAtOffset", function () {
  return findNodeAtOffset;
});
_parcelHelpers.export(exports, "getNodePath", function () {
  return getNodePath;
});
_parcelHelpers.export(exports, "getNodeValue", function () {
  return getNodeValue;
});
_parcelHelpers.export(exports, "visit", function () {
  return visit;
});
_parcelHelpers.export(exports, "stripComments", function () {
  return stripComments;
});
_parcelHelpers.export(exports, "printParseErrorCode", function () {
  return printParseErrorCode;
});
_parcelHelpers.export(exports, "format", function () {
  return format;
});
_parcelHelpers.export(exports, "modify", function () {
  return modify;
});
_parcelHelpers.export(exports, "applyEdits", function () {
  return applyEdits;
});
var _implFormatJs = require('./impl/format.js');
var _implEditJs = require('./impl/edit.js');
var _implScannerJs = require('./impl/scanner.js');
var _implParserJs = require('./impl/parser.js');
var createScanner = _implScannerJs.createScanner;
var getLocation = _implParserJs.getLocation;
var parse = _implParserJs.parse;
var parseTree = _implParserJs.parseTree;
var findNodeAtLocation = _implParserJs.findNodeAtLocation;
var findNodeAtOffset = _implParserJs.findNodeAtOffset;
var getNodePath = _implParserJs.getNodePath;
var getNodeValue = _implParserJs.getNodeValue;
var visit = _implParserJs.visit;
var stripComments = _implParserJs.stripComments;
function printParseErrorCode(code) {
  switch (code) {
    case 1:
      /*InvalidSymbol*/
      return 'InvalidSymbol';
    case 2:
      /*InvalidNumberFormat*/
      return 'InvalidNumberFormat';
    case 3:
      /*PropertyNameExpected*/
      return 'PropertyNameExpected';
    case 4:
      /*ValueExpected*/
      return 'ValueExpected';
    case 5:
      /*ColonExpected*/
      return 'ColonExpected';
    case 6:
      /*CommaExpected*/
      return 'CommaExpected';
    case 7:
      /*CloseBraceExpected*/
      return 'CloseBraceExpected';
    case 8:
      /*CloseBracketExpected*/
      return 'CloseBracketExpected';
    case 9:
      /*EndOfFileExpected*/
      return 'EndOfFileExpected';
    case 10:
      /*InvalidCommentToken*/
      return 'InvalidCommentToken';
    case 11:
      /*UnexpectedEndOfComment*/
      return 'UnexpectedEndOfComment';
    case 12:
      /*UnexpectedEndOfString*/
      return 'UnexpectedEndOfString';
    case 13:
      /*UnexpectedEndOfNumber*/
      return 'UnexpectedEndOfNumber';
    case 14:
      /*InvalidUnicode*/
      return 'InvalidUnicode';
    case 15:
      /*InvalidEscapeCharacter*/
      return 'InvalidEscapeCharacter';
    case 16:
      /*InvalidCharacter*/
      return 'InvalidCharacter';
  }
  return '<unknown ParseErrorCode>';
}
function format(documentText, range, options) {
  return _implFormatJs.format(documentText, range, options);
}
function modify(text, path, value, options) {
  return _implEditJs.setProperty(text, path, value, options);
}
function applyEdits(text, edits) {
  for (var i = edits.length - 1; i >= 0; i--) {
    text = _implEditJs.applyEdit(text, edits[i]);
  }
  return text;
}

},{"./impl/format.js":"07R81","./impl/edit.js":"5UOUO","./impl/scanner.js":"RaOqM","./impl/parser.js":"46yPO","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"07R81":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "format", function () {
  return format;
});
_parcelHelpers.export(exports, "isEOL", function () {
  return isEOL;
});
var _scannerJs = require('./scanner.js');
function format(documentText, range, options) {
  var initialIndentLevel;
  var formatText;
  var formatTextStart;
  var rangeStart;
  var rangeEnd;
  if (range) {
    rangeStart = range.offset;
    rangeEnd = rangeStart + range.length;
    formatTextStart = rangeStart;
    while (formatTextStart > 0 && !isEOL(documentText, formatTextStart - 1)) {
      formatTextStart--;
    }
    var endOffset = rangeEnd;
    while (endOffset < documentText.length && !isEOL(documentText, endOffset)) {
      endOffset++;
    }
    formatText = documentText.substring(formatTextStart, endOffset);
    initialIndentLevel = computeIndentLevel(formatText, options);
  } else {
    formatText = documentText;
    initialIndentLevel = 0;
    formatTextStart = 0;
    rangeStart = 0;
    rangeEnd = documentText.length;
  }
  var eol = getEOL(options, documentText);
  var lineBreak = false;
  var indentLevel = 0;
  var indentValue;
  if (options.insertSpaces) {
    indentValue = repeat(' ', options.tabSize || 4);
  } else {
    indentValue = '\t';
  }
  var scanner = _scannerJs.createScanner(formatText, false);
  var hasError = false;
  function newLineAndIndent() {
    return eol + repeat(indentValue, initialIndentLevel + indentLevel);
  }
  function scanNext() {
    var token = scanner.scan();
    lineBreak = false;
    while (token === 15 || /*Trivia*/
    token === 14) /*LineBreakTrivia*/
    {
      lineBreak = lineBreak || token === 14;
      token = scanner.scan();
    }
    hasError = token === 16 || /*Unknown*/
    scanner.getTokenError() !== 0;
    return token;
  }
  var editOperations = [];
  function addEdit(text, startOffset, endOffset) {
    if (!hasError && (!range || startOffset < rangeEnd && endOffset > rangeStart) && documentText.substring(startOffset, endOffset) !== text) {
      editOperations.push({
        offset: startOffset,
        length: endOffset - startOffset,
        content: text
      });
    }
  }
  var firstToken = scanNext();
  if (firstToken !== 17) /*EOF*/
  {
    var firstTokenStart = scanner.getTokenOffset() + formatTextStart;
    var initialIndent = repeat(indentValue, initialIndentLevel);
    addEdit(initialIndent, formatTextStart, firstTokenStart);
  }
  while (firstToken !== 17) /*EOF*/
  {
    var firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
    var secondToken = scanNext();
    var replaceContent = '';
    var needsLineBreak = false;
    while (!lineBreak && (secondToken === 12 || /*LineCommentTrivia*/
    secondToken === 13)) {
      // comments on the same line: keep them on the same line, but ignore them otherwise
      var commentTokenStart = scanner.getTokenOffset() + formatTextStart;
      addEdit(' ', firstTokenEnd, commentTokenStart);
      firstTokenEnd = scanner.getTokenOffset() + scanner.getTokenLength() + formatTextStart;
      needsLineBreak = secondToken === 12;
      replaceContent = needsLineBreak ? newLineAndIndent() : '';
      secondToken = scanNext();
    }
    if (secondToken === 2) /*CloseBraceToken*/
    {
      if (firstToken !== 1) /*OpenBraceToken*/
      {
        indentLevel--;
        replaceContent = newLineAndIndent();
      }
    } else if (secondToken === 4) /*CloseBracketToken*/
    {
      if (firstToken !== 3) /*OpenBracketToken*/
      {
        indentLevel--;
        replaceContent = newLineAndIndent();
      }
    } else {
      switch (firstToken) {
        case 3:
        case 1:
          /*OpenBraceToken*/
          indentLevel++;
          replaceContent = newLineAndIndent();
          break;
        case 5:
        case 12:
          /*LineCommentTrivia*/
          replaceContent = newLineAndIndent();
          break;
        case 13:
          /*BlockCommentTrivia*/
          if (lineBreak) {
            replaceContent = newLineAndIndent();
          } else if (!needsLineBreak) {
            // symbol following comment on the same line: keep on same line, separate with ' '
            replaceContent = ' ';
          }
          break;
        case 6:
          /*ColonToken*/
          if (!needsLineBreak) {
            replaceContent = ' ';
          }
          break;
        case 10:
          /*StringLiteral*/
          if (secondToken === 6) /*ColonToken*/
          {
            if (!needsLineBreak) {
              replaceContent = '';
            }
            break;
          }
        case 7:
        case 8:
        case 9:
        case 11:
        case 2:
        case 4:
          /*CloseBracketToken*/
          if (secondToken === 12 || /*LineCommentTrivia*/
          secondToken === 13) /*BlockCommentTrivia*/
          {
            if (!needsLineBreak) {
              replaceContent = ' ';
            }
          } else if (secondToken !== 5 && /*CommaToken*/
          secondToken !== 17) /*EOF*/
          {
            hasError = true;
          }
          break;
        case 16:
          /*Unknown*/
          hasError = true;
          break;
      }
      if (lineBreak && (secondToken === 12 || /*LineCommentTrivia*/
      secondToken === 13)) {
        replaceContent = newLineAndIndent();
      }
    }
    if (secondToken === 17) /*EOF*/
    {
      replaceContent = options.insertFinalNewline ? eol : '';
    }
    var secondTokenStart = scanner.getTokenOffset() + formatTextStart;
    addEdit(replaceContent, firstTokenEnd, secondTokenStart);
    firstToken = secondToken;
  }
  return editOperations;
}
function repeat(s, count) {
  var result = '';
  for (var i = 0; i < count; i++) {
    result += s;
  }
  return result;
}
function computeIndentLevel(content, options) {
  var i = 0;
  var nChars = 0;
  var tabSize = options.tabSize || 4;
  while (i < content.length) {
    var ch = content.charAt(i);
    if (ch === ' ') {
      nChars++;
    } else if (ch === '\t') {
      nChars += tabSize;
    } else {
      break;
    }
    i++;
  }
  return Math.floor(nChars / tabSize);
}
function getEOL(options, text) {
  for (var i = 0; i < text.length; i++) {
    var ch = text.charAt(i);
    if (ch === '\r') {
      if (i + 1 < text.length && text.charAt(i + 1) === '\n') {
        return '\r\n';
      }
      return '\r';
    } else if (ch === '\n') {
      return '\n';
    }
  }
  return options && options.eol || '\n';
}
function isEOL(text, offset) {
  return ('\r\n').indexOf(text.charAt(offset)) !== -1;
}

},{"./scanner.js":"RaOqM","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"RaOqM":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "createScanner", function () {
  return createScanner;
});
function createScanner(text, ignoreTrivia) {
  if (ignoreTrivia === void 0) {
    ignoreTrivia = false;
  }
  var len = text.length;
  var pos = 0, value = '', tokenOffset = 0, token = 16, /*Unknown*/
  lineNumber = 0, lineStartOffset = 0, tokenLineStartOffset = 0, prevTokenLineStartOffset = 0, scanError = 0;
  function scanHexDigits(count, exact) {
    var digits = 0;
    var value = 0;
    while (digits < count || !exact) {
      var ch = text.charCodeAt(pos);
      if (ch >= 48 && /*_0*/
      ch <= 57) /*_9*/
      {
        value = value * 16 + ch - 48;
      } else if (ch >= 65 && /*A*/
      ch <= 70) /*F*/
      {
        value = value * 16 + ch - 65 + /*A*/
        10;
      } else if (ch >= 97 && /*a*/
      ch <= 102) /*f*/
      {
        value = value * 16 + ch - 97 + /*a*/
        10;
      } else {
        break;
      }
      pos++;
      digits++;
    }
    if (digits < count) {
      value = -1;
    }
    return value;
  }
  function setPosition(newPosition) {
    pos = newPosition;
    value = '';
    tokenOffset = 0;
    token = 16;
    scanError = 0;
  }
  function scanNumber() {
    var start = pos;
    if (text.charCodeAt(pos) === 48) /*_0*/
    {
      pos++;
    } else {
      pos++;
      while (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
      }
    }
    if (pos < text.length && text.charCodeAt(pos) === 46) /*dot*/
    {
      pos++;
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
      } else {
        scanError = 3;
        return text.substring(start, pos);
      }
    }
    var end = pos;
    if (pos < text.length && (text.charCodeAt(pos) === 69 || /*E*/
    text.charCodeAt(pos) === 101)) {
      pos++;
      if (pos < text.length && text.charCodeAt(pos) === 43 || /*plus*/
      text.charCodeAt(pos) === 45) /*minus*/
      {
        pos++;
      }
      if (pos < text.length && isDigit(text.charCodeAt(pos))) {
        pos++;
        while (pos < text.length && isDigit(text.charCodeAt(pos))) {
          pos++;
        }
        end = pos;
      } else {
        scanError = 3;
      }
    }
    return text.substring(start, end);
  }
  function scanString() {
    var result = '', start = pos;
    while (true) {
      if (pos >= len) {
        result += text.substring(start, pos);
        scanError = 2;
        break;
      }
      var ch = text.charCodeAt(pos);
      if (ch === 34) /*doubleQuote*/
      {
        result += text.substring(start, pos);
        pos++;
        break;
      }
      if (ch === 92) /*backslash*/
      {
        result += text.substring(start, pos);
        pos++;
        if (pos >= len) {
          scanError = 2;
          break;
        }
        var ch2 = text.charCodeAt(pos++);
        switch (ch2) {
          case 34:
            /*doubleQuote*/
            result += '\"';
            break;
          case 92:
            /*backslash*/
            result += '\\';
            break;
          case 47:
            /*slash*/
            result += '/';
            break;
          case 98:
            /*b*/
            result += '\b';
            break;
          case 102:
            /*f*/
            result += '\f';
            break;
          case 110:
            /*n*/
            result += '\n';
            break;
          case 114:
            /*r*/
            result += '\r';
            break;
          case 116:
            /*t*/
            result += '\t';
            break;
          case 117:
            /*u*/
            var ch3 = scanHexDigits(4, true);
            if (ch3 >= 0) {
              result += String.fromCharCode(ch3);
            } else {
              scanError = 4;
            }
            break;
          default:
            scanError = 5;
        }
        start = pos;
        continue;
      }
      if (ch >= 0 && ch <= 0x1f) {
        if (isLineBreak(ch)) {
          result += text.substring(start, pos);
          scanError = 2;
          break;
        } else {
          scanError = 6;
        }
      }
      pos++;
    }
    return result;
  }
  function scanNext() {
    value = '';
    scanError = 0;
    tokenOffset = pos;
    lineStartOffset = lineNumber;
    prevTokenLineStartOffset = tokenLineStartOffset;
    if (pos >= len) {
      // at the end
      tokenOffset = len;
      return token = 17;
    }
    var code = text.charCodeAt(pos);
    // trivia: whitespace
    if (isWhiteSpace(code)) {
      do {
        pos++;
        value += String.fromCharCode(code);
        code = text.charCodeAt(pos);
      } while (isWhiteSpace(code));
      return token = 15;
    }
    // trivia: newlines
    if (isLineBreak(code)) {
      pos++;
      value += String.fromCharCode(code);
      if (code === 13 && /*carriageReturn*/
      text.charCodeAt(pos) === 10) /*lineFeed*/
      {
        pos++;
        value += '\n';
      }
      lineNumber++;
      tokenLineStartOffset = pos;
      return token = 14;
    }
    switch (code) {
      case 123:
        /*openBrace*/
        pos++;
        return token = 1;
      case 125:
        /*closeBrace*/
        pos++;
        return token = 2;
      case 91:
        /*openBracket*/
        pos++;
        return token = 3;
      case 93:
        /*closeBracket*/
        pos++;
        return token = 4;
      case 58:
        /*colon*/
        pos++;
        return token = 6;
      case 44:
        /*comma*/
        pos++;
        return token = 5;
      case 34:
        /*doubleQuote*/
        pos++;
        value = scanString();
        return token = 10;
      case 47:
        /*slash*/
        var start = pos - 1;
        // Single-line comment
        if (text.charCodeAt(pos + 1) === 47) /*slash*/
        {
          pos += 2;
          while (pos < len) {
            if (isLineBreak(text.charCodeAt(pos))) {
              break;
            }
            pos++;
          }
          value = text.substring(start, pos);
          return token = 12;
        }
        // Multi-line comment
        if (text.charCodeAt(pos + 1) === 42) /*asterisk*/
        {
          pos += 2;
          var safeLength = len - 1;
          // For lookahead.
          var commentClosed = false;
          while (pos < safeLength) {
            var ch = text.charCodeAt(pos);
            if (ch === 42 && /*asterisk*/
            text.charCodeAt(pos + 1) === 47) /*slash*/
            {
              pos += 2;
              commentClosed = true;
              break;
            }
            pos++;
            if (isLineBreak(ch)) {
              if (ch === 13 && /*carriageReturn*/
              text.charCodeAt(pos) === 10) /*lineFeed*/
              {
                pos++;
              }
              lineNumber++;
              tokenLineStartOffset = pos;
            }
          }
          if (!commentClosed) {
            pos++;
            scanError = 1;
          }
          value = text.substring(start, pos);
          return token = 13;
        }
        // just a single slash
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
      case 45:
        /*minus*/
        value += String.fromCharCode(code);
        pos++;
        if (pos === len || !isDigit(text.charCodeAt(pos))) {
          return token = 16;
        }
      case 48:
      case 49:
      case 50:
      case 51:
      case 52:
      case 53:
      case 54:
      case 55:
      case 56:
      case 57:
        /*_9*/
        value += scanNumber();
        return token = 11;
      default:
        // is a literal? Read the full word.
        while (pos < len && isUnknownContentCharacter(code)) {
          pos++;
          code = text.charCodeAt(pos);
        }
        if (tokenOffset !== pos) {
          value = text.substring(tokenOffset, pos);
          // keywords: true, false, null
          switch (value) {
            case 'true':
              return token = 8;
            case 'false':
              return token = 9;
            case 'null':
              return token = 7;
          }
          return token = 16;
        }
        // some
        value += String.fromCharCode(code);
        pos++;
        return token = 16;
    }
  }
  function isUnknownContentCharacter(code) {
    if (isWhiteSpace(code) || isLineBreak(code)) {
      return false;
    }
    switch (code) {
      case 125:
      case 93:
      case 123:
      case 91:
      case 34:
      case 58:
      case 44:
      case 47:
        /*slash*/
        return false;
    }
    return true;
  }
  function scanNextNonTrivia() {
    var result;
    do {
      result = scanNext();
    } while (result >= 12 && /*LineCommentTrivia*/
    result <= 15);
    return result;
  }
  return {
    setPosition: setPosition,
    getPosition: function () {
      return pos;
    },
    scan: ignoreTrivia ? scanNextNonTrivia : scanNext,
    getToken: function () {
      return token;
    },
    getTokenValue: function () {
      return value;
    },
    getTokenOffset: function () {
      return tokenOffset;
    },
    getTokenLength: function () {
      return pos - tokenOffset;
    },
    getTokenStartLine: function () {
      return lineStartOffset;
    },
    getTokenStartCharacter: function () {
      return tokenOffset - prevTokenLineStartOffset;
    },
    getTokenError: function () {
      return scanError;
    }
  };
}
function isWhiteSpace(ch) {
  return ch === 32 || /*space*/
  ch === 9 || /*tab*/
  ch === 11 || /*verticalTab*/
  ch === 12 || /*formFeed*/
  ch === 160 || /*nonBreakingSpace*/
  ch === 5760 || /*ogham*/
  ch >= 8192 && /*enQuad*/
  ch <= 8203 || /*zeroWidthSpace*/
  ch === 8239 || /*narrowNoBreakSpace*/
  ch === 8287 || /*mathematicalSpace*/
  ch === 12288 || /*ideographicSpace*/
  ch === 65279;
}
function isLineBreak(ch) {
  return ch === 10 || /*lineFeed*/
  ch === 13 || /*carriageReturn*/
  ch === 8232 || /*lineSeparator*/
  ch === 8233;
}
function isDigit(ch) {
  return ch >= 48 && /*_0*/
  ch <= 57;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5UOUO":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "removeProperty", function () {
  return removeProperty;
});
_parcelHelpers.export(exports, "setProperty", function () {
  return setProperty;
});
_parcelHelpers.export(exports, "applyEdit", function () {
  return applyEdit;
});
_parcelHelpers.export(exports, "isWS", function () {
  return isWS;
});
var _formatJs = require('./format.js');
var _parserJs = require('./parser.js');
function removeProperty(text, path, options) {
  return setProperty(text, path, void 0, options);
}
function setProperty(text, originalPath, value, options) {
  var _a;
  var path = originalPath.slice();
  var errors = [];
  var root = _parserJs.parseTree(text, errors);
  var parent = void 0;
  var lastSegment = void 0;
  while (path.length > 0) {
    lastSegment = path.pop();
    parent = _parserJs.findNodeAtLocation(root, path);
    if (parent === void 0 && value !== void 0) {
      if (typeof lastSegment === 'string') {
        value = (_a = {}, _a[lastSegment] = value, _a);
      } else {
        value = [value];
      }
    } else {
      break;
    }
  }
  if (!parent) {
    // empty document
    if (value === void 0) {
      // delete
      throw new Error('Can not delete in empty document');
    }
    return withFormatting(text, {
      offset: root ? root.offset : 0,
      length: root ? root.length : 0,
      content: JSON.stringify(value)
    }, options);
  } else if (parent.type === 'object' && typeof lastSegment === 'string' && Array.isArray(parent.children)) {
    var existing = _parserJs.findNodeAtLocation(parent, [lastSegment]);
    if (existing !== void 0) {
      if (value === void 0) {
        // delete
        if (!existing.parent) {
          throw new Error('Malformed AST');
        }
        var propertyIndex = parent.children.indexOf(existing.parent);
        var removeBegin = void 0;
        var removeEnd = existing.parent.offset + existing.parent.length;
        if (propertyIndex > 0) {
          // remove the comma of the previous node
          var previous = parent.children[propertyIndex - 1];
          removeBegin = previous.offset + previous.length;
        } else {
          removeBegin = parent.offset + 1;
          if (parent.children.length > 1) {
            // remove the comma of the next node
            var next = parent.children[1];
            removeEnd = next.offset;
          }
        }
        return withFormatting(text, {
          offset: removeBegin,
          length: removeEnd - removeBegin,
          content: ''
        }, options);
      } else {
        // set value of existing property
        return withFormatting(text, {
          offset: existing.offset,
          length: existing.length,
          content: JSON.stringify(value)
        }, options);
      }
    } else {
      if (value === void 0) {
        // delete
        return [];
      }
      var newProperty = JSON.stringify(lastSegment) + ": " + JSON.stringify(value);
      var index = options.getInsertionIndex ? options.getInsertionIndex(parent.children.map(function (p) {
        return p.children[0].value;
      })) : parent.children.length;
      var edit = void 0;
      if (index > 0) {
        var previous = parent.children[index - 1];
        edit = {
          offset: previous.offset + previous.length,
          length: 0,
          content: ',' + newProperty
        };
      } else if (parent.children.length === 0) {
        edit = {
          offset: parent.offset + 1,
          length: 0,
          content: newProperty
        };
      } else {
        edit = {
          offset: parent.offset + 1,
          length: 0,
          content: newProperty + ','
        };
      }
      return withFormatting(text, edit, options);
    }
  } else if (parent.type === 'array' && typeof lastSegment === 'number' && Array.isArray(parent.children)) {
    var insertIndex = lastSegment;
    if (insertIndex === -1) {
      // Insert
      var newProperty = "" + JSON.stringify(value);
      var edit = void 0;
      if (parent.children.length === 0) {
        edit = {
          offset: parent.offset + 1,
          length: 0,
          content: newProperty
        };
      } else {
        var previous = parent.children[parent.children.length - 1];
        edit = {
          offset: previous.offset + previous.length,
          length: 0,
          content: ',' + newProperty
        };
      }
      return withFormatting(text, edit, options);
    } else if (value === void 0 && parent.children.length >= 0) {
      // Removal
      var removalIndex = lastSegment;
      var toRemove = parent.children[removalIndex];
      var edit = void 0;
      if (parent.children.length === 1) {
        // only item
        edit = {
          offset: parent.offset + 1,
          length: parent.length - 2,
          content: ''
        };
      } else if (parent.children.length - 1 === removalIndex) {
        // last item
        var previous = parent.children[removalIndex - 1];
        var offset = previous.offset + previous.length;
        var parentEndOffset = parent.offset + parent.length;
        edit = {
          offset: offset,
          length: parentEndOffset - 2 - offset,
          content: ''
        };
      } else {
        edit = {
          offset: toRemove.offset,
          length: parent.children[removalIndex + 1].offset - toRemove.offset,
          content: ''
        };
      }
      return withFormatting(text, edit, options);
    } else if (value !== void 0) {
      var edit = void 0;
      var newProperty = "" + JSON.stringify(value);
      if (!options.isArrayInsertion && parent.children.length > lastSegment) {
        var toModify = parent.children[lastSegment];
        edit = {
          offset: toModify.offset,
          length: toModify.length,
          content: newProperty
        };
      } else if (parent.children.length === 0 || lastSegment === 0) {
        edit = {
          offset: parent.offset + 1,
          length: 0,
          content: parent.children.length === 0 ? newProperty : newProperty + ','
        };
      } else {
        var index = lastSegment > parent.children.length ? parent.children.length : lastSegment;
        var previous = parent.children[index - 1];
        edit = {
          offset: previous.offset + previous.length,
          length: 0,
          content: ',' + newProperty
        };
      }
      return withFormatting(text, edit, options);
    } else {
      throw new Error("Can not " + (value === void 0 ? 'remove' : options.isArrayInsertion ? 'insert' : 'modify') + " Array index " + insertIndex + " as length is not sufficient");
    }
  } else {
    throw new Error("Can not add " + (typeof lastSegment !== 'number' ? 'index' : 'property') + " to parent of type " + parent.type);
  }
}
function withFormatting(text, edit, options) {
  if (!options.formattingOptions) {
    return [edit];
  }
  // apply the edit
  var newText = applyEdit(text, edit);
  // format the new text
  var begin = edit.offset;
  var end = edit.offset + edit.content.length;
  if (edit.length === 0 || edit.content.length === 0) {
    // insert or remove
    while (begin > 0 && !_formatJs.isEOL(newText, begin - 1)) {
      begin--;
    }
    while (end < newText.length && !_formatJs.isEOL(newText, end)) {
      end++;
    }
  }
  var edits = _formatJs.format(newText, {
    offset: begin,
    length: end - begin
  }, options.formattingOptions);
  // apply the formatting edits and track the begin and end offsets of the changes
  for (var i = edits.length - 1; i >= 0; i--) {
    var edit_1 = edits[i];
    newText = applyEdit(newText, edit_1);
    begin = Math.min(begin, edit_1.offset);
    end = Math.max(end, edit_1.offset + edit_1.length);
    end += edit_1.content.length - edit_1.length;
  }
  // create a single edit with all changes
  var editLength = text.length - (newText.length - end) - begin;
  return [{
    offset: begin,
    length: editLength,
    content: newText.substring(begin, end)
  }];
}
function applyEdit(text, edit) {
  return text.substring(0, edit.offset) + edit.content + text.substring(edit.offset + edit.length);
}
function isWS(text, offset) {
  return ('\r\n \t').indexOf(text.charAt(offset)) !== -1;
}

},{"./format.js":"07R81","./parser.js":"46yPO","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"46yPO":[function(require,module,exports) {
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getLocation", function () {
  return getLocation;
});
_parcelHelpers.export(exports, "parse", function () {
  return parse;
});
_parcelHelpers.export(exports, "parseTree", function () {
  return parseTree;
});
_parcelHelpers.export(exports, "findNodeAtLocation", function () {
  return findNodeAtLocation;
});
_parcelHelpers.export(exports, "getNodePath", function () {
  return getNodePath;
});
_parcelHelpers.export(exports, "getNodeValue", function () {
  return getNodeValue;
});
_parcelHelpers.export(exports, "contains", function () {
  return contains;
});
_parcelHelpers.export(exports, "findNodeAtOffset", function () {
  return findNodeAtOffset;
});
_parcelHelpers.export(exports, "visit", function () {
  return visit;
});
_parcelHelpers.export(exports, "stripComments", function () {
  return stripComments;
});
_parcelHelpers.export(exports, "getNodeType", function () {
  return getNodeType;
});
var _scannerJs = require('./scanner.js');
var ParseOptions;
(function (ParseOptions) {
  ParseOptions.DEFAULT = {
    allowTrailingComma: false
  };
})(ParseOptions || (ParseOptions = {}));
function getLocation(text, position) {
  var segments = [];
  // strings or numbers
  var earlyReturnException = new Object();
  var previousNode = undefined;
  var previousNodeInst = {
    value: {},
    offset: 0,
    length: 0,
    type: 'object',
    parent: undefined
  };
  var isAtPropertyKey = false;
  function setPreviousNode(value, offset, length, type) {
    previousNodeInst.value = value;
    previousNodeInst.offset = offset;
    previousNodeInst.length = length;
    previousNodeInst.type = type;
    previousNodeInst.colonOffset = undefined;
    previousNode = previousNodeInst;
  }
  try {
    visit(text, {
      onObjectBegin: function (offset, length) {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = undefined;
        isAtPropertyKey = position > offset;
        segments.push('');
      },
      onObjectProperty: function (name, offset, length) {
        if (position < offset) {
          throw earlyReturnException;
        }
        setPreviousNode(name, offset, length, 'property');
        segments[segments.length - 1] = name;
        if (position <= offset + length) {
          throw earlyReturnException;
        }
      },
      onObjectEnd: function (offset, length) {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = undefined;
        segments.pop();
      },
      onArrayBegin: function (offset, length) {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = undefined;
        segments.push(0);
      },
      onArrayEnd: function (offset, length) {
        if (position <= offset) {
          throw earlyReturnException;
        }
        previousNode = undefined;
        segments.pop();
      },
      onLiteralValue: function (value, offset, length) {
        if (position < offset) {
          throw earlyReturnException;
        }
        setPreviousNode(value, offset, length, getNodeType(value));
        if (position <= offset + length) {
          throw earlyReturnException;
        }
      },
      onSeparator: function (sep, offset, length) {
        if (position <= offset) {
          throw earlyReturnException;
        }
        if (sep === ':' && previousNode && previousNode.type === 'property') {
          previousNode.colonOffset = offset;
          isAtPropertyKey = false;
          previousNode = undefined;
        } else if (sep === ',') {
          var last = segments[segments.length - 1];
          if (typeof last === 'number') {
            segments[segments.length - 1] = last + 1;
          } else {
            isAtPropertyKey = true;
            segments[segments.length - 1] = '';
          }
          previousNode = undefined;
        }
      }
    });
  } catch (e) {
    if (e !== earlyReturnException) {
      throw e;
    }
  }
  return {
    path: segments,
    previousNode: previousNode,
    isAtPropertyKey: isAtPropertyKey,
    matches: function (pattern) {
      var k = 0;
      for (var i = 0; k < pattern.length && i < segments.length; i++) {
        if (pattern[k] === segments[i] || pattern[k] === '*') {
          k++;
        } else if (pattern[k] !== '**') {
          return false;
        }
      }
      return k === pattern.length;
    }
  };
}
function parse(text, errors, options) {
  if (errors === void 0) {
    errors = [];
  }
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var currentProperty = null;
  var currentParent = [];
  var previousParents = [];
  function onValue(value) {
    if (Array.isArray(currentParent)) {
      currentParent.push(value);
    } else if (currentProperty !== null) {
      currentParent[currentProperty] = value;
    }
  }
  var visitor = {
    onObjectBegin: function () {
      var object = {};
      onValue(object);
      previousParents.push(currentParent);
      currentParent = object;
      currentProperty = null;
    },
    onObjectProperty: function (name) {
      currentProperty = name;
    },
    onObjectEnd: function () {
      currentParent = previousParents.pop();
    },
    onArrayBegin: function () {
      var array = [];
      onValue(array);
      previousParents.push(currentParent);
      currentParent = array;
      currentProperty = null;
    },
    onArrayEnd: function () {
      currentParent = previousParents.pop();
    },
    onLiteralValue: onValue,
    onError: function (error, offset, length) {
      errors.push({
        error: error,
        offset: offset,
        length: length
      });
    }
  };
  visit(text, visitor, options);
  return currentParent[0];
}
function parseTree(text, errors, options) {
  if (errors === void 0) {
    errors = [];
  }
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var currentParent = {
    type: 'array',
    offset: -1,
    length: -1,
    children: [],
    parent: undefined
  };
  // artificial root
  function ensurePropertyComplete(endOffset) {
    if (currentParent.type === 'property') {
      currentParent.length = endOffset - currentParent.offset;
      currentParent = currentParent.parent;
    }
  }
  function onValue(valueNode) {
    currentParent.children.push(valueNode);
    return valueNode;
  }
  var visitor = {
    onObjectBegin: function (offset) {
      currentParent = onValue({
        type: 'object',
        offset: offset,
        length: -1,
        parent: currentParent,
        children: []
      });
    },
    onObjectProperty: function (name, offset, length) {
      currentParent = onValue({
        type: 'property',
        offset: offset,
        length: -1,
        parent: currentParent,
        children: []
      });
      currentParent.children.push({
        type: 'string',
        value: name,
        offset: offset,
        length: length,
        parent: currentParent
      });
    },
    onObjectEnd: function (offset, length) {
      ensurePropertyComplete(offset + length);
      // in case of a missing value for a property: make sure property is complete
      currentParent.length = offset + length - currentParent.offset;
      currentParent = currentParent.parent;
      ensurePropertyComplete(offset + length);
    },
    onArrayBegin: function (offset, length) {
      currentParent = onValue({
        type: 'array',
        offset: offset,
        length: -1,
        parent: currentParent,
        children: []
      });
    },
    onArrayEnd: function (offset, length) {
      currentParent.length = offset + length - currentParent.offset;
      currentParent = currentParent.parent;
      ensurePropertyComplete(offset + length);
    },
    onLiteralValue: function (value, offset, length) {
      onValue({
        type: getNodeType(value),
        offset: offset,
        length: length,
        parent: currentParent,
        value: value
      });
      ensurePropertyComplete(offset + length);
    },
    onSeparator: function (sep, offset, length) {
      if (currentParent.type === 'property') {
        if (sep === ':') {
          currentParent.colonOffset = offset;
        } else if (sep === ',') {
          ensurePropertyComplete(offset);
        }
      }
    },
    onError: function (error, offset, length) {
      errors.push({
        error: error,
        offset: offset,
        length: length
      });
    }
  };
  visit(text, visitor, options);
  var result = currentParent.children[0];
  if (result) {
    delete result.parent;
  }
  return result;
}
function findNodeAtLocation(root, path) {
  if (!root) {
    return undefined;
  }
  var node = root;
  for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
    var segment = path_1[_i];
    if (typeof segment === 'string') {
      if (node.type !== 'object' || !Array.isArray(node.children)) {
        return undefined;
      }
      var found = false;
      for (var _a = 0, _b = node.children; _a < _b.length; _a++) {
        var propertyNode = _b[_a];
        if (Array.isArray(propertyNode.children) && propertyNode.children[0].value === segment) {
          node = propertyNode.children[1];
          found = true;
          break;
        }
      }
      if (!found) {
        return undefined;
      }
    } else {
      var index = segment;
      if (node.type !== 'array' || index < 0 || !Array.isArray(node.children) || index >= node.children.length) {
        return undefined;
      }
      node = node.children[index];
    }
  }
  return node;
}
function getNodePath(node) {
  if (!node.parent || !node.parent.children) {
    return [];
  }
  var path = getNodePath(node.parent);
  if (node.parent.type === 'property') {
    var key = node.parent.children[0].value;
    path.push(key);
  } else if (node.parent.type === 'array') {
    var index = node.parent.children.indexOf(node);
    if (index !== -1) {
      path.push(index);
    }
  }
  return path;
}
function getNodeValue(node) {
  switch (node.type) {
    case 'array':
      return node.children.map(getNodeValue);
    case 'object':
      var obj = Object.create(null);
      for (var _i = 0, _a = node.children; _i < _a.length; _i++) {
        var prop = _a[_i];
        var valueNode = prop.children[1];
        if (valueNode) {
          obj[prop.children[0].value] = getNodeValue(valueNode);
        }
      }
      return obj;
    case 'null':
    case 'string':
    case 'number':
    case 'boolean':
      return node.value;
    default:
      return undefined;
  }
}
function contains(node, offset, includeRightBound) {
  if (includeRightBound === void 0) {
    includeRightBound = false;
  }
  return offset >= node.offset && offset < node.offset + node.length || includeRightBound && offset === node.offset + node.length;
}
function findNodeAtOffset(node, offset, includeRightBound) {
  if (includeRightBound === void 0) {
    includeRightBound = false;
  }
  if (contains(node, offset, includeRightBound)) {
    var children = node.children;
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length && children[i].offset <= offset; i++) {
        var item = findNodeAtOffset(children[i], offset, includeRightBound);
        if (item) {
          return item;
        }
      }
    }
    return node;
  }
  return undefined;
}
function visit(text, visitor, options) {
  if (options === void 0) {
    options = ParseOptions.DEFAULT;
  }
  var _scanner = _scannerJs.createScanner(text, false);
  function toNoArgVisit(visitFunction) {
    return visitFunction ? function () {
      return visitFunction(_scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function () {
      return true;
    };
  }
  function toOneArgVisit(visitFunction) {
    return visitFunction ? function (arg) {
      return visitFunction(arg, _scanner.getTokenOffset(), _scanner.getTokenLength(), _scanner.getTokenStartLine(), _scanner.getTokenStartCharacter());
    } : function () {
      return true;
    };
  }
  var onObjectBegin = toNoArgVisit(visitor.onObjectBegin), onObjectProperty = toOneArgVisit(visitor.onObjectProperty), onObjectEnd = toNoArgVisit(visitor.onObjectEnd), onArrayBegin = toNoArgVisit(visitor.onArrayBegin), onArrayEnd = toNoArgVisit(visitor.onArrayEnd), onLiteralValue = toOneArgVisit(visitor.onLiteralValue), onSeparator = toOneArgVisit(visitor.onSeparator), onComment = toNoArgVisit(visitor.onComment), onError = toOneArgVisit(visitor.onError);
  var disallowComments = options && options.disallowComments;
  var allowTrailingComma = options && options.allowTrailingComma;
  function scanNext() {
    while (true) {
      var token = _scanner.scan();
      switch (_scanner.getTokenError()) {
        case 4:
          /*InvalidUnicode*/
          handleError(14);
          break;
        case 5:
          /*InvalidEscapeCharacter*/
          handleError(15);
          break;
        case 3:
          /*UnexpectedEndOfNumber*/
          handleError(13);
          break;
        case 1:
          /*UnexpectedEndOfComment*/
          if (!disallowComments) {
            handleError(11);
          }
          break;
        case 2:
          /*UnexpectedEndOfString*/
          handleError(12);
          break;
        case 6:
          /*InvalidCharacter*/
          handleError(16);
          break;
      }
      switch (token) {
        case 12:
        case 13:
          /*BlockCommentTrivia*/
          if (disallowComments) {
            handleError(10);
          } else {
            onComment();
          }
          break;
        case 16:
          /*Unknown*/
          handleError(1);
          break;
        case 15:
        case 14:
          /*LineBreakTrivia*/
          break;
        default:
          return token;
      }
    }
  }
  function handleError(error, skipUntilAfter, skipUntil) {
    if (skipUntilAfter === void 0) {
      skipUntilAfter = [];
    }
    if (skipUntil === void 0) {
      skipUntil = [];
    }
    onError(error);
    if (skipUntilAfter.length + skipUntil.length > 0) {
      var token = _scanner.getToken();
      while (token !== 17) /*EOF*/
      {
        if (skipUntilAfter.indexOf(token) !== -1) {
          scanNext();
          break;
        } else if (skipUntil.indexOf(token) !== -1) {
          break;
        }
        token = scanNext();
      }
    }
  }
  function parseString(isValue) {
    var value = _scanner.getTokenValue();
    if (isValue) {
      onLiteralValue(value);
    } else {
      onObjectProperty(value);
    }
    scanNext();
    return true;
  }
  function parseLiteral() {
    switch (_scanner.getToken()) {
      case 11:
        /*NumericLiteral*/
        var tokenValue = _scanner.getTokenValue();
        var value = Number(tokenValue);
        if (isNaN(value)) {
          handleError(2);
          value = 0;
        }
        onLiteralValue(value);
        break;
      case 7:
        /*NullKeyword*/
        onLiteralValue(null);
        break;
      case 8:
        /*TrueKeyword*/
        onLiteralValue(true);
        break;
      case 9:
        /*FalseKeyword*/
        onLiteralValue(false);
        break;
      default:
        return false;
    }
    scanNext();
    return true;
  }
  function parseProperty() {
    if (_scanner.getToken() !== 10) /*StringLiteral*/
    {
      handleError(3, /*PropertyNameExpected*/
      [], [2, /*CloseBraceToken*/
      5]);
      return false;
    }
    parseString(false);
    if (_scanner.getToken() === 6) /*ColonToken*/
    {
      onSeparator(':');
      scanNext();
      // consume colon
      if (!parseValue()) {
        handleError(4, /*ValueExpected*/
        [], [2, /*CloseBraceToken*/
        5]);
      }
    } else {
      handleError(5, /*ColonExpected*/
      [], [2, /*CloseBraceToken*/
      5]);
    }
    return true;
  }
  function parseObject() {
    onObjectBegin();
    scanNext();
    // consume open brace
    var needsComma = false;
    while (_scanner.getToken() !== 2 && /*CloseBraceToken*/
    _scanner.getToken() !== 17) /*EOF*/
    {
      if (_scanner.getToken() === 5) /*CommaToken*/
      {
        if (!needsComma) {
          handleError(4, /*ValueExpected*/
          [], []);
        }
        onSeparator(',');
        scanNext();
        // consume comma
        if (_scanner.getToken() === 2 && /*CloseBraceToken*/
        allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, /*CommaExpected*/
        [], []);
      }
      if (!parseProperty()) {
        handleError(4, /*ValueExpected*/
        [], [2, /*CloseBraceToken*/
        5]);
      }
      needsComma = true;
    }
    onObjectEnd();
    if (_scanner.getToken() !== 2) /*CloseBraceToken*/
    {
      handleError(7, /*CloseBraceExpected*/
      [2], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseArray() {
    onArrayBegin();
    scanNext();
    // consume open bracket
    var needsComma = false;
    while (_scanner.getToken() !== 4 && /*CloseBracketToken*/
    _scanner.getToken() !== 17) /*EOF*/
    {
      if (_scanner.getToken() === 5) /*CommaToken*/
      {
        if (!needsComma) {
          handleError(4, /*ValueExpected*/
          [], []);
        }
        onSeparator(',');
        scanNext();
        // consume comma
        if (_scanner.getToken() === 4 && /*CloseBracketToken*/
        allowTrailingComma) {
          break;
        }
      } else if (needsComma) {
        handleError(6, /*CommaExpected*/
        [], []);
      }
      if (!parseValue()) {
        handleError(4, /*ValueExpected*/
        [], [4, /*CloseBracketToken*/
        5]);
      }
      needsComma = true;
    }
    onArrayEnd();
    if (_scanner.getToken() !== 4) /*CloseBracketToken*/
    {
      handleError(8, /*CloseBracketExpected*/
      [4], []);
    } else {
      scanNext();
    }
    return true;
  }
  function parseValue() {
    switch (_scanner.getToken()) {
      case 3:
        /*OpenBracketToken*/
        return parseArray();
      case 1:
        /*OpenBraceToken*/
        return parseObject();
      case 10:
        /*StringLiteral*/
        return parseString(true);
      default:
        return parseLiteral();
    }
  }
  scanNext();
  if (_scanner.getToken() === 17) /*EOF*/
  {
    if (options.allowEmptyContent) {
      return true;
    }
    handleError(4, /*ValueExpected*/
    [], []);
    return false;
  }
  if (!parseValue()) {
    handleError(4, /*ValueExpected*/
    [], []);
    return false;
  }
  if (_scanner.getToken() !== 17) /*EOF*/
  {
    handleError(9, /*EndOfFileExpected*/
    [], []);
  }
  return true;
}
function stripComments(text, replaceCh) {
  var _scanner = _scannerJs.createScanner(text), parts = [], kind, offset = 0, pos;
  do {
    pos = _scanner.getPosition();
    kind = _scanner.scan();
    switch (kind) {
      case 12:
      case 13:
      case 17:
        /*EOF*/
        if (offset !== pos) {
          parts.push(text.substring(offset, pos));
        }
        if (replaceCh !== undefined) {
          parts.push(_scanner.getTokenValue().replace(/[^\r\n]/g, replaceCh));
        }
        offset = _scanner.getPosition();
        break;
    }
  } while (kind !== 17);
  return parts.join('');
}
function getNodeType(value) {
  switch (typeof value) {
    case 'boolean':
      return 'boolean';
    case 'number':
      return 'number';
    case 'string':
      return 'string';
    case 'object':
      {
        if (!value) {
          return 'null';
        } else if (Array.isArray(value)) {
          return 'array';
        }
        return 'object';
      }
    default:
      return 'null';
  }
}

},{"./scanner.js":"RaOqM","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"2EsVe":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "equals", function () {
  return equals;
});
_parcelHelpers.export(exports, "isNumber", function () {
  return isNumber;
});
_parcelHelpers.export(exports, "isDefined", function () {
  return isDefined;
});
_parcelHelpers.export(exports, "isBoolean", function () {
  return isBoolean;
});
_parcelHelpers.export(exports, "isString", function () {
  return isString;
});
function equals(one, other) {
  if (one === other) {
    return true;
  }
  if (one === null || one === undefined || other === null || other === undefined) {
    return false;
  }
  if (typeof one !== typeof other) {
    return false;
  }
  if (typeof one !== 'object') {
    return false;
  }
  if (Array.isArray(one) !== Array.isArray(other)) {
    return false;
  }
  var i, key;
  if (Array.isArray(one)) {
    if (one.length !== other.length) {
      return false;
    }
    for (i = 0; i < one.length; i++) {
      if (!equals(one[i], other[i])) {
        return false;
      }
    }
  } else {
    var oneKeys = [];
    for (key in one) {
      oneKeys.push(key);
    }
    oneKeys.sort();
    var otherKeys = [];
    for (key in other) {
      otherKeys.push(key);
    }
    otherKeys.sort();
    if (!equals(oneKeys, otherKeys)) {
      return false;
    }
    for (i = 0; i < oneKeys.length; i++) {
      if (!equals(one[oneKeys[i]], other[oneKeys[i]])) {
        return false;
      }
    }
  }
  return true;
}
function isNumber(val) {
  return typeof val === 'number';
}
function isDefined(val) {
  return typeof val !== 'undefined';
}
function isBoolean(val) {
  return typeof val === 'boolean';
}
function isString(val) {
  return typeof val === 'string';
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7JR1I":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "ErrorCode", function () {
  return ErrorCode;
});
_parcelHelpers.export(exports, "ClientCapabilities", function () {
  return ClientCapabilities;
});
_parcelHelpers.export(exports, "TextDocument", function () {
  return _vscodeLanguageserverTextdocumentLibEsmMainJs.TextDocument;
});
_parcelHelpers.export(exports, "Range", function () {
  return _vscodeLanguageserverTypesMainJs.Range;
});
_parcelHelpers.export(exports, "TextEdit", function () {
  return _vscodeLanguageserverTypesMainJs.TextEdit;
});
_parcelHelpers.export(exports, "Color", function () {
  return _vscodeLanguageserverTypesMainJs.Color;
});
_parcelHelpers.export(exports, "ColorInformation", function () {
  return _vscodeLanguageserverTypesMainJs.ColorInformation;
});
_parcelHelpers.export(exports, "ColorPresentation", function () {
  return _vscodeLanguageserverTypesMainJs.ColorPresentation;
});
_parcelHelpers.export(exports, "FoldingRange", function () {
  return _vscodeLanguageserverTypesMainJs.FoldingRange;
});
_parcelHelpers.export(exports, "FoldingRangeKind", function () {
  return _vscodeLanguageserverTypesMainJs.FoldingRangeKind;
});
_parcelHelpers.export(exports, "SelectionRange", function () {
  return _vscodeLanguageserverTypesMainJs.SelectionRange;
});
_parcelHelpers.export(exports, "Diagnostic", function () {
  return _vscodeLanguageserverTypesMainJs.Diagnostic;
});
_parcelHelpers.export(exports, "DiagnosticSeverity", function () {
  return _vscodeLanguageserverTypesMainJs.DiagnosticSeverity;
});
_parcelHelpers.export(exports, "CompletionItem", function () {
  return _vscodeLanguageserverTypesMainJs.CompletionItem;
});
_parcelHelpers.export(exports, "CompletionItemKind", function () {
  return _vscodeLanguageserverTypesMainJs.CompletionItemKind;
});
_parcelHelpers.export(exports, "CompletionList", function () {
  return _vscodeLanguageserverTypesMainJs.CompletionList;
});
_parcelHelpers.export(exports, "Position", function () {
  return _vscodeLanguageserverTypesMainJs.Position;
});
_parcelHelpers.export(exports, "InsertTextFormat", function () {
  return _vscodeLanguageserverTypesMainJs.InsertTextFormat;
});
_parcelHelpers.export(exports, "MarkupContent", function () {
  return _vscodeLanguageserverTypesMainJs.MarkupContent;
});
_parcelHelpers.export(exports, "MarkupKind", function () {
  return _vscodeLanguageserverTypesMainJs.MarkupKind;
});
_parcelHelpers.export(exports, "SymbolInformation", function () {
  return _vscodeLanguageserverTypesMainJs.SymbolInformation;
});
_parcelHelpers.export(exports, "SymbolKind", function () {
  return _vscodeLanguageserverTypesMainJs.SymbolKind;
});
_parcelHelpers.export(exports, "DocumentSymbol", function () {
  return _vscodeLanguageserverTypesMainJs.DocumentSymbol;
});
_parcelHelpers.export(exports, "Location", function () {
  return _vscodeLanguageserverTypesMainJs.Location;
});
_parcelHelpers.export(exports, "Hover", function () {
  return _vscodeLanguageserverTypesMainJs.Hover;
});
_parcelHelpers.export(exports, "MarkedString", function () {
  return _vscodeLanguageserverTypesMainJs.MarkedString;
});
var _vscodeLanguageserverTypesMainJs = require('./../vscode-languageserver-types/main.js');
var _vscodeLanguageserverTextdocumentLibEsmMainJs = require('./../vscode-languageserver-textdocument/lib/esm/main.js');
var ErrorCode;
(function (ErrorCode) {
  ErrorCode[ErrorCode["Undefined"] = 0] = "Undefined";
  ErrorCode[ErrorCode["EnumValueMismatch"] = 1] = "EnumValueMismatch";
  ErrorCode[ErrorCode["Deprecated"] = 2] = "Deprecated";
  ErrorCode[ErrorCode["UnexpectedEndOfComment"] = 257] = "UnexpectedEndOfComment";
  ErrorCode[ErrorCode["UnexpectedEndOfString"] = 258] = "UnexpectedEndOfString";
  ErrorCode[ErrorCode["UnexpectedEndOfNumber"] = 259] = "UnexpectedEndOfNumber";
  ErrorCode[ErrorCode["InvalidUnicode"] = 260] = "InvalidUnicode";
  ErrorCode[ErrorCode["InvalidEscapeCharacter"] = 261] = "InvalidEscapeCharacter";
  ErrorCode[ErrorCode["InvalidCharacter"] = 262] = "InvalidCharacter";
  ErrorCode[ErrorCode["PropertyExpected"] = 513] = "PropertyExpected";
  ErrorCode[ErrorCode["CommaExpected"] = 514] = "CommaExpected";
  ErrorCode[ErrorCode["ColonExpected"] = 515] = "ColonExpected";
  ErrorCode[ErrorCode["ValueExpected"] = 516] = "ValueExpected";
  ErrorCode[ErrorCode["CommaOrCloseBacketExpected"] = 517] = "CommaOrCloseBacketExpected";
  ErrorCode[ErrorCode["CommaOrCloseBraceExpected"] = 518] = "CommaOrCloseBraceExpected";
  ErrorCode[ErrorCode["TrailingComma"] = 519] = "TrailingComma";
  ErrorCode[ErrorCode["DuplicateKey"] = 520] = "DuplicateKey";
  ErrorCode[ErrorCode["CommentNotPermitted"] = 521] = "CommentNotPermitted";
  ErrorCode[ErrorCode["SchemaResolveError"] = 768] = "SchemaResolveError";
})(ErrorCode || (ErrorCode = {}));
var ClientCapabilities;
(function (ClientCapabilities) {
  ClientCapabilities.LATEST = {
    textDocument: {
      completion: {
        completionItem: {
          documentationFormat: [_vscodeLanguageserverTypesMainJs.MarkupKind.Markdown, _vscodeLanguageserverTypesMainJs.MarkupKind.PlainText],
          commitCharactersSupport: true
        }
      }
    }
  };
})(ClientCapabilities || (ClientCapabilities = {}));

},{"./../vscode-languageserver-types/main.js":"6iHMa","./../vscode-languageserver-textdocument/lib/esm/main.js":"5Ja2e","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6iHMa":[function(require,module,exports) {
/*--------------------------------------------------------------------------------------------
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "integer", function () {
  return integer;
});
_parcelHelpers.export(exports, "uinteger", function () {
  return uinteger;
});
_parcelHelpers.export(exports, "Position", function () {
  return Position;
});
_parcelHelpers.export(exports, "Range", function () {
  return Range;
});
_parcelHelpers.export(exports, "Location", function () {
  return Location;
});
_parcelHelpers.export(exports, "LocationLink", function () {
  return LocationLink;
});
_parcelHelpers.export(exports, "Color", function () {
  return Color;
});
_parcelHelpers.export(exports, "ColorInformation", function () {
  return ColorInformation;
});
_parcelHelpers.export(exports, "ColorPresentation", function () {
  return ColorPresentation;
});
_parcelHelpers.export(exports, "FoldingRangeKind", function () {
  return FoldingRangeKind;
});
_parcelHelpers.export(exports, "FoldingRange", function () {
  return FoldingRange;
});
_parcelHelpers.export(exports, "DiagnosticRelatedInformation", function () {
  return DiagnosticRelatedInformation;
});
_parcelHelpers.export(exports, "DiagnosticSeverity", function () {
  return DiagnosticSeverity;
});
_parcelHelpers.export(exports, "DiagnosticTag", function () {
  return DiagnosticTag;
});
_parcelHelpers.export(exports, "CodeDescription", function () {
  return CodeDescription;
});
_parcelHelpers.export(exports, "Diagnostic", function () {
  return Diagnostic;
});
_parcelHelpers.export(exports, "Command", function () {
  return Command;
});
_parcelHelpers.export(exports, "TextEdit", function () {
  return TextEdit;
});
_parcelHelpers.export(exports, "ChangeAnnotation", function () {
  return ChangeAnnotation;
});
_parcelHelpers.export(exports, "ChangeAnnotationIdentifier", function () {
  return ChangeAnnotationIdentifier;
});
_parcelHelpers.export(exports, "AnnotatedTextEdit", function () {
  return AnnotatedTextEdit;
});
_parcelHelpers.export(exports, "TextDocumentEdit", function () {
  return TextDocumentEdit;
});
_parcelHelpers.export(exports, "CreateFile", function () {
  return CreateFile;
});
_parcelHelpers.export(exports, "RenameFile", function () {
  return RenameFile;
});
_parcelHelpers.export(exports, "DeleteFile", function () {
  return DeleteFile;
});
_parcelHelpers.export(exports, "WorkspaceEdit", function () {
  return WorkspaceEdit;
});
_parcelHelpers.export(exports, "TextDocumentIdentifier", function () {
  return TextDocumentIdentifier;
});
_parcelHelpers.export(exports, "VersionedTextDocumentIdentifier", function () {
  return VersionedTextDocumentIdentifier;
});
_parcelHelpers.export(exports, "OptionalVersionedTextDocumentIdentifier", function () {
  return OptionalVersionedTextDocumentIdentifier;
});
_parcelHelpers.export(exports, "TextDocumentItem", function () {
  return TextDocumentItem;
});
_parcelHelpers.export(exports, "MarkupKind", function () {
  return MarkupKind;
});
_parcelHelpers.export(exports, "MarkupContent", function () {
  return MarkupContent;
});
_parcelHelpers.export(exports, "CompletionItemKind", function () {
  return CompletionItemKind;
});
_parcelHelpers.export(exports, "InsertTextFormat", function () {
  return InsertTextFormat;
});
_parcelHelpers.export(exports, "CompletionItemTag", function () {
  return CompletionItemTag;
});
_parcelHelpers.export(exports, "InsertReplaceEdit", function () {
  return InsertReplaceEdit;
});
_parcelHelpers.export(exports, "InsertTextMode", function () {
  return InsertTextMode;
});
_parcelHelpers.export(exports, "CompletionItem", function () {
  return CompletionItem;
});
_parcelHelpers.export(exports, "CompletionList", function () {
  return CompletionList;
});
_parcelHelpers.export(exports, "MarkedString", function () {
  return MarkedString;
});
_parcelHelpers.export(exports, "Hover", function () {
  return Hover;
});
_parcelHelpers.export(exports, "ParameterInformation", function () {
  return ParameterInformation;
});
_parcelHelpers.export(exports, "SignatureInformation", function () {
  return SignatureInformation;
});
_parcelHelpers.export(exports, "DocumentHighlightKind", function () {
  return DocumentHighlightKind;
});
_parcelHelpers.export(exports, "DocumentHighlight", function () {
  return DocumentHighlight;
});
_parcelHelpers.export(exports, "SymbolKind", function () {
  return SymbolKind;
});
_parcelHelpers.export(exports, "SymbolTag", function () {
  return SymbolTag;
});
_parcelHelpers.export(exports, "SymbolInformation", function () {
  return SymbolInformation;
});
_parcelHelpers.export(exports, "DocumentSymbol", function () {
  return DocumentSymbol;
});
_parcelHelpers.export(exports, "CodeActionKind", function () {
  return CodeActionKind;
});
_parcelHelpers.export(exports, "CodeActionContext", function () {
  return CodeActionContext;
});
_parcelHelpers.export(exports, "CodeAction", function () {
  return CodeAction;
});
_parcelHelpers.export(exports, "CodeLens", function () {
  return CodeLens;
});
_parcelHelpers.export(exports, "FormattingOptions", function () {
  return FormattingOptions;
});
_parcelHelpers.export(exports, "DocumentLink", function () {
  return DocumentLink;
});
_parcelHelpers.export(exports, "SelectionRange", function () {
  return SelectionRange;
});
_parcelHelpers.export(exports, "EOL", function () {
  return EOL;
});
_parcelHelpers.export(exports, "TextDocument", function () {
  return TextDocument;
});
_parcelHelpers.export(exports, "WorkspaceChange", function () {
  return WorkspaceChange;
});
var integer;
(function (integer) {
  integer.MIN_VALUE = -2147483648;
  integer.MAX_VALUE = 2147483647;
})(integer || (integer = {}));
var uinteger;
(function (uinteger) {
  uinteger.MIN_VALUE = 0;
  uinteger.MAX_VALUE = 2147483647;
})(uinteger || (uinteger = {}));
var Position;
(function (Position) {
  /**
  * Creates a new Position literal from the given line and character.
  * @param line The position's line.
  * @param character The position's character.
  */
  function create(line, character) {
    if (line === Number.MAX_VALUE) {
      line = uinteger.MAX_VALUE;
    }
    if (character === Number.MAX_VALUE) {
      character = uinteger.MAX_VALUE;
    }
    return {
      line: line,
      character: character
    };
  }
  Position.create = create;
  /**
  * Checks whether the given literal conforms to the [Position](#Position) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.uinteger(candidate.line) && Is.uinteger(candidate.character);
  }
  Position.is = is;
})(Position || (Position = {}));
var Range;
(function (Range) {
  function create(one, two, three, four) {
    if (Is.uinteger(one) && Is.uinteger(two) && Is.uinteger(three) && Is.uinteger(four)) {
      return {
        start: Position.create(one, two),
        end: Position.create(three, four)
      };
    } else if (Position.is(one) && Position.is(two)) {
      return {
        start: one,
        end: two
      };
    } else {
      throw new Error("Range#create called with invalid arguments[" + one + ", " + two + ", " + three + ", " + four + "]");
    }
  }
  Range.create = create;
  /**
  * Checks whether the given literal conforms to the [Range](#Range) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Position.is(candidate.start) && Position.is(candidate.end);
  }
  Range.is = is;
})(Range || (Range = {}));
var Location;
(function (Location) {
  /**
  * Creates a Location literal.
  * @param uri The location's uri.
  * @param range The location's range.
  */
  function create(uri, range) {
    return {
      uri: uri,
      range: range
    };
  }
  Location.create = create;
  /**
  * Checks whether the given literal conforms to the [Location](#Location) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.string(candidate.uri) || Is.undefined(candidate.uri));
  }
  Location.is = is;
})(Location || (Location = {}));
var LocationLink;
(function (LocationLink) {
  /**
  * Creates a LocationLink literal.
  * @param targetUri The definition's uri.
  * @param targetRange The full range of the definition.
  * @param targetSelectionRange The span of the symbol definition at the target.
  * @param originSelectionRange The span of the symbol being defined in the originating source file.
  */
  function create(targetUri, targetRange, targetSelectionRange, originSelectionRange) {
    return {
      targetUri: targetUri,
      targetRange: targetRange,
      targetSelectionRange: targetSelectionRange,
      originSelectionRange: originSelectionRange
    };
  }
  LocationLink.create = create;
  /**
  * Checks whether the given literal conforms to the [LocationLink](#LocationLink) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.targetRange) && Is.string(candidate.targetUri) && (Range.is(candidate.targetSelectionRange) || Is.undefined(candidate.targetSelectionRange)) && (Range.is(candidate.originSelectionRange) || Is.undefined(candidate.originSelectionRange));
  }
  LocationLink.is = is;
})(LocationLink || (LocationLink = {}));
var Color;
(function (Color) {
  /**
  * Creates a new Color literal.
  */
  function create(red, green, blue, alpha) {
    return {
      red: red,
      green: green,
      blue: blue,
      alpha: alpha
    };
  }
  Color.create = create;
  /**
  * Checks whether the given literal conforms to the [Color](#Color) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.numberRange(candidate.red, 0, 1) && Is.numberRange(candidate.green, 0, 1) && Is.numberRange(candidate.blue, 0, 1) && Is.numberRange(candidate.alpha, 0, 1);
  }
  Color.is = is;
})(Color || (Color = {}));
var ColorInformation;
(function (ColorInformation) {
  /**
  * Creates a new ColorInformation literal.
  */
  function create(range, color) {
    return {
      range: range,
      color: color
    };
  }
  ColorInformation.create = create;
  /**
  * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
  */
  function is(value) {
    var candidate = value;
    return Range.is(candidate.range) && Color.is(candidate.color);
  }
  ColorInformation.is = is;
})(ColorInformation || (ColorInformation = {}));
var ColorPresentation;
(function (ColorPresentation) {
  /**
  * Creates a new ColorInformation literal.
  */
  function create(label, textEdit, additionalTextEdits) {
    return {
      label: label,
      textEdit: textEdit,
      additionalTextEdits: additionalTextEdits
    };
  }
  ColorPresentation.create = create;
  /**
  * Checks whether the given literal conforms to the [ColorInformation](#ColorInformation) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.string(candidate.label) && (Is.undefined(candidate.textEdit) || TextEdit.is(candidate)) && (Is.undefined(candidate.additionalTextEdits) || Is.typedArray(candidate.additionalTextEdits, TextEdit.is));
  }
  ColorPresentation.is = is;
})(ColorPresentation || (ColorPresentation = {}));
var FoldingRangeKind;
(function (FoldingRangeKind) {
  /**
  * Folding range for a comment
  */
  FoldingRangeKind["Comment"] = "comment";
  /**
  * Folding range for a imports or includes
  */
  FoldingRangeKind["Imports"] = "imports";
  /**
  * Folding range for a region (e.g. `#region`)
  */
  FoldingRangeKind["Region"] = "region";
})(FoldingRangeKind || (FoldingRangeKind = {}));
var FoldingRange;
(function (FoldingRange) {
  /**
  * Creates a new FoldingRange literal.
  */
  function create(startLine, endLine, startCharacter, endCharacter, kind) {
    var result = {
      startLine: startLine,
      endLine: endLine
    };
    if (Is.defined(startCharacter)) {
      result.startCharacter = startCharacter;
    }
    if (Is.defined(endCharacter)) {
      result.endCharacter = endCharacter;
    }
    if (Is.defined(kind)) {
      result.kind = kind;
    }
    return result;
  }
  FoldingRange.create = create;
  /**
  * Checks whether the given literal conforms to the [FoldingRange](#FoldingRange) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.uinteger(candidate.startLine) && Is.uinteger(candidate.startLine) && (Is.undefined(candidate.startCharacter) || Is.uinteger(candidate.startCharacter)) && (Is.undefined(candidate.endCharacter) || Is.uinteger(candidate.endCharacter)) && (Is.undefined(candidate.kind) || Is.string(candidate.kind));
  }
  FoldingRange.is = is;
})(FoldingRange || (FoldingRange = {}));
var DiagnosticRelatedInformation;
(function (DiagnosticRelatedInformation) {
  /**
  * Creates a new DiagnosticRelatedInformation literal.
  */
  function create(location, message) {
    return {
      location: location,
      message: message
    };
  }
  DiagnosticRelatedInformation.create = create;
  /**
  * Checks whether the given literal conforms to the [DiagnosticRelatedInformation](#DiagnosticRelatedInformation) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Location.is(candidate.location) && Is.string(candidate.message);
  }
  DiagnosticRelatedInformation.is = is;
})(DiagnosticRelatedInformation || (DiagnosticRelatedInformation = {}));
var DiagnosticSeverity;
(function (DiagnosticSeverity) {
  /**
  * Reports an error.
  */
  DiagnosticSeverity.Error = 1;
  /**
  * Reports a warning.
  */
  DiagnosticSeverity.Warning = 2;
  /**
  * Reports an information.
  */
  DiagnosticSeverity.Information = 3;
  /**
  * Reports a hint.
  */
  DiagnosticSeverity.Hint = 4;
})(DiagnosticSeverity || (DiagnosticSeverity = {}));
var DiagnosticTag;
(function (DiagnosticTag) {
  /**
  * Unused or unnecessary code.
  *
  * Clients are allowed to render diagnostics with this tag faded out instead of having
  * an error squiggle.
  */
  DiagnosticTag.Unnecessary = 1;
  /**
  * Deprecated or obsolete code.
  *
  * Clients are allowed to rendered diagnostics with this tag strike through.
  */
  DiagnosticTag.Deprecated = 2;
})(DiagnosticTag || (DiagnosticTag = {}));
var CodeDescription;
(function (CodeDescription) {
  function is(value) {
    var candidate = value;
    return candidate !== undefined && candidate !== null && Is.string(candidate.href);
  }
  CodeDescription.is = is;
})(CodeDescription || (CodeDescription = {}));
var Diagnostic;
(function (Diagnostic) {
  /**
  * Creates a new Diagnostic literal.
  */
  function create(range, message, severity, code, source, relatedInformation) {
    var result = {
      range: range,
      message: message
    };
    if (Is.defined(severity)) {
      result.severity = severity;
    }
    if (Is.defined(code)) {
      result.code = code;
    }
    if (Is.defined(source)) {
      result.source = source;
    }
    if (Is.defined(relatedInformation)) {
      result.relatedInformation = relatedInformation;
    }
    return result;
  }
  Diagnostic.create = create;
  /**
  * Checks whether the given literal conforms to the [Diagnostic](#Diagnostic) interface.
  */
  function is(value) {
    var _a;
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && Is.string(candidate.message) && (Is.number(candidate.severity) || Is.undefined(candidate.severity)) && (Is.integer(candidate.code) || Is.string(candidate.code) || Is.undefined(candidate.code)) && (Is.undefined(candidate.codeDescription) || Is.string((_a = candidate.codeDescription) === null || _a === void 0 ? void 0 : _a.href)) && (Is.string(candidate.source) || Is.undefined(candidate.source)) && (Is.undefined(candidate.relatedInformation) || Is.typedArray(candidate.relatedInformation, DiagnosticRelatedInformation.is));
  }
  Diagnostic.is = is;
})(Diagnostic || (Diagnostic = {}));
var Command;
(function (Command) {
  /**
  * Creates a new Command literal.
  */
  function create(title, command) {
    var args = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      args[_i - 2] = arguments[_i];
    }
    var result = {
      title: title,
      command: command
    };
    if (Is.defined(args) && args.length > 0) {
      result.arguments = args;
    }
    return result;
  }
  Command.create = create;
  /**
  * Checks whether the given literal conforms to the [Command](#Command) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.title) && Is.string(candidate.command);
  }
  Command.is = is;
})(Command || (Command = {}));
var TextEdit;
(function (TextEdit) {
  /**
  * Creates a replace text edit.
  * @param range The range of text to be replaced.
  * @param newText The new text.
  */
  function replace(range, newText) {
    return {
      range: range,
      newText: newText
    };
  }
  TextEdit.replace = replace;
  /**
  * Creates a insert text edit.
  * @param position The position to insert the text at.
  * @param newText The text to be inserted.
  */
  function insert(position, newText) {
    return {
      range: {
        start: position,
        end: position
      },
      newText: newText
    };
  }
  TextEdit.insert = insert;
  /**
  * Creates a delete text edit.
  * @param range The range of text to be deleted.
  */
  function del(range) {
    return {
      range: range,
      newText: ''
    };
  }
  TextEdit.del = del;
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(candidate) && Is.string(candidate.newText) && Range.is(candidate.range);
  }
  TextEdit.is = is;
})(TextEdit || (TextEdit = {}));
var ChangeAnnotation;
(function (ChangeAnnotation) {
  function create(label, needsConfirmation, description) {
    var result = {
      label: label
    };
    if (needsConfirmation !== undefined) {
      result.needsConfirmation = needsConfirmation;
    }
    if (description !== undefined) {
      result.description = description;
    }
    return result;
  }
  ChangeAnnotation.create = create;
  function is(value) {
    var candidate = value;
    return candidate !== undefined && Is.objectLiteral(candidate) && Is.string(candidate.label) && (Is.boolean(candidate.needsConfirmation) || candidate.needsConfirmation === undefined) && (Is.string(candidate.description) || candidate.description === undefined);
  }
  ChangeAnnotation.is = is;
})(ChangeAnnotation || (ChangeAnnotation = {}));
var ChangeAnnotationIdentifier;
(function (ChangeAnnotationIdentifier) {
  function is(value) {
    var candidate = value;
    return typeof candidate === 'string';
  }
  ChangeAnnotationIdentifier.is = is;
})(ChangeAnnotationIdentifier || (ChangeAnnotationIdentifier = {}));
var AnnotatedTextEdit;
(function (AnnotatedTextEdit) {
  /**
  * Creates an annotated replace text edit.
  *
  * @param range The range of text to be replaced.
  * @param newText The new text.
  * @param annotation The annotation.
  */
  function replace(range, newText, annotation) {
    return {
      range: range,
      newText: newText,
      annotationId: annotation
    };
  }
  AnnotatedTextEdit.replace = replace;
  /**
  * Creates an annotated insert text edit.
  *
  * @param position The position to insert the text at.
  * @param newText The text to be inserted.
  * @param annotation The annotation.
  */
  function insert(position, newText, annotation) {
    return {
      range: {
        start: position,
        end: position
      },
      newText: newText,
      annotationId: annotation
    };
  }
  AnnotatedTextEdit.insert = insert;
  /**
  * Creates an annotated delete text edit.
  *
  * @param range The range of text to be deleted.
  * @param annotation The annotation.
  */
  function del(range, annotation) {
    return {
      range: range,
      newText: '',
      annotationId: annotation
    };
  }
  AnnotatedTextEdit.del = del;
  function is(value) {
    var candidate = value;
    return TextEdit.is(candidate) && (ChangeAnnotation.is(candidate.annotationId) || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  AnnotatedTextEdit.is = is;
})(AnnotatedTextEdit || (AnnotatedTextEdit = {}));
var TextDocumentEdit;
(function (TextDocumentEdit) {
  /**
  * Creates a new `TextDocumentEdit`
  */
  function create(textDocument, edits) {
    return {
      textDocument: textDocument,
      edits: edits
    };
  }
  TextDocumentEdit.create = create;
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && OptionalVersionedTextDocumentIdentifier.is(candidate.textDocument) && Array.isArray(candidate.edits);
  }
  TextDocumentEdit.is = is;
})(TextDocumentEdit || (TextDocumentEdit = {}));
var CreateFile;
(function (CreateFile) {
  function create(uri, options, annotation) {
    var result = {
      kind: 'create',
      uri: uri
    };
    if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
      result.options = options;
    }
    if (annotation !== undefined) {
      result.annotationId = annotation;
    }
    return result;
  }
  CreateFile.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'create' && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  CreateFile.is = is;
})(CreateFile || (CreateFile = {}));
var RenameFile;
(function (RenameFile) {
  function create(oldUri, newUri, options, annotation) {
    var result = {
      kind: 'rename',
      oldUri: oldUri,
      newUri: newUri
    };
    if (options !== undefined && (options.overwrite !== undefined || options.ignoreIfExists !== undefined)) {
      result.options = options;
    }
    if (annotation !== undefined) {
      result.annotationId = annotation;
    }
    return result;
  }
  RenameFile.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'rename' && Is.string(candidate.oldUri) && Is.string(candidate.newUri) && (candidate.options === undefined || (candidate.options.overwrite === undefined || Is.boolean(candidate.options.overwrite)) && (candidate.options.ignoreIfExists === undefined || Is.boolean(candidate.options.ignoreIfExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  RenameFile.is = is;
})(RenameFile || (RenameFile = {}));
var DeleteFile;
(function (DeleteFile) {
  function create(uri, options, annotation) {
    var result = {
      kind: 'delete',
      uri: uri
    };
    if (options !== undefined && (options.recursive !== undefined || options.ignoreIfNotExists !== undefined)) {
      result.options = options;
    }
    if (annotation !== undefined) {
      result.annotationId = annotation;
    }
    return result;
  }
  DeleteFile.create = create;
  function is(value) {
    var candidate = value;
    return candidate && candidate.kind === 'delete' && Is.string(candidate.uri) && (candidate.options === undefined || (candidate.options.recursive === undefined || Is.boolean(candidate.options.recursive)) && (candidate.options.ignoreIfNotExists === undefined || Is.boolean(candidate.options.ignoreIfNotExists))) && (candidate.annotationId === undefined || ChangeAnnotationIdentifier.is(candidate.annotationId));
  }
  DeleteFile.is = is;
})(DeleteFile || (DeleteFile = {}));
var WorkspaceEdit;
(function (WorkspaceEdit) {
  function is(value) {
    var candidate = value;
    return candidate && (candidate.changes !== undefined || candidate.documentChanges !== undefined) && (candidate.documentChanges === undefined || candidate.documentChanges.every(function (change) {
      if (Is.string(change.kind)) {
        return CreateFile.is(change) || RenameFile.is(change) || DeleteFile.is(change);
      } else {
        return TextDocumentEdit.is(change);
      }
    }));
  }
  WorkspaceEdit.is = is;
})(WorkspaceEdit || (WorkspaceEdit = {}));
var TextEditChangeImpl = /** @class*/
(function () {
  function TextEditChangeImpl(edits, changeAnnotations) {
    this.edits = edits;
    this.changeAnnotations = changeAnnotations;
  }
  TextEditChangeImpl.prototype.insert = function (position, newText, annotation) {
    var edit;
    var id;
    if (annotation === undefined) {
      edit = TextEdit.insert(position, newText);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.insert(position, newText, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.insert(position, newText, id);
    }
    this.edits.push(edit);
    if (id !== undefined) {
      return id;
    }
  };
  TextEditChangeImpl.prototype.replace = function (range, newText, annotation) {
    var edit;
    var id;
    if (annotation === undefined) {
      edit = TextEdit.replace(range, newText);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.replace(range, newText, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.replace(range, newText, id);
    }
    this.edits.push(edit);
    if (id !== undefined) {
      return id;
    }
  };
  TextEditChangeImpl.prototype.delete = function (range, annotation) {
    var edit;
    var id;
    if (annotation === undefined) {
      edit = TextEdit.del(range);
    } else if (ChangeAnnotationIdentifier.is(annotation)) {
      id = annotation;
      edit = AnnotatedTextEdit.del(range, annotation);
    } else {
      this.assertChangeAnnotations(this.changeAnnotations);
      id = this.changeAnnotations.manage(annotation);
      edit = AnnotatedTextEdit.del(range, id);
    }
    this.edits.push(edit);
    if (id !== undefined) {
      return id;
    }
  };
  TextEditChangeImpl.prototype.add = function (edit) {
    this.edits.push(edit);
  };
  TextEditChangeImpl.prototype.all = function () {
    return this.edits;
  };
  TextEditChangeImpl.prototype.clear = function () {
    this.edits.splice(0, this.edits.length);
  };
  TextEditChangeImpl.prototype.assertChangeAnnotations = function (value) {
    if (value === undefined) {
      throw new Error("Text edit change is not configured to manage change annotations.");
    }
  };
  return TextEditChangeImpl;
})();
/**
* A helper class
*/
var ChangeAnnotations = /** @class*/
(function () {
  function ChangeAnnotations(annotations) {
    this._annotations = annotations === undefined ? Object.create(null) : annotations;
    this._counter = 0;
    this._size = 0;
  }
  ChangeAnnotations.prototype.all = function () {
    return this._annotations;
  };
  Object.defineProperty(ChangeAnnotations.prototype, "size", {
    get: function () {
      return this._size;
    },
    enumerable: false,
    configurable: true
  });
  ChangeAnnotations.prototype.manage = function (idOrAnnotation, annotation) {
    var id;
    if (ChangeAnnotationIdentifier.is(idOrAnnotation)) {
      id = idOrAnnotation;
    } else {
      id = this.nextId();
      annotation = idOrAnnotation;
    }
    if (this._annotations[id] !== undefined) {
      throw new Error("Id " + id + " is already in use.");
    }
    if (annotation === undefined) {
      throw new Error("No annotation provided for id " + id);
    }
    this._annotations[id] = annotation;
    this._size++;
    return id;
  };
  ChangeAnnotations.prototype.nextId = function () {
    this._counter++;
    return this._counter.toString();
  };
  return ChangeAnnotations;
})();
/**
* A workspace change helps constructing changes to a workspace.
*/
var WorkspaceChange = /** @class*/
(function () {
  function WorkspaceChange(workspaceEdit) {
    var _this = this;
    this._textEditChanges = Object.create(null);
    if (workspaceEdit !== undefined) {
      this._workspaceEdit = workspaceEdit;
      if (workspaceEdit.documentChanges) {
        this._changeAnnotations = new ChangeAnnotations(workspaceEdit.changeAnnotations);
        workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        workspaceEdit.documentChanges.forEach(function (change) {
          if (TextDocumentEdit.is(change)) {
            var textEditChange = new TextEditChangeImpl(change.edits, _this._changeAnnotations);
            _this._textEditChanges[change.textDocument.uri] = textEditChange;
          }
        });
      } else if (workspaceEdit.changes) {
        Object.keys(workspaceEdit.changes).forEach(function (key) {
          var textEditChange = new TextEditChangeImpl(workspaceEdit.changes[key]);
          _this._textEditChanges[key] = textEditChange;
        });
      }
    } else {
      this._workspaceEdit = {};
    }
  }
  Object.defineProperty(WorkspaceChange.prototype, "edit", {
    /**
    * Returns the underlying [WorkspaceEdit](#WorkspaceEdit) literal
    * use to be returned from a workspace edit operation like rename.
    */
    get: function () {
      this.initDocumentChanges();
      if (this._changeAnnotations !== undefined) {
        if (this._changeAnnotations.size === 0) {
          this._workspaceEdit.changeAnnotations = undefined;
        } else {
          this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
        }
      }
      return this._workspaceEdit;
    },
    enumerable: false,
    configurable: true
  });
  WorkspaceChange.prototype.getTextEditChange = function (key) {
    if (OptionalVersionedTextDocumentIdentifier.is(key)) {
      this.initDocumentChanges();
      if (this._workspaceEdit.documentChanges === undefined) {
        throw new Error('Workspace edit is not configured for document changes.');
      }
      var textDocument = {
        uri: key.uri,
        version: key.version
      };
      var result = this._textEditChanges[textDocument.uri];
      if (!result) {
        var edits = [];
        var textDocumentEdit = {
          textDocument: textDocument,
          edits: edits
        };
        this._workspaceEdit.documentChanges.push(textDocumentEdit);
        result = new TextEditChangeImpl(edits, this._changeAnnotations);
        this._textEditChanges[textDocument.uri] = result;
      }
      return result;
    } else {
      this.initChanges();
      if (this._workspaceEdit.changes === undefined) {
        throw new Error('Workspace edit is not configured for normal text edit changes.');
      }
      var result = this._textEditChanges[key];
      if (!result) {
        var edits = [];
        this._workspaceEdit.changes[key] = edits;
        result = new TextEditChangeImpl(edits);
        this._textEditChanges[key] = result;
      }
      return result;
    }
  };
  WorkspaceChange.prototype.initDocumentChanges = function () {
    if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
      this._changeAnnotations = new ChangeAnnotations();
      this._workspaceEdit.documentChanges = [];
      this._workspaceEdit.changeAnnotations = this._changeAnnotations.all();
    }
  };
  WorkspaceChange.prototype.initChanges = function () {
    if (this._workspaceEdit.documentChanges === undefined && this._workspaceEdit.changes === undefined) {
      this._workspaceEdit.changes = Object.create(null);
    }
  };
  WorkspaceChange.prototype.createFile = function (uri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === undefined) {
      throw new Error('Workspace edit is not configured for document changes.');
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === undefined) {
      operation = CreateFile.create(uri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = CreateFile.create(uri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== undefined) {
      return id;
    }
  };
  WorkspaceChange.prototype.renameFile = function (oldUri, newUri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === undefined) {
      throw new Error('Workspace edit is not configured for document changes.');
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === undefined) {
      operation = RenameFile.create(oldUri, newUri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = RenameFile.create(oldUri, newUri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== undefined) {
      return id;
    }
  };
  WorkspaceChange.prototype.deleteFile = function (uri, optionsOrAnnotation, options) {
    this.initDocumentChanges();
    if (this._workspaceEdit.documentChanges === undefined) {
      throw new Error('Workspace edit is not configured for document changes.');
    }
    var annotation;
    if (ChangeAnnotation.is(optionsOrAnnotation) || ChangeAnnotationIdentifier.is(optionsOrAnnotation)) {
      annotation = optionsOrAnnotation;
    } else {
      options = optionsOrAnnotation;
    }
    var operation;
    var id;
    if (annotation === undefined) {
      operation = DeleteFile.create(uri, options);
    } else {
      id = ChangeAnnotationIdentifier.is(annotation) ? annotation : this._changeAnnotations.manage(annotation);
      operation = DeleteFile.create(uri, options, id);
    }
    this._workspaceEdit.documentChanges.push(operation);
    if (id !== undefined) {
      return id;
    }
  };
  return WorkspaceChange;
})();
var TextDocumentIdentifier;
(function (TextDocumentIdentifier) {
  /**
  * Creates a new TextDocumentIdentifier literal.
  * @param uri The document's uri.
  */
  function create(uri) {
    return {
      uri: uri
    };
  }
  TextDocumentIdentifier.create = create;
  /**
  * Checks whether the given literal conforms to the [TextDocumentIdentifier](#TextDocumentIdentifier) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri);
  }
  TextDocumentIdentifier.is = is;
})(TextDocumentIdentifier || (TextDocumentIdentifier = {}));
var VersionedTextDocumentIdentifier;
(function (VersionedTextDocumentIdentifier) {
  /**
  * Creates a new VersionedTextDocumentIdentifier literal.
  * @param uri The document's uri.
  * @param uri The document's text.
  */
  function create(uri, version) {
    return {
      uri: uri,
      version: version
    };
  }
  VersionedTextDocumentIdentifier.create = create;
  /**
  * Checks whether the given literal conforms to the [VersionedTextDocumentIdentifier](#VersionedTextDocumentIdentifier) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.integer(candidate.version);
  }
  VersionedTextDocumentIdentifier.is = is;
})(VersionedTextDocumentIdentifier || (VersionedTextDocumentIdentifier = {}));
var OptionalVersionedTextDocumentIdentifier;
(function (OptionalVersionedTextDocumentIdentifier) {
  /**
  * Creates a new OptionalVersionedTextDocumentIdentifier literal.
  * @param uri The document's uri.
  * @param uri The document's text.
  */
  function create(uri, version) {
    return {
      uri: uri,
      version: version
    };
  }
  OptionalVersionedTextDocumentIdentifier.create = create;
  /**
  * Checks whether the given literal conforms to the [OptionalVersionedTextDocumentIdentifier](#OptionalVersionedTextDocumentIdentifier) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (candidate.version === null || Is.integer(candidate.version));
  }
  OptionalVersionedTextDocumentIdentifier.is = is;
})(OptionalVersionedTextDocumentIdentifier || (OptionalVersionedTextDocumentIdentifier = {}));
var TextDocumentItem;
(function (TextDocumentItem) {
  /**
  * Creates a new TextDocumentItem literal.
  * @param uri The document's uri.
  * @param languageId The document's language identifier.
  * @param version The document's version number.
  * @param text The document's text.
  */
  function create(uri, languageId, version, text) {
    return {
      uri: uri,
      languageId: languageId,
      version: version,
      text: text
    };
  }
  TextDocumentItem.create = create;
  /**
  * Checks whether the given literal conforms to the [TextDocumentItem](#TextDocumentItem) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && Is.string(candidate.languageId) && Is.integer(candidate.version) && Is.string(candidate.text);
  }
  TextDocumentItem.is = is;
})(TextDocumentItem || (TextDocumentItem = {}));
var MarkupKind;
(function (MarkupKind) {
  /**
  * Plain text is supported as a content format
  */
  MarkupKind.PlainText = 'plaintext';
  /**
  * Markdown is supported as a content format
  */
  MarkupKind.Markdown = 'markdown';
})(MarkupKind || (MarkupKind = {}));
(function (MarkupKind) {
  /**
  * Checks whether the given value is a value of the [MarkupKind](#MarkupKind) type.
  */
  function is(value) {
    var candidate = value;
    return candidate === MarkupKind.PlainText || candidate === MarkupKind.Markdown;
  }
  MarkupKind.is = is;
})(MarkupKind || (MarkupKind = {}));
var MarkupContent;
(function (MarkupContent) {
  /**
  * Checks whether the given value conforms to the [MarkupContent](#MarkupContent) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.objectLiteral(value) && MarkupKind.is(candidate.kind) && Is.string(candidate.value);
  }
  MarkupContent.is = is;
})(MarkupContent || (MarkupContent = {}));
var CompletionItemKind;
(function (CompletionItemKind) {
  CompletionItemKind.Text = 1;
  CompletionItemKind.Method = 2;
  CompletionItemKind.Function = 3;
  CompletionItemKind.Constructor = 4;
  CompletionItemKind.Field = 5;
  CompletionItemKind.Variable = 6;
  CompletionItemKind.Class = 7;
  CompletionItemKind.Interface = 8;
  CompletionItemKind.Module = 9;
  CompletionItemKind.Property = 10;
  CompletionItemKind.Unit = 11;
  CompletionItemKind.Value = 12;
  CompletionItemKind.Enum = 13;
  CompletionItemKind.Keyword = 14;
  CompletionItemKind.Snippet = 15;
  CompletionItemKind.Color = 16;
  CompletionItemKind.File = 17;
  CompletionItemKind.Reference = 18;
  CompletionItemKind.Folder = 19;
  CompletionItemKind.EnumMember = 20;
  CompletionItemKind.Constant = 21;
  CompletionItemKind.Struct = 22;
  CompletionItemKind.Event = 23;
  CompletionItemKind.Operator = 24;
  CompletionItemKind.TypeParameter = 25;
})(CompletionItemKind || (CompletionItemKind = {}));
var InsertTextFormat;
(function (InsertTextFormat) {
  /**
  * The primary text to be inserted is treated as a plain string.
  */
  InsertTextFormat.PlainText = 1;
  /**
  * The primary text to be inserted is treated as a snippet.
  *
  * A snippet can define tab stops and placeholders with `$1`, `$2`
  * and `${3:foo}`. `$0` defines the final tab stop, it defaults to
  * the end of the snippet. Placeholders with equal identifiers are linked,
  * that is typing in one will update others too.
  *
  * See also: https://microsoft.github.io/language-server-protocol/specifications/specification-current/#snippet_syntax
  */
  InsertTextFormat.Snippet = 2;
})(InsertTextFormat || (InsertTextFormat = {}));
var CompletionItemTag;
(function (CompletionItemTag) {
  /**
  * Render a completion as obsolete, usually using a strike-out.
  */
  CompletionItemTag.Deprecated = 1;
})(CompletionItemTag || (CompletionItemTag = {}));
var InsertReplaceEdit;
(function (InsertReplaceEdit) {
  /**
  * Creates a new insert / replace edit
  */
  function create(newText, insert, replace) {
    return {
      newText: newText,
      insert: insert,
      replace: replace
    };
  }
  InsertReplaceEdit.create = create;
  /**
  * Checks whether the given literal conforms to the [InsertReplaceEdit](#InsertReplaceEdit) interface.
  */
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.newText) && Range.is(candidate.insert) && Range.is(candidate.replace);
  }
  InsertReplaceEdit.is = is;
})(InsertReplaceEdit || (InsertReplaceEdit = {}));
var InsertTextMode;
(function (InsertTextMode) {
  /**
  * The insertion or replace strings is taken as it is. If the
  * value is multi line the lines below the cursor will be
  * inserted using the indentation defined in the string value.
  * The client will not apply any kind of adjustments to the
  * string.
  */
  InsertTextMode.asIs = 1;
  /**
  * The editor adjusts leading whitespace of new lines so that
  * they match the indentation up to the cursor of the line for
  * which the item is accepted.
  *
  * Consider a line like this: <2tabs><cursor><3tabs>foo. Accepting a
  * multi line completion item is indented using 2 tabs and all
  * following lines inserted will be indented using 2 tabs as well.
  */
  InsertTextMode.adjustIndentation = 2;
})(InsertTextMode || (InsertTextMode = {}));
var CompletionItem;
(function (CompletionItem) {
  /**
  * Create a completion item and seed it with a label.
  * @param label The completion item's label
  */
  function create(label) {
    return {
      label: label
    };
  }
  CompletionItem.create = create;
})(CompletionItem || (CompletionItem = {}));
var CompletionList;
(function (CompletionList) {
  /**
  * Creates a new completion list.
  *
  * @param items The completion items.
  * @param isIncomplete The list is not complete.
  */
  function create(items, isIncomplete) {
    return {
      items: items ? items : [],
      isIncomplete: !!isIncomplete
    };
  }
  CompletionList.create = create;
})(CompletionList || (CompletionList = {}));
var MarkedString;
(function (MarkedString) {
  /**
  * Creates a marked string from plain text.
  *
  * @param plainText The plain text.
  */
  function fromPlainText(plainText) {
    return plainText.replace(/[\\`*_{}[\]()#+\-.!]/g, '\\$&');
  }
  MarkedString.fromPlainText = fromPlainText;
  /**
  * Checks whether the given value conforms to the [MarkedString](#MarkedString) type.
  */
  function is(value) {
    var candidate = value;
    return Is.string(candidate) || Is.objectLiteral(candidate) && Is.string(candidate.language) && Is.string(candidate.value);
  }
  MarkedString.is = is;
})(MarkedString || (MarkedString = {}));
var Hover;
(function (Hover) {
  /**
  * Checks whether the given value conforms to the [Hover](#Hover) interface.
  */
  function is(value) {
    var candidate = value;
    return !!candidate && Is.objectLiteral(candidate) && (MarkupContent.is(candidate.contents) || MarkedString.is(candidate.contents) || Is.typedArray(candidate.contents, MarkedString.is)) && (value.range === undefined || Range.is(value.range));
  }
  Hover.is = is;
})(Hover || (Hover = {}));
var ParameterInformation;
(function (ParameterInformation) {
  /**
  * Creates a new parameter information literal.
  *
  * @param label A label string.
  * @param documentation A doc string.
  */
  function create(label, documentation) {
    return documentation ? {
      label: label,
      documentation: documentation
    } : {
      label: label
    };
  }
  ParameterInformation.create = create;
})(ParameterInformation || (ParameterInformation = {}));
var SignatureInformation;
(function (SignatureInformation) {
  function create(label, documentation) {
    var parameters = [];
    for (var _i = 2; _i < arguments.length; _i++) {
      parameters[_i - 2] = arguments[_i];
    }
    var result = {
      label: label
    };
    if (Is.defined(documentation)) {
      result.documentation = documentation;
    }
    if (Is.defined(parameters)) {
      result.parameters = parameters;
    } else {
      result.parameters = [];
    }
    return result;
  }
  SignatureInformation.create = create;
})(SignatureInformation || (SignatureInformation = {}));
var DocumentHighlightKind;
(function (DocumentHighlightKind) {
  /**
  * A textual occurrence.
  */
  DocumentHighlightKind.Text = 1;
  /**
  * Read-access of a symbol, like reading a variable.
  */
  DocumentHighlightKind.Read = 2;
  /**
  * Write-access of a symbol, like writing to a variable.
  */
  DocumentHighlightKind.Write = 3;
})(DocumentHighlightKind || (DocumentHighlightKind = {}));
var DocumentHighlight;
(function (DocumentHighlight) {
  /**
  * Create a DocumentHighlight object.
  * @param range The range the highlight applies to.
  */
  function create(range, kind) {
    var result = {
      range: range
    };
    if (Is.number(kind)) {
      result.kind = kind;
    }
    return result;
  }
  DocumentHighlight.create = create;
})(DocumentHighlight || (DocumentHighlight = {}));
var SymbolKind;
(function (SymbolKind) {
  SymbolKind.File = 1;
  SymbolKind.Module = 2;
  SymbolKind.Namespace = 3;
  SymbolKind.Package = 4;
  SymbolKind.Class = 5;
  SymbolKind.Method = 6;
  SymbolKind.Property = 7;
  SymbolKind.Field = 8;
  SymbolKind.Constructor = 9;
  SymbolKind.Enum = 10;
  SymbolKind.Interface = 11;
  SymbolKind.Function = 12;
  SymbolKind.Variable = 13;
  SymbolKind.Constant = 14;
  SymbolKind.String = 15;
  SymbolKind.Number = 16;
  SymbolKind.Boolean = 17;
  SymbolKind.Array = 18;
  SymbolKind.Object = 19;
  SymbolKind.Key = 20;
  SymbolKind.Null = 21;
  SymbolKind.EnumMember = 22;
  SymbolKind.Struct = 23;
  SymbolKind.Event = 24;
  SymbolKind.Operator = 25;
  SymbolKind.TypeParameter = 26;
})(SymbolKind || (SymbolKind = {}));
var SymbolTag;
(function (SymbolTag) {
  /**
  * Render a symbol as obsolete, usually using a strike-out.
  */
  SymbolTag.Deprecated = 1;
})(SymbolTag || (SymbolTag = {}));
var SymbolInformation;
(function (SymbolInformation) {
  /**
  * Creates a new symbol information literal.
  *
  * @param name The name of the symbol.
  * @param kind The kind of the symbol.
  * @param range The range of the location of the symbol.
  * @param uri The resource of the location of symbol, defaults to the current document.
  * @param containerName The name of the symbol containing the symbol.
  */
  function create(name, kind, range, uri, containerName) {
    var result = {
      name: name,
      kind: kind,
      location: {
        uri: uri,
        range: range
      }
    };
    if (containerName) {
      result.containerName = containerName;
    }
    return result;
  }
  SymbolInformation.create = create;
})(SymbolInformation || (SymbolInformation = {}));
var DocumentSymbol;
(function (DocumentSymbol) {
  /**
  * Creates a new symbol information literal.
  *
  * @param name The name of the symbol.
  * @param detail The detail of the symbol.
  * @param kind The kind of the symbol.
  * @param range The range of the symbol.
  * @param selectionRange The selectionRange of the symbol.
  * @param children Children of the symbol.
  */
  function create(name, detail, kind, range, selectionRange, children) {
    var result = {
      name: name,
      detail: detail,
      kind: kind,
      range: range,
      selectionRange: selectionRange
    };
    if (children !== undefined) {
      result.children = children;
    }
    return result;
  }
  DocumentSymbol.create = create;
  /**
  * Checks whether the given literal conforms to the [DocumentSymbol](#DocumentSymbol) interface.
  */
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.name) && Is.number(candidate.kind) && Range.is(candidate.range) && Range.is(candidate.selectionRange) && (candidate.detail === undefined || Is.string(candidate.detail)) && (candidate.deprecated === undefined || Is.boolean(candidate.deprecated)) && (candidate.children === undefined || Array.isArray(candidate.children)) && (candidate.tags === undefined || Array.isArray(candidate.tags));
  }
  DocumentSymbol.is = is;
})(DocumentSymbol || (DocumentSymbol = {}));
var CodeActionKind;
(function (CodeActionKind) {
  /**
  * Empty kind.
  */
  CodeActionKind.Empty = '';
  /**
  * Base kind for quickfix actions: 'quickfix'
  */
  CodeActionKind.QuickFix = 'quickfix';
  /**
  * Base kind for refactoring actions: 'refactor'
  */
  CodeActionKind.Refactor = 'refactor';
  /**
  * Base kind for refactoring extraction actions: 'refactor.extract'
  *
  * Example extract actions:
  *
  * - Extract method
  * - Extract function
  * - Extract variable
  * - Extract interface from class
  * - ...
  */
  CodeActionKind.RefactorExtract = 'refactor.extract';
  /**
  * Base kind for refactoring inline actions: 'refactor.inline'
  *
  * Example inline actions:
  *
  * - Inline function
  * - Inline variable
  * - Inline constant
  * - ...
  */
  CodeActionKind.RefactorInline = 'refactor.inline';
  /**
  * Base kind for refactoring rewrite actions: 'refactor.rewrite'
  *
  * Example rewrite actions:
  *
  * - Convert JavaScript function to class
  * - Add or remove parameter
  * - Encapsulate field
  * - Make method static
  * - Move method to base class
  * - ...
  */
  CodeActionKind.RefactorRewrite = 'refactor.rewrite';
  /**
  * Base kind for source actions: `source`
  *
  * Source code actions apply to the entire file.
  */
  CodeActionKind.Source = 'source';
  /**
  * Base kind for an organize imports source action: `source.organizeImports`
  */
  CodeActionKind.SourceOrganizeImports = 'source.organizeImports';
  /**
  * Base kind for auto-fix source actions: `source.fixAll`.
  *
  * Fix all actions automatically fix errors that have a clear fix that do not require user input.
  * They should not suppress errors or perform unsafe fixes such as generating new types or classes.
  *
  * @since 3.15.0
  */
  CodeActionKind.SourceFixAll = 'source.fixAll';
})(CodeActionKind || (CodeActionKind = {}));
var CodeActionContext;
(function (CodeActionContext) {
  /**
  * Creates a new CodeActionContext literal.
  */
  function create(diagnostics, only) {
    var result = {
      diagnostics: diagnostics
    };
    if (only !== undefined && only !== null) {
      result.only = only;
    }
    return result;
  }
  CodeActionContext.create = create;
  /**
  * Checks whether the given literal conforms to the [CodeActionContext](#CodeActionContext) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.typedArray(candidate.diagnostics, Diagnostic.is) && (candidate.only === undefined || Is.typedArray(candidate.only, Is.string));
  }
  CodeActionContext.is = is;
})(CodeActionContext || (CodeActionContext = {}));
var CodeAction;
(function (CodeAction) {
  function create(title, kindOrCommandOrEdit, kind) {
    var result = {
      title: title
    };
    var checkKind = true;
    if (typeof kindOrCommandOrEdit === 'string') {
      checkKind = false;
      result.kind = kindOrCommandOrEdit;
    } else if (Command.is(kindOrCommandOrEdit)) {
      result.command = kindOrCommandOrEdit;
    } else {
      result.edit = kindOrCommandOrEdit;
    }
    if (checkKind && kind !== undefined) {
      result.kind = kind;
    }
    return result;
  }
  CodeAction.create = create;
  function is(value) {
    var candidate = value;
    return candidate && Is.string(candidate.title) && (candidate.diagnostics === undefined || Is.typedArray(candidate.diagnostics, Diagnostic.is)) && (candidate.kind === undefined || Is.string(candidate.kind)) && (candidate.edit !== undefined || candidate.command !== undefined) && (candidate.command === undefined || Command.is(candidate.command)) && (candidate.isPreferred === undefined || Is.boolean(candidate.isPreferred)) && (candidate.edit === undefined || WorkspaceEdit.is(candidate.edit));
  }
  CodeAction.is = is;
})(CodeAction || (CodeAction = {}));
var CodeLens;
(function (CodeLens) {
  /**
  * Creates a new CodeLens literal.
  */
  function create(range, data) {
    var result = {
      range: range
    };
    if (Is.defined(data)) {
      result.data = data;
    }
    return result;
  }
  CodeLens.create = create;
  /**
  * Checks whether the given literal conforms to the [CodeLens](#CodeLens) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.command) || Command.is(candidate.command));
  }
  CodeLens.is = is;
})(CodeLens || (CodeLens = {}));
var FormattingOptions;
(function (FormattingOptions) {
  /**
  * Creates a new FormattingOptions literal.
  */
  function create(tabSize, insertSpaces) {
    return {
      tabSize: tabSize,
      insertSpaces: insertSpaces
    };
  }
  FormattingOptions.create = create;
  /**
  * Checks whether the given literal conforms to the [FormattingOptions](#FormattingOptions) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.uinteger(candidate.tabSize) && Is.boolean(candidate.insertSpaces);
  }
  FormattingOptions.is = is;
})(FormattingOptions || (FormattingOptions = {}));
var DocumentLink;
(function (DocumentLink) {
  /**
  * Creates a new DocumentLink literal.
  */
  function create(range, target, data) {
    return {
      range: range,
      target: target,
      data: data
    };
  }
  DocumentLink.create = create;
  /**
  * Checks whether the given literal conforms to the [DocumentLink](#DocumentLink) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Range.is(candidate.range) && (Is.undefined(candidate.target) || Is.string(candidate.target));
  }
  DocumentLink.is = is;
})(DocumentLink || (DocumentLink = {}));
var SelectionRange;
(function (SelectionRange) {
  /**
  * Creates a new SelectionRange
  * @param range the range.
  * @param parent an optional parent.
  */
  function create(range, parent) {
    return {
      range: range,
      parent: parent
    };
  }
  SelectionRange.create = create;
  function is(value) {
    var candidate = value;
    return candidate !== undefined && Range.is(candidate.range) && (candidate.parent === undefined || SelectionRange.is(candidate.parent));
  }
  SelectionRange.is = is;
})(SelectionRange || (SelectionRange = {}));
var EOL = ['\n', '\r\n', '\r'];
var TextDocument;
(function (TextDocument) {
  /**
  * Creates a new ITextDocument literal from the given uri and content.
  * @param uri The document's uri.
  * @param languageId  The document's language Id.
  * @param content The document's content.
  */
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument.create = create;
  /**
  * Checks whether the given literal conforms to the [ITextDocument](#ITextDocument) interface.
  */
  function is(value) {
    var candidate = value;
    return Is.defined(candidate) && Is.string(candidate.uri) && (Is.undefined(candidate.languageId) || Is.string(candidate.languageId)) && Is.uinteger(candidate.lineCount) && Is.func(candidate.getText) && Is.func(candidate.positionAt) && Is.func(candidate.offsetAt) ? true : false;
  }
  TextDocument.is = is;
  function applyEdits(document, edits) {
    var text = document.getText();
    var sortedEdits = mergeSort(edits, function (a, b) {
      var diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    var lastModifiedOffset = text.length;
    for (var i = sortedEdits.length - 1; i >= 0; i--) {
      var e = sortedEdits[i];
      var startOffset = document.offsetAt(e.range.start);
      var endOffset = document.offsetAt(e.range.end);
      if (endOffset <= lastModifiedOffset) {
        text = text.substring(0, startOffset) + e.newText + text.substring(endOffset, text.length);
      } else {
        throw new Error('Overlapping edit');
      }
      lastModifiedOffset = startOffset;
    }
    return text;
  }
  TextDocument.applyEdits = applyEdits;
  function mergeSort(data, compare) {
    if (data.length <= 1) {
      // sorted
      return data;
    }
    var p = data.length / 2 | 0;
    var left = data.slice(0, p);
    var right = data.slice(p);
    mergeSort(left, compare);
    mergeSort(right, compare);
    var leftIdx = 0;
    var rightIdx = 0;
    var i = 0;
    while (leftIdx < left.length && rightIdx < right.length) {
      var ret = compare(left[leftIdx], right[rightIdx]);
      if (ret <= 0) {
        // smaller_equal -> take left to preserve order
        data[i++] = left[leftIdx++];
      } else {
        // greater -> take right
        data[i++] = right[rightIdx++];
      }
    }
    while (leftIdx < left.length) {
      data[i++] = left[leftIdx++];
    }
    while (rightIdx < right.length) {
      data[i++] = right[rightIdx++];
    }
    return data;
  }
})(TextDocument || (TextDocument = {}));
/**
* @deprecated Use the text document from the new vscode-languageserver-textdocument package.
*/
var FullTextDocument = /** @class*/
(function () {
  function FullTextDocument(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = undefined;
  }
  Object.defineProperty(FullTextDocument.prototype, "uri", {
    get: function () {
      return this._uri;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "languageId", {
    get: function () {
      return this._languageId;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "version", {
    get: function () {
      return this._version;
    },
    enumerable: false,
    configurable: true
  });
  FullTextDocument.prototype.getText = function (range) {
    if (range) {
      var start = this.offsetAt(range.start);
      var end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  };
  FullTextDocument.prototype.update = function (event, version) {
    this._content = event.text;
    this._version = version;
    this._lineOffsets = undefined;
  };
  FullTextDocument.prototype.getLineOffsets = function () {
    if (this._lineOffsets === undefined) {
      var lineOffsets = [];
      var text = this._content;
      var isLineStart = true;
      for (var i = 0; i < text.length; i++) {
        if (isLineStart) {
          lineOffsets.push(i);
          isLineStart = false;
        }
        var ch = text.charAt(i);
        isLineStart = ch === '\r' || ch === '\n';
        if (ch === '\r' && i + 1 < text.length && text.charAt(i + 1) === '\n') {
          i++;
        }
      }
      if (isLineStart && text.length > 0) {
        lineOffsets.push(text.length);
      }
      this._lineOffsets = lineOffsets;
    }
    return this._lineOffsets;
  };
  FullTextDocument.prototype.positionAt = function (offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    var lineOffsets = this.getLineOffsets();
    var low = 0, high = lineOffsets.length;
    if (high === 0) {
      return Position.create(0, offset);
    }
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    // low is the least x for which the line offset is larger than the current offset
    // or array.length if no line offset is larger than the current offset
    var line = low - 1;
    return Position.create(line, offset - lineOffsets[line]);
  };
  FullTextDocument.prototype.offsetAt = function (position) {
    var lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    var lineOffset = lineOffsets[position.line];
    var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  };
  Object.defineProperty(FullTextDocument.prototype, "lineCount", {
    get: function () {
      return this.getLineOffsets().length;
    },
    enumerable: false,
    configurable: true
  });
  return FullTextDocument;
})();
var Is;
(function (Is) {
  var toString = Object.prototype.toString;
  function defined(value) {
    return typeof value !== 'undefined';
  }
  Is.defined = defined;
  function undefined(value) {
    return typeof value === 'undefined';
  }
  Is.undefined = undefined;
  function boolean(value) {
    return value === true || value === false;
  }
  Is.boolean = boolean;
  function string(value) {
    return toString.call(value) === '[object String]';
  }
  Is.string = string;
  function number(value) {
    return toString.call(value) === '[object Number]';
  }
  Is.number = number;
  function numberRange(value, min, max) {
    return toString.call(value) === '[object Number]' && min <= value && value <= max;
  }
  Is.numberRange = numberRange;
  function integer(value) {
    return toString.call(value) === '[object Number]' && -2147483648 <= value && value <= 2147483647;
  }
  Is.integer = integer;
  function uinteger(value) {
    return toString.call(value) === '[object Number]' && 0 <= value && value <= 2147483647;
  }
  Is.uinteger = uinteger;
  function func(value) {
    return toString.call(value) === '[object Function]';
  }
  Is.func = func;
  function objectLiteral(value) {
    // Strictly speaking class instances pass this check as well. Since the LSP
    // doesn't use classes we ignore this for now. If we do we need to add something
    // like this: `Object.getPrototypeOf(Object.getPrototypeOf(x)) === null`
    return value !== null && typeof value === 'object';
  }
  Is.objectLiteral = objectLiteral;
  function typedArray(value, check) {
    return Array.isArray(value) && value.every(check);
  }
  Is.typedArray = typedArray;
})(Is || (Is = {}));

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5Ja2e":[function(require,module,exports) {
/*--------------------------------------------------------------------------------------------
* Copyright (c) Microsoft Corporation. All rights reserved.
* Licensed under the MIT License. See License.txt in the project root for license information.
* ------------------------------------------------------------------------------------------*/
"use strict";
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "TextDocument", function () {
  return TextDocument;
});
var FullTextDocument = /** @class*/
(function () {
  function FullTextDocument(uri, languageId, version, content) {
    this._uri = uri;
    this._languageId = languageId;
    this._version = version;
    this._content = content;
    this._lineOffsets = undefined;
  }
  Object.defineProperty(FullTextDocument.prototype, "uri", {
    get: function () {
      return this._uri;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "languageId", {
    get: function () {
      return this._languageId;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(FullTextDocument.prototype, "version", {
    get: function () {
      return this._version;
    },
    enumerable: true,
    configurable: true
  });
  FullTextDocument.prototype.getText = function (range) {
    if (range) {
      var start = this.offsetAt(range.start);
      var end = this.offsetAt(range.end);
      return this._content.substring(start, end);
    }
    return this._content;
  };
  FullTextDocument.prototype.update = function (changes, version) {
    for (var _i = 0, changes_1 = changes; _i < changes_1.length; _i++) {
      var change = changes_1[_i];
      if (FullTextDocument.isIncremental(change)) {
        // makes sure start is before end
        var range = getWellformedRange(change.range);
        // update content
        var startOffset = this.offsetAt(range.start);
        var endOffset = this.offsetAt(range.end);
        this._content = this._content.substring(0, startOffset) + change.text + this._content.substring(endOffset, this._content.length);
        // update the offsets
        var startLine = Math.max(range.start.line, 0);
        var endLine = Math.max(range.end.line, 0);
        var lineOffsets = this._lineOffsets;
        var addedLineOffsets = computeLineOffsets(change.text, false, startOffset);
        if (endLine - startLine === addedLineOffsets.length) {
          for (var i = 0, len = addedLineOffsets.length; i < len; i++) {
            lineOffsets[i + startLine + 1] = addedLineOffsets[i];
          }
        } else {
          if (addedLineOffsets.length < 10000) {
            lineOffsets.splice.apply(lineOffsets, [startLine + 1, endLine - startLine].concat(addedLineOffsets));
          } else {
            // avoid too many arguments for splice
            this._lineOffsets = lineOffsets = lineOffsets.slice(0, startLine + 1).concat(addedLineOffsets, lineOffsets.slice(endLine + 1));
          }
        }
        var diff = change.text.length - (endOffset - startOffset);
        if (diff !== 0) {
          for (var i = startLine + 1 + addedLineOffsets.length, len = lineOffsets.length; i < len; i++) {
            lineOffsets[i] = lineOffsets[i] + diff;
          }
        }
      } else if (FullTextDocument.isFull(change)) {
        this._content = change.text;
        this._lineOffsets = undefined;
      } else {
        throw new Error('Unknown change event received');
      }
    }
    this._version = version;
  };
  FullTextDocument.prototype.getLineOffsets = function () {
    if (this._lineOffsets === undefined) {
      this._lineOffsets = computeLineOffsets(this._content, true);
    }
    return this._lineOffsets;
  };
  FullTextDocument.prototype.positionAt = function (offset) {
    offset = Math.max(Math.min(offset, this._content.length), 0);
    var lineOffsets = this.getLineOffsets();
    var low = 0, high = lineOffsets.length;
    if (high === 0) {
      return {
        line: 0,
        character: offset
      };
    }
    while (low < high) {
      var mid = Math.floor((low + high) / 2);
      if (lineOffsets[mid] > offset) {
        high = mid;
      } else {
        low = mid + 1;
      }
    }
    // low is the least x for which the line offset is larger than the current offset
    // or array.length if no line offset is larger than the current offset
    var line = low - 1;
    return {
      line: line,
      character: offset - lineOffsets[line]
    };
  };
  FullTextDocument.prototype.offsetAt = function (position) {
    var lineOffsets = this.getLineOffsets();
    if (position.line >= lineOffsets.length) {
      return this._content.length;
    } else if (position.line < 0) {
      return 0;
    }
    var lineOffset = lineOffsets[position.line];
    var nextLineOffset = position.line + 1 < lineOffsets.length ? lineOffsets[position.line + 1] : this._content.length;
    return Math.max(Math.min(lineOffset + position.character, nextLineOffset), lineOffset);
  };
  Object.defineProperty(FullTextDocument.prototype, "lineCount", {
    get: function () {
      return this.getLineOffsets().length;
    },
    enumerable: true,
    configurable: true
  });
  FullTextDocument.isIncremental = function (event) {
    var candidate = event;
    return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range !== undefined && (candidate.rangeLength === undefined || typeof candidate.rangeLength === 'number');
  };
  FullTextDocument.isFull = function (event) {
    var candidate = event;
    return candidate !== undefined && candidate !== null && typeof candidate.text === 'string' && candidate.range === undefined && candidate.rangeLength === undefined;
  };
  return FullTextDocument;
})();
var TextDocument;
(function (TextDocument) {
  /**
  * Creates a new text document.
  *
  * @param uri The document's uri.
  * @param languageId  The document's language Id.
  * @param version The document's initial version number.
  * @param content The document's content.
  */
  function create(uri, languageId, version, content) {
    return new FullTextDocument(uri, languageId, version, content);
  }
  TextDocument.create = create;
  /**
  * Updates a TextDocument by modifing its content.
  *
  * @param document the document to update. Only documents created by TextDocument.create are valid inputs.
  * @param changes the changes to apply to the document.
  * @returns The updated TextDocument. Note: That's the same document instance passed in as first parameter.
  *
  */
  function update(document, changes, version) {
    if (document instanceof FullTextDocument) {
      document.update(changes, version);
      return document;
    } else {
      throw new Error('TextDocument.update: document must be created by TextDocument.create');
    }
  }
  TextDocument.update = update;
  function applyEdits(document, edits) {
    var text = document.getText();
    var sortedEdits = mergeSort(edits.map(getWellformedEdit), function (a, b) {
      var diff = a.range.start.line - b.range.start.line;
      if (diff === 0) {
        return a.range.start.character - b.range.start.character;
      }
      return diff;
    });
    var lastModifiedOffset = 0;
    var spans = [];
    for (var _i = 0, sortedEdits_1 = sortedEdits; _i < sortedEdits_1.length; _i++) {
      var e = sortedEdits_1[_i];
      var startOffset = document.offsetAt(e.range.start);
      if (startOffset < lastModifiedOffset) {
        throw new Error('Overlapping edit');
      } else if (startOffset > lastModifiedOffset) {
        spans.push(text.substring(lastModifiedOffset, startOffset));
      }
      if (e.newText.length) {
        spans.push(e.newText);
      }
      lastModifiedOffset = document.offsetAt(e.range.end);
    }
    spans.push(text.substr(lastModifiedOffset));
    return spans.join('');
  }
  TextDocument.applyEdits = applyEdits;
})(TextDocument || (TextDocument = {}));
function mergeSort(data, compare) {
  if (data.length <= 1) {
    // sorted
    return data;
  }
  var p = data.length / 2 | 0;
  var left = data.slice(0, p);
  var right = data.slice(p);
  mergeSort(left, compare);
  mergeSort(right, compare);
  var leftIdx = 0;
  var rightIdx = 0;
  var i = 0;
  while (leftIdx < left.length && rightIdx < right.length) {
    var ret = compare(left[leftIdx], right[rightIdx]);
    if (ret <= 0) {
      // smaller_equal -> take left to preserve order
      data[i++] = left[leftIdx++];
    } else {
      // greater -> take right
      data[i++] = right[rightIdx++];
    }
  }
  while (leftIdx < left.length) {
    data[i++] = left[leftIdx++];
  }
  while (rightIdx < right.length) {
    data[i++] = right[rightIdx++];
  }
  return data;
}
function computeLineOffsets(text, isAtLineStart, textOffset) {
  if (textOffset === void 0) {
    textOffset = 0;
  }
  var result = isAtLineStart ? [textOffset] : [];
  for (var i = 0; i < text.length; i++) {
    var ch = text.charCodeAt(i);
    if (ch === 13 || /*CarriageReturn*/
    ch === 10) /*LineFeed*/
    {
      if (ch === 13 && /*CarriageReturn*/
      i + 1 < text.length && text.charCodeAt(i + 1) === 10) /*LineFeed*/
      {
        i++;
      }
      result.push(textOffset + i + 1);
    }
  }
  return result;
}
function getWellformedRange(range) {
  var start = range.start;
  var end = range.end;
  if (start.line > end.line || start.line === end.line && start.character > end.character) {
    return {
      start: end,
      end: start
    };
  }
  return range;
}
function getWellformedEdit(textEdit) {
  var range = getWellformedRange(textEdit.range);
  if (range !== textEdit.range) {
    return {
      newText: textEdit.newText,
      range: range
    };
  }
  return textEdit;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"Io1zy":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "loadMessageBundle", function () {
  return loadMessageBundle;
});
_parcelHelpers.export(exports, "config", function () {
  return config;
});
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
function format(message, args) {
  var result;
  if (args.length === 0) {
    result = message;
  } else {
    result = message.replace(/\{(\d+)\}/g, function (match, rest) {
      var index = rest[0];
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return result;
}
function localize(key, message) {
  var args = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    args[_i - 2] = arguments[_i];
  }
  return format(message, args);
}
function loadMessageBundle(file) {
  return localize;
}
function config(opt) {
  return loadMessageBundle;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6ucPP":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "stringifyObject", function () {
  return stringifyObject;
});
function stringifyObject(obj, indent, stringifyLiteral) {
  if (obj !== null && typeof obj === 'object') {
    var newIndent = indent + '\t';
    if (Array.isArray(obj)) {
      if (obj.length === 0) {
        return '[]';
      }
      var result = '[\n';
      for (var i = 0; i < obj.length; i++) {
        result += newIndent + stringifyObject(obj[i], newIndent, stringifyLiteral);
        if (i < obj.length - 1) {
          result += ',';
        }
        result += '\n';
      }
      result += indent + ']';
      return result;
    } else {
      var keys = Object.keys(obj);
      if (keys.length === 0) {
        return '{}';
      }
      var result = '{\n';
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        result += newIndent + JSON.stringify(key) + ': ' + stringifyObject(obj[key], newIndent, stringifyLiteral);
        if (i < keys.length - 1) {
          result += ',';
        }
        result += '\n';
      }
      result += indent + '}';
      return result;
    }
  }
  return stringifyLiteral(obj);
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"WOW9E":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "startsWith", function () {
  return startsWith;
});
_parcelHelpers.export(exports, "endsWith", function () {
  return endsWith;
});
_parcelHelpers.export(exports, "convertSimple2RegExpPattern", function () {
  return convertSimple2RegExpPattern;
});
_parcelHelpers.export(exports, "repeat", function () {
  return repeat;
});
function startsWith(haystack, needle) {
  if (haystack.length < needle.length) {
    return false;
  }
  for (var i = 0; i < needle.length; i++) {
    if (haystack[i] !== needle[i]) {
      return false;
    }
  }
  return true;
}
function endsWith(haystack, needle) {
  var diff = haystack.length - needle.length;
  if (diff > 0) {
    return haystack.lastIndexOf(needle) === diff;
  } else if (diff === 0) {
    return haystack === needle;
  } else {
    return false;
  }
}
function convertSimple2RegExpPattern(pattern) {
  return pattern.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
}
function repeat(value, count) {
  var s = '';
  while (count > 0) {
    if ((count & 1) === 1) {
      s += value;
    }
    value += value;
    count = count >>> 1;
  }
  return s;
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4l1dL":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "JSONHover", function () {
  return JSONHover;
});
var _parserJsonParserJs = require('../parser/jsonParser.js');
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
var JSONHover = /** @class*/
(function () {
  function JSONHover(schemaService, contributions, promiseConstructor) {
    if (contributions === void 0) {
      contributions = [];
    }
    this.schemaService = schemaService;
    this.contributions = contributions;
    this.promise = promiseConstructor || Promise;
  }
  JSONHover.prototype.doHover = function (document, position, doc) {
    var offset = document.offsetAt(position);
    var node = doc.getNodeFromOffset(offset);
    if (!node || (node.type === 'object' || node.type === 'array') && offset > node.offset + 1 && offset < node.offset + node.length - 1) {
      return this.promise.resolve(null);
    }
    var hoverRangeNode = node;
    // use the property description when hovering over an object key
    if (node.type === 'string') {
      var parent = node.parent;
      if (parent && parent.type === 'property' && parent.keyNode === node) {
        node = parent.valueNode;
        if (!node) {
          return this.promise.resolve(null);
        }
      }
    }
    var hoverRange = _jsonLanguageTypesJs.Range.create(document.positionAt(hoverRangeNode.offset), document.positionAt(hoverRangeNode.offset + hoverRangeNode.length));
    var createHover = function (contents) {
      var result = {
        contents: contents,
        range: hoverRange
      };
      return result;
    };
    var location = _parserJsonParserJs.getNodePath(node);
    for (var i = this.contributions.length - 1; i >= 0; i--) {
      var contribution = this.contributions[i];
      var promise = contribution.getInfoContribution(document.uri, location);
      if (promise) {
        return promise.then(function (htmlContent) {
          return createHover(htmlContent);
        });
      }
    }
    return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
      if (schema && node) {
        var matchingSchemas = doc.getMatchingSchemas(schema.schema, node.offset);
        var title_1 = undefined;
        var markdownDescription_1 = undefined;
        var markdownEnumValueDescription_1 = undefined, enumValue_1 = undefined;
        matchingSchemas.every(function (s) {
          if (s.node === node && !s.inverted && s.schema) {
            title_1 = title_1 || s.schema.title;
            markdownDescription_1 = markdownDescription_1 || s.schema.markdownDescription || toMarkdown(s.schema.description);
            if (s.schema.enum) {
              var idx = s.schema.enum.indexOf(_parserJsonParserJs.getNodeValue(node));
              if (s.schema.markdownEnumDescriptions) {
                markdownEnumValueDescription_1 = s.schema.markdownEnumDescriptions[idx];
              } else if (s.schema.enumDescriptions) {
                markdownEnumValueDescription_1 = toMarkdown(s.schema.enumDescriptions[idx]);
              }
              if (markdownEnumValueDescription_1) {
                enumValue_1 = s.schema.enum[idx];
                if (typeof enumValue_1 !== 'string') {
                  enumValue_1 = JSON.stringify(enumValue_1);
                }
              }
            }
          }
          return true;
        });
        var result = '';
        if (title_1) {
          result = toMarkdown(title_1);
        }
        if (markdownDescription_1) {
          if (result.length > 0) {
            result += "\n\n";
          }
          result += markdownDescription_1;
        }
        if (markdownEnumValueDescription_1) {
          if (result.length > 0) {
            result += "\n\n";
          }
          result += "`" + toMarkdownCodeBlock(enumValue_1) + "`: " + markdownEnumValueDescription_1;
        }
        return createHover([result]);
      }
      return null;
    });
  };
  return JSONHover;
})();
function toMarkdown(plain) {
  if (plain) {
    var res = plain.replace(/([^\n\r])(\r?\n)([^\n\r])/gm, '$1\n\n$3');
    // single new lines to \n\n (Markdown paragraph)
    return res.replace(/[\\`*_{}[\]()#+\-.!]/g, "\\$&");
  }
  return undefined;
}
function toMarkdownCodeBlock(content) {
  // see https://daringfireball.net/projects/markdown/syntax#precode
  if (content.indexOf('`') !== -1) {
    return '`` ' + content + ' ``';
  }
  return content;
}

},{"../parser/jsonParser.js":"23R5j","../jsonLanguageTypes.js":"7JR1I","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"hqhIh":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "JSONValidation", function () {
  return JSONValidation;
});
var _jsonSchemaServiceJs = require('./jsonSchemaService.js');
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
var _fillersVscodeNlsJs = require('./../../../fillers/vscode-nls.js');
var _utilsObjectsJs = require('../utils/objects.js');
var localize = _fillersVscodeNlsJs.loadMessageBundle();
var JSONValidation = /** @class*/
(function () {
  function JSONValidation(jsonSchemaService, promiseConstructor) {
    this.jsonSchemaService = jsonSchemaService;
    this.promise = promiseConstructor;
    this.validationEnabled = true;
  }
  JSONValidation.prototype.configure = function (raw) {
    if (raw) {
      this.validationEnabled = raw.validate !== false;
      this.commentSeverity = raw.allowComments ? undefined : _jsonLanguageTypesJs.DiagnosticSeverity.Error;
    }
  };
  JSONValidation.prototype.doValidation = function (textDocument, jsonDocument, documentSettings, schema) {
    var _this = this;
    if (!this.validationEnabled) {
      return this.promise.resolve([]);
    }
    var diagnostics = [];
    var added = {};
    var addProblem = function (problem) {
      // remove duplicated messages
      var signature = problem.range.start.line + ' ' + problem.range.start.character + ' ' + problem.message;
      if (!added[signature]) {
        added[signature] = true;
        diagnostics.push(problem);
      }
    };
    var getDiagnostics = function (schema) {
      var trailingCommaSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.trailingCommas) : _jsonLanguageTypesJs.DiagnosticSeverity.Error;
      var commentSeverity = documentSettings ? toDiagnosticSeverity(documentSettings.comments) : _this.commentSeverity;
      var schemaValidation = (documentSettings === null || documentSettings === void 0 ? void 0 : documentSettings.schemaValidation) ? toDiagnosticSeverity(documentSettings.schemaValidation) : _jsonLanguageTypesJs.DiagnosticSeverity.Warning;
      var schemaRequest = (documentSettings === null || documentSettings === void 0 ? void 0 : documentSettings.schemaRequest) ? toDiagnosticSeverity(documentSettings.schemaRequest) : _jsonLanguageTypesJs.DiagnosticSeverity.Warning;
      if (schema) {
        if (schema.errors.length && jsonDocument.root && schemaRequest) {
          var astRoot = jsonDocument.root;
          var property = astRoot.type === 'object' ? astRoot.properties[0] : undefined;
          if (property && property.keyNode.value === '$schema') {
            var node = property.valueNode || property;
            var range = _jsonLanguageTypesJs.Range.create(textDocument.positionAt(node.offset), textDocument.positionAt(node.offset + node.length));
            addProblem(_jsonLanguageTypesJs.Diagnostic.create(range, schema.errors[0], schemaRequest, _jsonLanguageTypesJs.ErrorCode.SchemaResolveError));
          } else {
            var range = _jsonLanguageTypesJs.Range.create(textDocument.positionAt(astRoot.offset), textDocument.positionAt(astRoot.offset + 1));
            addProblem(_jsonLanguageTypesJs.Diagnostic.create(range, schema.errors[0], schemaRequest, _jsonLanguageTypesJs.ErrorCode.SchemaResolveError));
          }
        } else if (schemaValidation) {
          var semanticErrors = jsonDocument.validate(textDocument, schema.schema, schemaValidation);
          if (semanticErrors) {
            semanticErrors.forEach(addProblem);
          }
        }
        if (schemaAllowsComments(schema.schema)) {
          commentSeverity = undefined;
        }
        if (schemaAllowsTrailingCommas(schema.schema)) {
          trailingCommaSeverity = undefined;
        }
      }
      for (var _i = 0, _a = jsonDocument.syntaxErrors; _i < _a.length; _i++) {
        var p = _a[_i];
        if (p.code === _jsonLanguageTypesJs.ErrorCode.TrailingComma) {
          if (typeof trailingCommaSeverity !== 'number') {
            continue;
          }
          p.severity = trailingCommaSeverity;
        }
        addProblem(p);
      }
      if (typeof commentSeverity === 'number') {
        var message_1 = localize('InvalidCommentToken', 'Comments are not permitted in JSON.');
        jsonDocument.comments.forEach(function (c) {
          addProblem(_jsonLanguageTypesJs.Diagnostic.create(c, message_1, commentSeverity, _jsonLanguageTypesJs.ErrorCode.CommentNotPermitted));
        });
      }
      return diagnostics;
    };
    if (schema) {
      var id = schema.id || 'schemaservice://untitled/' + idCounter++;
      return this.jsonSchemaService.resolveSchemaContent(new _jsonSchemaServiceJs.UnresolvedSchema(schema), id, {}).then(function (resolvedSchema) {
        return getDiagnostics(resolvedSchema);
      });
    }
    return this.jsonSchemaService.getSchemaForResource(textDocument.uri, jsonDocument).then(function (schema) {
      return getDiagnostics(schema);
    });
  };
  return JSONValidation;
})();
var idCounter = 0;
function schemaAllowsComments(schemaRef) {
  if (schemaRef && typeof schemaRef === 'object') {
    if (_utilsObjectsJs.isBoolean(schemaRef.allowComments)) {
      return schemaRef.allowComments;
    }
    if (schemaRef.allOf) {
      for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
        var schema = _a[_i];
        var allow = schemaAllowsComments(schema);
        if (_utilsObjectsJs.isBoolean(allow)) {
          return allow;
        }
      }
    }
  }
  return undefined;
}
function schemaAllowsTrailingCommas(schemaRef) {
  if (schemaRef && typeof schemaRef === 'object') {
    if (_utilsObjectsJs.isBoolean(schemaRef.allowTrailingCommas)) {
      return schemaRef.allowTrailingCommas;
    }
    var deprSchemaRef = schemaRef;
    if (_utilsObjectsJs.isBoolean(deprSchemaRef['allowsTrailingCommas'])) {
      // deprecated
      return deprSchemaRef['allowsTrailingCommas'];
    }
    if (schemaRef.allOf) {
      for (var _i = 0, _a = schemaRef.allOf; _i < _a.length; _i++) {
        var schema = _a[_i];
        var allow = schemaAllowsTrailingCommas(schema);
        if (_utilsObjectsJs.isBoolean(allow)) {
          return allow;
        }
      }
    }
  }
  return undefined;
}
function toDiagnosticSeverity(severityLevel) {
  switch (severityLevel) {
    case 'error':
      return _jsonLanguageTypesJs.DiagnosticSeverity.Error;
    case 'warning':
      return _jsonLanguageTypesJs.DiagnosticSeverity.Warning;
    case 'ignore':
      return undefined;
  }
  return undefined;
}

},{"./jsonSchemaService.js":"XsrrN","../jsonLanguageTypes.js":"7JR1I","./../../../fillers/vscode-nls.js":"Io1zy","../utils/objects.js":"2EsVe","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"XsrrN":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "UnresolvedSchema", function () {
  return UnresolvedSchema;
});
_parcelHelpers.export(exports, "ResolvedSchema", function () {
  return ResolvedSchema;
});
_parcelHelpers.export(exports, "JSONSchemaService", function () {
  return JSONSchemaService;
});
var _jsoncParserMainJs = require('./../../jsonc-parser/main.js');
var _vscodeUriIndexJs = require('./../../vscode-uri/index.js');
var _utilsStringsJs = require('../utils/strings.js');
var _parserJsonParserJs = require('../parser/jsonParser.js');
var _fillersVscodeNlsJs = require('./../../../fillers/vscode-nls.js');
var localize = _fillersVscodeNlsJs.loadMessageBundle();
var FilePatternAssociation = /** @class*/
(function () {
  function FilePatternAssociation(pattern, uris) {
    this.patternRegExps = [];
    this.isInclude = [];
    try {
      for (var _i = 0, pattern_1 = pattern; _i < pattern_1.length; _i++) {
        var p = pattern_1[_i];
        var include = p[0] !== '!';
        if (!include) {
          p = p.substring(1);
        }
        this.patternRegExps.push(new RegExp(_utilsStringsJs.convertSimple2RegExpPattern(p) + '$'));
        this.isInclude.push(include);
      }
      this.uris = uris;
    } catch (e) {
      // invalid pattern
      this.patternRegExps.length = 0;
      this.isInclude.length = 0;
      this.uris = [];
    }
  }
  FilePatternAssociation.prototype.matchesPattern = function (fileName) {
    var match = false;
    for (var i = 0; i < this.patternRegExps.length; i++) {
      var regExp = this.patternRegExps[i];
      if (regExp.test(fileName)) {
        match = this.isInclude[i];
      }
    }
    return match;
  };
  FilePatternAssociation.prototype.getURIs = function () {
    return this.uris;
  };
  return FilePatternAssociation;
})();
var SchemaHandle = /** @class*/
(function () {
  function SchemaHandle(service, url, unresolvedSchemaContent) {
    this.service = service;
    this.url = url;
    this.dependencies = {};
    if (unresolvedSchemaContent) {
      this.unresolvedSchema = this.service.promise.resolve(new UnresolvedSchema(unresolvedSchemaContent));
    }
  }
  SchemaHandle.prototype.getUnresolvedSchema = function () {
    if (!this.unresolvedSchema) {
      this.unresolvedSchema = this.service.loadSchema(this.url);
    }
    return this.unresolvedSchema;
  };
  SchemaHandle.prototype.getResolvedSchema = function () {
    var _this = this;
    if (!this.resolvedSchema) {
      this.resolvedSchema = this.getUnresolvedSchema().then(function (unresolved) {
        return _this.service.resolveSchemaContent(unresolved, _this.url, _this.dependencies);
      });
    }
    return this.resolvedSchema;
  };
  SchemaHandle.prototype.clearSchema = function () {
    this.resolvedSchema = undefined;
    this.unresolvedSchema = undefined;
    this.dependencies = {};
  };
  return SchemaHandle;
})();
var UnresolvedSchema = /** @class*/
(function () {
  function UnresolvedSchema(schema, errors) {
    if (errors === void 0) {
      errors = [];
    }
    this.schema = schema;
    this.errors = errors;
  }
  return UnresolvedSchema;
})();
var ResolvedSchema = /** @class*/
(function () {
  function ResolvedSchema(schema, errors) {
    if (errors === void 0) {
      errors = [];
    }
    this.schema = schema;
    this.errors = errors;
  }
  ResolvedSchema.prototype.getSection = function (path) {
    var schemaRef = this.getSectionRecursive(path, this.schema);
    if (schemaRef) {
      return _parserJsonParserJs.asSchema(schemaRef);
    }
    return undefined;
  };
  ResolvedSchema.prototype.getSectionRecursive = function (path, schema) {
    if (!schema || typeof schema === 'boolean' || path.length === 0) {
      return schema;
    }
    var next = path.shift();
    if (schema.properties && typeof schema.properties[next]) {
      return this.getSectionRecursive(path, schema.properties[next]);
    } else if (schema.patternProperties) {
      for (var _i = 0, _a = Object.keys(schema.patternProperties); _i < _a.length; _i++) {
        var pattern = _a[_i];
        var regex = new RegExp(pattern);
        if (regex.test(next)) {
          return this.getSectionRecursive(path, schema.patternProperties[pattern]);
        }
      }
    } else if (typeof schema.additionalProperties === 'object') {
      return this.getSectionRecursive(path, schema.additionalProperties);
    } else if (next.match('[0-9]+')) {
      if (Array.isArray(schema.items)) {
        var index = parseInt(next, 10);
        if (!isNaN(index) && schema.items[index]) {
          return this.getSectionRecursive(path, schema.items[index]);
        }
      } else if (schema.items) {
        return this.getSectionRecursive(path, schema.items);
      }
    }
    return undefined;
  };
  return ResolvedSchema;
})();
var JSONSchemaService = /** @class*/
(function () {
  function JSONSchemaService(requestService, contextService, promiseConstructor) {
    this.contextService = contextService;
    this.requestService = requestService;
    this.promiseConstructor = promiseConstructor || Promise;
    this.callOnDispose = [];
    this.contributionSchemas = {};
    this.contributionAssociations = [];
    this.schemasById = {};
    this.filePatternAssociations = [];
    this.registeredSchemasIds = {};
  }
  JSONSchemaService.prototype.getRegisteredSchemaIds = function (filter) {
    return Object.keys(this.registeredSchemasIds).filter(function (id) {
      var scheme = _vscodeUriIndexJs.URI.parse(id).scheme;
      return scheme !== 'schemaservice' && (!filter || filter(scheme));
    });
  };
  Object.defineProperty(JSONSchemaService.prototype, "promise", {
    get: function () {
      return this.promiseConstructor;
    },
    enumerable: false,
    configurable: true
  });
  JSONSchemaService.prototype.dispose = function () {
    while (this.callOnDispose.length > 0) {
      this.callOnDispose.pop()();
    }
  };
  JSONSchemaService.prototype.onResourceChange = function (uri) {
    var _this = this;
    var hasChanges = false;
    uri = normalizeId(uri);
    var toWalk = [uri];
    var all = Object.keys(this.schemasById).map(function (key) {
      return _this.schemasById[key];
    });
    while (toWalk.length) {
      var curr = toWalk.pop();
      for (var i = 0; i < all.length; i++) {
        var handle = all[i];
        if (handle && (handle.url === curr || handle.dependencies[curr])) {
          if (handle.url !== curr) {
            toWalk.push(handle.url);
          }
          handle.clearSchema();
          all[i] = undefined;
          hasChanges = true;
        }
      }
    }
    return hasChanges;
  };
  JSONSchemaService.prototype.setSchemaContributions = function (schemaContributions) {
    if (schemaContributions.schemas) {
      var schemas = schemaContributions.schemas;
      for (var id in schemas) {
        var normalizedId = normalizeId(id);
        this.contributionSchemas[normalizedId] = this.addSchemaHandle(normalizedId, schemas[id]);
      }
    }
    if (Array.isArray(schemaContributions.schemaAssociations)) {
      var schemaAssociations = schemaContributions.schemaAssociations;
      for (var _i = 0, schemaAssociations_1 = schemaAssociations; _i < schemaAssociations_1.length; _i++) {
        var schemaAssociation = schemaAssociations_1[_i];
        var uris = schemaAssociation.uris.map(normalizeId);
        var association = this.addFilePatternAssociation(schemaAssociation.pattern, uris);
        this.contributionAssociations.push(association);
      }
    }
  };
  JSONSchemaService.prototype.addSchemaHandle = function (id, unresolvedSchemaContent) {
    var schemaHandle = new SchemaHandle(this, id, unresolvedSchemaContent);
    this.schemasById[id] = schemaHandle;
    return schemaHandle;
  };
  JSONSchemaService.prototype.getOrAddSchemaHandle = function (id, unresolvedSchemaContent) {
    return this.schemasById[id] || this.addSchemaHandle(id, unresolvedSchemaContent);
  };
  JSONSchemaService.prototype.addFilePatternAssociation = function (pattern, uris) {
    var fpa = new FilePatternAssociation(pattern, uris);
    this.filePatternAssociations.push(fpa);
    return fpa;
  };
  JSONSchemaService.prototype.registerExternalSchema = function (uri, filePatterns, unresolvedSchemaContent) {
    var id = normalizeId(uri);
    this.registeredSchemasIds[id] = true;
    this.cachedSchemaForResource = undefined;
    if (filePatterns) {
      this.addFilePatternAssociation(filePatterns, [uri]);
    }
    return unresolvedSchemaContent ? this.addSchemaHandle(id, unresolvedSchemaContent) : this.getOrAddSchemaHandle(id);
  };
  JSONSchemaService.prototype.clearExternalSchemas = function () {
    this.schemasById = {};
    this.filePatternAssociations = [];
    this.registeredSchemasIds = {};
    this.cachedSchemaForResource = undefined;
    for (var id in this.contributionSchemas) {
      this.schemasById[id] = this.contributionSchemas[id];
      this.registeredSchemasIds[id] = true;
    }
    for (var _i = 0, _a = this.contributionAssociations; _i < _a.length; _i++) {
      var contributionAssociation = _a[_i];
      this.filePatternAssociations.push(contributionAssociation);
    }
  };
  JSONSchemaService.prototype.getResolvedSchema = function (schemaId) {
    var id = normalizeId(schemaId);
    var schemaHandle = this.schemasById[id];
    if (schemaHandle) {
      return schemaHandle.getResolvedSchema();
    }
    return this.promise.resolve(undefined);
  };
  JSONSchemaService.prototype.loadSchema = function (url) {
    if (!this.requestService) {
      var errorMessage = localize('json.schema.norequestservice', 'Unable to load schema from \'{0}\'. No schema request service available', toDisplayString(url));
      return this.promise.resolve(new UnresolvedSchema({}, [errorMessage]));
    }
    return this.requestService(url).then(function (content) {
      if (!content) {
        var errorMessage = localize('json.schema.nocontent', 'Unable to load schema from \'{0}\': No content.', toDisplayString(url));
        return new UnresolvedSchema({}, [errorMessage]);
      }
      var schemaContent = {};
      var jsonErrors = [];
      schemaContent = _jsoncParserMainJs.parse(content, jsonErrors);
      var errors = jsonErrors.length ? [localize('json.schema.invalidFormat', 'Unable to parse content from \'{0}\': Parse error at offset {1}.', toDisplayString(url), jsonErrors[0].offset)] : [];
      return new UnresolvedSchema(schemaContent, errors);
    }, function (error) {
      var errorMessage = error.toString();
      var errorSplit = error.toString().split('Error: ');
      if (errorSplit.length > 1) {
        // more concise error message, URL and context are attached by caller anyways
        errorMessage = errorSplit[1];
      }
      if (_utilsStringsJs.endsWith(errorMessage, '.')) {
        errorMessage = errorMessage.substr(0, errorMessage.length - 1);
      }
      return new UnresolvedSchema({}, [localize('json.schema.nocontent', 'Unable to load schema from \'{0}\': {1}.', toDisplayString(url), errorMessage)]);
    });
  };
  JSONSchemaService.prototype.resolveSchemaContent = function (schemaToResolve, schemaURL, dependencies) {
    var _this = this;
    var resolveErrors = schemaToResolve.errors.slice(0);
    var schema = schemaToResolve.schema;
    if (schema.$schema) {
      var id = normalizeId(schema.$schema);
      if (id === 'http://json-schema.org/draft-03/schema') {
        return this.promise.resolve(new ResolvedSchema({}, [localize('json.schema.draft03.notsupported', "Draft-03 schemas are not supported.")]));
      } else if (id === 'https://json-schema.org/draft/2019-09/schema') {
        resolveErrors.push(localize('json.schema.draft201909.notsupported', "Draft 2019-09 schemas are not yet fully supported."));
      }
    }
    var contextService = this.contextService;
    var findSection = function (schema, path) {
      if (!path) {
        return schema;
      }
      var current = schema;
      if (path[0] === '/') {
        path = path.substr(1);
      }
      path.split('/').some(function (part) {
        current = current[part];
        return !current;
      });
      return current;
    };
    var merge = function (target, sourceRoot, sourceURI, refSegment) {
      var path = refSegment ? decodeURIComponent(refSegment) : undefined;
      var section = findSection(sourceRoot, path);
      if (section) {
        for (var key in section) {
          if (section.hasOwnProperty(key) && !target.hasOwnProperty(key)) {
            target[key] = section[key];
          }
        }
      } else {
        resolveErrors.push(localize('json.schema.invalidref', '$ref \'{0}\' in \'{1}\' can not be resolved.', path, sourceURI));
      }
    };
    var resolveExternalLink = function (node, uri, refSegment, parentSchemaURL, parentSchemaDependencies) {
      if (contextService && !(/^\w+:\/\/.*/).test(uri)) {
        uri = contextService.resolveRelativePath(uri, parentSchemaURL);
      }
      uri = normalizeId(uri);
      var referencedHandle = _this.getOrAddSchemaHandle(uri);
      return referencedHandle.getUnresolvedSchema().then(function (unresolvedSchema) {
        parentSchemaDependencies[uri] = true;
        if (unresolvedSchema.errors.length) {
          var loc = refSegment ? uri + '#' + refSegment : uri;
          resolveErrors.push(localize('json.schema.problemloadingref', 'Problems loading reference \'{0}\': {1}', loc, unresolvedSchema.errors[0]));
        }
        merge(node, unresolvedSchema.schema, uri, refSegment);
        return resolveRefs(node, unresolvedSchema.schema, uri, referencedHandle.dependencies);
      });
    };
    var resolveRefs = function (node, parentSchema, parentSchemaURL, parentSchemaDependencies) {
      if (!node || typeof node !== 'object') {
        return Promise.resolve(null);
      }
      var toWalk = [node];
      var seen = [];
      var openPromises = [];
      var collectEntries = function () {
        var entries = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          entries[_i] = arguments[_i];
        }
        for (var _a = 0, entries_1 = entries; _a < entries_1.length; _a++) {
          var entry = entries_1[_a];
          if (typeof entry === 'object') {
            toWalk.push(entry);
          }
        }
      };
      var collectMapEntries = function () {
        var maps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          maps[_i] = arguments[_i];
        }
        for (var _a = 0, maps_1 = maps; _a < maps_1.length; _a++) {
          var map = maps_1[_a];
          if (typeof map === 'object') {
            for (var k in map) {
              var key = k;
              var entry = map[key];
              if (typeof entry === 'object') {
                toWalk.push(entry);
              }
            }
          }
        }
      };
      var collectArrayEntries = function () {
        var arrays = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          arrays[_i] = arguments[_i];
        }
        for (var _a = 0, arrays_1 = arrays; _a < arrays_1.length; _a++) {
          var array = arrays_1[_a];
          if (Array.isArray(array)) {
            for (var _b = 0, array_1 = array; _b < array_1.length; _b++) {
              var entry = array_1[_b];
              if (typeof entry === 'object') {
                toWalk.push(entry);
              }
            }
          }
        }
      };
      var handleRef = function (next) {
        var seenRefs = [];
        while (next.$ref) {
          var ref = next.$ref;
          var segments = ref.split('#', 2);
          delete next.$ref;
          if (segments[0].length > 0) {
            openPromises.push(resolveExternalLink(next, segments[0], segments[1], parentSchemaURL, parentSchemaDependencies));
            return;
          } else {
            if (seenRefs.indexOf(ref) === -1) {
              merge(next, parentSchema, parentSchemaURL, segments[1]);
              // can set next.$ref again, use seenRefs to avoid circle
              seenRefs.push(ref);
            }
          }
        }
        collectEntries(next.items, next.additionalItems, next.additionalProperties, next.not, next.contains, next.propertyNames, next.if, next.then, next.else);
        collectMapEntries(next.definitions, next.properties, next.patternProperties, next.dependencies);
        collectArrayEntries(next.anyOf, next.allOf, next.oneOf, next.items);
      };
      while (toWalk.length) {
        var next = toWalk.pop();
        if (seen.indexOf(next) >= 0) {
          continue;
        }
        seen.push(next);
        handleRef(next);
      }
      return _this.promise.all(openPromises);
    };
    return resolveRefs(schema, schema, schemaURL, dependencies).then(function (_) {
      return new ResolvedSchema(schema, resolveErrors);
    });
  };
  JSONSchemaService.prototype.getSchemaForResource = function (resource, document) {
    // first use $schema if present
    if (document && document.root && document.root.type === 'object') {
      var schemaProperties = document.root.properties.filter(function (p) {
        return p.keyNode.value === '$schema' && p.valueNode && p.valueNode.type === 'string';
      });
      if (schemaProperties.length > 0) {
        var valueNode = schemaProperties[0].valueNode;
        if (valueNode && valueNode.type === 'string') {
          var schemeId = _parserJsonParserJs.getNodeValue(valueNode);
          if (schemeId && _utilsStringsJs.startsWith(schemeId, '.') && this.contextService) {
            schemeId = this.contextService.resolveRelativePath(schemeId, resource);
          }
          if (schemeId) {
            var id = normalizeId(schemeId);
            return this.getOrAddSchemaHandle(id).getResolvedSchema();
          }
        }
      }
    }
    if (this.cachedSchemaForResource && this.cachedSchemaForResource.resource === resource) {
      return this.cachedSchemaForResource.resolvedSchema;
    }
    var seen = Object.create(null);
    var schemas = [];
    var normalizedResource = normalizeResourceForMatching(resource);
    for (var _i = 0, _a = this.filePatternAssociations; _i < _a.length; _i++) {
      var entry = _a[_i];
      if (entry.matchesPattern(normalizedResource)) {
        for (var _b = 0, _c = entry.getURIs(); _b < _c.length; _b++) {
          var schemaId = _c[_b];
          if (!seen[schemaId]) {
            schemas.push(schemaId);
            seen[schemaId] = true;
          }
        }
      }
    }
    var resolvedSchema = schemas.length > 0 ? this.createCombinedSchema(resource, schemas).getResolvedSchema() : this.promise.resolve(undefined);
    this.cachedSchemaForResource = {
      resource: resource,
      resolvedSchema: resolvedSchema
    };
    return resolvedSchema;
  };
  JSONSchemaService.prototype.createCombinedSchema = function (resource, schemaIds) {
    if (schemaIds.length === 1) {
      return this.getOrAddSchemaHandle(schemaIds[0]);
    } else {
      var combinedSchemaId = 'schemaservice://combinedSchema/' + encodeURIComponent(resource);
      var combinedSchema = {
        allOf: schemaIds.map(function (schemaId) {
          return {
            $ref: schemaId
          };
        })
      };
      return this.addSchemaHandle(combinedSchemaId, combinedSchema);
    }
  };
  JSONSchemaService.prototype.getMatchingSchemas = function (document, jsonDocument, schema) {
    if (schema) {
      var id = schema.id || 'schemaservice://untitled/matchingSchemas/' + idCounter++;
      return this.resolveSchemaContent(new UnresolvedSchema(schema), id, {}).then(function (resolvedSchema) {
        return jsonDocument.getMatchingSchemas(resolvedSchema.schema).filter(function (s) {
          return !s.inverted;
        });
      });
    }
    return this.getSchemaForResource(document.uri, jsonDocument).then(function (schema) {
      if (schema) {
        return jsonDocument.getMatchingSchemas(schema.schema).filter(function (s) {
          return !s.inverted;
        });
      }
      return [];
    });
  };
  return JSONSchemaService;
})();
var idCounter = 0;
function normalizeId(id) {
  // remove trailing '#', normalize drive capitalization
  try {
    return _vscodeUriIndexJs.URI.parse(id).toString();
  } catch (e) {
    return id;
  }
}
function normalizeResourceForMatching(resource) {
  // remove querues and fragments, normalize drive capitalization
  try {
    return _vscodeUriIndexJs.URI.parse(resource).with({
      fragment: null,
      query: null
    }).toString();
  } catch (e) {
    return resource;
  }
}
function toDisplayString(url) {
  try {
    var uri = _vscodeUriIndexJs.URI.parse(url);
    if (uri.scheme === 'file') {
      return uri.fsPath;
    }
  } catch (e) {}
  return url;
}

},{"./../../jsonc-parser/main.js":"7Foak","./../../vscode-uri/index.js":"1iKM1","../utils/strings.js":"WOW9E","../parser/jsonParser.js":"23R5j","./../../../fillers/vscode-nls.js":"Io1zy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"1iKM1":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "URI", function () {
  return URI;
});
_parcelHelpers.export(exports, "Utils", function () {
  return Utils;
});
var process = require("process");
var LIB;
LIB = (() => {
  "use strict";
  var t = {
    470: t => {
      function e(t) {
        if ("string" != typeof t) throw new TypeError("Path must be a string. Received " + JSON.stringify(t));
      }
      function r(t, e) {
        for (var r, n = "", o = 0, i = -1, a = 0, h = 0; h <= t.length; ++h) {
          if (h < t.length) r = t.charCodeAt(h); else {
            if (47 === r) break;
            r = 47;
          }
          if (47 === r) {
            if (i === h - 1 || 1 === a) ; else if (i !== h - 1 && 2 === a) {
              if (n.length < 2 || 2 !== o || 46 !== n.charCodeAt(n.length - 1) || 46 !== n.charCodeAt(n.length - 2)) if (n.length > 2) {
                var s = n.lastIndexOf("/");
                if (s !== n.length - 1) {
                  (-1 === s ? (n = "", o = 0) : o = (n = n.slice(0, s)).length - 1 - n.lastIndexOf("/"), i = h, a = 0);
                  continue;
                }
              } else if (2 === n.length || 1 === n.length) {
                (n = "", o = 0, i = h, a = 0);
                continue;
              }
              e && (n.length > 0 ? n += "/.." : n = "..", o = 2);
            } else (n.length > 0 ? n += "/" + t.slice(i + 1, h) : n = t.slice(i + 1, h), o = h - i - 1);
            (i = h, a = 0);
          } else 46 === r && -1 !== a ? ++a : a = -1;
        }
        return n;
      }
      var n = {
        resolve: function () {
          for (var t, n = "", o = !1, i = arguments.length - 1; i >= -1 && !o; i--) {
            var a;
            (i >= 0 ? a = arguments[i] : (void 0 === t && (t = process.cwd()), a = t), e(a), 0 !== a.length && (n = a + "/" + n, o = 47 === a.charCodeAt(0)));
          }
          return (n = r(n, !o), o ? n.length > 0 ? "/" + n : "/" : n.length > 0 ? n : ".");
        },
        normalize: function (t) {
          if ((e(t), 0 === t.length)) return ".";
          var n = 47 === t.charCodeAt(0), o = 47 === t.charCodeAt(t.length - 1);
          return (0 !== (t = r(t, !n)).length || n || (t = "."), t.length > 0 && o && (t += "/"), n ? "/" + t : t);
        },
        isAbsolute: function (t) {
          return (e(t), t.length > 0 && 47 === t.charCodeAt(0));
        },
        join: function () {
          if (0 === arguments.length) return ".";
          for (var t, r = 0; r < arguments.length; ++r) {
            var o = arguments[r];
            (e(o), o.length > 0 && (void 0 === t ? t = o : t += "/" + o));
          }
          return void 0 === t ? "." : n.normalize(t);
        },
        relative: function (t, r) {
          if ((e(t), e(r), t === r)) return "";
          if ((t = n.resolve(t)) === (r = n.resolve(r))) return "";
          for (var o = 1; o < t.length && 47 === t.charCodeAt(o); ++o) ;
          for (var i = t.length, a = i - o, h = 1; h < r.length && 47 === r.charCodeAt(h); ++h) ;
          for (var s = r.length - h, f = a < s ? a : s, u = -1, c = 0; c <= f; ++c) {
            if (c === f) {
              if (s > f) {
                if (47 === r.charCodeAt(h + c)) return r.slice(h + c + 1);
                if (0 === c) return r.slice(h + c);
              } else a > f && (47 === t.charCodeAt(o + c) ? u = c : 0 === c && (u = 0));
              break;
            }
            var l = t.charCodeAt(o + c);
            if (l !== r.charCodeAt(h + c)) break;
            47 === l && (u = c);
          }
          var p = "";
          for (c = o + u + 1; c <= i; ++c) c !== i && 47 !== t.charCodeAt(c) || (0 === p.length ? p += ".." : p += "/..");
          return p.length > 0 ? p + r.slice(h + u) : (h += u, 47 === r.charCodeAt(h) && ++h, r.slice(h));
        },
        _makeLong: function (t) {
          return t;
        },
        dirname: function (t) {
          if ((e(t), 0 === t.length)) return ".";
          for (var r = t.charCodeAt(0), n = 47 === r, o = -1, i = !0, a = t.length - 1; a >= 1; --a) if (47 === (r = t.charCodeAt(a))) {
            if (!i) {
              o = a;
              break;
            }
          } else i = !1;
          return -1 === o ? n ? "/" : "." : n && 1 === o ? "//" : t.slice(0, o);
        },
        basename: function (t, r) {
          if (void 0 !== r && "string" != typeof r) throw new TypeError('"ext" argument must be a string');
          e(t);
          var n, o = 0, i = -1, a = !0;
          if (void 0 !== r && r.length > 0 && r.length <= t.length) {
            if (r.length === t.length && r === t) return "";
            var h = r.length - 1, s = -1;
            for (n = t.length - 1; n >= 0; --n) {
              var f = t.charCodeAt(n);
              if (47 === f) {
                if (!a) {
                  o = n + 1;
                  break;
                }
              } else (-1 === s && (a = !1, s = n + 1), h >= 0 && (f === r.charCodeAt(h) ? -1 == --h && (i = n) : (h = -1, i = s)));
            }
            return (o === i ? i = s : -1 === i && (i = t.length), t.slice(o, i));
          }
          for (n = t.length - 1; n >= 0; --n) if (47 === t.charCodeAt(n)) {
            if (!a) {
              o = n + 1;
              break;
            }
          } else -1 === i && (a = !1, i = n + 1);
          return -1 === i ? "" : t.slice(o, i);
        },
        extname: function (t) {
          e(t);
          for (var r = -1, n = 0, o = -1, i = !0, a = 0, h = t.length - 1; h >= 0; --h) {
            var s = t.charCodeAt(h);
            if (47 !== s) (-1 === o && (i = !1, o = h + 1), 46 === s ? -1 === r ? r = h : 1 !== a && (a = 1) : -1 !== r && (a = -1)); else if (!i) {
              n = h + 1;
              break;
            }
          }
          return -1 === r || -1 === o || 0 === a || 1 === a && r === o - 1 && r === n + 1 ? "" : t.slice(r, o);
        },
        format: function (t) {
          if (null === t || "object" != typeof t) throw new TypeError('The "pathObject" argument must be of type Object. Received type ' + typeof t);
          return (function (t, e) {
            var r = e.dir || e.root, n = e.base || (e.name || "") + (e.ext || "");
            return r ? r === e.root ? r + n : r + "/" + n : n;
          })(0, t);
        },
        parse: function (t) {
          e(t);
          var r = {
            root: "",
            dir: "",
            base: "",
            ext: "",
            name: ""
          };
          if (0 === t.length) return r;
          var n, o = t.charCodeAt(0), i = 47 === o;
          i ? (r.root = "/", n = 1) : n = 0;
          for (var a = -1, h = 0, s = -1, f = !0, u = t.length - 1, c = 0; u >= n; --u) if (47 !== (o = t.charCodeAt(u))) (-1 === s && (f = !1, s = u + 1), 46 === o ? -1 === a ? a = u : 1 !== c && (c = 1) : -1 !== a && (c = -1)); else if (!f) {
            h = u + 1;
            break;
          }
          return (-1 === a || -1 === s || 0 === c || 1 === c && a === s - 1 && a === h + 1 ? -1 !== s && (r.base = r.name = 0 === h && i ? t.slice(1, s) : t.slice(h, s)) : (0 === h && i ? (r.name = t.slice(1, a), r.base = t.slice(1, s)) : (r.name = t.slice(h, a), r.base = t.slice(h, s)), r.ext = t.slice(a, s)), h > 0 ? r.dir = t.slice(0, h - 1) : i && (r.dir = "/"), r);
        },
        sep: "/",
        delimiter: ":",
        win32: null,
        posix: null
      };
      (n.posix = n, t.exports = n);
    },
    447: (t, e, r) => {
      var n;
      if ((r.r(e), r.d(e, {
        URI: () => g,
        Utils: () => O
      }), "object" == typeof process)) n = "win32" === process.platform; else if ("object" == typeof navigator) {
        var o = navigator.userAgent;
        n = o.indexOf("Windows") >= 0;
      }
      var i, a, h = (i = function (t, e) {
        return (i = Object.setPrototypeOf || ({
          __proto__: []
        }) instanceof Array && (function (t, e) {
          t.__proto__ = e;
        }) || (function (t, e) {
          for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && (t[r] = e[r]);
        }))(t, e);
      }, function (t, e) {
        function r() {
          this.constructor = t;
        }
        (i(t, e), t.prototype = null === e ? Object.create(e) : (r.prototype = e.prototype, new r()));
      }), s = /^\w[\w\d+.-]*$/, f = /^\//, u = /^\/\//, c = "", l = "/", p = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/, g = (function () {
        function t(t, e, r, n, o, i) {
          (void 0 === i && (i = !1), "object" == typeof t ? (this.scheme = t.scheme || c, this.authority = t.authority || c, this.path = t.path || c, this.query = t.query || c, this.fragment = t.fragment || c) : (this.scheme = (function (t, e) {
            return t || e ? t : "file";
          })(t, i), this.authority = e || c, this.path = (function (t, e) {
            switch (t) {
              case "https":
              case "http":
              case "file":
                e ? e[0] !== l && (e = l + e) : e = l;
            }
            return e;
          })(this.scheme, r || c), this.query = n || c, this.fragment = o || c, (function (t, e) {
            if (!t.scheme && e) throw new Error('[UriError]: Scheme is missing: {scheme: "", authority: "' + t.authority + '", path: "' + t.path + '", query: "' + t.query + '", fragment: "' + t.fragment + '"}');
            if (t.scheme && !s.test(t.scheme)) throw new Error("[UriError]: Scheme contains illegal characters.");
            if (t.path) if (t.authority) {
              if (!f.test(t.path)) throw new Error('[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character');
            } else if (u.test(t.path)) throw new Error('[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")');
          })(this, i)));
        }
        return (t.isUri = function (e) {
          return e instanceof t || !!e && "string" == typeof e.authority && "string" == typeof e.fragment && "string" == typeof e.path && "string" == typeof e.query && "string" == typeof e.scheme && "function" == typeof e.fsPath && "function" == typeof e.with && "function" == typeof e.toString;
        }, Object.defineProperty(t.prototype, "fsPath", {
          get: function () {
            return C(this, !1);
          },
          enumerable: !1,
          configurable: !0
        }), t.prototype.with = function (t) {
          if (!t) return this;
          var e = t.scheme, r = t.authority, n = t.path, o = t.query, i = t.fragment;
          return (void 0 === e ? e = this.scheme : null === e && (e = c), void 0 === r ? r = this.authority : null === r && (r = c), void 0 === n ? n = this.path : null === n && (n = c), void 0 === o ? o = this.query : null === o && (o = c), void 0 === i ? i = this.fragment : null === i && (i = c), e === this.scheme && r === this.authority && n === this.path && o === this.query && i === this.fragment ? this : new v(e, r, n, o, i));
        }, t.parse = function (t, e) {
          void 0 === e && (e = !1);
          var r = p.exec(t);
          return r ? new v(r[2] || c, x(r[4] || c), x(r[5] || c), x(r[7] || c), x(r[9] || c), e) : new v(c, c, c, c, c);
        }, t.file = function (t) {
          var e = c;
          if ((n && (t = t.replace(/\\/g, l)), t[0] === l && t[1] === l)) {
            var r = t.indexOf(l, 2);
            -1 === r ? (e = t.substring(2), t = l) : (e = t.substring(2, r), t = t.substring(r) || l);
          }
          return new v("file", e, t, c, c);
        }, t.from = function (t) {
          return new v(t.scheme, t.authority, t.path, t.query, t.fragment);
        }, t.prototype.toString = function (t) {
          return (void 0 === t && (t = !1), A(this, t));
        }, t.prototype.toJSON = function () {
          return this;
        }, t.revive = function (e) {
          if (e) {
            if (e instanceof t) return e;
            var r = new v(e);
            return (r._formatted = e.external, r._fsPath = e._sep === d ? e.fsPath : null, r);
          }
          return e;
        }, t);
      })(), d = n ? 1 : void 0, v = (function (t) {
        function e() {
          var e = null !== t && t.apply(this, arguments) || this;
          return (e._formatted = null, e._fsPath = null, e);
        }
        return (h(e, t), Object.defineProperty(e.prototype, "fsPath", {
          get: function () {
            return (this._fsPath || (this._fsPath = C(this, !1)), this._fsPath);
          },
          enumerable: !1,
          configurable: !0
        }), e.prototype.toString = function (t) {
          return (void 0 === t && (t = !1), t ? A(this, !0) : (this._formatted || (this._formatted = A(this, !1)), this._formatted));
        }, e.prototype.toJSON = function () {
          var t = {
            $mid: 1
          };
          return (this._fsPath && (t.fsPath = this._fsPath, t._sep = d), this._formatted && (t.external = this._formatted), this.path && (t.path = this.path), this.scheme && (t.scheme = this.scheme), this.authority && (t.authority = this.authority), this.query && (t.query = this.query), this.fragment && (t.fragment = this.fragment), t);
        }, e);
      })(g), m = ((a = {})[58] = "%3A", a[47] = "%2F", a[63] = "%3F", a[35] = "%23", a[91] = "%5B", a[93] = "%5D", a[64] = "%40", a[33] = "%21", a[36] = "%24", a[38] = "%26", a[39] = "%27", a[40] = "%28", a[41] = "%29", a[42] = "%2A", a[43] = "%2B", a[44] = "%2C", a[59] = "%3B", a[61] = "%3D", a[32] = "%20", a);
      function y(t, e) {
        for (var r = void 0, n = -1, o = 0; o < t.length; o++) {
          var i = t.charCodeAt(o);
          if (i >= 97 && i <= 122 || i >= 65 && i <= 90 || i >= 48 && i <= 57 || 45 === i || 46 === i || 95 === i || 126 === i || e && 47 === i) (-1 !== n && (r += encodeURIComponent(t.substring(n, o)), n = -1), void 0 !== r && (r += t.charAt(o))); else {
            void 0 === r && (r = t.substr(0, o));
            var a = m[i];
            void 0 !== a ? (-1 !== n && (r += encodeURIComponent(t.substring(n, o)), n = -1), r += a) : -1 === n && (n = o);
          }
        }
        return (-1 !== n && (r += encodeURIComponent(t.substring(n))), void 0 !== r ? r : t);
      }
      function b(t) {
        for (var e = void 0, r = 0; r < t.length; r++) {
          var n = t.charCodeAt(r);
          35 === n || 63 === n ? (void 0 === e && (e = t.substr(0, r)), e += m[n]) : void 0 !== e && (e += t[r]);
        }
        return void 0 !== e ? e : t;
      }
      function C(t, e) {
        var r;
        return (r = t.authority && t.path.length > 1 && "file" === t.scheme ? "//" + t.authority + t.path : 47 === t.path.charCodeAt(0) && (t.path.charCodeAt(1) >= 65 && t.path.charCodeAt(1) <= 90 || t.path.charCodeAt(1) >= 97 && t.path.charCodeAt(1) <= 122) && 58 === t.path.charCodeAt(2) ? e ? t.path.substr(1) : t.path[1].toLowerCase() + t.path.substr(2) : t.path, n && (r = r.replace(/\//g, "\\")), r);
      }
      function A(t, e) {
        var r = e ? b : y, n = "", o = t.scheme, i = t.authority, a = t.path, h = t.query, s = t.fragment;
        if ((o && (n += o, n += ":"), (i || "file" === o) && (n += l, n += l), i)) {
          var f = i.indexOf("@");
          if (-1 !== f) {
            var u = i.substr(0, f);
            (i = i.substr(f + 1), -1 === (f = u.indexOf(":")) ? n += r(u, !1) : (n += r(u.substr(0, f), !1), n += ":", n += r(u.substr(f + 1), !1)), n += "@");
          }
          -1 === (f = (i = i.toLowerCase()).indexOf(":")) ? n += r(i, !1) : (n += r(i.substr(0, f), !1), n += i.substr(f));
        }
        if (a) {
          if (a.length >= 3 && 47 === a.charCodeAt(0) && 58 === a.charCodeAt(2)) (c = a.charCodeAt(1)) >= 65 && c <= 90 && (a = "/" + String.fromCharCode(c + 32) + ":" + a.substr(3)); else if (a.length >= 2 && 58 === a.charCodeAt(1)) {
            var c;
            (c = a.charCodeAt(0)) >= 65 && c <= 90 && (a = String.fromCharCode(c + 32) + ":" + a.substr(2));
          }
          n += r(a, !0);
        }
        return (h && (n += "?", n += r(h, !1)), s && (n += "#", n += e ? s : y(s, !1)), n);
      }
      function w(t) {
        try {
          return decodeURIComponent(t);
        } catch (e) {
          return t.length > 3 ? t.substr(0, 3) + w(t.substr(3)) : t;
        }
      }
      var _ = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
      function x(t) {
        return t.match(_) ? t.replace(_, function (t) {
          return w(t);
        }) : t;
      }
      var O, P = r(470), j = function () {
        for (var t = 0, e = 0, r = arguments.length; e < r; e++) t += arguments[e].length;
        var n = Array(t), o = 0;
        for (e = 0; e < r; e++) for (var i = arguments[e], a = 0, h = i.length; a < h; (a++, o++)) n[o] = i[a];
        return n;
      }, U = P.posix || P;
      !(function (t) {
        (t.joinPath = function (t) {
          for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
          return t.with({
            path: U.join.apply(U, j([t.path], e))
          });
        }, t.resolvePath = function (t) {
          for (var e = [], r = 1; r < arguments.length; r++) e[r - 1] = arguments[r];
          var n = t.path || "/";
          return t.with({
            path: U.resolve.apply(U, j([n], e))
          });
        }, t.dirname = function (t) {
          var e = U.dirname(t.path);
          return 1 === e.length && 46 === e.charCodeAt(0) ? t : t.with({
            path: e
          });
        }, t.basename = function (t) {
          return U.basename(t.path);
        }, t.extname = function (t) {
          return U.extname(t.path);
        });
      })(O || (O = {}));
    }
  }, e = {};
  function r(n) {
    if (e[n]) return e[n].exports;
    var o = e[n] = {
      exports: {}
    };
    return (t[n](o, o.exports, r), o.exports);
  }
  return (r.d = (t, e) => {
    for (var n in e) r.o(e, n) && !r.o(t, n) && Object.defineProperty(t, n, {
      enumerable: !0,
      get: e[n]
    });
  }, r.o = (t, e) => Object.prototype.hasOwnProperty.call(t, e), r.r = t => {
    ("undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: "Module"
    }), Object.defineProperty(t, "__esModule", {
      value: !0
    }));
  }, r(447));
})();
const {URI, Utils} = LIB;

},{"process":"7AgFc","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"5IMVL":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "JSONDocumentSymbols", function () {
  return JSONDocumentSymbols;
});
var _parserJsonParserJs = require('../parser/jsonParser.js');
var _utilsStringsJs = require('../utils/strings.js');
var _utilsColorsJs = require('../utils/colors.js');
var _jsonLanguageTypesJs = require("../jsonLanguageTypes.js");
var JSONDocumentSymbols = /** @class*/
(function () {
  function JSONDocumentSymbols(schemaService) {
    this.schemaService = schemaService;
  }
  JSONDocumentSymbols.prototype.findDocumentSymbols = function (document, doc, context) {
    var _this = this;
    if (context === void 0) {
      context = {
        resultLimit: Number.MAX_VALUE
      };
    }
    var root = doc.root;
    if (!root) {
      return [];
    }
    var limit = context.resultLimit || Number.MAX_VALUE;
    // special handling for key bindings
    var resourceString = document.uri;
    if (resourceString === 'vscode://defaultsettings/keybindings.json' || _utilsStringsJs.endsWith(resourceString.toLowerCase(), '/user/keybindings.json')) {
      if (root.type === 'array') {
        var result_1 = [];
        for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
          var item = _a[_i];
          if (item.type === 'object') {
            for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
              var property = _c[_b];
              if (property.keyNode.value === 'key' && property.valueNode) {
                var location = _jsonLanguageTypesJs.Location.create(document.uri, getRange(document, item));
                result_1.push({
                  name: _parserJsonParserJs.getNodeValue(property.valueNode),
                  kind: _jsonLanguageTypesJs.SymbolKind.Function,
                  location: location
                });
                limit--;
                if (limit <= 0) {
                  if (context && context.onResultLimitExceeded) {
                    context.onResultLimitExceeded(resourceString);
                  }
                  return result_1;
                }
              }
            }
          }
        }
        return result_1;
      }
    }
    var toVisit = [{
      node: root,
      containerName: ''
    }];
    var nextToVisit = 0;
    var limitExceeded = false;
    var result = [];
    var collectOutlineEntries = function (node, containerName) {
      if (node.type === 'array') {
        node.items.forEach(function (node) {
          if (node) {
            toVisit.push({
              node: node,
              containerName: containerName
            });
          }
        });
      } else if (node.type === 'object') {
        node.properties.forEach(function (property) {
          var valueNode = property.valueNode;
          if (valueNode) {
            if (limit > 0) {
              limit--;
              var location = _jsonLanguageTypesJs.Location.create(document.uri, getRange(document, property));
              var childContainerName = containerName ? containerName + '.' + property.keyNode.value : property.keyNode.value;
              result.push({
                name: _this.getKeyLabel(property),
                kind: _this.getSymbolKind(valueNode.type),
                location: location,
                containerName: containerName
              });
              toVisit.push({
                node: valueNode,
                containerName: childContainerName
              });
            } else {
              limitExceeded = true;
            }
          }
        });
      }
    };
    // breath first traversal
    while (nextToVisit < toVisit.length) {
      var next = toVisit[nextToVisit++];
      collectOutlineEntries(next.node, next.containerName);
    }
    if (limitExceeded && context && context.onResultLimitExceeded) {
      context.onResultLimitExceeded(resourceString);
    }
    return result;
  };
  JSONDocumentSymbols.prototype.findDocumentSymbols2 = function (document, doc, context) {
    var _this = this;
    if (context === void 0) {
      context = {
        resultLimit: Number.MAX_VALUE
      };
    }
    var root = doc.root;
    if (!root) {
      return [];
    }
    var limit = context.resultLimit || Number.MAX_VALUE;
    // special handling for key bindings
    var resourceString = document.uri;
    if (resourceString === 'vscode://defaultsettings/keybindings.json' || _utilsStringsJs.endsWith(resourceString.toLowerCase(), '/user/keybindings.json')) {
      if (root.type === 'array') {
        var result_2 = [];
        for (var _i = 0, _a = root.items; _i < _a.length; _i++) {
          var item = _a[_i];
          if (item.type === 'object') {
            for (var _b = 0, _c = item.properties; _b < _c.length; _b++) {
              var property = _c[_b];
              if (property.keyNode.value === 'key' && property.valueNode) {
                var range = getRange(document, item);
                var selectionRange = getRange(document, property.keyNode);
                result_2.push({
                  name: _parserJsonParserJs.getNodeValue(property.valueNode),
                  kind: _jsonLanguageTypesJs.SymbolKind.Function,
                  range: range,
                  selectionRange: selectionRange
                });
                limit--;
                if (limit <= 0) {
                  if (context && context.onResultLimitExceeded) {
                    context.onResultLimitExceeded(resourceString);
                  }
                  return result_2;
                }
              }
            }
          }
        }
        return result_2;
      }
    }
    var result = [];
    var toVisit = [{
      node: root,
      result: result
    }];
    var nextToVisit = 0;
    var limitExceeded = false;
    var collectOutlineEntries = function (node, result) {
      if (node.type === 'array') {
        node.items.forEach(function (node, index) {
          if (node) {
            if (limit > 0) {
              limit--;
              var range = getRange(document, node);
              var selectionRange = range;
              var name = String(index);
              var symbol = {
                name: name,
                kind: _this.getSymbolKind(node.type),
                range: range,
                selectionRange: selectionRange,
                children: []
              };
              result.push(symbol);
              toVisit.push({
                result: symbol.children,
                node: node
              });
            } else {
              limitExceeded = true;
            }
          }
        });
      } else if (node.type === 'object') {
        node.properties.forEach(function (property) {
          var valueNode = property.valueNode;
          if (valueNode) {
            if (limit > 0) {
              limit--;
              var range = getRange(document, property);
              var selectionRange = getRange(document, property.keyNode);
              var children = [];
              var symbol = {
                name: _this.getKeyLabel(property),
                kind: _this.getSymbolKind(valueNode.type),
                range: range,
                selectionRange: selectionRange,
                children: children,
                detail: _this.getDetail(valueNode)
              };
              result.push(symbol);
              toVisit.push({
                result: children,
                node: valueNode
              });
            } else {
              limitExceeded = true;
            }
          }
        });
      }
    };
    // breath first traversal
    while (nextToVisit < toVisit.length) {
      var next = toVisit[nextToVisit++];
      collectOutlineEntries(next.node, next.result);
    }
    if (limitExceeded && context && context.onResultLimitExceeded) {
      context.onResultLimitExceeded(resourceString);
    }
    return result;
  };
  JSONDocumentSymbols.prototype.getSymbolKind = function (nodeType) {
    switch (nodeType) {
      case 'object':
        return _jsonLanguageTypesJs.SymbolKind.Module;
      case 'string':
        return _jsonLanguageTypesJs.SymbolKind.String;
      case 'number':
        return _jsonLanguageTypesJs.SymbolKind.Number;
      case 'array':
        return _jsonLanguageTypesJs.SymbolKind.Array;
      case 'boolean':
        return _jsonLanguageTypesJs.SymbolKind.Boolean;
      default:
        // 'null'
        return _jsonLanguageTypesJs.SymbolKind.Variable;
    }
  };
  JSONDocumentSymbols.prototype.getKeyLabel = function (property) {
    var name = property.keyNode.value;
    if (name) {
      name = name.replace(/[\n]/g, '↵');
    }
    if (name && name.trim()) {
      return name;
    }
    return "\"" + name + "\"";
  };
  JSONDocumentSymbols.prototype.getDetail = function (node) {
    if (!node) {
      return undefined;
    }
    if (node.type === 'boolean' || node.type === 'number' || node.type === 'null' || node.type === 'string') {
      return String(node.value);
    } else {
      if (node.type === 'array') {
        return node.children.length ? undefined : '[]';
      } else if (node.type === 'object') {
        return node.children.length ? undefined : '{}';
      }
    }
    return undefined;
  };
  JSONDocumentSymbols.prototype.findDocumentColors = function (document, doc, context) {
    return this.schemaService.getSchemaForResource(document.uri, doc).then(function (schema) {
      var result = [];
      if (schema) {
        var limit = context && typeof context.resultLimit === 'number' ? context.resultLimit : Number.MAX_VALUE;
        var matchingSchemas = doc.getMatchingSchemas(schema.schema);
        var visitedNode = {};
        for (var _i = 0, matchingSchemas_1 = matchingSchemas; _i < matchingSchemas_1.length; _i++) {
          var s = matchingSchemas_1[_i];
          if (!s.inverted && s.schema && (s.schema.format === 'color' || s.schema.format === 'color-hex') && s.node && s.node.type === 'string') {
            var nodeId = String(s.node.offset);
            if (!visitedNode[nodeId]) {
              var color = _utilsColorsJs.colorFromHex(_parserJsonParserJs.getNodeValue(s.node));
              if (color) {
                var range = getRange(document, s.node);
                result.push({
                  color: color,
                  range: range
                });
              }
              visitedNode[nodeId] = true;
              limit--;
              if (limit <= 0) {
                if (context && context.onResultLimitExceeded) {
                  context.onResultLimitExceeded(document.uri);
                }
                return result;
              }
            }
          }
        }
      }
      return result;
    });
  };
  JSONDocumentSymbols.prototype.getColorPresentations = function (document, doc, color, range) {
    var result = [];
    var red256 = Math.round(color.red * 255), green256 = Math.round(color.green * 255), blue256 = Math.round(color.blue * 255);
    function toTwoDigitHex(n) {
      var r = n.toString(16);
      return r.length !== 2 ? '0' + r : r;
    }
    var label;
    if (color.alpha === 1) {
      label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256);
    } else {
      label = "#" + toTwoDigitHex(red256) + toTwoDigitHex(green256) + toTwoDigitHex(blue256) + toTwoDigitHex(Math.round(color.alpha * 255));
    }
    result.push({
      label: label,
      textEdit: _jsonLanguageTypesJs.TextEdit.replace(range, JSON.stringify(label))
    });
    return result;
  };
  return JSONDocumentSymbols;
})();
function getRange(document, node) {
  return _jsonLanguageTypesJs.Range.create(document.positionAt(node.offset), document.positionAt(node.offset + node.length));
}

},{"../parser/jsonParser.js":"23R5j","../utils/strings.js":"WOW9E","../utils/colors.js":"MZTI1","../jsonLanguageTypes.js":"7JR1I","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"MZTI1":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "hexDigit", function () {
  return hexDigit;
});
_parcelHelpers.export(exports, "colorFromHex", function () {
  return colorFromHex;
});
_parcelHelpers.export(exports, "colorFrom256RGB", function () {
  return colorFrom256RGB;
});
/*---------------------------------------------------------------------------------------------
*  Copyright (c) Microsoft Corporation. All rights reserved.
*  Licensed under the MIT License. See License.txt in the project root for license information.
*--------------------------------------------------------------------------------------------*/
var Digit0 = 48;
var Digit9 = 57;
var A = 65;
var a = 97;
var f = 102;
function hexDigit(charCode) {
  if (charCode < Digit0) {
    return 0;
  }
  if (charCode <= Digit9) {
    return charCode - Digit0;
  }
  if (charCode < a) {
    charCode += a - A;
  }
  if (charCode >= a && charCode <= f) {
    return charCode - a + 10;
  }
  return 0;
}
function colorFromHex(text) {
  if (text[0] !== '#') {
    return undefined;
  }
  switch (text.length) {
    case 4:
      return {
        red: hexDigit(text.charCodeAt(1)) * 0x11 / 255.0,
        green: hexDigit(text.charCodeAt(2)) * 0x11 / 255.0,
        blue: hexDigit(text.charCodeAt(3)) * 0x11 / 255.0,
        alpha: 1
      };
    case 5:
      return {
        red: hexDigit(text.charCodeAt(1)) * 0x11 / 255.0,
        green: hexDigit(text.charCodeAt(2)) * 0x11 / 255.0,
        blue: hexDigit(text.charCodeAt(3)) * 0x11 / 255.0,
        alpha: hexDigit(text.charCodeAt(4)) * 0x11 / 255.0
      };
    case 7:
      return {
        red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
        green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
        blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
        alpha: 1
      };
    case 9:
      return {
        red: (hexDigit(text.charCodeAt(1)) * 0x10 + hexDigit(text.charCodeAt(2))) / 255.0,
        green: (hexDigit(text.charCodeAt(3)) * 0x10 + hexDigit(text.charCodeAt(4))) / 255.0,
        blue: (hexDigit(text.charCodeAt(5)) * 0x10 + hexDigit(text.charCodeAt(6))) / 255.0,
        alpha: (hexDigit(text.charCodeAt(7)) * 0x10 + hexDigit(text.charCodeAt(8))) / 255.0
      };
  }
  return undefined;
}
function colorFrom256RGB(red, green, blue, alpha) {
  if (alpha === void 0) {
    alpha = 1.0;
  }
  return {
    red: red / 255.0,
    green: green / 255.0,
    blue: blue / 255.0,
    alpha: alpha
  };
}

},{"@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"7rBEC":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "schemaContributions", function () {
  return schemaContributions;
});
var _fillersVscodeNlsJs = require('./../../../fillers/vscode-nls.js');
var localize = _fillersVscodeNlsJs.loadMessageBundle();
var schemaContributions = {
  schemaAssociations: [],
  schemas: {
    // refer to the latest schema
    'http://json-schema.org/schema#': {
      $ref: 'http://json-schema.org/draft-07/schema#'
    },
    // bundle the schema-schema to include (localized) descriptions
    'http://json-schema.org/draft-04/schema#': {
      'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
      '$schema': 'http://json-schema.org/draft-04/schema#',
      'definitions': {
        'schemaArray': {
          'type': 'array',
          'minItems': 1,
          'items': {
            '$ref': '#'
          }
        },
        'positiveInteger': {
          'type': 'integer',
          'minimum': 0
        },
        'positiveIntegerDefault0': {
          'allOf': [{
            '$ref': '#/definitions/positiveInteger'
          }, {
            'default': 0
          }]
        },
        'simpleTypes': {
          'type': 'string',
          'enum': ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string']
        },
        'stringArray': {
          'type': 'array',
          'items': {
            'type': 'string'
          },
          'minItems': 1,
          'uniqueItems': true
        }
      },
      'type': 'object',
      'properties': {
        'id': {
          'type': 'string',
          'format': 'uri'
        },
        '$schema': {
          'type': 'string',
          'format': 'uri'
        },
        'title': {
          'type': 'string'
        },
        'description': {
          'type': 'string'
        },
        'default': {},
        'multipleOf': {
          'type': 'number',
          'minimum': 0,
          'exclusiveMinimum': true
        },
        'maximum': {
          'type': 'number'
        },
        'exclusiveMaximum': {
          'type': 'boolean',
          'default': false
        },
        'minimum': {
          'type': 'number'
        },
        'exclusiveMinimum': {
          'type': 'boolean',
          'default': false
        },
        'maxLength': {
          'allOf': [{
            '$ref': '#/definitions/positiveInteger'
          }]
        },
        'minLength': {
          'allOf': [{
            '$ref': '#/definitions/positiveIntegerDefault0'
          }]
        },
        'pattern': {
          'type': 'string',
          'format': 'regex'
        },
        'additionalItems': {
          'anyOf': [{
            'type': 'boolean'
          }, {
            '$ref': '#'
          }],
          'default': {}
        },
        'items': {
          'anyOf': [{
            '$ref': '#'
          }, {
            '$ref': '#/definitions/schemaArray'
          }],
          'default': {}
        },
        'maxItems': {
          'allOf': [{
            '$ref': '#/definitions/positiveInteger'
          }]
        },
        'minItems': {
          'allOf': [{
            '$ref': '#/definitions/positiveIntegerDefault0'
          }]
        },
        'uniqueItems': {
          'type': 'boolean',
          'default': false
        },
        'maxProperties': {
          'allOf': [{
            '$ref': '#/definitions/positiveInteger'
          }]
        },
        'minProperties': {
          'allOf': [{
            '$ref': '#/definitions/positiveIntegerDefault0'
          }]
        },
        'required': {
          'allOf': [{
            '$ref': '#/definitions/stringArray'
          }]
        },
        'additionalProperties': {
          'anyOf': [{
            'type': 'boolean'
          }, {
            '$ref': '#'
          }],
          'default': {}
        },
        'definitions': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'default': {}
        },
        'properties': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'default': {}
        },
        'patternProperties': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'default': {}
        },
        'dependencies': {
          'type': 'object',
          'additionalProperties': {
            'anyOf': [{
              '$ref': '#'
            }, {
              '$ref': '#/definitions/stringArray'
            }]
          }
        },
        'enum': {
          'type': 'array',
          'minItems': 1,
          'uniqueItems': true
        },
        'type': {
          'anyOf': [{
            '$ref': '#/definitions/simpleTypes'
          }, {
            'type': 'array',
            'items': {
              '$ref': '#/definitions/simpleTypes'
            },
            'minItems': 1,
            'uniqueItems': true
          }]
        },
        'format': {
          'anyOf': [{
            'type': 'string',
            'enum': ['date-time', 'uri', 'email', 'hostname', 'ipv4', 'ipv6', 'regex']
          }, {
            'type': 'string'
          }]
        },
        'allOf': {
          'allOf': [{
            '$ref': '#/definitions/schemaArray'
          }]
        },
        'anyOf': {
          'allOf': [{
            '$ref': '#/definitions/schemaArray'
          }]
        },
        'oneOf': {
          'allOf': [{
            '$ref': '#/definitions/schemaArray'
          }]
        },
        'not': {
          'allOf': [{
            '$ref': '#'
          }]
        }
      },
      'dependencies': {
        'exclusiveMaximum': ['maximum'],
        'exclusiveMinimum': ['minimum']
      },
      'default': {}
    },
    'http://json-schema.org/draft-07/schema#': {
      'title': localize('schema.json', 'Describes a JSON file using a schema. See json-schema.org for more info.'),
      'definitions': {
        'schemaArray': {
          'type': 'array',
          'minItems': 1,
          'items': {
            '$ref': '#'
          }
        },
        'nonNegativeInteger': {
          'type': 'integer',
          'minimum': 0
        },
        'nonNegativeIntegerDefault0': {
          'allOf': [{
            '$ref': '#/definitions/nonNegativeInteger'
          }, {
            'default': 0
          }]
        },
        'simpleTypes': {
          'enum': ['array', 'boolean', 'integer', 'null', 'number', 'object', 'string']
        },
        'stringArray': {
          'type': 'array',
          'items': {
            'type': 'string'
          },
          'uniqueItems': true,
          'default': []
        }
      },
      'type': ['object', 'boolean'],
      'properties': {
        '$id': {
          'type': 'string',
          'format': 'uri-reference'
        },
        '$schema': {
          'type': 'string',
          'format': 'uri'
        },
        '$ref': {
          'type': 'string',
          'format': 'uri-reference'
        },
        '$comment': {
          'type': 'string'
        },
        'title': {
          'type': 'string'
        },
        'description': {
          'type': 'string'
        },
        'default': true,
        'readOnly': {
          'type': 'boolean',
          'default': false
        },
        'examples': {
          'type': 'array',
          'items': true
        },
        'multipleOf': {
          'type': 'number',
          'exclusiveMinimum': 0
        },
        'maximum': {
          'type': 'number'
        },
        'exclusiveMaximum': {
          'type': 'number'
        },
        'minimum': {
          'type': 'number'
        },
        'exclusiveMinimum': {
          'type': 'number'
        },
        'maxLength': {
          '$ref': '#/definitions/nonNegativeInteger'
        },
        'minLength': {
          '$ref': '#/definitions/nonNegativeIntegerDefault0'
        },
        'pattern': {
          'type': 'string',
          'format': 'regex'
        },
        'additionalItems': {
          '$ref': '#'
        },
        'items': {
          'anyOf': [{
            '$ref': '#'
          }, {
            '$ref': '#/definitions/schemaArray'
          }],
          'default': true
        },
        'maxItems': {
          '$ref': '#/definitions/nonNegativeInteger'
        },
        'minItems': {
          '$ref': '#/definitions/nonNegativeIntegerDefault0'
        },
        'uniqueItems': {
          'type': 'boolean',
          'default': false
        },
        'contains': {
          '$ref': '#'
        },
        'maxProperties': {
          '$ref': '#/definitions/nonNegativeInteger'
        },
        'minProperties': {
          '$ref': '#/definitions/nonNegativeIntegerDefault0'
        },
        'required': {
          '$ref': '#/definitions/stringArray'
        },
        'additionalProperties': {
          '$ref': '#'
        },
        'definitions': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'default': {}
        },
        'properties': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'default': {}
        },
        'patternProperties': {
          'type': 'object',
          'additionalProperties': {
            '$ref': '#'
          },
          'propertyNames': {
            'format': 'regex'
          },
          'default': {}
        },
        'dependencies': {
          'type': 'object',
          'additionalProperties': {
            'anyOf': [{
              '$ref': '#'
            }, {
              '$ref': '#/definitions/stringArray'
            }]
          }
        },
        'propertyNames': {
          '$ref': '#'
        },
        'const': true,
        'enum': {
          'type': 'array',
          'items': true,
          'minItems': 1,
          'uniqueItems': true
        },
        'type': {
          'anyOf': [{
            '$ref': '#/definitions/simpleTypes'
          }, {
            'type': 'array',
            'items': {
              '$ref': '#/definitions/simpleTypes'
            },
            'minItems': 1,
            'uniqueItems': true
          }]
        },
        'format': {
          'type': 'string'
        },
        'contentMediaType': {
          'type': 'string'
        },
        'contentEncoding': {
          'type': 'string'
        },
        'if': {
          '$ref': '#'
        },
        'then': {
          '$ref': '#'
        },
        'else': {
          '$ref': '#'
        },
        'allOf': {
          '$ref': '#/definitions/schemaArray'
        },
        'anyOf': {
          '$ref': '#/definitions/schemaArray'
        },
        'oneOf': {
          '$ref': '#/definitions/schemaArray'
        },
        'not': {
          '$ref': '#'
        }
      },
      'default': true
    }
  }
};
var descriptions = {
  id: localize('schema.json.id', "A unique identifier for the schema."),
  $schema: localize('schema.json.$schema', "The schema to verify this document against."),
  title: localize('schema.json.title', "A descriptive title of the element."),
  description: localize('schema.json.description', "A long description of the element. Used in hover menus and suggestions."),
  default: localize('schema.json.default', "A default value. Used by suggestions."),
  multipleOf: localize('schema.json.multipleOf', "A number that should cleanly divide the current value (i.e. have no remainder)."),
  maximum: localize('schema.json.maximum', "The maximum numerical value, inclusive by default."),
  exclusiveMaximum: localize('schema.json.exclusiveMaximum', "Makes the maximum property exclusive."),
  minimum: localize('schema.json.minimum', "The minimum numerical value, inclusive by default."),
  exclusiveMinimum: localize('schema.json.exclusiveMininum', "Makes the minimum property exclusive."),
  maxLength: localize('schema.json.maxLength', "The maximum length of a string."),
  minLength: localize('schema.json.minLength', "The minimum length of a string."),
  pattern: localize('schema.json.pattern', "A regular expression to match the string against. It is not implicitly anchored."),
  additionalItems: localize('schema.json.additionalItems', "For arrays, only when items is set as an array. If it is a schema, then this schema validates items after the ones specified by the items array. If it is false, then additional items will cause validation to fail."),
  items: localize('schema.json.items', "For arrays. Can either be a schema to validate every element against or an array of schemas to validate each item against in order (the first schema will validate the first element, the second schema will validate the second element, and so on."),
  maxItems: localize('schema.json.maxItems', "The maximum number of items that can be inside an array. Inclusive."),
  minItems: localize('schema.json.minItems', "The minimum number of items that can be inside an array. Inclusive."),
  uniqueItems: localize('schema.json.uniqueItems', "If all of the items in the array must be unique. Defaults to false."),
  maxProperties: localize('schema.json.maxProperties', "The maximum number of properties an object can have. Inclusive."),
  minProperties: localize('schema.json.minProperties', "The minimum number of properties an object can have. Inclusive."),
  required: localize('schema.json.required', "An array of strings that lists the names of all properties required on this object."),
  additionalProperties: localize('schema.json.additionalProperties', "Either a schema or a boolean. If a schema, then used to validate all properties not matched by 'properties' or 'patternProperties'. If false, then any properties not matched by either will cause this schema to fail."),
  definitions: localize('schema.json.definitions', "Not used for validation. Place subschemas here that you wish to reference inline with $ref."),
  properties: localize('schema.json.properties', "A map of property names to schemas for each property."),
  patternProperties: localize('schema.json.patternProperties', "A map of regular expressions on property names to schemas for matching properties."),
  dependencies: localize('schema.json.dependencies', "A map of property names to either an array of property names or a schema. An array of property names means the property named in the key depends on the properties in the array being present in the object in order to be valid. If the value is a schema, then the schema is only applied to the object if the property in the key exists on the object."),
  enum: localize('schema.json.enum', "The set of literal values that are valid."),
  type: localize('schema.json.type', "Either a string of one of the basic schema types (number, integer, null, array, object, boolean, string) or an array of strings specifying a subset of those types."),
  format: localize('schema.json.format', "Describes the format expected for the value."),
  allOf: localize('schema.json.allOf', "An array of schemas, all of which must match."),
  anyOf: localize('schema.json.anyOf', "An array of schemas, where at least one must match."),
  oneOf: localize('schema.json.oneOf', "An array of schemas, exactly one of which must match."),
  not: localize('schema.json.not', "A schema which must not match."),
  $id: localize('schema.json.$id', "A unique identifier for the schema."),
  $ref: localize('schema.json.$ref', "Reference a definition hosted on any location."),
  $comment: localize('schema.json.$comment', "Comments from schema authors to readers or maintainers of the schema."),
  readOnly: localize('schema.json.readOnly', "Indicates that the value of the instance is managed exclusively by the owning authority."),
  examples: localize('schema.json.examples', "Sample JSON values associated with a particular schema, for the purpose of illustrating usage."),
  contains: localize('schema.json.contains', "An array instance is valid against \"contains\" if at least one of its elements is valid against the given schema."),
  propertyNames: localize('schema.json.propertyNames', "If the instance is an object, this keyword validates if every property name in the instance validates against the provided schema."),
  const: localize('schema.json.const', "An instance validates successfully against this keyword if its value is equal to the value of the keyword."),
  contentMediaType: localize('schema.json.contentMediaType', "Describes the media type of a string property."),
  contentEncoding: localize('schema.json.contentEncoding', "Describes the content encoding of a string property."),
  if: localize('schema.json.if', "The validation outcome of the \"if\" subschema controls which of the \"then\" or \"else\" keywords are evaluated."),
  then: localize('schema.json.then', "The \"if\" subschema is used for validation when the \"if\" subschema succeeds."),
  else: localize('schema.json.else', "The \"else\" subschema is used for validation when the \"if\" subschema fails.")
};
for (var schemaName in schemaContributions.schemas) {
  var schema = schemaContributions.schemas[schemaName];
  for (var property in schema.properties) {
    var propertyObject = schema.properties[property];
    if (typeof propertyObject === 'boolean') {
      propertyObject = schema.properties[property] = {};
    }
    var description = descriptions[property];
    if (description) {
      propertyObject['description'] = description;
    } else {
      console.log(property + ": localize('schema.json." + property + "', \"\")");
    }
  }
}

},{"./../../../fillers/vscode-nls.js":"Io1zy","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3b11d":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getFoldingRanges", function () {
  return getFoldingRanges;
});
var _jsoncParserMainJs = require('./../../jsonc-parser/main.js');
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
function getFoldingRanges(document, context) {
  var ranges = [];
  var nestingLevels = [];
  var stack = [];
  var prevStart = -1;
  var scanner = _jsoncParserMainJs.createScanner(document.getText(), false);
  var token = scanner.scan();
  function addRange(range) {
    ranges.push(range);
    nestingLevels.push(stack.length);
  }
  while (token !== 17) /*EOF*/
  {
    switch (token) {
      case 1:
      case 3:
        /*OpenBracketToken*/
        {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var range = {
            startLine: startLine,
            endLine: startLine,
            kind: token === 1 ? /*OpenBraceToken*/
            'object' : 'array'
          };
          stack.push(range);
          break;
        }
      case 2:
      case 4:
        /*CloseBracketToken*/
        {
          var kind = token === 2 ? /*CloseBraceToken*/
          'object' : 'array';
          if (stack.length > 0 && stack[stack.length - 1].kind === kind) {
            var range = stack.pop();
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (range && line > range.startLine + 1 && prevStart !== range.startLine) {
              range.endLine = line - 1;
              addRange(range);
              prevStart = range.startLine;
            }
          }
          break;
        }
      case 13:
        /*BlockCommentTrivia*/
        {
          var startLine = document.positionAt(scanner.getTokenOffset()).line;
          var endLine = document.positionAt(scanner.getTokenOffset() + scanner.getTokenLength()).line;
          if (scanner.getTokenError() === 1 && /*UnexpectedEndOfComment*/
          startLine + 1 < document.lineCount) {
            scanner.setPosition(document.offsetAt(_jsonLanguageTypesJs.Position.create(startLine + 1, 0)));
          } else {
            if (startLine < endLine) {
              addRange({
                startLine: startLine,
                endLine: endLine,
                kind: _jsonLanguageTypesJs.FoldingRangeKind.Comment
              });
              prevStart = startLine;
            }
          }
          break;
        }
      case 12:
        /*LineCommentTrivia*/
        {
          var text = document.getText().substr(scanner.getTokenOffset(), scanner.getTokenLength());
          var m = text.match(/^\/\/\s*#(region\b)|(endregion\b)/);
          if (m) {
            var line = document.positionAt(scanner.getTokenOffset()).line;
            if (m[1]) {
              // start pattern match
              var range = {
                startLine: line,
                endLine: line,
                kind: _jsonLanguageTypesJs.FoldingRangeKind.Region
              };
              stack.push(range);
            } else {
              var i = stack.length - 1;
              while (i >= 0 && stack[i].kind !== _jsonLanguageTypesJs.FoldingRangeKind.Region) {
                i--;
              }
              if (i >= 0) {
                var range = stack[i];
                stack.length = i;
                if (line > range.startLine && prevStart !== range.startLine) {
                  range.endLine = line;
                  addRange(range);
                  prevStart = range.startLine;
                }
              }
            }
          }
          break;
        }
    }
    token = scanner.scan();
  }
  var rangeLimit = context && context.rangeLimit;
  if (typeof rangeLimit !== 'number' || ranges.length <= rangeLimit) {
    return ranges;
  }
  if (context && context.onRangeLimitExceeded) {
    context.onRangeLimitExceeded(document.uri);
  }
  var counts = [];
  for (var _i = 0, nestingLevels_1 = nestingLevels; _i < nestingLevels_1.length; _i++) {
    var level = nestingLevels_1[_i];
    if (level < 30) {
      counts[level] = (counts[level] || 0) + 1;
    }
  }
  var entries = 0;
  var maxLevel = 0;
  for (var i = 0; i < counts.length; i++) {
    var n = counts[i];
    if (n) {
      if (n + entries > rangeLimit) {
        maxLevel = i;
        break;
      }
      entries += n;
    }
  }
  var result = [];
  for (var i = 0; i < ranges.length; i++) {
    var level = nestingLevels[i];
    if (typeof level === 'number') {
      if (level < maxLevel || level === maxLevel && entries++ < rangeLimit) {
        result.push(ranges[i]);
      }
    }
  }
  return result;
}

},{"./../../jsonc-parser/main.js":"7Foak","../jsonLanguageTypes.js":"7JR1I","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"4dXTR":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "getSelectionRanges", function () {
  return getSelectionRanges;
});
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
var _jsoncParserMainJs = require('./../../jsonc-parser/main.js');
function getSelectionRanges(document, positions, doc) {
  function getSelectionRange(position) {
    var offset = document.offsetAt(position);
    var node = doc.getNodeFromOffset(offset, true);
    var result = [];
    while (node) {
      switch (node.type) {
        case 'string':
        case 'object':
        case 'array':
          // range without ", [ or {
          var cStart = node.offset + 1, cEnd = node.offset + node.length - 1;
          if (cStart < cEnd && offset >= cStart && offset <= cEnd) {
            result.push(newRange(cStart, cEnd));
          }
          result.push(newRange(node.offset, node.offset + node.length));
          break;
        case 'number':
        case 'boolean':
        case 'null':
        case 'property':
          result.push(newRange(node.offset, node.offset + node.length));
          break;
      }
      if (node.type === 'property' || node.parent && node.parent.type === 'array') {
        var afterCommaOffset = getOffsetAfterNextToken(node.offset + node.length, 5);
        if (afterCommaOffset !== -1) {
          result.push(newRange(node.offset, afterCommaOffset));
        }
      }
      node = node.parent;
    }
    var current = undefined;
    for (var index = result.length - 1; index >= 0; index--) {
      current = _jsonLanguageTypesJs.SelectionRange.create(result[index], current);
    }
    if (!current) {
      current = _jsonLanguageTypesJs.SelectionRange.create(_jsonLanguageTypesJs.Range.create(position, position));
    }
    return current;
  }
  function newRange(start, end) {
    return _jsonLanguageTypesJs.Range.create(document.positionAt(start), document.positionAt(end));
  }
  var scanner = _jsoncParserMainJs.createScanner(document.getText(), true);
  function getOffsetAfterNextToken(offset, expectedToken) {
    scanner.setPosition(offset);
    var token = scanner.scan();
    if (token === expectedToken) {
      return scanner.getTokenOffset() + scanner.getTokenLength();
    }
    return -1;
  }
  return positions.map(getSelectionRange);
}

},{"../jsonLanguageTypes.js":"7JR1I","./../../jsonc-parser/main.js":"7Foak","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"6LZ1w":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "findLinks", function () {
  return findLinks;
});
var _jsonLanguageTypesJs = require('../jsonLanguageTypes.js');
function findLinks(document, doc) {
  var links = [];
  doc.visit(function (node) {
    var _a;
    if (node.type === "property" && node.keyNode.value === "$ref" && ((_a = node.valueNode) === null || _a === void 0 ? void 0 : _a.type) === 'string') {
      var path = node.valueNode.value;
      var targetNode = findTargetNode(doc, path);
      if (targetNode) {
        var targetPos = document.positionAt(targetNode.offset);
        links.push({
          target: document.uri + "#" + (targetPos.line + 1) + "," + (targetPos.character + 1),
          range: createRange(document, node.valueNode)
        });
      }
    }
    return true;
  });
  return Promise.resolve(links);
}
function createRange(document, node) {
  return _jsonLanguageTypesJs.Range.create(document.positionAt(node.offset + 1), document.positionAt(node.offset + node.length - 1));
}
function findTargetNode(doc, path) {
  var tokens = parseJSONPointer(path);
  if (!tokens) {
    return null;
  }
  return findNode(tokens, doc.root);
}
function findNode(pointer, node) {
  if (!node) {
    return null;
  }
  if (pointer.length === 0) {
    return node;
  }
  var token = pointer.shift();
  if (node && node.type === 'object') {
    var propertyNode = node.properties.find(function (propertyNode) {
      return propertyNode.keyNode.value === token;
    });
    if (!propertyNode) {
      return null;
    }
    return findNode(pointer, propertyNode.valueNode);
  } else if (node && node.type === 'array') {
    if (token.match(/^(0|[1-9][0-9]*)$/)) {
      var index = Number.parseInt(token);
      var arrayItem = node.items[index];
      if (!arrayItem) {
        return null;
      }
      return findNode(pointer, arrayItem);
    }
  }
  return null;
}
function parseJSONPointer(path) {
  if (path === "#") {
    return [];
  }
  if (path[0] !== '#' || path[1] !== '/') {
    return null;
  }
  return path.substring(2).split(/\//).map(unescape);
}
function unescape(str) {
  return str.replace(/~1/g, '/').replace(/~0/g, '~');
}

},{"../jsonLanguageTypes.js":"7JR1I","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}],"3DDEu":[function(require,module,exports) {
var _parcelHelpers = require("@parcel/transformer-js/lib/esmodule-helpers.js");
_parcelHelpers.defineInteropFlag(exports);
_parcelHelpers.export(exports, "createTokenizationSupport", function () {
  return createTokenizationSupport;
});
_parcelHelpers.export(exports, "TOKEN_DELIM_OBJECT", function () {
  return TOKEN_DELIM_OBJECT;
});
_parcelHelpers.export(exports, "TOKEN_DELIM_ARRAY", function () {
  return TOKEN_DELIM_ARRAY;
});
_parcelHelpers.export(exports, "TOKEN_DELIM_COLON", function () {
  return TOKEN_DELIM_COLON;
});
_parcelHelpers.export(exports, "TOKEN_DELIM_COMMA", function () {
  return TOKEN_DELIM_COMMA;
});
_parcelHelpers.export(exports, "TOKEN_VALUE_BOOLEAN", function () {
  return TOKEN_VALUE_BOOLEAN;
});
_parcelHelpers.export(exports, "TOKEN_VALUE_NULL", function () {
  return TOKEN_VALUE_NULL;
});
_parcelHelpers.export(exports, "TOKEN_VALUE_STRING", function () {
  return TOKEN_VALUE_STRING;
});
_parcelHelpers.export(exports, "TOKEN_VALUE_NUMBER", function () {
  return TOKEN_VALUE_NUMBER;
});
_parcelHelpers.export(exports, "TOKEN_PROPERTY_NAME", function () {
  return TOKEN_PROPERTY_NAME;
});
_parcelHelpers.export(exports, "TOKEN_COMMENT_BLOCK", function () {
  return TOKEN_COMMENT_BLOCK;
});
_parcelHelpers.export(exports, "TOKEN_COMMENT_LINE", function () {
  return TOKEN_COMMENT_LINE;
});
var _depsJsoncParserMainJs = require('./_deps/jsonc-parser/main.js');
function createTokenizationSupport(supportComments) {
  return {
    getInitialState: function () {
      return new JSONState(null, null, false, null);
    },
    tokenize: function (line, state, offsetDelta, stopAtOffset) {
      return tokenize(supportComments, line, state, offsetDelta, stopAtOffset);
    }
  };
}
var TOKEN_DELIM_OBJECT = 'delimiter.bracket.json';
var TOKEN_DELIM_ARRAY = 'delimiter.array.json';
var TOKEN_DELIM_COLON = 'delimiter.colon.json';
var TOKEN_DELIM_COMMA = 'delimiter.comma.json';
var TOKEN_VALUE_BOOLEAN = 'keyword.json';
var TOKEN_VALUE_NULL = 'keyword.json';
var TOKEN_VALUE_STRING = 'string.value.json';
var TOKEN_VALUE_NUMBER = 'number.json';
var TOKEN_PROPERTY_NAME = 'string.key.json';
var TOKEN_COMMENT_BLOCK = 'comment.block.json';
var TOKEN_COMMENT_LINE = 'comment.line.json';
var ParentsStack = /** @class*/
(function () {
  function ParentsStack(parent, type) {
    this.parent = parent;
    this.type = type;
  }
  ParentsStack.pop = function (parents) {
    if (parents) {
      return parents.parent;
    }
    return null;
  };
  ParentsStack.push = function (parents, type) {
    return new ParentsStack(parents, type);
  };
  ParentsStack.equals = function (a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    while (a && b) {
      if (a === b) {
        return true;
      }
      if (a.type !== b.type) {
        return false;
      }
      a = a.parent;
      b = b.parent;
    }
    return true;
  };
  return ParentsStack;
})();
var JSONState = /** @class*/
(function () {
  function JSONState(state, scanError, lastWasColon, parents) {
    this._state = state;
    this.scanError = scanError;
    this.lastWasColon = lastWasColon;
    this.parents = parents;
  }
  JSONState.prototype.clone = function () {
    return new JSONState(this._state, this.scanError, this.lastWasColon, this.parents);
  };
  JSONState.prototype.equals = function (other) {
    if (other === this) {
      return true;
    }
    if (!other || !(other instanceof JSONState)) {
      return false;
    }
    return this.scanError === other.scanError && this.lastWasColon === other.lastWasColon && ParentsStack.equals(this.parents, other.parents);
  };
  JSONState.prototype.getStateData = function () {
    return this._state;
  };
  JSONState.prototype.setStateData = function (state) {
    this._state = state;
  };
  return JSONState;
})();
function tokenize(comments, line, state, offsetDelta, stopAtOffset) {
  if (offsetDelta === void 0) {
    offsetDelta = 0;
  }
  // handle multiline strings and block comments
  var numberOfInsertedCharacters = 0;
  var adjustOffset = false;
  switch (state.scanError) {
    case 2:
      /*UnexpectedEndOfString*/
      line = '"' + line;
      numberOfInsertedCharacters = 1;
      break;
    case 1:
      /*UnexpectedEndOfComment*/
      line = '/*' + line;
      numberOfInsertedCharacters = 2;
      break;
  }
  var scanner = _depsJsoncParserMainJs.createScanner(line);
  var lastWasColon = state.lastWasColon;
  var parents = state.parents;
  var ret = {
    tokens: [],
    endState: state.clone()
  };
  while (true) {
    var offset = offsetDelta + scanner.getPosition();
    var type = '';
    var kind = scanner.scan();
    if (kind === 17) /*EOF*/
    {
      break;
    }
    // Check that the scanner has advanced
    if (offset === offsetDelta + scanner.getPosition()) {
      throw new Error('Scanner did not advance, next 3 characters are: ' + line.substr(scanner.getPosition(), 3));
    }
    // In case we inserted /* or " character, we need to
    // adjust the offset of all tokens (except the first)
    if (adjustOffset) {
      offset -= numberOfInsertedCharacters;
    }
    adjustOffset = numberOfInsertedCharacters > 0;
    // brackets and type
    switch (kind) {
      case 1:
        /*OpenBraceToken*/
        parents = ParentsStack.push(parents, 0);
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 2:
        /*CloseBraceToken*/
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_OBJECT;
        lastWasColon = false;
        break;
      case 3:
        /*OpenBracketToken*/
        parents = ParentsStack.push(parents, 1);
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 4:
        /*CloseBracketToken*/
        parents = ParentsStack.pop(parents);
        type = TOKEN_DELIM_ARRAY;
        lastWasColon = false;
        break;
      case 6:
        /*ColonToken*/
        type = TOKEN_DELIM_COLON;
        lastWasColon = true;
        break;
      case 5:
        /*CommaToken*/
        type = TOKEN_DELIM_COMMA;
        lastWasColon = false;
        break;
      case 8:
      case 9:
        /*FalseKeyword*/
        type = TOKEN_VALUE_BOOLEAN;
        lastWasColon = false;
        break;
      case 7:
        /*NullKeyword*/
        type = TOKEN_VALUE_NULL;
        lastWasColon = false;
        break;
      case 10:
        /*StringLiteral*/
        var currentParent = parents ? parents.type : 0;
        var inArray = currentParent === 1;
        type = lastWasColon || inArray ? TOKEN_VALUE_STRING : TOKEN_PROPERTY_NAME;
        lastWasColon = false;
        break;
      case 11:
        /*NumericLiteral*/
        type = TOKEN_VALUE_NUMBER;
        lastWasColon = false;
        break;
    }
    // comments, iff enabled
    if (comments) {
      switch (kind) {
        case 12:
          /*LineCommentTrivia*/
          type = TOKEN_COMMENT_LINE;
          break;
        case 13:
          /*BlockCommentTrivia*/
          type = TOKEN_COMMENT_BLOCK;
          break;
      }
    }
    ret.endState = new JSONState(state.getStateData(), scanner.getTokenError(), lastWasColon, parents);
    ret.tokens.push({
      startIndex: offset,
      scopes: type
    });
  }
  return ret;
}

},{"./_deps/jsonc-parser/main.js":"7Foak","@parcel/transformer-js/lib/esmodule-helpers.js":"5gA8y"}]},["46ia3"], null, "parcelRequire1b1f")

//# sourceMappingURL=jsonMode.9d5600c0.js.map
