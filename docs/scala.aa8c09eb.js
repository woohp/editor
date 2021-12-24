!function(e,t,o,r,n){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0,a=s.cache||{},d="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,o){if(!a[t]){if(!e[t]){var r="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0;if(!o&&r)return r(t,!0);if(s)return s(t,!0);if(d&&"string"==typeof t)return d(t);var n=new Error("Cannot find module '"+t+"'");throw n.code="MODULE_NOT_FOUND",n}p.resolve=function(o){return e[t][1][o]||o},p.cache={};var c=a[t]=new l.Module(t);e[t][0].call(c.exports,p,c,c.exports,this)}return a[t].exports;function p(e){return l(p.resolve(e))}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=a,l.parent=s,l.register=function(t,o){e[t]=[function(e,t){t.exports=o},{}]},Object.defineProperty(l,"root",{get:function(){return i.parcelRequire0da0}}),i.parcelRequire0da0=l;for(var c=0;c<t.length;c++)l(t[c])}({f2ZbB:[function(e,t,o){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(o),r.export(o,"conf",(()=>n)),r.export(o,"language",(()=>i));
/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.31.1(337587859b1c171314b40503171188b6cea6a32a)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/
var n={wordPattern:/(unary_[@~!#%^&*()\-=+\\|:<>\/?]+)|([a-zA-Z_$][\w$]*?_=)|(`[^`]+`)|([a-zA-Z_$][\w$]*)/g,comments:{lineComment:"//",blockComment:["/*","*/"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{markers:{start:new RegExp("^\\s*//\\s*(?:(?:#?region\\b)|(?:<editor-fold\\b))"),end:new RegExp("^\\s*//\\s*(?:(?:#?endregion\\b)|(?:</editor-fold>))")}}},i={tokenPostfix:".scala",keywords:["asInstanceOf","catch","class","classOf","def","do","else","extends","finally","for","foreach","forSome","if","import","isInstanceOf","macro","match","new","object","package","return","throw","trait","try","type","until","val","var","while","with","yield","given","enum","then"],softKeywords:["as","export","extension","end","derives","on"],constants:["true","false","null","this","super"],modifiers:["abstract","final","implicit","lazy","override","private","protected","sealed"],softModifiers:["inline","opaque","open","transparent","using"],name:/(?:[a-z_$][\w$]*|`[^`]+`)/,type:/(?:[A-Z][\w$]*)/,symbols:/[=><!~?:&|+\-*\/^\\%@#]+/,digits:/\d+(_+\d+)*/,hexdigits:/[[0-9a-fA-F]+(_+[0-9a-fA-F]+)*/,escapes:/\\(?:[btnfr\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,fstring_conv:/[bBhHsScCdoxXeEfgGaAt]|[Tn](?:[HIklMSLNpzZsQ]|[BbhAaCYyjmde]|[RTrDFC])/,tokenizer:{root:[[/\braw"""/,{token:"string.quote",bracket:"@open",next:"@rawstringt"}],[/\braw"/,{token:"string.quote",bracket:"@open",next:"@rawstring"}],[/\bs"""/,{token:"string.quote",bracket:"@open",next:"@sstringt"}],[/\bs"/,{token:"string.quote",bracket:"@open",next:"@sstring"}],[/\bf""""/,{token:"string.quote",bracket:"@open",next:"@fstringt"}],[/\bf"/,{token:"string.quote",bracket:"@open",next:"@fstring"}],[/"""/,{token:"string.quote",bracket:"@open",next:"@stringt"}],[/"/,{token:"string.quote",bracket:"@open",next:"@string"}],[/(@digits)[eE]([\-+]?(@digits))?[fFdD]?/,"number.float","@allowMethod"],[/(@digits)\.(@digits)([eE][\-+]?(@digits))?[fFdD]?/,"number.float","@allowMethod"],[/0[xX](@hexdigits)[Ll]?/,"number.hex","@allowMethod"],[/(@digits)[fFdD]/,"number.float","@allowMethod"],[/(@digits)[lL]?/,"number","@allowMethod"],[/\b_\*/,"key"],[/\b(_)\b/,"keyword","@allowMethod"],[/\bimport\b/,"keyword","@import"],[/\b(case)([ \t]+)(class)\b/,["keyword.modifier","white","keyword"]],[/\bcase\b/,"keyword","@case"],[/\bva[lr]\b/,"keyword","@vardef"],[/\b(def)([ \t]+)((?:unary_)?@symbols|@name(?:_=)|@name)/,["keyword","white","identifier"]],[/@name(?=[ \t]*:(?!:))/,"variable"],[/(\.)(@name|@symbols)/,["operator",{token:"@rematch",next:"@allowMethod"}]],[/([{(])(\s*)(@name(?=\s*=>))/,["@brackets","white","variable"]],[/@name/,{cases:{"@keywords":"keyword","@softKeywords":"keyword","@modifiers":"keyword.modifier","@softModifiers":"keyword.modifier","@constants":{token:"constant",next:"@allowMethod"},"@default":{token:"identifier",next:"@allowMethod"}}}],[/@type/,"type","@allowMethod"],{include:"@whitespace"},[/@[a-zA-Z_$][\w$]*(?:\.[a-zA-Z_$][\w$]*)*/,"annotation"],[/[{(]/,"@brackets"],[/[})]/,"@brackets","@allowMethod"],[/\[/,"operator.square"],[/](?!\s*(?:va[rl]|def|type)\b)/,"operator.square","@allowMethod"],[/]/,"operator.square"],[/([=-]>|<-|>:|<:|:>|<%)(?=[\s\w()[\]{},\."'`])/,"keyword"],[/@symbols/,"operator"],[/[;,\.]/,"delimiter"],[/'[a-zA-Z$][\w$]*(?!')/,"attribute.name"],[/'[^\\']'/,"string","@allowMethod"],[/(')(@escapes)(')/,["string","string.escape",{token:"string",next:"@allowMethod"}]],[/'/,"string.invalid"]],import:[[/;/,"delimiter","@pop"],[/^|$/,"","@pop"],[/[ \t]+/,"white"],[/[\n\r]+/,"white","@pop"],[/\/\*/,"comment","@comment"],[/@name|@type/,"type"],[/[(){}]/,"@brackets"],[/[[\]]/,"operator.square"],[/[\.,]/,"delimiter"]],allowMethod:[[/^|$/,"","@pop"],[/[ \t]+/,"white"],[/[\n\r]+/,"white","@pop"],[/\/\*/,"comment","@comment"],[/(?==>[\s\w([{])/,"keyword","@pop"],[/(@name|@symbols)(?=[ \t]*[[({"'`]|[ \t]+(?:[+-]?\.?\d|\w))/,{cases:{"@keywords":{token:"keyword",next:"@pop"},"->|<-|>:|<:|<%":{token:"keyword",next:"@pop"},"@default":{token:"@rematch",next:"@pop"}}}],["","","@pop"]],comment:[[/[^\/*]+/,"comment"],[/\/\*/,"comment","@push"],[/\*\//,"comment","@pop"],[/[\/*]/,"comment"]],case:[[/\b_\*/,"key"],[/\b(_|true|false|null|this|super)\b/,"keyword","@allowMethod"],[/\bif\b|=>/,"keyword","@pop"],[/`[^`]+`/,"identifier","@allowMethod"],[/@name/,"variable","@allowMethod"],[/:::?|\||@(?![a-z_$])/,"keyword"],{include:"@root"}],vardef:[[/\b_\*/,"key"],[/\b(_|true|false|null|this|super)\b/,"keyword"],[/@name/,"variable"],[/:::?|\||@(?![a-z_$])/,"keyword"],[/=|:(?!:)/,"operator","@pop"],[/$/,"white","@pop"],{include:"@root"}],string:[[/[^\\"\n\r]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}]],stringt:[[/[^\\"\n\r]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"(?=""")/,"string"],[/"""/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/"/,"string"]],fstring:[[/@escapes/,"string.escape"],[/"/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/\$\$/,"string"],[/(\$)([a-z_]\w*)/,["operator","identifier"]],[/\$\{/,"operator","@interp"],[/%%/,"string"],[/(%)([\-#+ 0,(])(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,["metatag","keyword.modifier","number","metatag"]],[/(%)(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,["metatag","number","metatag"]],[/(%)([\-#+ 0,(])(@fstring_conv)/,["metatag","keyword.modifier","metatag"]],[/(%)(@fstring_conv)/,["metatag","metatag"]],[/./,"string"]],fstringt:[[/@escapes/,"string.escape"],[/"(?=""")/,"string"],[/"""/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/\$\$/,"string"],[/(\$)([a-z_]\w*)/,["operator","identifier"]],[/\$\{/,"operator","@interp"],[/%%/,"string"],[/(%)([\-#+ 0,(])(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,["metatag","keyword.modifier","number","metatag"]],[/(%)(\d+|\.\d+|\d+\.\d+)(@fstring_conv)/,["metatag","number","metatag"]],[/(%)([\-#+ 0,(])(@fstring_conv)/,["metatag","keyword.modifier","metatag"]],[/(%)(@fstring_conv)/,["metatag","metatag"]],[/./,"string"]],sstring:[[/@escapes/,"string.escape"],[/"/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/\$\$/,"string"],[/(\$)([a-z_]\w*)/,["operator","identifier"]],[/\$\{/,"operator","@interp"],[/./,"string"]],sstringt:[[/@escapes/,"string.escape"],[/"(?=""")/,"string"],[/"""/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/\$\$/,"string"],[/(\$)([a-z_]\w*)/,["operator","identifier"]],[/\$\{/,"operator","@interp"],[/./,"string"]],interp:[[/{/,"operator","@push"],[/}/,"operator","@pop"],{include:"@root"}],rawstring:[[/[^"]/,"string"],[/"/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}]],rawstringt:[[/[^"]/,"string"],[/"(?=""")/,"string"],[/"""/,{token:"string.quote",bracket:"@close",switchTo:"@allowMethod"}],[/"/,"string"]],whitespace:[[/[ \t\r\n]+/,"white"],[/\/\*/,"comment","@comment"],[/\/\/.*$/,"comment"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);