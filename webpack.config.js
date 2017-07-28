var webpack = require('webpack');

module.exports = {
  entry: './example/app.js',
  output: {
    path: './example',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  }
};
