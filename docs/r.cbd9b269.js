!function(e,r,o,t,n){var a="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof a.parcelRequire0da0&&a.parcelRequire0da0,i=s.cache||{},c="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(r,o){if(!i[r]){if(!e[r]){var t="function"==typeof a.parcelRequire0da0&&a.parcelRequire0da0;if(!o&&t)return t(r,!0);if(s)return s(r,!0);if(c&&"string"==typeof r)return c(r);var n=new Error("Cannot find module '"+r+"'");throw n.code="MODULE_NOT_FOUND",n}d.resolve=function(o){return e[r][1][o]||o},d.cache={};var p=i[r]=new l.Module(r);e[r][0].call(p.exports,d,p,p.exports,this)}return i[r].exports;function d(e){return l(d.resolve(e))}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=i,l.parent=s,l.register=function(r,o){e[r]=[function(e,r){r.exports=o},{}]},Object.defineProperty(l,"root",{get:function(){return a.parcelRequire0da0}}),a.parcelRequire0da0=l;for(var p=0;p<r.length;p++)l(r[p])}({cuD1d:[function(e,r,o){var t=e("@parcel/transformer-js/src/esmodule-helpers.js");t.defineInteropFlag(o),t.export(o,"conf",(()=>n)),t.export(o,"language",(()=>a));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var n={comments:{lineComment:"#"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}]},a={defaultToken:"",tokenPostfix:".r",roxygen:["@alias","@aliases","@assignee","@author","@backref","@callGraph","@callGraphDepth","@callGraphPrimitives","@concept","@describeIn","@description","@details","@docType","@encoding","@evalNamespace","@evalRd","@example","@examples","@export","@exportClass","@exportMethod","@exportPattern","@family","@field","@formals","@format","@import","@importClassesFrom","@importFrom","@importMethodsFrom","@include","@inherit","@inheritDotParams","@inheritParams","@inheritSection","@keywords","@md","@method","@name","@noMd","@noRd","@note","@param","@rawNamespace","@rawRd","@rdname","@references","@return","@S3method","@section","@seealso","@setClass","@slot","@source","@template","@templateVar","@title","@TODO","@usage","@useDynLib"],constants:["NULL","FALSE","TRUE","NA","Inf","NaN","NA_integer_","NA_real_","NA_complex_","NA_character_","T","F","LETTERS","letters","month.abb","month.name","pi","R.version.string"],keywords:["break","next","return","if","else","for","in","repeat","while","array","category","character","complex","double","function","integer","list","logical","matrix","numeric","vector","data.frame","factor","library","require","attach","detach","source"],special:["\\n","\\r","\\t","\\b","\\a","\\f","\\v","\\'",'\\"',"\\\\"],brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.bracket"},{open:"(",close:")",token:"delimiter.parenthesis"}],tokenizer:{root:[{include:"@numbers"},{include:"@strings"},[/[{}\[\]()]/,"@brackets"],{include:"@operators"},[/#'$/,"comment.doc"],[/#'/,"comment.doc","@roxygen"],[/(^#.*$)/,"comment"],[/\s+/,"white"],[/[,:;]/,"delimiter"],[/@[a-zA-Z]\w*/,"tag"],[/[a-zA-Z]\w*/,{cases:{"@keywords":"keyword","@constants":"constant","@default":"identifier"}}]],roxygen:[[/@\w+/,{cases:{"@roxygen":"tag","@eos":{token:"comment.doc",next:"@pop"},"@default":"comment.doc"}}],[/\s+/,{cases:{"@eos":{token:"comment.doc",next:"@pop"},"@default":"comment.doc"}}],[/.*/,{token:"comment.doc",next:"@pop"}]],numbers:[[/0[xX][0-9a-fA-F]+/,"number.hex"],[/-?(\d*\.)?\d+([eE][+\-]?\d+)?/,"number"]],operators:[[/<{1,2}-/,"operator"],[/->{1,2}/,"operator"],[/%[^%\s]+%/,"operator"],[/\*\*/,"operator"],[/%%/,"operator"],[/&&/,"operator"],[/\|\|/,"operator"],[/<</,"operator"],[/>>/,"operator"],[/[-+=&|!<>^~*/:$]/,"operator"]],strings:[[/'/,"string.escape","@stringBody"],[/"/,"string.escape","@dblStringBody"]],stringBody:[[/\\./,{cases:{"@special":"string","@default":"error-token"}}],[/'/,"string.escape","@popall"],[/./,"string"]],dblStringBody:[[/\\./,{cases:{"@special":"string","@default":"error-token"}}],[/"/,"string.escape","@popall"],[/./,"string"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);