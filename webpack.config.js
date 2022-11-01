const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
    mode: "production",
    entry: [
        './src/app.js',
        // 'webpack-hot-middleware/client?reload=true'
    ],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:{
                        sourceMap :true
                    }
                }
            },
            {
                // test: /\.scss$/,
                test: /\.css$/,
                use: ["style-loader",MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "fonts/[name].[ext]",
                    },
                },
            },
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: [{
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/"
                    }
                }]
            }
        ]
    },
    // watch: true,
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    // devServer: {
    //     // port: 3030,
    //     // open: true,
    //     contentbase:'dist',
    //     overlay:true,
    //     hot:true,
    //     // stats:{
    //     //     color:true
    //     // }
    //     // proxy: {
    //     //     '/api': {
    //     //         target: 'https://localhost:8080',
    //     //         secure: false
    //     //     }
    //     // }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'style.css',
        }),
        //   new LiveReloadPlugin()
        // new webpack.HotModuleReplacementPlugin()
    ]
};