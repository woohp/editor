ROOT=$PWD/node_modules/monaco-editor/esm/vs
OPTS="--no-source-maps --log-level error --dist-dir docs"        # Parcel options - See: https://parceljs.org/cli.html

export NODE_ENV=production
pnpx parcel build $ROOT/language/json/json.worker.js $OPTS
pnpx parcel build $ROOT/language/css/css.worker.js $OPTS
pnpx parcel build $ROOT/language/html/html.worker.js $OPTS
pnpx parcel build $ROOT/language/typescript/ts.worker.js $OPTS
pnpx parcel build $ROOT/editor/editor.worker.js $OPTS
