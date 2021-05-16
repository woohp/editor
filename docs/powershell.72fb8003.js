!function(e,n,t,r,o){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof s.parcelRequire1b1f&&s.parcelRequire1b1f,a=i.cache||{},l="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function c(n,t){if(!a[n]){if(!e[n]){var r="function"==typeof s.parcelRequire1b1f&&s.parcelRequire1b1f;if(!t&&r)return r(n,!0);if(i)return i(n,!0);if(l&&"string"==typeof n)return l(n);var o=new Error("Cannot find module '"+n+"'");throw o.code="MODULE_NOT_FOUND",o}f.resolve=function(t){return e[n][1][t]||t},f.cache={};var p=a[n]=new c.Module(n);e[n][0].call(p.exports,f,p,p.exports,this)}return a[n].exports;function f(e){return c(f.resolve(e))}}c.isParcelRequire=!0,c.Module=function(e){this.id=e,this.bundle=c,this.exports={}},c.modules=e,c.cache=a,c.parent=i,c.register=function(n,t){e[n]=[function(e,n){n.exports=t},{}]},Object.defineProperty(c,"root",{get:function(){return s.parcelRequire1b1f}}),s.parcelRequire1b1f=c;for(var p=0;p<n.length;p++)c(n[p])}({"3Z7nq":[function(e,n,t){var r=e("@parcel/transformer-js/src/esmodule-helpers.js");r.defineInteropFlag(t),r.export(t,"conf",(()=>o)),r.export(t,"language",(()=>s));var o={wordPattern:/(-?\d*\.\d\w*)|([^\`\~\!\@\#%\^\&\*\(\)\=\+\[\{\]\}\\\|\;\:\'\"\,\.\<\>\/\?\s]+)/g,comments:{lineComment:"#",blockComment:["<#","#>"]},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"',notIn:["string"]},{open:"'",close:"'",notIn:["string","comment"]}],surroundingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'},{open:"'",close:"'"}],folding:{markers:{start:new RegExp("^\\s*#region\\b"),end:new RegExp("^\\s*#endregion\\b")}}},s={defaultToken:"",ignoreCase:!0,tokenPostfix:".ps1",brackets:[{token:"delimiter.curly",open:"{",close:"}"},{token:"delimiter.square",open:"[",close:"]"},{token:"delimiter.parenthesis",open:"(",close:")"}],keywords:["begin","break","catch","class","continue","data","define","do","dynamicparam","else","elseif","end","exit","filter","finally","for","foreach","from","function","if","in","param","process","return","switch","throw","trap","try","until","using","var","while","workflow","parallel","sequence","inlinescript","configuration"],helpKeywords:/SYNOPSIS|DESCRIPTION|PARAMETER|EXAMPLE|INPUTS|OUTPUTS|NOTES|LINK|COMPONENT|ROLE|FUNCTIONALITY|FORWARDHELPTARGETNAME|FORWARDHELPCATEGORY|REMOTEHELPRUNSPACE|EXTERNALHELP/,symbols:/[=><!~?&%|+\-*\/\^;\.,]+/,escapes:/`(?:[abfnrtv\\"'$]|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/[a-zA-Z_][\w-]*/,{cases:{"@keywords":{token:"keyword.$0"},"@default":""}}],[/[ \t\r\n]+/,""],[/^:\w*/,"metatag"],[/\$(\{((global|local|private|script|using):)?[\w]+\}|((global|local|private|script|using):)?[\w]+)/,"variable"],[/<#/,"comment","@comment"],[/#.*$/,"comment"],[/[{}()\[\]]/,"@brackets"],[/@symbols/,"delimiter"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/,"number.hex"],[/\d+?/,"number"],[/[;,.]/,"delimiter"],[/\@"/,"string",'@herestring."'],[/\@'/,"string","@herestring.'"],[/"/,{cases:{"@eos":"string","@default":{token:"string",next:'@string."'}}}],[/'/,{cases:{"@eos":"string","@default":{token:"string",next:"@string.'"}}}]],string:[[/[^"'\$`]+/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}],[/@escapes/,{cases:{"@eos":{token:"string.escape",next:"@popall"},"@default":"string.escape"}}],[/`./,{cases:{"@eos":{token:"string.escape.invalid",next:"@popall"},"@default":"string.escape.invalid"}}],[/\$[\w]+$/,{cases:{'$S2=="':{token:"variable",next:"@popall"},"@default":{token:"string",next:"@popall"}}}],[/\$[\w]+/,{cases:{'$S2=="':"variable","@default":"string"}}],[/["']/,{cases:{"$#==$S2":{token:"string",next:"@pop"},"@default":{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}}}]],herestring:[[/^\s*(["'])@/,{cases:{"$1==$S2":{token:"string",next:"@pop"},"@default":"string"}}],[/[^\$`]+/,"string"],[/@escapes/,"string.escape"],[/`./,"string.escape.invalid"],[/\$[\w]+/,{cases:{'$S2=="':"variable","@default":"string"}}]],comment:[[/[^#\.]+/,"comment"],[/#>/,"comment","@pop"],[/(\.)(@helpKeywords)(?!\w)/,{token:"comment.keyword.$2"}],[/[\.#]/,"comment"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}]},[]);