!function(e,r,t,o,n){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof s.parcelRequire0da0&&s.parcelRequire0da0,u=i.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(r,t){if(!u[r]){if(!e[r]){var o="function"==typeof s.parcelRequire0da0&&s.parcelRequire0da0;if(!t&&o)return o(r,!0);if(i)return i(r,!0);if(a&&"string"==typeof r)return a(r);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}l.resolve=function(t){var o=e[r][1][t];return null!=o?o:t},l.cache={};var f=u[r]=new c.Module(r);e[r][0].call(f.exports,l,f,f.exports,this)}return u[r].exports;function l(e){var r=l.resolve(e);return!1===r?{}:c(r)}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=u,c.parent=i,c.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]},Object.defineProperty(c,"root",{get:function(){return s.parcelRequire0da0}}),s.parcelRequire0da0=c;for(var f=0;f<r.length;f++)c(r[f])}({"4qgR0":[function(e,r,t){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(t),o.export(t,"conf",(()=>n)),o.export(t,"language",(()=>s));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var n={brackets:[],autoClosingPairs:[],surroundingPairs:[]},s={keywords:[],typeKeywords:[],tokenPostfix:".csp",operators:[],symbols:/[=><!~?:&|+\-*\/\^%]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/child-src/,"string.quote"],[/connect-src/,"string.quote"],[/default-src/,"string.quote"],[/font-src/,"string.quote"],[/frame-src/,"string.quote"],[/img-src/,"string.quote"],[/manifest-src/,"string.quote"],[/media-src/,"string.quote"],[/object-src/,"string.quote"],[/script-src/,"string.quote"],[/style-src/,"string.quote"],[/worker-src/,"string.quote"],[/base-uri/,"string.quote"],[/plugin-types/,"string.quote"],[/sandbox/,"string.quote"],[/disown-opener/,"string.quote"],[/form-action/,"string.quote"],[/frame-ancestors/,"string.quote"],[/report-uri/,"string.quote"],[/report-to/,"string.quote"],[/upgrade-insecure-requests/,"string.quote"],[/block-all-mixed-content/,"string.quote"],[/require-sri-for/,"string.quote"],[/reflected-xss/,"string.quote"],[/referrer/,"string.quote"],[/policy-uri/,"string.quote"],[/'self'/,"string.quote"],[/'unsafe-inline'/,"string.quote"],[/'unsafe-eval'/,"string.quote"],[/'strict-dynamic'/,"string.quote"],[/'unsafe-hashed-attributes'/,"string.quote"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"evdfB"}]},[]);