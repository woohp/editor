!function(e,o,n,r,t){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f,l=s.cache||{},c="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function a(o,n){if(!l[o]){if(!e[o]){var r="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f;if(!n&&r)return r(o,!0);if(s)return s(o,!0);if(c&&"string"==typeof o)return c(o);var t=new Error("Cannot find module '"+o+"'");throw t.code="MODULE_NOT_FOUND",t}d.resolve=function(n){return e[o][1][n]||n},d.cache={};var u=l[o]=new a.Module(o);e[o][0].call(u.exports,d,u,u.exports,this)}return l[o].exports;function d(e){return a(d.resolve(e))}}a.isParcelRequire=!0,a.Module=function(e){this.id=e,this.bundle=a,this.exports={}},a.modules=e,a.cache=l,a.parent=s,a.register=function(o,n){e[o]=[function(e,o){o.exports=n},{}]},Object.defineProperty(a,"root",{get:function(){return i.parcelRequire1b1f}}),i.parcelRequire1b1f=a;for(var u=0;u<o.length;u++)a(o[u])}({"6XSXi":[function(e,o,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"conf",(()=>t)),r.export(n,"language",(()=>i));var t={comments:{lineComment:"//",blockComment:["(*","*)"]},brackets:[["{","}"],["[","]"],["(",")"],["<",">"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">"},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">"},{open:"'",close:"'"}]},i={defaultToken:"",tokenPostfix:".pascaligo",ignoreCase:!0,brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.square"},{open:"(",close:")",token:"delimiter.parenthesis"},{open:"<",close:">",token:"delimiter.angle"}],keywords:["begin","block","case","const","else","end","fail","for","from","function","if","is","nil","of","remove","return","skip","then","type","var","while","with","option","None","transaction"],typeKeywords:["bool","int","list","map","nat","record","string","unit","address","map","mtz","xtz"],operators:["=",">","<","<=",">=","<>",":",":=","and","mod","or","+","-","*","/","@","&","^","%"],symbols:/[=><:@\^&|+\-*\/\^%]+/,tokenizer:{root:[[/[a-zA-Z_][\w]*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":"identifier"}}],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/[<>](?!@symbols)/,"@brackets"],[/@symbols/,{cases:{"@operators":"delimiter","@default":""}}],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/\$[0-9a-fA-F]{1,16}/,"number.hex"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/'([^'\\]|\\.)*$/,"string.invalid"],[/'/,"string","@string"],[/'[^\\']'/,"string"],[/'/,"string.invalid"],[/\#\d+/,"string"]],comment:[[/[^\(\*]+/,"comment"],[/\*\)/,"comment","@pop"],[/\(\*/,"comment"]],string:[[/[^\\']+/,"string"],[/\\./,"string.escape.invalid"],[/'/,{token:"string.quote",bracket:"@close",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,"white"],[/\(\*/,"comment","@comment"],[/\/\/.*$/,"comment"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}]},[]);