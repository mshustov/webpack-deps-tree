var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = {
    target: 'web',
    entry: {
        app: path.join(__dirname, '/src/init.tsx')
    },

    output: {
        publicPath: '/',
        path: path.join(__dirname, './dist/'),
        filename: 'bundle.js'
    },

    devtool: '#source-map',
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js']
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
                                        uglify: true,
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
            inlineSource: '.(js|css)$',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true,
                keepClosingSlash: true,
                removeEmptyElements: false
            }
        }),
        ...isProd
            ? [
                new HtmlWebpackInlineSourcePlugin(),
                new webpack.optimize.UglifyJsPlugin({
                    minimize: true,
                    comments: false,
                    compress: {
                        drop_console: true,
                        drop_debugger: true,
                        warnings: false,
                        unused: true,
                        dead_code: true,
                        screw_ie8: true,
                    },
                    mangle: {
                        screw_ie8: true,
                    },
                    output: {
                        comments: false,
                        screw_ie8: true,
                    },
                })
            ]
            : []
    ],

    node: {
        path: true,
        url: true
    },

    devServer: {
        port: 3000,
        stats: {
            assets: false,
            chunks: false,
            colors: true,
            timings: true,
            warnings: false
        }
    }
};
