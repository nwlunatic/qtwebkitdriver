#!/usr/bin/env bash

for i in "$@"
do
case $i in
    -lc|--local-core)
    LOCALCORE=1
    ;;
esac
done

hash virtualenv 2>/dev/null || { echo >&2 "virtualenv is not installed.  Aborting."; exit 1; }

virtualenv .env
source .env/bin/activate

pip install -U git+https://github.com/nwlunatic/lode_runner
rm -rf .env/build/
if [ ${LOCALCORE} ]; then
    pip install -U ../contesto
else
    pip install -U git+https://github.com/2gis/contesto.git#egg=contesto
fi
