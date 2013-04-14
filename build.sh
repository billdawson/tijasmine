#!/usr/bin/env bash

[ -d build ] || mkdir build
[ -d dist ] || mkdir dist
[ -f dist/tijasmine.zip ] && rm dist/tijasmine.zip

rm -rf build/*

mkdir build/tijasmine
cp jasmine/lib/jasmine-core/jasmine.js build/tijasmine
cp src/tiboot.js build/tijasmine

cd build
zip -r ../dist/tijasmine.zip tijasmine
