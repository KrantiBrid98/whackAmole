const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

const isDevEnv = process.env.NODE_ENV === 'development';

module.exports = {
    mode: process.env.NODE_ENV,
    entry: "./src/js/scripts/App.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        chunkFilename: '[name].bundle.js', // naming structure
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                // Exposes jQuery for use outside Webpack build
                test: require.resolve('jquery'),
                use: [{
                    loader: 'expose-loader',
                    options: 'jQuery'
                }, {
                    loader: 'expose-loader',
                    options: '$'
                }]
            }

        ]
    },
    "devtool": isDevEnv ? "source-map" : "",
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery'
        }),
        new CopyWebpackPlugin([
            { from: 'src/images', to: 'images' },
            { from: 'src/config', to: 'config' },
            { from: 'src/css/stylesheet.css', to: 'css' }
        ], { debug: true })
    ]
};