var webpack = require('webpack');

module.exports = {
  entry: './public/js/index.js',
  output: {
    path: './public',
    filename: 'bundle.js',
  },
  devtool: "#source-map",
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    }),
  ]
}