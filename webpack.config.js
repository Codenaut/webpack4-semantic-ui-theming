const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const devMode = process.env.NODE_ENV !== 'production'

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '../../theme.config$': path.join(__dirname, 'my-semantic-theme/theme.config')
        }
    },
    module: {
        //CSS, SASS
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader',
                ],
            },
            //LESS
            {
                test: /\.(less)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "less-loader"
                ]
            },

            // this handles images
            {
                test: /\.jpe?g$|\.gif$|\.ico$|\.png$|\.svg$/,
                use: 'file-loader?name=[name].[ext]?[hash]'
            },

            // the following rules handle font extraction
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            },
            {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            }
        ]
    },
    plugins: [
        // this handles the bundled .css output file
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
            //filename: "./css/[name].css"
        })
    ]
};
