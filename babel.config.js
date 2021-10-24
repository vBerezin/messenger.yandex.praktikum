const paths = require('./config/paths');

module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-env'],
  plugins: [
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-proposal-class-properties',
    [
      'module-resolver',
      {
        alias: paths.alias,
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        'regenerator': true
      }
    ]
  ],
};
