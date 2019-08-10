#!/usr/bin/env bash

set -e

DATA=public/data
SPEC=public/spec
HOWTO=public/images/howTo
SCHEMA=schema

CWD=$(pwd)

echo "Copying data to '$DATA'."

if [ ! -d "$DATA" ]; then
  mkdir $DATA
fi

# eval rsync -r "$CWD/node_modules/vega-datasets/data/*" $DATA

echo "Copy examples to '$SPEC'."

if [ ! -d "$SPEC" ]; then
  mkdir $SPEC
fi

# without v!
# VEGA_VERSION=$(scripts/version.sh vega)
# VEGA_LITE_VERSION=$(scripts/version.sh vega-lite)

# pushd /tmp
# wget https://github.com/vega/vega/archive/v$VEGA_VERSION.tar.gz -O vega.tar.gz
# wget https://github.com/vega/vega-lite/archive/v$VEGA_LITE_VERSION.tar.gz -O vl.tar.gz
# tar xzf vega.tar.gz vega-$VEGA_VERSION/docs
# tar xzf vl.tar.gz vega-lite-$VEGA_LITE_VERSION/examples vega-lite-$VEGA_LITE_VERSION/_data
# popd

# eval rsync -r "/tmp/vega-$VEGA_VERSION/docs/examples/*.vg.json" "$SPEC/vega"
# eval rsync -r "/tmp/vega-lite-$VEGA_LITE_VERSION/examples/specs/*.vl.json" "$SPEC/vega-lite/"
eval rsync -r "$CWD/node_modules/vega-ar/spec/*.va.json" "$SPEC/vega-ar"
eval rsync -r "$CWD/node_modules/vega-ar/spec/*.va.json" "$SPEC/vega"
rename -f 's/\.va\./.vg./' $SPEC/vega/*
# sed -i 's/http:\/\/vegaar.hkustvis.org\/schema\/vega-ar\/v5.json/https:\/\/vega.github.io\/schema\/vega\/v5.json/' $SPEC/vega/*

eval rsync -r "$CWD/node_modules/vega-ar/images/*.png" "$HOWTO"

# cp "/tmp/vega-lite-$VEGA_LITE_VERSION/_data/examples.json" "$SPEC/vega-lite/index.json"
# cp "/tmp/vega-$VEGA_VERSION/docs/_data/examples.json" "$SPEC/vega/index.json"
cp "$CWD/node_modules/vega-ar/spec/index.json" "$SPEC/vega-ar/index.json"
cp "$CWD/node_modules/vega-ar/spec/index.json" "$SPEC/vega/index.json"