var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var DEMO_SOURCE_PATH = path.resolve(__dirname, 'source');
var DEMO_DIST_PATH = path.resolve(__dirname, 'dist');

module.exports = {
  entry: {
    index: path.resolve(DEMO_SOURCE_PATH, 'index')
  },
  output: {
    path: DEMO_DIST_PATH,
    filename: 'demo.js'
  },
  resolve: {
    extensions: ['.js', '.css']
  },
  module: {
    rules: [{
      test: /\.js[x]?$/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader'
      }]
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENT: '"development"'
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: 'react-scrollbar demo',
      template: path.resolve(DEMO_SOURCE_PATH, 'index.html'),
      filename: 'index.html',
      chunks: ['index'],
      inject: 'body'
    })
  ],
  devServer: {
    contentBase: path.resolve('./'),
    port: 9090,
    inline: true,
    hot: true
  }
}
