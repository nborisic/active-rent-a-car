#!/bin/bash

FILENAME=_redirects

if [ -d "./build" ]
then
    rm -rf build && parcel build public/index.html --out-dir build && \
    touch ./build/_redirects && \
    cat << EOF > ./build/_redirects
    /*    /index.html   200
EOF
else
    parcel build public/index.html --out-dir build && \
    touch ./build/_redirects && \
    cat << EOF > touch ./build/_redirects
    /*    /index.html   200
EOF
fi
