!function(e,n,s,i,t){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},r="function"==typeof o.parcelRequire0da0&&o.parcelRequire0da0,l=r.cache||{},a="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function u(n,s){if(!l[n]){if(!e[n]){var i="function"==typeof o.parcelRequire0da0&&o.parcelRequire0da0;if(!s&&i)return i(n,!0);if(r)return r(n,!0);if(a&&"string"==typeof n)return a(n);var t=new Error("Cannot find module '"+n+"'");throw t.code="MODULE_NOT_FOUND",t}p.resolve=function(s){return e[n][1][s]||s},p.cache={};var c=l[n]=new u.Module(n);e[n][0].call(c.exports,p,c,c.exports,this)}return l[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=l,u.parent=r,u.register=function(n,s){e[n]=[function(e,n){n.exports=s},{}]},Object.defineProperty(u,"root",{get:function(){return o.parcelRequire0da0}}),o.parcelRequire0da0=u;for(var c=0;c<n.length;c++)u(n[c])}({BD3kG:[function(e,n,s){var i=e("@parcel/transformer-js/src/esmodule-helpers.js");i.defineInteropFlag(s),i.export(s,"conf",(()=>t)),i.export(s,"language",(()=>o));var t={brackets:[["{","}"],["[","]"],["(",")"]],autoClosingPairs:[{open:"{",close:"}"},{open:"[",close:"]"},{open:"(",close:")"},{open:"<",close:">",notIn:["string"]}],surroundingPairs:[{open:"(",close:")"},{open:"[",close:"]"},{open:"`",close:"`"}],folding:{markers:{start:new RegExp("^\\s*\x3c!--\\s*#?region\\b.*--\x3e"),end:new RegExp("^\\s*\x3c!--\\s*#?endregion\\b.*--\x3e")}}},o={defaultToken:"",tokenPostfix:".rst",control:/[\\`*_\[\]{}()#+\-\.!]/,escapes:/\\(?:@control)/,empty:["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param"],alphanumerics:/[A-Za-z0-9]/,simpleRefNameWithoutBq:/(?:@alphanumerics[-_+:.]*@alphanumerics)+|(?:@alphanumerics+)/,simpleRefName:/(?:`@phrase`|@simpleRefNameWithoutBq)/,phrase:/@simpleRefNameWithoutBq(?:\s@simpleRefNameWithoutBq)*/,citationName:/[A-Za-z][A-Za-z0-9-_.]*/,blockLiteralStart:/(?:[!"#$%&'()*+,-./:;<=>?@\[\]^_`{|}~]|[\s])/,precedingChars:/(?:[ -:/'"<([{])/,followingChars:/(?:[ -.,:;!?/'")\]}>]|$)/,punctuation:/(=|-|~|`|#|"|\^|\+|\*|:|\.|'|_|\+)/,tokenizer:{root:[[/^(@punctuation{3,}$){1,1}?/,"keyword"],[/^\s*([\*\-+‣•]|[a-zA-Z0-9]+\.|\([a-zA-Z0-9]+\)|[a-zA-Z0-9]+\))\s/,"keyword"],[/([ ]::)\s*$/,"keyword","@blankLineOfLiteralBlocks"],[/(::)\s*$/,"keyword","@blankLineOfLiteralBlocks"],{include:"@tables"},{include:"@explicitMarkupBlocks"},{include:"@inlineMarkup"}],explicitMarkupBlocks:[{include:"@citations"},{include:"@footnotes"},[/^(\.\.\s)(@simpleRefName)(::\s)(.*)$/,[{token:"",next:"subsequentLines"},"keyword","",""]],[/^(\.\.)(\s+)(_)(@simpleRefName)(:)(\s+)(.*)/,[{token:"",next:"hyperlinks"},"","","string.link","","","string.link"]],[/^((?:(?:\.\.)(?:\s+))?)(__)(:)(\s+)(.*)/,[{token:"",next:"subsequentLines"},"","","","string.link"]],[/^(__\s+)(.+)/,["","string.link"]],[/^(\.\.)( \|)([^| ]+[^|]*[^| ]*)(\| )(@simpleRefName)(:: .*)/,[{token:"",next:"subsequentLines"},"","string.link","","keyword",""],"@rawBlocks"],[/(\|)([^| ]+[^|]*[^| ]*)(\|_{0,2})/,["","string.link",""]],[/^(\.\.)([ ].*)$/,[{token:"",next:"@comments"},"comment"]]],inlineMarkup:[{include:"@citationsReference"},{include:"@footnotesReference"},[/(@simpleRefName)(_{1,2})/,["string.link",""]],[/(`)([^<`]+\s+)(<)(.*)(>)(`)(_)/,["","string.link","","string.link","","",""]],[/\*\*([^\\*]|\*(?!\*))+\*\*/,"strong"],[/\*[^*]+\*/,"emphasis"],[/(``)((?:[^`]|\`(?!`))+)(``)/,["","keyword",""]],[/(__\s+)(.+)/,["","keyword"]],[/(:)((?:@simpleRefNameWithoutBq)?)(:`)([^`]+)(`)/,["","keyword","","",""]],[/(`)([^`]+)(`:)((?:@simpleRefNameWithoutBq)?)(:)/,["","","","keyword",""]],[/(`)([^`]+)(`)/,""],[/(_`)(@phrase)(`)/,["","string.link",""]]],citations:[[/^(\.\.\s+\[)((?:@citationName))(\]\s+)(.*)/,[{token:"",next:"@subsequentLines"},"string.link","",""]]],citationsReference:[[/(\[)(@citationName)(\]_)/,["","string.link",""]]],footnotes:[[/^(\.\.\s+\[)((?:[0-9]+))(\]\s+.*)/,[{token:"",next:"@subsequentLines"},"string.link",""]],[/^(\.\.\s+\[)((?:#@simpleRefName?))(\]\s+)(.*)/,[{token:"",next:"@subsequentLines"},"string.link","",""]],[/^(\.\.\s+\[)((?:\*))(\]\s+)(.*)/,[{token:"",next:"@subsequentLines"},"string.link","",""]]],footnotesReference:[[/(\[)([0-9]+)(\])(_)/,["","string.link","",""]],[/(\[)(#@simpleRefName?)(\])(_)/,["","string.link","",""]],[/(\[)(\*)(\])(_)/,["","string.link","",""]]],blankLineOfLiteralBlocks:[[/^$/,"","@subsequentLinesOfLiteralBlocks"],[/^.*$/,"","@pop"]],subsequentLinesOfLiteralBlocks:[[/(@blockLiteralStart+)(.*)/,["keyword",""]],[/^(?!blockLiteralStart)/,"","@popall"]],subsequentLines:[[/^[\s]+.*/,""],[/^(?!\s)/,"","@pop"]],hyperlinks:[[/^[\s]+.*/,"string.link"],[/^(?!\s)/,"","@pop"]],comments:[[/^[\s]+.*/,"comment"],[/^(?!\s)/,"","@pop"]],tables:[[/\+-[+-]+/,"keyword"],[/\+=[+=]+/,"keyword"]]}}},{"@parcel/transformer-js/src/esmodule-helpers.js":"40cUL"}]},[]);