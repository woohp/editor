parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Opwb":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.language=exports.conf=void 0;var e=require("../typescript/typescript.js"),t="undefined"==typeof monaco?self.monaco:monaco,a=e.conf;exports.conf=a;var s={defaultToken:"invalid",tokenPostfix:".js",keywords:["break","case","catch","class","continue","const","constructor","debugger","default","delete","do","else","export","extends","false","finally","for","from","function","get","if","import","in","instanceof","let","new","null","return","set","super","switch","symbol","this","throw","true","try","typeof","undefined","var","void","while","with","yield","async","await","of"],typeKeywords:[],operators:e.language.operators,symbols:e.language.symbols,escapes:e.language.escapes,digits:e.language.digits,octaldigits:e.language.octaldigits,binarydigits:e.language.binarydigits,hexdigits:e.language.hexdigits,regexpctl:e.language.regexpctl,regexpesc:e.language.regexpesc,tokenizer:e.language.tokenizer};exports.language=s;
},{"../typescript/typescript.js":"c7Ox"}]},{},[], null)
//# sourceMappingURL=javascript.38f94a31.js.map