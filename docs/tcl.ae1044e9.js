!function(e,t,n,o,r){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0,a=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(t,n){if(!a[t]){if(!e[t]){var o="function"==typeof i.parcelRequire0da0&&i.parcelRequire0da0;if(!n&&o)return o(t,!0);if(s)return s(t,!0);if(l&&"string"==typeof t)return l(t);var r=new Error("Cannot find module '"+t+"'");throw r.code="MODULE_NOT_FOUND",r}u.resolve=function(n){return e[t][1][n]||n},u.cache={};var p=a[t]=new c.Module(t);e[t][0].call(p.exports,u,p,p.exports,this)}return a[t].exports;function u(e){return c(u.resolve(e))}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=a,c.parent=s,c.register=function(t,n){e[t]=[function(e,t){t.exports=n},{}]},Object.defineProperty(c,"root",{get:function(){return i.parcelRequire0da0}}),i.parcelRequire0da0=c;for(var p=0;p<t.length;p++)c(t[p])}({eofuk:[function(e,t,n){var o=e("@parcel/transformer-js/src/esmodule-helpers.js");o.defineInteropFlag(n),o.export(n,"conf",(()=>r)),o.export(n,"language",(()=>i));var r={brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]},i={tokenPostfix:".tcl",specialFunctions:["set","unset","rename","variable","proc","coroutine","foreach","incr","append","lappend","linsert","lreplace"],mainFunctions:["if","then","elseif","else","case","switch","while","for","break","continue","return","package","namespace","catch","exit","eval","expr","uplevel","upvar"],builtinFunctions:["file","info","concat","join","lindex","list","llength","lrange","lsearch","lsort","split","array","parray","binary","format","regexp","regsub","scan","string","subst","dict","cd","clock","exec","glob","pid","pwd","close","eof","fblocked","fconfigure","fcopy","fileevent","flush","gets","open","puts","read","seek","socket","tell","interp","after","auto_execok","auto_load","auto_mkindex","auto_reset","bgerror","error","global","history","load","source","time","trace","unknown","unset","update","vwait","winfo","wm","bind","event","pack","place","grid","font","bell","clipboard","destroy","focus","grab","lower","option","raise","selection","send","tk","tkwait","tk_bisque","tk_focusNext","tk_focusPrev","tk_focusFollowsMouse","tk_popup","tk_setPalette"],symbols:/[=><!~?:&|+\-*\/\^%]+/,brackets:[{open:"(",close:")",token:"delimiter.parenthesis"},{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"}],escapes:/\\(?:[abfnrtv\\"'\[\]\{\};\$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,variables:/(?:\$+(?:(?:\:\:?)?[a-zA-Z_]\w*)+)/,tokenizer:{root:[[/[a-zA-Z_]\w*/,{cases:{"@specialFunctions":{token:"keyword.flow",next:"@specialFunc"},"@mainFunctions":"keyword","@builtinFunctions":"variable","@default":"operator.scss"}}],[/\s+\-+(?!\d|\.)\w*|{\*}/,"metatag"],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/@symbols/,"operator"],[/\$+(?:\:\:)?\{/,{token:"identifier",next:"@nestedVariable"}],[/@variables/,"type.identifier"],[/\.(?!\d|\.)[\w\-]*/,"operator.sql"],[/\d+(\.\d+)?/,"number"],[/\d+/,"number"],[/;/,"delimiter"],[/"/,{token:"string.quote",bracket:"@open",next:"@dstring"}],[/'/,{token:"string.quote",bracket:"@open",next:"@sstring"}]],dstring:[[/\[/,{token:"@brackets",next:"@nestedCall"}],[/\$+(?:\:\:)?\{/,{token:"identifier",next:"@nestedVariable"}],[/@variables/,"type.identifier"],[/[^\\$\[\]"]+/,"string"],[/@escapes/,"string.escape"],[/"/,{token:"string.quote",bracket:"@close",next:"@pop"}]],sstring:[[/\[/,{token:"@brackets",next:"@nestedCall"}],[/\$+(?:\:\:)?\{/,{token:"identifier",next:"@nestedVariable"}],[/@variables/,"type.identifier"],[/[^\\$\[\]']+/,"string"],[/@escapes/,"string.escape"],[/'/,{token:"string.quote",bracket:"@close",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,"white"],[/#.*\\$/,{token:"comment",next:"@newlineComment"}],[/#.*(?!\\)$/,"comment"]],newlineComment:[[/.*\\$/,"comment"],[/.*(?!\\)$/,{token:"comment",next:"@pop"}]],nestedVariable:[[/[^\{\}\$]+/,"type.identifier"],[/\}/,{token:"identifier",next:"@pop"}]],nestedCall:[[/\[/,{token:"@brackets",next:"@nestedCall"}],[/\]/,{token:"@brackets",next:"@pop"}],{include:"root"}],specialFunc:[[/"/,{token:"string",next:"@dstring"}],[/'/,{token:"string",next:"@sstring"}],[/\S+/,{token:"type",next:"@pop"}]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);