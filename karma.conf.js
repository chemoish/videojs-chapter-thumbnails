module.exports = function (config) {
    config.set({
        browsers: ['PhantomJS'],

        frameworks: ['jasmine'],

        files: [{
            pattern: 'test/tests.webpack.js',
            watched: false
        }],

        preprocessors: {
            'test/tests.webpack.js': ['webpack']
        },

        webpack: {
            module: {
                loaders: [{
                    loader: 'null-loader',
                    test:   /\.scss$/
                }, {
                    exclude: /(node_modules)/,
                    loader:  'babel-loader',
                    test:    /\.js$/
                }]
            }
        },

        webpackMiddleware: {
            noInfo: true
        }
    });
};
