/* base configuration taken from @rauchma
 * https://github.com/rauschma/webpack-es6-demo/blob/master/webpack.config.js
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './src/star-rating.js',
    output: {
        path: __dirname,
        filename: 'star-rating.js'
    },
    module: {
        loaders: [
            {
                loader: 'babel-loader',
                test: path.join(__dirname, 'src'),
                query: {
                    presets: 'es2015'
                },
            }
        ]
    },
    plugins: [
        // Avoid publishing files when compilation fails
        new webpack.NoErrorsPlugin()
    ],
    stats: {
        // Nice colored output
        colors: true
    },
    // Create Sourcemaps for the bundle
    devtool: 'source-map'
};