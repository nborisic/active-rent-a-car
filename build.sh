#!/bin/bash

FILENAME=_redirects

if [ -d "./build" ]
then
    rm -rf build && parcel build public/index.html --out-dir build
else
    parcel build public/index.html --out-dir build
fi
