#!/bin/bash
#
echo '** NPM Package Versioneer Script **'
ls ./package.json

echo BuildNumber $1
buildNumber=$(sed -E 's/\.0?/\./g;t;d' <<< $1)
value='s/\"version\"\: \"[0-9.]*\"/"version\"\: \"X\"/m'
value="${value/X/$buildNumber}"\

$(sed -i "$value" ./package.json)
