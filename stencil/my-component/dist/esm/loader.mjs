import { a as patchEsm, b as bootstrapLazy } from './index-c8af5f01.js';

const defineCustomElements = (win, options) => patchEsm().then(() => {
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});

export { defineCustomElements };
