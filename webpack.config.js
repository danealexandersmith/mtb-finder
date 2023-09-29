const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {

    entry: {
        src: './client/index.js'
        },
    mode: process.env.NODE_ENV,
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        },
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

            {
                test: /\.html/,
                use: {
                    loader: 'html-loader',
                },

            },
            ]
        },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Development',
            template: './client/index.html'
        }),
    ],
    devServer: {
        static: {
            publicPath: '/build',
            directory: path.resolve(__dirname, 'public'),
        },
        proxy: {
            '/api': 'http://localhost:3000'
        }
    }
}


