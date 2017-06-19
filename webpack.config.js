/*
    ./webpack.config.js
*/
const path = require('path');
module.exports = {
  entry: './src/js/status.js',
  output: {
    path: path.resolve('src/js/dist'),
    filename: 'status_bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  watch: true
}
