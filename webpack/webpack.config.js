const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const moment = require('moment');
const path = require('path');
const pkg = require('../package.json');
const webpack = require('webpack');

module.exports = {
  entry: {
    'videojs.chapter-thumbnails': './src/videojs-chapter-thumbnail',
  },

  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: 'dist',
  },

  module: {
    preLoaders: [{
      exclude: /node_modules/,
      loader: 'eslint',
      test: /\.js$/,
    }],

    loaders: [{
      include: /src/,
      loader: ExtractTextPlugin.extract(
        'style',
        [
          'css?sourceMap&importLoaders=3',
          'postcss',
          'resolve-url',
          'sass',
        ].join('!')
      ),
      test: /\.scss$/,
    }],

    postLoaders: [{
      exclude: /node_modules/,
      loader: 'babel',
      test: /\.js$/,
    }],
  },

  plugins: [
    new ExtractTextPlugin('[name].css'),

    new webpack.BannerPlugin([
      '/**',
      ` * ${pkg.name} v${pkg.version}`,
      ' * ',
      ` * @author: ${pkg.author}`,
      ` * @date: ${moment().format('YYYY-MM-DD')}`,
      ' */',
      '',
    ].join('\n'), {
      raw: true,
    }),
  ],

  postcss() {
    return [
      autoprefixer,
    ];
  },

  sassLoader: {
    includePaths: [path.join(__dirname, '..', 'src')],
    sourceMap: true,
  },

  externals: {
    'video.js': 'videojs',
  },
};
