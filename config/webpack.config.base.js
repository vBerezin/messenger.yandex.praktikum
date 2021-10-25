const merge = require('webpack-merge');
const path = require('path');

function resolveAlias(aliases) {
  const alias = {};
  for (const key in aliases) {
    alias[key] = path.relative($.paths.src, path.resolve(aliases[key]));
  }
  return alias;
}

module.exports = merge(
  $.tasks.pug,
  $.tasks.html,
  $.tasks.styles,
  $.tasks.images,
  $.tasks.static,
  $.tasks.scripts,
  {
    entry: path.resolve($.paths.entry),
    context: path.resolve($.paths.src),
    output: {
      path: path.resolve($.paths.build),
      filename: '[name].js',
    },
    resolve: {
      alias: resolveAlias($.paths.alias),
      extensions: ['.js', '.ts', '.scss', '.css', '.json', '.pug'],
      modules: ['node_modules', $.paths.src],
    },
    optimization: {
      chunkIds: 'named',
    },
  },
);
