// 开发环境的webpack配置
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { DefinePlugin } = require('webpack');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        path: path.resolve('.', 'dist'),
        publicPath: '/',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    devServer: {
        // don't open browser
        open: false,
        compress: true,
        port: 8000,
        hot: true,
        historyApiFallback: {
            index: '/',
            disableDotRule: true,
            rewrites: [],
        },
        proxy: {},
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                options: { presets: ['@babel/env', '@babel/preset-react'] },
            },
            {
                test: /\.(jpeg|jpg|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10 * 1024,
                            name: '[name].[hash:7].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(css|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            preserveLinebreaks: true,
            removeAttributeQuotes: true,
        }),
    ],
};
