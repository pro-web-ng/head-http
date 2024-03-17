import eslint from '@rollup/plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';


export default [
  {
    input: 'src/create.js',

    external: [
      'core-js/modules/es.array.reverse.js',
      'core-js/modules/web.url.to-json.js',
      'axios',
      'vanilla.js',
    ],

    plugins: [
      eslint(),

      commonjs({
        sourceMap: false,
      }),

      resolve({
        browser: true,
      }),

      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
    ],

    output: [
      { file: '../../dist/create.js', format: 'cjs', exports: 'default' },
    ],
  },
  {
    input: 'src/index.js',

    external: [
      'core-js/modules/es.array.reverse.js',
      'core-js/modules/web.url.to-json.js',
      'axios',
      'vanilla.js',
    ],

    plugins: [
      eslint(),

      commonjs({
        sourceMap: false,
      }),

      resolve({
        browser: true,
      }),

      babel({
        exclude: 'node_modules/**',
        babelHelpers: 'bundled',
      }),
    ],

    output: [
      { file: '../../dist/http.js', format: 'cjs', exports: 'default' },
    ],
  },
];
