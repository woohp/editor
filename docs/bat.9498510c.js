!function(e,r,o,n,t){var s="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},i="function"==typeof s.parcelRequire1b1f&&s.parcelRequire1b1f,l=i.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function f(r,o){if(!l[r]){if(!e[r]){var n="function"==typeof s.parcelRequire1b1f&&s.parcelRequire1b1f;if(!o&&n)return n(r,!0);if(i)return i(r,!0);if(a&&"string"==typeof r)return a(r);var t=new Error("Cannot find module '"+r+"'");throw t.code="MODULE_NOT_FOUND",t}d.resolve=function(o){return e[r][1][o]||o},d.cache={};var c=l[r]=new f.Module(r);e[r][0].call(c.exports,d,c,c.exports,this)}return l[r].exports;function d(e){return f(d.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=l,f.parent=i,f.register=function(r,o){e[r]=[function(e,r){r.exports=o},{}]},Object.defineProperty(f,"root",{get:function(){return s.parcelRequire1b1f}}),s.parcelRequire1b1f=f;for(var c=0;c<r.length;c++)f(r[c])}({mRw4A:[function(e,r,o){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(o),n.export(o,"conf",(()=>t)),n.export(o,"language",(()=>s));var t={comments:{lineComment:"REM"},brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],surroundingPairs:[{open:"[",close:"]"},{open:"(",close:")"},{open:'"',close:'"'}],folding:{markers:{start:new RegExp("^\\s*(::\\s*|REM\\s+)#region"),end:new RegExp("^\\s*(::\\s*|REM\\s+)#endregion")}}},s={defaultToken:"",ignoreCase:!0,tokenPostfix:".bat",brackets:[{token:"delimiter.bracket",open:"{",close:"}"},{token:"delimiter.parenthesis",open:"(",close:")"},{token:"delimiter.square",open:"[",close:"]"}],keywords:/call|defined|echo|errorlevel|exist|for|goto|if|pause|set|shift|start|title|not|pushd|popd/,symbols:/[=><!~?&|+\-*\/\^;\.,]+/,escapes:/\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,tokenizer:{root:[[/^(\s*)(rem(?:\s.*|))$/,["","comment"]],[/(\@?)(@keywords)(?!\w)/,[{token:"keyword"},{token:"keyword.$2"}]],[/[ \t\r\n]+/,""],[/setlocal(?!\w)/,"keyword.tag-setlocal"],[/endlocal(?!\w)/,"keyword.tag-setlocal"],[/[a-zA-Z_]\w*/,""],[/:\w*/,"metatag"],[/%[^%]+%/,"variable"],[/%%[\w]+(?!\w)/,"variable"],[/[{}()\[\]]/,"@brackets"],[/@symbols/,"delimiter"],[/\d*\.\d+([eE][\-+]?\d+)?/,"number.float"],[/0[xX][0-9a-fA-F_]*[0-9a-fA-F]/,"number.hex"],[/\d+/,"number"],[/[;,.]/,"delimiter"],[/"/,"string",'@string."'],[/'/,"string","@string.'"]],string:[[/[^\\"'%]+/,{cases:{"@eos":{token:"string",next:"@popall"},"@default":"string"}}],[/@escapes/,"string.escape"],[/\\./,"string.escape.invalid"],[/%[\w ]+%/,"variable"],[/%%[\w]+(?!\w)/,"variable"],[/["']/,{cases:{"$#==$S2":{token:"string",next:"@pop"},"@default":"string"}}],[/$/,"string","@popall"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}]},[]);