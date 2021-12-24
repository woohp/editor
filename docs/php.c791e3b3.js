!function(e,t,p,n,r){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},o="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0,a=o.cache||{},m="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function s(t,p){if(!a[t]){if(!e[t]){var n="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0;if(!p&&n)return n(t,!0);if(o)return o(t,!0);if(m&&"string"==typeof t)return m(t);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}h.resolve=function(p){return e[t][1][p]||p},h.cache={};var l=a[t]=new s.Module(t);e[t][0].call(l.exports,h,l,l.exports,this)}return a[t].exports;function h(e){return s(h.resolve(e))}}s.isParcelRequire=!0,s.Module=function(e){this.id=e,this.bundle=s,this.exports={}},s.modules=e,s.cache=a,s.parent=o,s.register=function(t,p){e[t]=[function(e,t){t.exports=p},{}]},Object.defineProperty(s,"root",{get:function(){return i.parcelRequire0da0}}),i.parcelRequire0da0=s;for(var l=0;l<t.length;l++)s(t[l])}({ebsZ4:[function(e,t,p){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(p),n.export(p,"conf",(()=>r)),n.export(p,"language",(()=>i));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var r={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#\%\^\&\*\(\)\-\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}",notIn:["string"]},{open:"[",close:"]",notIn:["string"]},{open:"(",close:")",notIn:["string"]},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string","comment"]}],folding:{markers:{start:new RegExp("^\\s*(#|//)region\\b"),end:new RegExp("^\\s*(#|//)endregion\\b")}}},i={defaultToken:"",tokenPostfix:"",tokenizer:{root:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.root"}],[/<!DOCTYPE/,"metatag.html","@doctype"],[/<!--/,"comment.html","@comment"],[/(<)(\w+)(\/>)/,["delimiter.html","tag.html","delimiter.html"]],[/(<)(script)/,["delimiter.html",{token:"tag.html",next:"@script"}]],[/(<)(style)/,["delimiter.html",{token:"tag.html",next:"@style"}]],[/(<)([:\w]+)/,["delimiter.html",{token:"tag.html",next:"@otherTag"}]],[/(<\/)(\w+)/,["delimiter.html",{token:"tag.html",next:"@otherTag"}]],[/</,"delimiter.html"],[/[^<]+/]],doctype:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.comment"}],[/[^>]+/,"metatag.content.html"],[/>/,"metatag.html","@pop"]],comment:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.comment"}],[/-->/,"comment.html","@pop"],[/[^-]+/,"comment.content.html"],[/./,"comment.content.html"]],otherTag:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.otherTag"}],[/\/?>/,"delimiter.html","@pop"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/]],script:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.script"}],[/type/,"attribute.name","@scriptAfterType"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/(<\/)(script\s*)(>)/,["delimiter.html","tag.html",{token:"delimiter.html",next:"@pop"}]]],scriptAfterType:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.scriptAfterType"}],[/=/,"delimiter","@scriptAfterTypeEquals"],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptAfterTypeEquals:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.scriptAfterTypeEquals"}],[/"([^"]*)"/,{token:"attribute.value",switchTo:"@scriptWithCustomType.$1"}],[/'([^']*)'/,{token:"attribute.value",switchTo:"@scriptWithCustomType.$1"}],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.text/javascript",nextEmbedded:"text/javascript"}],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptWithCustomType:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.scriptWithCustomType.$S2"}],[/>/,{token:"delimiter.html",next:"@scriptEmbedded.$S2",nextEmbedded:"$S2"}],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/],[/<\/script\s*>/,{token:"@rematch",next:"@pop"}]],scriptEmbedded:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInEmbeddedState.scriptEmbedded.$S2",nextEmbedded:"@pop"}],[/<\/script/,{token:"@rematch",next:"@pop",nextEmbedded:"@pop"}]],style:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.style"}],[/type/,"attribute.name","@styleAfterType"],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/(<\/)(style\s*)(>)/,["delimiter.html","tag.html",{token:"delimiter.html",next:"@pop"}]]],styleAfterType:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.styleAfterType"}],[/=/,"delimiter","@styleAfterTypeEquals"],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleAfterTypeEquals:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.styleAfterTypeEquals"}],[/"([^"]*)"/,{token:"attribute.value",switchTo:"@styleWithCustomType.$1"}],[/'([^']*)'/,{token:"attribute.value",switchTo:"@styleWithCustomType.$1"}],[/>/,{token:"delimiter.html",next:"@styleEmbedded.text/css",nextEmbedded:"text/css"}],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleWithCustomType:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInSimpleState.styleWithCustomType.$S2"}],[/>/,{token:"delimiter.html",next:"@styleEmbedded.$S2",nextEmbedded:"$S2"}],[/"([^"]*)"/,"attribute.value"],[/'([^']*)'/,"attribute.value"],[/[\w\-]+/,"attribute.name"],[/=/,"delimiter"],[/[ \t\r\n]+/],[/<\/style\s*>/,{token:"@rematch",next:"@pop"}]],styleEmbedded:[[/<\?((php)|=)?/,{token:"@rematch",switchTo:"@phpInEmbeddedState.styleEmbedded.$S2",nextEmbedded:"@pop"}],[/<\/style/,{token:"@rematch",next:"@pop",nextEmbedded:"@pop"}]],phpInSimpleState:[[/<\?((php)|=)?/,"metatag.php"],[/\?>/,{token:"metatag.php",switchTo:"@$S2.$S3"}],{include:"phpRoot"}],phpInEmbeddedState:[[/<\?((php)|=)?/,"metatag.php"],[/\?>/,{token:"metatag.php",switchTo:"@$S2.$S3",nextEmbedded:"$S3"}],{include:"phpRoot"}],phpRoot:[[/[a-zA-Z_]\w*/,{cases:{"@phpKeywords":{token:"keyword.php"},"@phpCompileTimeConstants":{token:"constant.php"},"@default":"identifier.php"}}],[/[$a-zA-Z_]\w*/,{cases:{"@phpPreDefinedVariables":{token:"variable.predefined.php"},"@default":"variable.php"}}],[/[{}]/,"delimiter.bracket.php"],[/[\[\]]/,"delimiter.array.php"],[/[()]/,"delimiter.parenthesis.php"],[/[ \t\r\n]+/],[/(#|\/\/)$/,"comment.php"],[/(#|\/\/)/,"comment.php","@phpLineComment"],[/\/\*/,"comment.php","@phpComment"],[/"/,"string.php","@phpDoubleQuoteString"],[/'/,"string.php","@phpSingleQuoteString"],[/[\+\-\*\%\&\|\^\~\!\=\<\>\/\?\;\:\.\,\@]/,"delimiter.php"],[/\d*\d+[eE]([\-+]?\d+)?/,"number.float.php"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float.php"],[/0[xX][0-9a-fA-F']*[0-9a-fA-F]/,"number.hex.php"],[/0[0-7']*[0-7]/,"number.octal.php"],[/0[bB][0-1']*[0-1]/,"number.binary.php"],[/\d[\d']*/,"number.php"],[/\d/,"number.php"]],phpComment:[[/\*\//,"comment.php","@pop"],[/[^*]+/,"comment.php"],[/./,"comment.php"]],phpLineComment:[[/\?>/,{token:"@rematch",next:"@pop"}],[/.$/,"comment.php","@pop"],[/[^?]+$/,"comment.php","@pop"],[/[^?]+/,"comment.php"],[/./,"comment.php"]],phpDoubleQuoteString:[[/[^\\"]+/,"string.php"],[/@escapes/,"string.escape.php"],[/\\./,"string.escape.invalid.php"],[/"/,"string.php","@pop"]],phpSingleQuoteString:[[/[^\\']+/,"string.php"],[/@escapes/,"string.escape.php"],[/\\./,"string.escape.invalid.php"],[/'/,"string.php","@pop"]]},phpKeywords:["abstract","and","array","as","break","callable","case","catch","cfunction","class","clone","const","continue","declare","default","do","else","elseif","enddeclare","endfor","endforeach","endif","endswitch","endwhile","extends","false","final","for","foreach","function","global","goto","if","implements","interface","instanceof","insteadof","namespace","new","null","object","old_function","or","private","protected","public","resource","static","switch","throw","trait","try","true","use","var","while","xor","die","echo","empty","exit","eval","include","include_once","isset","list","require","require_once","return","print","unset","yield","__construct"],phpCompileTimeConstants:["__CLASS__","__DIR__","__FILE__","__LINE__","__NAMESPACE__","__METHOD__","__FUNCTION__","__TRAIT__"],phpPreDefinedVariables:["$GLOBALS","$_SERVER","$_GET","$_POST","$_FILES","$_REQUEST","$_SESSION","$_ENV","$_COOKIE","$php_errormsg","$HTTP_RAW_POST_DATA","$http_response_header","$argc","$argv"],escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);