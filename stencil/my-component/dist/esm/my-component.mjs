import { p as patchBrowser, b as bootstrapLazy } from './index-c8af5f01.js';

patchBrowser().then(options => {
  return bootstrapLazy([["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]]], options);
});
