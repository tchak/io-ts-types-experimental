import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    input: 'dist/index.js',
    external: [
      'fp-ts/Either',
      'fp-ts/function',
      'io-ts/Decoder',
      'io-ts/Guard',
    ],
    plugins: [sourcemaps()],
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'dist/Decoder.js',
    external: [
      'fp-ts/Either',
      'fp-ts/function',
      'io-ts/Decoder',
      'io-ts/Guard',
    ],
    plugins: [sourcemaps()],
    output: {
      file: 'dist/Decoder.cjs',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
  {
    input: 'dist/Guard.js',
    external: ['fp-ts/function', 'io-ts/Guard'],
    plugins: [sourcemaps()],
    output: {
      file: 'dist/Guard.cjs',
      format: 'cjs',
      sourcemap: true,
      sourcemapExcludeSources: true,
    },
  },
];
