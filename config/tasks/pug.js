module.exports = {
  module: {
    rules: [
      {
        loader: 'pug-loader',
        test: /\.pug$/,
        exclude: /node_modules/,
        options: {
          pretty: true,
          modules: true,
        }
      },
    ],
  },
};
