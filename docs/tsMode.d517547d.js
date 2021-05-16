!function(e,t,r,n,i){var o="undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:"undefined"!=typeof window?window:"undefined"!=typeof global?global:{},s="function"==typeof o.parcelRequire1b1f&&o.parcelRequire1b1f,a=s.cache||{},u="undefined"!=typeof module&&"function"==typeof module.require&&module.require.bind(module);function l(t,r){if(!a[t]){if(!e[t]){var n="function"==typeof o.parcelRequire1b1f&&o.parcelRequire1b1f;if(!r&&n)return n(t,!0);if(s)return s(t,!0);if(u&&"string"==typeof t)return u(t);var i=new Error("Cannot find module '"+t+"'");throw i.code="MODULE_NOT_FOUND",i}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var c=a[t]=new l.Module(t);e[t][0].call(c.exports,p,c,c.exports,this)}return a[t].exports;function p(e){return l(p.resolve(e))}}l.isParcelRequire=!0,l.Module=function(e){this.id=e,this.bundle=l,this.exports={}},l.modules=e,l.cache=a,l.parent=s,l.register=function(t,r){e[t]=[function(e,t){t.exports=r},{}]},Object.defineProperty(l,"root",{get:function(){return o.parcelRequire1b1f}}),o.parcelRequire1b1f=l;for(var c=0;c<t.length;c++)l(t[c])}({"4xvxh":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"setupTypeScript",(()=>l)),n.export(r,"setupJavaScript",(()=>c)),n.export(r,"getJavaScriptWorker",(()=>p)),n.export(r,"getTypeScriptWorker",(()=>d));var i,o,s=e("./workerManager.js"),a=e("./languageFeatures.js"),u=e("./fillers/monaco-editor-core.js");function l(e){o=f(e,"typescript")}function c(e){i=f(e,"javascript")}function p(){return new Promise((function(e,t){if(!i)return t("JavaScript not registered!");e(i)}))}function d(){return new Promise((function(e,t){if(!o)return t("TypeScript not registered!");e(o)}))}function f(e,t){var r=new s.WorkerManager(t,e),n=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];return r.getLanguageServiceWorker.apply(r,e)},i=new a.LibFiles(n);return u.languages.registerCompletionItemProvider(t,new a.SuggestAdapter(n)),u.languages.registerSignatureHelpProvider(t,new a.SignatureHelpAdapter(n)),u.languages.registerHoverProvider(t,new a.QuickInfoAdapter(n)),u.languages.registerDocumentHighlightProvider(t,new a.OccurrencesAdapter(n)),u.languages.registerDefinitionProvider(t,new a.DefinitionAdapter(i,n)),u.languages.registerReferenceProvider(t,new a.ReferenceAdapter(i,n)),u.languages.registerDocumentSymbolProvider(t,new a.OutlineAdapter(n)),u.languages.registerDocumentRangeFormattingEditProvider(t,new a.FormatAdapter(n)),u.languages.registerOnTypeFormattingEditProvider(t,new a.FormatOnTypeAdapter(n)),u.languages.registerCodeActionProvider(t,new a.CodeActionAdaptor(n)),u.languages.registerRenameProvider(t,new a.RenameAdapter(n)),new a.DiagnosticsAdapter(i,e,t,n),n}},{"./workerManager.js":"1Dmf1","./languageFeatures.js":"2my5F","./fillers/monaco-editor-core.js":"6zCUk","@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}],"1Dmf1":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"WorkerManager",(()=>a));var i=e("./fillers/monaco-editor-core.js"),o=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{u(n.next(e))}catch(e){o(e)}}function a(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}u((n=n.apply(e,t||[])).next())}))},s=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o},a=function(){function e(e,t){var r=this;this._modeId=e,this._defaults=t,this._worker=null,this._client=null,this._configChangeListener=this._defaults.onDidChange((function(){return r._stopWorker()})),this._updateExtraLibsToken=0,this._extraLibsChangeListener=this._defaults.onDidExtraLibsChange((function(){return r._updateExtraLibs()}))}return e.prototype._stopWorker=function(){this._worker&&(this._worker.dispose(),this._worker=null),this._client=null},e.prototype.dispose=function(){this._configChangeListener.dispose(),this._extraLibsChangeListener.dispose(),this._stopWorker()},e.prototype._updateExtraLibs=function(){return o(this,void 0,void 0,(function(){var e,t;return s(this,(function(r){switch(r.label){case 0:return this._worker?(e=++this._updateExtraLibsToken,[4,this._worker.getProxy()]):[2];case 1:return t=r.sent(),this._updateExtraLibsToken!==e?[2]:(t.updateExtraLibs(this._defaults.getExtraLibs()),[2])}}))}))},e.prototype._getClient=function(){var e=this;if(!this._client){this._worker=i.editor.createWebWorker({moduleId:"vs/language/typescript/tsWorker",label:this._modeId,keepIdleModels:!0,createData:{compilerOptions:this._defaults.getCompilerOptions(),extraLibs:this._defaults.getExtraLibs(),customWorkerPath:this._defaults.workerOptions.customWorkerPath}});var t=this._worker.getProxy();this._defaults.getEagerModelSync()&&(t=t.then((function(t){return e._worker?e._worker.withSyncedResources(i.editor.getModels().filter((function(t){return t.getModeId()===e._modeId})).map((function(e){return e.uri}))):t}))),this._client=t}return this._client},e.prototype.getLanguageServiceWorker=function(){for(var e,t=this,r=[],n=0;n<arguments.length;n++)r[n]=arguments[n];return this._getClient().then((function(t){e=t})).then((function(e){if(t._worker)return t._worker.withSyncedResources(r)})).then((function(t){return e}))},e}()},{"./fillers/monaco-editor-core.js":"6zCUk","@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}],"2my5F":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"flattenDiagnosticMessageText",(()=>d)),n.export(r,"Adapter",(()=>m)),n.export(r,"LibFiles",(()=>b)),n.export(r,"DiagnosticsAdapter",(()=>v)),n.export(r,"SuggestAdapter",(()=>y)),n.export(r,"SignatureHelpAdapter",(()=>w)),n.export(r,"QuickInfoAdapter",(()=>S)),n.export(r,"OccurrencesAdapter",(()=>x)),n.export(r,"DefinitionAdapter",(()=>k)),n.export(r,"ReferenceAdapter",(()=>C)),n.export(r,"OutlineAdapter",(()=>F)),n.export(r,"Kind",(()=>A)),n.export(r,"FormatHelper",(()=>I)),n.export(r,"FormatAdapter",(()=>T)),n.export(r,"FormatOnTypeAdapter",(()=>P)),n.export(r,"CodeActionAdaptor",(()=>O)),n.export(r,"RenameAdapter",(()=>L));var i,o,s,a=e("./lib/lib.index.js"),u=e("./fillers/monaco-editor-core.js"),l=(i=function(e,t){return(i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function r(){this.constructor=e}i(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),c=function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function s(e){try{u(n.next(e))}catch(e){o(e)}}function a(e){try{u(n.throw(e))}catch(e){o(e)}}function u(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(s,a)}u((n=n.apply(e,t||[])).next())}))},p=function(e,t){var r,n,i,o,s={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};function a(o){return function(a){return function(o){if(r)throw new TypeError("Generator is already executing.");for(;s;)try{if(r=1,n&&(i=2&o[0]?n.return:o[0]?n.throw||((i=n.return)&&i.call(n),0):n.next)&&!(i=i.call(n,o[1])).done)return i;switch(n=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return s.label++,{value:o[1],done:!1};case 5:s.label++,n=o[1],o=[0];continue;case 7:o=s.ops.pop(),s.trys.pop();continue;default:if(!(i=s.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){s=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){s.label=o[1];break}if(6===o[0]&&s.label<i[1]){s.label=i[1],i=o;break}if(i&&s.label<i[2]){s.label=i[2],s.ops.push(o);break}i[2]&&s.ops.pop(),s.trys.pop();continue}o=t.call(e,s)}catch(e){o=[6,e],n=0}finally{r=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,a])}}return o={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o};function d(e,t,r){if(void 0===r&&(r=0),"string"==typeof e)return e;if(void 0===e)return"";var n="";if(r){n+=t;for(var i=0;i<r;i++)n+="  "}if(n+=e.messageText,r++,e.next)for(var o=0,s=e.next;o<s.length;o++){n+=d(s[o],t,r)}return n}function f(e){return e?e.map((function(e){return e.text})).join(""):""}(s=o||(o={}))[s.None=0]="None",s[s.Block=1]="Block",s[s.Smart=2]="Smart";var g,h,m=function(){function e(e){this._worker=e}return e.prototype._textSpanToRange=function(e,t){var r=e.getPositionAt(t.start),n=e.getPositionAt(t.start+t.length);return{startLineNumber:r.lineNumber,startColumn:r.column,endLineNumber:n.lineNumber,endColumn:n.column}},e}(),b=function(){function e(e){this._worker=e,this._libFiles={},this._hasFetchedLibFiles=!1,this._fetchLibFilesPromise=null}return e.prototype.isLibFile=function(e){return!!e&&(0===e.path.indexOf("/lib.")&&!!a.libFileSet[e.path.slice(1)])},e.prototype.getOrCreateModel=function(e){var t=u.editor.getModel(e);return t||(this.isLibFile(e)&&this._hasFetchedLibFiles?u.editor.createModel(this._libFiles[e.path.slice(1)],"typescript",e):null)},e.prototype._containsLibFile=function(e){for(var t=0,r=e;t<r.length;t++){var n=r[t];if(this.isLibFile(n))return!0}return!1},e.prototype.fetchLibFilesIfNecessary=function(e){return c(this,void 0,void 0,(function(){return p(this,(function(t){switch(t.label){case 0:return this._containsLibFile(e)?[4,this._fetchLibFiles()]:[2];case 1:return t.sent(),[2]}}))}))},e.prototype._fetchLibFiles=function(){var e=this;return this._fetchLibFilesPromise||(this._fetchLibFilesPromise=this._worker().then((function(e){return e.getLibFiles()})).then((function(t){e._hasFetchedLibFiles=!0,e._libFiles=t}))),this._fetchLibFilesPromise},e}();(h=g||(g={}))[h.Warning=0]="Warning",h[h.Error=1]="Error",h[h.Suggestion=2]="Suggestion",h[h.Message=3]="Message";var v=function(e){function t(t,r,n,i){var o=e.call(this,i)||this;o._libFiles=t,o._defaults=r,o._selector=n,o._disposables=[],o._listener=Object.create(null);var s=function(e){if(e.getModeId()===n){var t,r=e.onDidChangeContent((function(){clearTimeout(t),t=setTimeout((function(){return o._doValidate(e)}),500)}));o._listener[e.uri.toString()]={dispose:function(){r.dispose(),clearTimeout(t)}},o._doValidate(e)}},a=function(e){u.editor.setModelMarkers(e,o._selector,[]);var t=e.uri.toString();o._listener[t]&&(o._listener[t].dispose(),delete o._listener[t])};o._disposables.push(u.editor.onDidCreateModel(s)),o._disposables.push(u.editor.onWillDisposeModel(a)),o._disposables.push(u.editor.onDidChangeModelLanguage((function(e){a(e.model),s(e.model)}))),o._disposables.push({dispose:function(){for(var e=0,t=u.editor.getModels();e<t.length;e++){var r=t[e];a(r)}}});var l=function(){for(var e=0,t=u.editor.getModels();e<t.length;e++){var r=t[e];a(r),s(r)}};return o._disposables.push(o._defaults.onDidChange(l)),o._disposables.push(o._defaults.onDidExtraLibsChange(l)),u.editor.getModels().forEach(s),o}return l(t,e),t.prototype.dispose=function(){this._disposables.forEach((function(e){return e&&e.dispose()})),this._disposables=[]},t.prototype._doValidate=function(e){return c(this,void 0,void 0,(function(){var t,r,n,i,o,s,a,l,c,d=this;return p(this,(function(p){switch(p.label){case 0:return[4,this._worker(e.uri)];case 1:return t=p.sent(),e.isDisposed()?[2]:(r=[],n=this._defaults.getDiagnosticsOptions(),i=n.noSyntaxValidation,o=n.noSemanticValidation,s=n.noSuggestionDiagnostics,i||r.push(t.getSyntacticDiagnostics(e.uri.toString())),o||r.push(t.getSemanticDiagnostics(e.uri.toString())),s||r.push(t.getSuggestionDiagnostics(e.uri.toString())),[4,Promise.all(r)]);case 2:return!(a=p.sent())||e.isDisposed()?[2]:(l=a.reduce((function(e,t){return t.concat(e)}),[]).filter((function(e){return-1===(d._defaults.getDiagnosticsOptions().diagnosticCodesToIgnore||[]).indexOf(e.code)})),c=l.map((function(e){return e.relatedInformation||[]})).reduce((function(e,t){return t.concat(e)}),[]).map((function(e){return e.file?u.Uri.parse(e.file.fileName):null})),[4,this._libFiles.fetchLibFilesIfNecessary(c)]);case 3:return p.sent(),e.isDisposed()?[2]:(u.editor.setModelMarkers(e,this._selector,l.map((function(t){return d._convertDiagnostics(e,t)}))),[2])}}))}))},t.prototype._convertDiagnostics=function(e,t){var r=t.start||0,n=t.length||1,i=e.getPositionAt(r),o=i.lineNumber,s=i.column,a=e.getPositionAt(r+n),l=a.lineNumber,c=a.column,p=[];return t.reportsUnnecessary&&p.push(u.MarkerTag.Unnecessary),t.reportsDeprecated&&p.push(u.MarkerTag.Deprecated),{severity:this._tsDiagnosticCategoryToMarkerSeverity(t.category),startLineNumber:o,startColumn:s,endLineNumber:l,endColumn:c,message:d(t.messageText,"\n"),code:t.code.toString(),tags:p,relatedInformation:this._convertRelatedInformation(e,t.relatedInformation)}},t.prototype._convertRelatedInformation=function(e,t){var r=this;if(t){var n=[];return t.forEach((function(t){var i=e;if(t.file){var o=u.Uri.parse(t.file.fileName);i=r._libFiles.getOrCreateModel(o)}if(i){var s=t.start||0,a=t.length||1,l=i.getPositionAt(s),c=l.lineNumber,p=l.column,f=i.getPositionAt(s+a),g=f.lineNumber,h=f.column;n.push({resource:i.uri,startLineNumber:c,startColumn:p,endLineNumber:g,endColumn:h,message:d(t.messageText,"\n")})}})),n}},t.prototype._tsDiagnosticCategoryToMarkerSeverity=function(e){switch(e){case g.Error:return u.MarkerSeverity.Error;case g.Message:return u.MarkerSeverity.Info;case g.Warning:return u.MarkerSeverity.Warning;case g.Suggestion:return u.MarkerSeverity.Hint}return u.MarkerSeverity.Info},t}(m),y=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),Object.defineProperty(t.prototype,"triggerCharacters",{get:function(){return["."]},enumerable:!1,configurable:!0}),t.prototype.provideCompletionItems=function(e,r,n,i){return c(this,void 0,void 0,(function(){var n,i,o,s,a,l;return p(this,(function(c){switch(c.label){case 0:return n=e.getWordUntilPosition(r),i=new u.Range(r.lineNumber,n.startColumn,r.lineNumber,n.endColumn),o=e.uri,s=e.getOffsetAt(r),[4,this._worker(o)];case 1:return a=c.sent(),e.isDisposed()?[2]:[4,a.getCompletionsAtPosition(o.toString(),s)];case 2:return!(l=c.sent())||e.isDisposed()?[2]:[2,{suggestions:l.entries.map((function(n){var a,l=i;if(n.replacementSpan){var c=e.getPositionAt(n.replacementSpan.start),p=e.getPositionAt(n.replacementSpan.start+n.replacementSpan.length);l=new u.Range(c.lineNumber,c.column,p.lineNumber,p.column)}var d=[];return-1!==(null===(a=n.kindModifiers)||void 0===a?void 0:a.indexOf("deprecated"))&&d.push(u.languages.CompletionItemTag.Deprecated),{uri:o,position:r,offset:s,range:l,label:n.name,insertText:n.name,sortText:n.sortText,kind:t.convertKind(n.kind),tags:d}}))}]}}))}))},t.prototype.resolveCompletionItem=function(e,r){return c(this,void 0,void 0,(function(){var r,n,i,o,s;return p(this,(function(a){switch(a.label){case 0:return n=(r=e).uri,i=r.position,o=r.offset,[4,this._worker(n)];case 1:return[4,a.sent().getCompletionEntryDetails(n.toString(),o,r.label)];case 2:return(s=a.sent())?[2,{uri:n,position:i,label:s.name,kind:t.convertKind(s.kind),detail:f(s.displayParts),documentation:{value:t.createDocumentationString(s)}}]:[2,r]}}))}))},t.convertKind=function(e){switch(e){case A.primitiveType:case A.keyword:return u.languages.CompletionItemKind.Keyword;case A.variable:case A.localVariable:return u.languages.CompletionItemKind.Variable;case A.memberVariable:case A.memberGetAccessor:case A.memberSetAccessor:return u.languages.CompletionItemKind.Field;case A.function:case A.memberFunction:case A.constructSignature:case A.callSignature:case A.indexSignature:return u.languages.CompletionItemKind.Function;case A.enum:return u.languages.CompletionItemKind.Enum;case A.module:return u.languages.CompletionItemKind.Module;case A.class:return u.languages.CompletionItemKind.Class;case A.interface:return u.languages.CompletionItemKind.Interface;case A.warning:return u.languages.CompletionItemKind.File}return u.languages.CompletionItemKind.Property},t.createDocumentationString=function(e){var t=f(e.documentation);if(e.tags)for(var r=0,n=e.tags;r<n.length;r++){t+="\n\n"+_(n[r])}return t},t}(m);function _(e){var t="*@"+e.name+"*";if("param"===e.name&&e.text){var r=e.text.split(" "),n=r[0],i=r.slice(1);t+="`"+n+"`",i.length>0&&(t+=" — "+i.join(" "))}else e.text&&(t+=" — "+e.text);return t}var w=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this;return t.signatureHelpTriggerCharacters=["(",","],t}return l(t,e),t._toSignatureHelpTriggerReason=function(e){switch(e.triggerKind){case u.languages.SignatureHelpTriggerKind.TriggerCharacter:return e.triggerCharacter?e.isRetrigger?{kind:"retrigger",triggerCharacter:e.triggerCharacter}:{kind:"characterTyped",triggerCharacter:e.triggerCharacter}:{kind:"invoked"};case u.languages.SignatureHelpTriggerKind.ContentChange:return e.isRetrigger?{kind:"retrigger"}:{kind:"invoked"};case u.languages.SignatureHelpTriggerKind.Invoke:default:return{kind:"invoked"}}},t.prototype.provideSignatureHelp=function(e,r,n,i){return c(this,void 0,void 0,(function(){var n,o,s,a,u;return p(this,(function(l){switch(l.label){case 0:return n=e.uri,o=e.getOffsetAt(r),[4,this._worker(n)];case 1:return s=l.sent(),e.isDisposed()?[2]:[4,s.getSignatureHelpItems(n.toString(),o,{triggerReason:t._toSignatureHelpTriggerReason(i)})];case 2:return!(a=l.sent())||e.isDisposed()?[2]:(u={activeSignature:a.selectedItemIndex,activeParameter:a.argumentIndex,signatures:[]},a.items.forEach((function(e){var t={label:"",parameters:[]};t.documentation={value:f(e.documentation)},t.label+=f(e.prefixDisplayParts),e.parameters.forEach((function(r,n,i){var o=f(r.displayParts),s={label:o,documentation:{value:f(r.documentation)}};t.label+=o,t.parameters.push(s),n<i.length-1&&(t.label+=f(e.separatorDisplayParts))})),t.label+=f(e.suffixDisplayParts),u.signatures.push(t)})),[2,{value:u,dispose:function(){}}])}}))}))},t}(m),S=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideHover=function(e,t,r){return c(this,void 0,void 0,(function(){var r,n,i,o,s,a,u;return p(this,(function(l){switch(l.label){case 0:return r=e.uri,n=e.getOffsetAt(t),[4,this._worker(r)];case 1:return i=l.sent(),e.isDisposed()?[2]:[4,i.getQuickInfoAtPosition(r.toString(),n)];case 2:return!(o=l.sent())||e.isDisposed()?[2]:(s=f(o.documentation),a=o.tags?o.tags.map((function(e){return _(e)})).join("  \n\n"):"",u=f(o.displayParts),[2,{range:this._textSpanToRange(e,o.textSpan),contents:[{value:"```typescript\n"+u+"\n```\n"},{value:s+(a?"\n\n"+a:"")}]}])}}))}))},t}(m),x=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideDocumentHighlights=function(e,t,r){return c(this,void 0,void 0,(function(){var r,n,i,o,s=this;return p(this,(function(a){switch(a.label){case 0:return r=e.uri,n=e.getOffsetAt(t),[4,this._worker(r)];case 1:return i=a.sent(),e.isDisposed()?[2]:[4,i.getOccurrencesAtPosition(r.toString(),n)];case 2:return!(o=a.sent())||e.isDisposed()?[2]:[2,o.map((function(t){return{range:s._textSpanToRange(e,t.textSpan),kind:t.isWriteAccess?u.languages.DocumentHighlightKind.Write:u.languages.DocumentHighlightKind.Text}}))]}}))}))},t}(m),k=function(e){function t(t,r){var n=e.call(this,r)||this;return n._libFiles=t,n}return l(t,e),t.prototype.provideDefinition=function(e,t,r){return c(this,void 0,void 0,(function(){var r,n,i,o,s,a,l,c,d,f;return p(this,(function(p){switch(p.label){case 0:return r=e.uri,n=e.getOffsetAt(t),[4,this._worker(r)];case 1:return i=p.sent(),e.isDisposed()?[2]:[4,i.getDefinitionAtPosition(r.toString(),n)];case 2:return!(o=p.sent())||e.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(o.map((function(e){return u.Uri.parse(e.fileName)})))];case 3:if(p.sent(),e.isDisposed())return[2];for(s=[],a=0,l=o;a<l.length;a++)c=l[a],d=u.Uri.parse(c.fileName),(f=this._libFiles.getOrCreateModel(d))&&s.push({uri:d,range:this._textSpanToRange(f,c.textSpan)});return[2,s]}}))}))},t}(m),C=function(e){function t(t,r){var n=e.call(this,r)||this;return n._libFiles=t,n}return l(t,e),t.prototype.provideReferences=function(e,t,r,n){return c(this,void 0,void 0,(function(){var r,n,i,o,s,a,l,c,d,f;return p(this,(function(p){switch(p.label){case 0:return r=e.uri,n=e.getOffsetAt(t),[4,this._worker(r)];case 1:return i=p.sent(),e.isDisposed()?[2]:[4,i.getReferencesAtPosition(r.toString(),n)];case 2:return!(o=p.sent())||e.isDisposed()?[2]:[4,this._libFiles.fetchLibFilesIfNecessary(o.map((function(e){return u.Uri.parse(e.fileName)})))];case 3:if(p.sent(),e.isDisposed())return[2];for(s=[],a=0,l=o;a<l.length;a++)c=l[a],d=u.Uri.parse(c.fileName),(f=this._libFiles.getOrCreateModel(d))&&s.push({uri:d,range:this._textSpanToRange(f,c.textSpan)});return[2,s]}}))}))},t}(m),F=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideDocumentSymbols=function(e,t){return c(this,void 0,void 0,(function(){var t,r,n,i,o,s=this;return p(this,(function(a){switch(a.label){case 0:return t=e.uri,[4,this._worker(t)];case 1:return r=a.sent(),e.isDisposed()?[2]:[4,r.getNavigationBarItems(t.toString())];case 2:return!(n=a.sent())||e.isDisposed()?[2]:(i=function(t,r,n){var o={name:r.text,detail:"",kind:D[r.kind]||u.languages.SymbolKind.Variable,range:s._textSpanToRange(e,r.spans[0]),selectionRange:s._textSpanToRange(e,r.spans[0]),tags:[],containerName:n};if(r.childItems&&r.childItems.length>0)for(var a=0,l=r.childItems;a<l.length;a++){var c=l[a];i(t,c,o.name)}t.push(o)},o=[],n.forEach((function(e){return i(o,e)})),[2,o])}}))}))},t}(m),A=function(){function e(){}return e.unknown="",e.keyword="keyword",e.script="script",e.module="module",e.class="class",e.interface="interface",e.type="type",e.enum="enum",e.variable="var",e.localVariable="local var",e.function="function",e.localFunction="local function",e.memberFunction="method",e.memberGetAccessor="getter",e.memberSetAccessor="setter",e.memberVariable="property",e.constructorImplementation="constructor",e.callSignature="call",e.indexSignature="index",e.constructSignature="construct",e.parameter="parameter",e.typeParameter="type parameter",e.primitiveType="primitive type",e.label="label",e.alias="alias",e.const="const",e.let="let",e.warning="warning",e}(),D=Object.create(null);D[A.module]=u.languages.SymbolKind.Module,D[A.class]=u.languages.SymbolKind.Class,D[A.enum]=u.languages.SymbolKind.Enum,D[A.interface]=u.languages.SymbolKind.Interface,D[A.memberFunction]=u.languages.SymbolKind.Method,D[A.memberVariable]=u.languages.SymbolKind.Property,D[A.memberGetAccessor]=u.languages.SymbolKind.Property,D[A.memberSetAccessor]=u.languages.SymbolKind.Property,D[A.variable]=u.languages.SymbolKind.Variable,D[A.const]=u.languages.SymbolKind.Variable,D[A.localVariable]=u.languages.SymbolKind.Variable,D[A.variable]=u.languages.SymbolKind.Variable,D[A.function]=u.languages.SymbolKind.Function,D[A.localFunction]=u.languages.SymbolKind.Function;var I=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t._convertOptions=function(e){return{ConvertTabsToSpaces:e.insertSpaces,TabSize:e.tabSize,IndentSize:e.tabSize,IndentStyle:o.Smart,NewLineCharacter:"\n",InsertSpaceAfterCommaDelimiter:!0,InsertSpaceAfterSemicolonInForStatements:!0,InsertSpaceBeforeAndAfterBinaryOperators:!0,InsertSpaceAfterKeywordsInControlFlowStatements:!0,InsertSpaceAfterFunctionKeywordForAnonymousFunctions:!0,InsertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis:!1,InsertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets:!1,InsertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces:!1,PlaceOpenBraceOnNewLineForControlBlocks:!1,PlaceOpenBraceOnNewLineForFunctions:!1}},t.prototype._convertTextChanges=function(e,t){return{text:t.newText,range:this._textSpanToRange(e,t.span)}},t}(m),T=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideDocumentRangeFormattingEdits=function(e,t,r,n){return c(this,void 0,void 0,(function(){var n,i,o,s,a,u=this;return p(this,(function(l){switch(l.label){case 0:return n=e.uri,i=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),[4,this._worker(n)];case 1:return s=l.sent(),e.isDisposed()?[2]:[4,s.getFormattingEditsForRange(n.toString(),i,o,I._convertOptions(r))];case 2:return!(a=l.sent())||e.isDisposed()?[2]:[2,a.map((function(t){return u._convertTextChanges(e,t)}))]}}))}))},t}(I),P=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),Object.defineProperty(t.prototype,"autoFormatTriggerCharacters",{get:function(){return[";","}","\n"]},enumerable:!1,configurable:!0}),t.prototype.provideOnTypeFormattingEdits=function(e,t,r,n,i){return c(this,void 0,void 0,(function(){var i,o,s,a,u=this;return p(this,(function(l){switch(l.label){case 0:return i=e.uri,o=e.getOffsetAt(t),[4,this._worker(i)];case 1:return s=l.sent(),e.isDisposed()?[2]:[4,s.getFormattingEditsAfterKeystroke(i.toString(),o,r,I._convertOptions(n))];case 2:return!(a=l.sent())||e.isDisposed()?[2]:[2,a.map((function(t){return u._convertTextChanges(e,t)}))]}}))}))},t}(I),O=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideCodeActions=function(e,t,r,n){return c(this,void 0,void 0,(function(){var n,i,o,s,a,u,l,c=this;return p(this,(function(p){switch(p.label){case 0:return n=e.uri,i=e.getOffsetAt({lineNumber:t.startLineNumber,column:t.startColumn}),o=e.getOffsetAt({lineNumber:t.endLineNumber,column:t.endColumn}),s=I._convertOptions(e.getOptions()),a=r.markers.filter((function(e){return e.code})).map((function(e){return e.code})).map(Number),[4,this._worker(n)];case 1:return u=p.sent(),e.isDisposed()?[2]:[4,u.getCodeFixesAtPosition(n.toString(),i,o,a,s)];case 2:return!(l=p.sent())||e.isDisposed()?[2,{actions:[],dispose:function(){}}]:[2,{actions:l.filter((function(e){return 0===e.changes.filter((function(e){return e.isNewFile})).length})).map((function(t){return c._tsCodeFixActionToMonacoCodeAction(e,r,t)})),dispose:function(){}}]}}))}))},t.prototype._tsCodeFixActionToMonacoCodeAction=function(e,t,r){for(var n=[],i=0,o=r.changes;i<o.length;i++)for(var s=0,a=o[i].textChanges;s<a.length;s++){var u=a[s];n.push({resource:e.uri,edit:{range:this._textSpanToRange(e,u.span),text:u.newText}})}return{title:r.description,edit:{edits:n},diagnostics:t.markers,kind:"quickfix"}},t}(I),L=function(e){function t(){return null!==e&&e.apply(this,arguments)||this}return l(t,e),t.prototype.provideRenameEdits=function(e,t,r,n){return c(this,void 0,void 0,(function(){var n,i,o,s,a,l,c,d,f,g,h,m;return p(this,(function(p){switch(p.label){case 0:return n=e.uri,i=n.toString(),o=e.getOffsetAt(t),[4,this._worker(n)];case 1:return s=p.sent(),e.isDisposed()?[2]:[4,s.getRenameInfo(i,o,{allowRenameOfImportPath:!1})];case 2:if(!1===(a=p.sent()).canRename)return[2,{edits:[],rejectReason:a.localizedErrorMessage}];if(void 0!==a.fileToRename)throw new Error("Renaming files is not supported.");return[4,s.findRenameLocations(i,o,!1,!1,!1)];case 3:if(!(l=p.sent())||e.isDisposed())return[2];for(c=[],d=0,f=l;d<f.length;d++){if(g=f[d],h=u.Uri.parse(g.fileName),!(m=u.editor.getModel(h)))throw new Error("Unknown URI "+h+".");c.push({resource:h,edit:{range:this._textSpanToRange(m,g.textSpan),text:r}})}return[2,{edits:c}]}}))}))},t}(m)},{"./lib/lib.index.js":"1mbrK","./fillers/monaco-editor-core.js":"6zCUk","@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}],"1mbrK":[function(e,t,r){var n=e("@parcel/transformer-js/src/esmodule-helpers.js");n.defineInteropFlag(r),n.export(r,"libFileSet",(()=>i));var i={"lib.d.ts":!0,"lib.dom.d.ts":!0,"lib.dom.iterable.d.ts":!0,"lib.es2015.collection.d.ts":!0,"lib.es2015.core.d.ts":!0,"lib.es2015.d.ts":!0,"lib.es2015.generator.d.ts":!0,"lib.es2015.iterable.d.ts":!0,"lib.es2015.promise.d.ts":!0,"lib.es2015.proxy.d.ts":!0,"lib.es2015.reflect.d.ts":!0,"lib.es2015.symbol.d.ts":!0,"lib.es2015.symbol.wellknown.d.ts":!0,"lib.es2016.array.include.d.ts":!0,"lib.es2016.d.ts":!0,"lib.es2016.full.d.ts":!0,"lib.es2017.d.ts":!0,"lib.es2017.full.d.ts":!0,"lib.es2017.intl.d.ts":!0,"lib.es2017.object.d.ts":!0,"lib.es2017.sharedmemory.d.ts":!0,"lib.es2017.string.d.ts":!0,"lib.es2017.typedarrays.d.ts":!0,"lib.es2018.asyncgenerator.d.ts":!0,"lib.es2018.asynciterable.d.ts":!0,"lib.es2018.d.ts":!0,"lib.es2018.full.d.ts":!0,"lib.es2018.intl.d.ts":!0,"lib.es2018.promise.d.ts":!0,"lib.es2018.regexp.d.ts":!0,"lib.es2019.array.d.ts":!0,"lib.es2019.d.ts":!0,"lib.es2019.full.d.ts":!0,"lib.es2019.object.d.ts":!0,"lib.es2019.string.d.ts":!0,"lib.es2019.symbol.d.ts":!0,"lib.es2020.bigint.d.ts":!0,"lib.es2020.d.ts":!0,"lib.es2020.full.d.ts":!0,"lib.es2020.intl.d.ts":!0,"lib.es2020.promise.d.ts":!0,"lib.es2020.sharedmemory.d.ts":!0,"lib.es2020.string.d.ts":!0,"lib.es2020.symbol.wellknown.d.ts":!0,"lib.es5.d.ts":!0,"lib.es6.d.ts":!0,"lib.esnext.d.ts":!0,"lib.esnext.full.d.ts":!0,"lib.esnext.intl.d.ts":!0,"lib.esnext.promise.d.ts":!0,"lib.esnext.string.d.ts":!0,"lib.esnext.weakref.d.ts":!0,"lib.scripthost.d.ts":!0,"lib.webworker.d.ts":!0,"lib.webworker.importscripts.d.ts":!0,"lib.webworker.iterable.d.ts":!0}},{"@parcel/transformer-js/src/esmodule-helpers.js":"45dby"}]},[]);