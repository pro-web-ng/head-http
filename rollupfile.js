import { eslint } from 'rollup-plugin-eslint';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';


export default [{
  input: 'src/index.js',

  external: [
    'axios',
    // 'vanilla.js/forge/des',
    // 'vanilla.js/forge/rsa',
    // 'vanilla.js/forge/sha256',
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
    { file: 'dist/http.js', format: 'cjs', exports: 'default' },
  ],
}];
