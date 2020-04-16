import { Config } from '@stencil/core';

export const config: Config = {
  namespace: 'my-component',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
  ]
};
