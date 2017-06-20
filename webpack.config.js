var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    target: 'web',
    entry: {
        app: path.join(__dirname, '/src/bootstrap.tsx')
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, './build/'),
        filename: 'bundle.js'
    },

    devtool: '#source-map',
    resolve: {
        extensions: ['.webpack.js', '.ts', '.tsx', '.jsx', '.js']
    },

    module: {
        loaders: [
            {
                test: /\.js?$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /\.(j|t)sx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            babelrc: false,
                            cacheDirectory: true,
                            presets: [
                                ['babel-preset-env', {
                                    targets: {
                                        browsers: [
                                            'last 2 Chrome versions',
                                            'last 2 Firefox versions',
                                            'last 2 Safari versions',
                                            'Edge 15'
                                        ]
                                    },
                                    useBuiltIns: true,
                                    debug: true
                                }],
                                'babel-preset-react'
                            ],
                            plugins: [
                                'transform-object-rest-spread'
                            ]
                        }
                    },
                    'awesome-typescript-loader'
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new HtmlWebpackPlugin({
            template: './index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                keepClosingSlash: true,
                removeEmptyElements: false
            }
        })
    ],

    node: {
        path: true,
        url: true
    },

    devServer: {
        port: 3000
        // stats: {
        //     colors: true,
        //     timings: true,
        //     chunks: false,
        //     warnings: false
        // }
    }
};
