import nodeResolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonJS from 'rollup-plugin-commonjs';
import replace from 'rollup-plugin-replace';
import { terser } from 'rollup-plugin-terser';

const env = process.env.NODE_ENV || 'production';

export default [
  {
    input: 'src/FreeMask.js',
    output: {
      file: 'npm/build/js/react-freemask.cjs.js',
      format: 'cjs',
      indent: false,
      exports: 'named',
    },
    external: ['react', 'classnames', 'immer', 'prop-types'],
    plugins: [babel()],
  },
  {
    input: 'src/FreeMask.js',
    output: {
      file: 'npm/build/js/react-freemask.umd.js',
      format: 'umd',
      indent: false,
      name: 'FreeMask',
      exports: 'named',
    },
    external: ['react'],
    plugins: [
      nodeResolve({
        browser: true,
        customResolveOptions: {
          moduleDirectory: 'node_modules',
        },
      }),
      babel({
        exclude: 'node_modules/**',
      }),
      commonJS(),
      replace({ 'process.env.NODE_ENV': JSON.stringify(env) }),
      'production' === env &&
        terser({
          compress: {
            pure_getters: true,
            unsafe: true,
            unsafe_comps: true,
            warnings: false,
          },
        }),
    ],
  },
];
