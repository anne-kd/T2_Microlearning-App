import { a as patchEsm, b as bootstrapLazy } from './index-c8af5f01.js';
var defineCustomElements = function (win, options) { return patchEsm().then(function () {
    return bootstrapLazy([["my-component", [[1, "my-component", { "first": [1], "middle": [1], "last": [1] }]]]], options);
}); };
export { defineCustomElements };
