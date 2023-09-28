const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    entry: {
        src: './index.js'
        },
    mode: process.env.NODE_ENV,
    module: {
        rules: [
            {
                test: /\.jsx?/, 
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                        }

                    }
            },

            {
                test: /\.s?css/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
                ]
            },

}