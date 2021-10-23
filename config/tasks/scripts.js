module.exports = {
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /(\.js|.ts)$/,
        exclude: /node_modules/,
      },
    ],
  },
};
