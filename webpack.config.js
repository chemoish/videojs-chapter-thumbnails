var ExtractTextPlugin = require('extract-text-webpack-plugin'),
    moment            = require('moment'),
    path              = require('path'),
    pkg               = require('./package.json'),
    webpack           = require('webpack');

module.exports = {
    entry: {
        src: './src/videojs-chapter-thumbnail.js'
    },

    output: {
        filename: 'videojs.chapter-thumbnails.js',
        path: 'dist'
    },

    module: {
        preLoaders: [{
            exclude: /node_modules/,
            loader:  'eslint-loader',
            test:    /\.js$/
        }],

        loaders: [{
            loader: ExtractTextPlugin.extract(
                'style-loader',
                'css-loader?sourceMap!sass-loader?sourceMap&includePaths[]=' + path.resolve(__dirname, './node_modules/compass-mixins/lib')
            ),
            test: /\.scss$/
        }, {
            exclude: /node_modules/,
            loader:  'babel-loader',
            test:    /\.js$/
        }]
    },

    plugins: [
        new webpack.BannerPlugin([
            '/**',
            ' * ' + pkg.name + ' v' + pkg.version,
            ' * ',
            ' * @author: ' + pkg.author,
            ' * @date: ' + moment().format('YYYY-MM-DD'),
            ' */',
            ''
        ].join('\n'), {
            raw: true
        }),

        new ExtractTextPlugin('videojs.chapter-thumbnails.css')
    ],

    externals: {
        videojs: 'video.js'
    }
};
