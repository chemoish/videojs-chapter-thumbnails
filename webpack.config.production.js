var Clean             = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    webpack           = require('webpack'),
    WebpackConfig     = require('webpack-config');

var config = new WebpackConfig().extend('./webpack.config.js').merge({
    output: {
        filename: 'videojs.chapter-thumbnails.min.js'
    }
});

config.plugins = [
    new Clean([
        'build'
    ]),

    new ExtractTextPlugin('videojs.chapter-thumbnails.min.css'),

    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        comments: false
    })
];

module.exports = config;
