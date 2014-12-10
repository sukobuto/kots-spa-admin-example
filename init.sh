#!/bin/bash

bower install
tsd reinstall
tsd rebundle
npm install

pushd app
npm install
webpack
popd