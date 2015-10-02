var path = require('path');
var webpack = require('webpack');

module.exports = function (grunt) {
    grunt.config('webpack', {
        development: {
            output: {
                filename: 'videojs.chapter-thumbnails.js',
                path: 'tmp'
            },

            watch: true
        },

        dist: {
            output: {
                filename: 'videojs.chapter-thumbnails.min.js',
                path: 'dist'
            },

            plugins: [
                new webpack.optimize.DedupePlugin(),
                new webpack.optimize.UglifyJsPlugin()
            ]
        },

        options: {
            entry: {
                plugin: './src/chapter-thumbnail.js'
            },

            module: {
                preLoaders: [{
                    exclude: /node_modules/,
                    loader:  'eslint-loader',
                    test:    /\.js$/
                }],

                loaders: [{
                    exclude: /(node_modules)/,
                    loader:  'babel-loader',
                    test:    /\.js$/
                }]
            },
        }
    });
};
