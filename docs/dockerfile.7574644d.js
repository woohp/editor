!function(e,o,n,r,t){var l="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof l.parcelRequire0da0&&l.parcelRequire0da0,i=s.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function p(o,n){if(!i[o]){if(!e[o]){var r="function"==typeof l.parcelRequire0da0&&l.parcelRequire0da0;if(!n&&r)return r(o,!0);if(s)return s(o,!0);if(a&&"string"==typeof o)return a(o);var t=new Error("Cannot find module '"+o+"'");throw t.code="MODULE_NOT_FOUND",t}u.resolve=function(n){return e[o][1][n]||n},u.cache={};var c=i[o]=new p.Module(o);e[o][0].call(c.exports,u,c,c.exports,this)}return i[o].exports;function u(e){return p(u.resolve(e))}}p.isParcelRequire=!0,p.Module=function(e){this.id=e,this.bundle=p,this.exports={}},p.modules=e,p.cache=i,p.parent=s,p.register=function(o,n){e[o]=[function(e,o){o.exports=n},{}]},Object.defineProperty(p,"root",{get:function(){return l.parcelRequire0da0}}),l.parcelRequire0da0=p;for(var c=0;c<o.length;c++)p(o[c])}({lih32:[function(e,o,n){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(n),r.export(n,"conf",(()=>t)),r.export(n,"language",(()=>l));var t={brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}]},l={defaultToken:"",tokenPostfix:".dockerfile",variable:/\${?[\w]+}?/,tokenizer:{root:[{include:"@whitespace"},{include:"@comment"},[/(ONBUILD)(\s+)/,["keyword",""]],[/(ENV)(\s+)([\w]+)/,["keyword","",{token:"variable",next:"@arguments"}]],[/(FROM|MAINTAINER|RUN|EXPOSE|ENV|ADD|ARG|VOLUME|LABEL|USER|WORKDIR|COPY|CMD|STOPSIGNAL|SHELL|HEALTHCHECK|ENTRYPOINT)/,{token:"keyword",next:"@arguments"}]],arguments:[{include:"@whitespace"},{include:"@strings"},[/(@variable)/,{cases:{"@eos":{token:"variable",next:"@popall"},"@default":"variable"}}],[/\\/,{cases:{"@eos":"","@default":""}}],[/./,{cases:{"@eos":{token:"",next:"@popall"},"@default":""}}]],whitespace:[[/\s+/,{cases:{"@eos":{token:"",next:"@popall"},"@default":""}}]],comment:[[/(^#.*$)/,"comment","@popall"]],strings:[[/\\'$/,"","@popall"],[/\\'/,""],[/'$/,"string","@popall"],[/'/,"string","@stringBody"],[/"$/,"string","@popall"],[/"/,"string","@dblStringBody"]],stringBody:[[/[^\\\$']/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}],[/\\./,"string.escape"],[/'$/,"string","@popall"],[/'/,"string","@pop"],[/(@variable)/,"variable"],[/\\$/,"string"],[/$/,"string","@popall"]],dblStringBody:[[/[^\\\$"]/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}],[/\\./,"string.escape"],[/"$/,"string","@popall"],[/"/,"string","@pop"],[/(@variable)/,"variable"],[/\\$/,"string"],[/$/,"string","@popall"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);