const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');

// babel-plugin-import

module.exports = {
    devtool: 'cheap-module-eval-source-map',
    entry:'./src/index.js',
    output: {
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
                //exclude: /node_modules/,
            },
            // {
            //     test: /\.css/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader']
            // },
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            // {
            //     test: /\.less/,
            //     use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
            // },
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader'],
                // exclude: [/node_modules/, /(.|_)min\.js$/],
            },
            {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                loader: 'url-loader?limit=1024&name=./fonts/[name].[ext]',
            },
            {
                test: /\.(png|jpg|gif|jpeg|ico|cur)$/,
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            },
        ],
    },
    plugins: [
        // new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin(),
        new FriendlyErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: `index.html`,
            template: `./index.html`,
            inject: true, // js 插入的位置，true/'head'/'body'/false
            // chunks: ['manifest', 'vendor', 'commons', 'index'],
            minify: {
                removeComments: true,
                collapseWhitespace: false
            }
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'css/[name].css'
        // }),
        // new PurgecssPlugin({
        //     paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`,
        //     {
        //         // 不匹配目录，只匹配文件
        //         nodir: true
        //     }),
        // }),
    ],
    resolve: {
        extensions: [' ', '.js', '.jsx', '.json']
    },
/*    devServer: {
        host: '0.0.0.0',
        disableHostCheck: true,
        useLocalIp: true,
        port: 666,
        inline: true,
        hot: true,
        overlay: {
            errors: true,
            warnings: true,
        },
    },*/
    /*optimization: {
        minimizer: [
            new OptimizeCSSPlugin({
                cssProcessor: require('cssnano'),
                cssProcessorOptions: {
                    discardComments: {removeAll: true},
                    parser: require('postcss-safe-parser'),
                    autoprefixer: {disable: true}
                },
                canPrint: true
            }),
        ],
        splitChunks: {
            cacheGroups: {
                //default:false,
                commons: {
                    chunks: 'initial',
                    name: 'commons',
                    minSize: 30000,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'initial',//必须三选一： "initial" | "all" | "async"(默认就是异步)
                    name: 'vendors',
                    priority: 10,
                },
            }
        }
    }*/

};









