const path = require('path');
const webpack = require('webpack');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const PurgecssPlugin = require('purgecss-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

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
                // 如果项目中使用了第三方 UI 框架，这里就不能排除
                // exclude: /node_modules/,
                use: ['style-loader', 'css-loader']
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
        // 默认情况下：每次都会弹出页面，可以设置关闭
        new BundleAnalyzerPlugin({
            // 不启动展示打包报告的 http 服务器
            analyzerMode: 'disabled',
            // 是否生成 stats.json 文件
            generateStatsFile: true,
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
        extensions: [' ', '.js', '.jsx','.less','.css','.json']
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









