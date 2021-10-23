const merge = require('webpack-merge');

module.exports = merge(
  {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
      minimize: false,
    },
    devServer: {
      contentBase: $.paths.server.base,
      liveReload: true,
      hot: true,
    },
  },
);
