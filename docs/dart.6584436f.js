!function(e,n,r,o,t){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0,c=s.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(n,r){if(!c[n]){if(!e[n]){var o="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0;if(!r&&o)return o(n,!0);if(s)return s(n,!0);if(a&&"string"==typeof n)return a(n);var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}d.resolve=function(r){var o=e[n][1][r];return null!=o?o:r},d.cache={};var p=c[n]=new l.Module(n);e[n][0].call(p.exports,d,p,p.exports,this)}return c[n].exports;function d(e){var n=d.resolve(e);return!1===n?{}:l(n)}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=c,l.parent=s,l.register=function(n,r){e[n]=[function(e,n){n.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return i.parcelRequire0da0}}),i.parcelRequire0da0=l;for(var p=0;p<n.length;p++)l(n[p])}({h9owR:[function(e,n,r){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(r),o.export(r,"conf",(()=>t)),o.export(r,"language",(()=>i));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var t={comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"'",close:"'",notIn:["string","comment"]},{open:'"',close:'"',notIn:["string"]},{open:"`",close:"`",notIn:["string","comment"]},{open:"/**",close:" */",notIn:["string"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">"},{open:"'",close:"'"},{open:"(",close:")"},{open:'"',close:'"'},{open:"`",close:"`"}],folding:{markers:{start:/^\s*\s*#?region\b/,end:/^\s*\s*#?endregion\b/}}},i={defaultToken:"invalid",tokenPostfix:".dart",keywords:["abstract","dynamic","implements","show","as","else","import","static","assert","enum","in","super","async","export","interface","switch","await","extends","is","sync","break","external","library","this","case","factory","mixin","throw","catch","false","new","true","class","final","null","try","const","finally","on","typedef","continue","for","operator","var","covariant","Function","part","void","default","get","rethrow","while","deferred","hide","return","with","do","if","set","yield"],typeKeywords:["int","double","String","bool"],operators:["+","-","*","/","~/","%","++","--","==","!=",">","<",">=","<=","=","-=","/=","%=",">>=","^=","+=","*=","~/=","<<=","&=","!=","||","&&","&","|","^","~","<<",">>","!",">>>","??","?",":","|="],symbols:/[=><!~?:&|+\-*\/\^%]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,digits:/\d+(_+\d+)*/,octaldigits:/[0-7]+(_+[0-7]+)*/,binarydigits:/[0-1]+(_+[0-1]+)*/,hexdigits:/[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,regexpctl:/[(){}\[\]\$\^|\-*+?\.]/,regexpesc:/\\(?:[bBdDfnrstvwWn0\\\/]|@regexpctl|c[A-Z]|x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4})/,tokenizer:{root:[[/[{}]/,"delimiter.bracket"],{include:"common"}],common:[[/[a-z_$][\w$]*/,{cases:{"@typeKeywords":"type.identifier","@keywords":"keyword","@default":"identifier"}}],[/[A-Z_$][\w\$]*/,"type.identifier"],{include:"@whitespace"},[/\/(?=([^\\\/]|\\.)+\/([gimsuy]*)(\s*)(\.|;|,|\)|\]|\}|$))/,{token:"regexp",bracket:"@open",next:"@regexp"}],[/@[a-zA-Z]+/,"annotation"],[/[()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/!(?=([^=]|$))/,"delimiter"],[/@symbols/,{cases:{"@operators":"delimiter","@default":""}}],[/(@digits)[eE]([\-+]?(@digits))?/,"number.float"],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?/,"number.float"],[/0[xX](@hexdigits)n?/,"number.hex"],[/0[oO]?(@octaldigits)n?/,"number.octal"],[/0[bB](@binarydigits)n?/,"number.binary"],[/(@digits)n?/,"number"],[/[;,.]/,"delimiter"],[/"([^"\\]|\\.)*$/,"string.invalid"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/"/,"string","@string_double"],[/'/,"string","@string_single"]],whitespace:[[/[ \t\r\n]+/,""],[/\/\*\*(?!\/)/,"comment.doc","@jsdoc"],[/\/\*/,"comment","@comment"],[/\/\/\/.*$/,"comment.doc"],[/\/\/.*$/,"comment"]],comment:[[/[^\/*]+/,"comment"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],jsdoc:[[/[^\/*]+/,"comment.doc"],[/\*\//,"comment.doc","@pop"],[/[\/*]/,"comment.doc"]],regexp:[[/(\{)(\d+(?:,\d*)?)(\})/,["regexp.escape.control","regexp.escape.control","regexp.escape.control"]],[/(\[)(\^?)(?=(?:[^\]\\\/]|\\.)+)/,["regexp.escape.control",{token:"regexp.escape.control",next:"@regexrange"}]],[/(\()(\?:|\?=|\?!)/,["regexp.escape.control","regexp.escape.control"]],[/[()]/,"regexp.escape.control"],[/@regexpctl/,"regexp.escape.control"],[/[^\\\/]/,"regexp"],[/@regexpesc/,"regexp.escape"],[/\\\./,"regexp.invalid"],[/(\/)([gimsuy]*)/,[{token:"regexp",bracket:"@close",next:"@pop"},"keyword.other"]]],regexrange:[[/-/,"regexp.escape.control"],[/\^/,"regexp.invalid"],[/@regexpesc/,"regexp.escape"],[/[^\]]/,"regexp"],[/\]/,{token:"regexp.escape.control",next:"@pop",bracket:"@close"}]],string_double:[[/[^\\"\$]+/,"string"],[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,"string","@pop"],[/\$\w+/,"identifier"]],string_single:[[/[^\\'\$]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/'/,"string","@pop"],[/\$\w+/,"identifier"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"evdfB"}]},[]);