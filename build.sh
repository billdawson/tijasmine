#!/usr/bin/env bash

version=`cat VERSION.txt`
zipfile=tijasmine-$version.zip

# Pass -s to skip running jshint

if [ "$1" != "-s" ]; then
	cd src
	jshint .
	retval=$?
	if [ $retval -ne 0 ]; then
		exit $retval
	fi
	cd ..
fi

[ -d build ] || mkdir build
rm -rf build/*
mkdir build/tijasmine

[ -d dist ] || mkdir dist
rm -rf dist/*

cp jasmine/lib/jasmine-core/jasmine.js build/tijasmine
cp src/*.js build/tijasmine
cp LICENSE* build/tijasmine

cd build
zip -r ../dist/$zipfile tijasmine
