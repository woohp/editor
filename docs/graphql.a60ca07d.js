!function(e,n,o,t,r){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f,a=s.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(n,o){if(!a[n]){if(!e[n]){var t="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f;if(!o&&t)return t(n,!0);if(s)return s(n,!0);if(l&&"string"==typeof n)return l(n);var r=new Error("Cannot find module '"+n+"'");throw r.code="MODULE_NOT_FOUND",r}d.resolve=function(o){return e[n][1][o]||o},d.cache={};var u=a[n]=new c.Module(n);e[n][0].call(u.exports,d,u,u.exports,this)}return a[n].exports;function d(e){return c(d.resolve(e))}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=a,c.parent=s,c.register=function(n,o){e[n]=[function(e,n){n.exports=o},{}]},Object.defineProperty(c,"root",{get:function(){return i.parcelRequire1b1f}}),i.parcelRequire1b1f=c;for(var u=0;u<n.length;u++)c(n[u])}({"5Ho0I":[function(e,n,o){var t=e("@parcel/transformer-js/src/esmodule-helpers.js");t.defineInteropFlag(o),t.export(o,"conf",(()=>r)),t.export(o,"language",(()=>i));var r={comments:{lineComment:"#"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"""',close:'"""',notIn:["string","comment"]},{open:'"',close:'"',notIn:["string","comment"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"""',close:'"""'},{open:'"',close:'"'}],folding:{offSide:!0}},i={defaultToken:"invalid",tokenPostfix:".gql",keywords:["null","true","false","query","mutation","subscription","extend","schema","directive","scalar","type","interface","union","enum","input","implements","fragment","on"],typeKeywords:["Int","Float","String","Boolean","ID"],directiveLocations:["SCHEMA","SCALAR","OBJECT","FIELD_DEFINITION","ARGUMENT_DEFINITION","INTERFACE","UNION","ENUM","ENUM_VALUE","INPUT_OBJECT","INPUT_FIELD_DEFINITION","QUERY","MUTATION","SUBSCRIPTION","FIELD","FRAGMENT_DEFINITION","FRAGMENT_SPREAD","INLINE_FRAGMENT","VARIABLE_DEFINITION"],operators:["=","!","?",":","&","|"],symbols:/[=!?:&|]+/,escapes:/\\(?:["\\\/bfnrt]|u[0-9A-Fa-f]{4})/,tokenizer:{root:[[/[a-z_][\w$]*/,{cases:{"@keywords":"keyword","@default":"key.identifier"}}],[/[$][\w$]*/,{cases:{"@keywords":"keyword","@default":"argument.identifier"}}],[/[A-Z][\w\$]*/,{cases:{"@typeKeywords":"keyword","@default":"type.identifier"}}],{include:"@whitespace"},[/[{}()\[\]]/,"@brackets"],[/@symbols/,{cases:{"@operators":"operator","@default":""}}],[/@\s*[a-zA-Z_\$][\w\$]*/,{token:"annotation",log:"annotation token: $0"}],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/0[xX][0-9a-fA-F]+/,"number.hex"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/"""/,{token:"string",next:"@mlstring",nextEmbedded:"markdown"}],[/"([^"\\]|\\.)*$/,"string.invalid"],[/"/,{token:"string.quote",bracket:"@open",next:"@string"}]],mlstring:[[/[^"]+/,"string"],['"""',{token:"string",next:"@pop",nextEmbedded:"@pop"}]],string:[[/[^\\"]+/,"string"],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/"/,{token:"string.quote",bracket:"@close",next:"@pop"}]],whitespace:[[/[ \t\r\n]+/,""],[/#.*$/,"comment"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}]},[]);