var WebpackConfig = require('webpack-config');

module.exports = new WebpackConfig().extend('./webpack.config.js').merge({
    devServer: {
        colors:             true,
        contentBase:        '.',
        historyApiFallback: true,
        inline:             true,
        progress:           true
    },

    devtool: 'eval-source-map'
});
