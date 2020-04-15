'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-a32c3831.js');

const defineCustomElements = (win, options) => index.patchEsm().then(() => {
  return index.bootstrapLazy([["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});

exports.defineCustomElements = defineCustomElements;
