!function(e,t,r,o,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0,d=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function a(t,r){if(!d[t]){if(!e[t]){var o="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0;if(!r&&o)return o(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}p.resolve=function(r){var o=e[t][1][r];return null!=o?o:r},p.cache={};var c=d[t]=new a.Module(t);e[t][0].call(c.exports,p,c,c.exports,this)}return d[t].exports;function p(e){var t=p.resolve(e);return!1===t?{}:a(t)}}a.isParcelRequire=!0,a.Module=function(e){this.id=e,this.bundle=a,this.exports={}},a.modules=e,a.cache=d,a.parent=s,a.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(a,"root",{get:function(){return i.parcelRequire0da0}}),i.parcelRequire0da0=a;for(var c=0;c<t.length;c++)a(t[c])}({"4NZII":[function(e,t,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"conf",(()=>n)),o.export(r,"language",(()=>i));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var n={comments:{lineComment:"COMMENT"},brackets:[["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:":",close:"."}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"`",close:"`"},{open:'"',close:'"'},{open:"'",close:"'"},{open:":",close:"."}],folding:{markers:{start:new RegExp("^\\s*(::\\s*|COMMENT\\s+)#region"),end:new RegExp("^\\s*(::\\s*|COMMENT\\s+)#endregion")}}},i={tokenPostfix:".lexon",ignoreCase:!0,keywords:["lexon","lex","clause","terms","contracts","may","pay","pays","appoints","into","to"],typeKeywords:["amount","person","key","time","date","asset","text"],operators:["less","greater","equal","le","gt","or","and","add","added","subtract","subtracted","multiply","multiplied","times","divide","divided","is","be","certified"],symbols:/[=><!~?:&|+\-*\/\^%]+/,tokenizer:{root:[[/^(\s*)(comment:?(?:\s.*|))$/,["","comment"]],[/"/,{token:"identifier.quote",bracket:"@open",next:"@quoted_identifier"}],["LEX$",{token:"keyword",bracket:"@open",next:"@identifier_until_period"}],["LEXON",{token:"keyword",bracket:"@open",next:"@semver"}],[":",{token:"delimiter",bracket:"@open",next:"@identifier_until_period"}],[/[a-z_$][\w$]*/,{cases:{"@operators":"operator","@typeKeywords":"keyword.type","@keywords":"keyword","@default":"identifier"}}],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,"delimiter"],[/\d*\.\d*\.\d*/,"number.semver"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/0[xX][0-9a-fA-F]+/,"number.hex"],[/\d+/,"number"],[/[;,.]/,"delimiter"]],quoted_identifier:[[/[^\\"]+/,"identifier"],[/"/,{token:"identifier.quote",bracket:"@close",next:"@pop"}]],space_identifier_until_period:[[":","delimiter"],[" ",{token:"white",next:"@identifier_rest"}]],identifier_until_period:[{include:"@whitespace"},[":",{token:"delimiter",next:"@identifier_rest"}],[/[^\\.]+/,"identifier"],[/\./,{token:"delimiter",bracket:"@close",next:"@pop"}]],identifier_rest:[[/[^\\.]+/,"identifier"],[/\./,{token:"delimiter",bracket:"@close",next:"@pop"}]],semver:[{include:"@whitespace"},[":","delimiter"],[/\d*\.\d*\.\d*/,{token:"number.semver",bracket:"@close",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,"white"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"evdfB"}]},[]);