#!/bin/bash

if [ -d "./build" ]
then
    rm -rf build && parcel build index.html --out-dir build
else
    parcel build index.html --out-dir build
fi
