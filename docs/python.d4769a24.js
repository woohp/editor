!function(e,n,r,t,o){var i="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f,l=s.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(n,r){if(!l[n]){if(!e[n]){var t="function"==typeof i.parcelRequire1b1f&&i.parcelRequire1b1f;if(!r&&t)return t(n,!0);if(s)return s(n,!0);if(a&&"string"==typeof n)return a(n);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}d.resolve=function(r){return e[n][1][r]||r},d.cache={};var p=l[n]=new c.Module(n);e[n][0].call(p.exports,d,p,p.exports,this)}return l[n].exports;function d(e){return c(d.resolve(e))}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=l,c.parent=s,c.register=function(n,r){e[n]=[function(e,n){n.exports=r},{}]},Object.defineProperty(c,"root",{get:function(){return i.parcelRequire1b1f}}),i.parcelRequire1b1f=c;for(var p=0;p<n.length;p++)c(n[p])}({"16y9Z":[function(e,n,r){var t=e("@parcel/transformer-js/lib/esmodule-helpers.js");t.defineInteropFlag(r),t.export(r,"conf",(function(){return i})),t.export(r,"language",(function(){return s}));var o=e("../fillers/monaco-editor-core.js"),i={comments:{lineComment:"#",blockComment:["'''","'''"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string","comment"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],onEnterRules:[{beforeText:new RegExp("^\\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\\s*$"),action:{indentAction:o.languages.IndentAction.Indent}}],folding:{offSide:!0,markers:{start:new RegExp("^\\s*#region\\b"),end:new RegExp("^\\s*#endregion\\b")}}},s={defaultToken:"",tokenPostfix:".python",keywords:["False","None","True","and","as","assert","async","await","break","class","continue","def","del","elif","else","except","exec","finally","for","from","global","if","import","in","is","lambda","nonlocal","not","or","pass","print","raise","return","try","while","with","yield","int","float","long","complex","hex","abs","all","any","apply","basestring","bin","bool","buffer","bytearray","callable","chr","classmethod","cmp","coerce","compile","complex","delattr","dict","dir","divmod","enumerate","eval","execfile","file","filter","format","frozenset","getattr","globals","hasattr","hash","help","id","input","intern","isinstance","issubclass","iter","len","locals","list","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","reversed","range","raw_input","reduce","reload","repr","reversed","round","self","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","unichr","unicode","vars","xrange","zip","__dict__","__methods__","__members__","__class__","__bases__","__name__","__mro__","__subclasses__","__init__","__import__"],brackets:[{open:"{",close:"}",token:"delimiter.curly"},{open:"[",close:"]",token:"delimiter.bracket"},{open:"(",close:")",token:"delimiter.parenthesis"}],tokenizer:{root:[{include:"@whitespace"},{include:"@numbers"},{include:"@strings"},[/[,:;]/,"delimiter"],[/[{}\[\]()]/,"@brackets"],[/@[a-zA-Z_]\w*/,"tag"],[/[a-zA-Z_]\w*/,{cases:{"@keywords":"keyword","@default":"identifier"}}]],whitespace:[[/\s+/,"white"],[/(^#.*$)/,"comment"],[/'''/,"string","@endDocString"],[/"""/,"string","@endDblDocString"]],endDocString:[[/[^']+/,"string"],[/\\'/,"string"],[/'''/,"string","@popall"],[/'/,"string"]],endDblDocString:[[/[^"]+/,"string"],[/\\"/,"string"],[/"""/,"string","@popall"],[/"/,"string"]],numbers:[[/-?0x([abcdef]|[ABCDEF]|\d)+[lL]?/,"number.hex"],[/-?(\d*\.)?\d+([eE][+\-]?\d+)?[jJ]?[lL]?/,"number"]],strings:[[/'$/,"string.escape","@popall"],[/'/,"string.escape","@stringBody"],[/"$/,"string.escape","@popall"],[/"/,"string.escape","@dblStringBody"]],stringBody:[[/[^\\']+$/,"string","@popall"],[/[^\\']+/,"string"],[/\\./,"string"],[/'/,"string.escape","@popall"],[/\\$/,"string"]],dblStringBody:[[/[^\\"]+$/,"string","@popall"],[/[^\\"]+/,"string"],[/\\./,"string"],[/"/,"string.escape","@popall"],[/\\$/,"string"]]}}},{"../fillers/monaco-editor-core.js":"482pi","@parcel/transformer-js/lib/esmodule-helpers.js":"h5JDU"}]},[]);
//# sourceMappingURL=python.d4769a24.js.map