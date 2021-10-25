const src = './src';
const build = './build';

module.exports = {
  src,
  build,
  server: {
    base: build,
  },
  html: `${src}/index.html`,
  entry: `${src}/index.ts`,
  alias: {
    '~common': './src/common',
    '~controllers': './src/controllers',
    '~modules': './src/modules',
    '~components': './src/components',
    '~pages': './src/pages',
    '~images': './src/images'
  }
};
