const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

webpackConfig.output = {
  filename: '[name].min.js',
};

webpackConfig.module.loaders = [{
  include: /src/,
  loader: ExtractTextPlugin.extract(
    'style',
    [
      'css?importLoaders=3',
      'postcss',
      'resolve-url',
      'sass',
    ].join('!')
  ),
  test: /\.scss$/,
}];

webpackConfig.plugins = [
  new CleanWebpackPlugin([
    'build',
  ]),

  new ExtractTextPlugin('[name].min.css'),

  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    comments: false,
  }),
];

module.exports = webpackConfig;
