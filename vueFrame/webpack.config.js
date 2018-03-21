const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require("webpack");
function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    entry : {
        main:"./src/main.js"
    },
    output: {
        filename:'[name].[hash:5].js',
        path:path.resolve(__dirname,"dist")
    },
    module:{
        rules: [
            {
                test: /\.html$/,
                loaders: ['raw-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
                exclude: '/node_modules/'
            },

            {//引入less
                test: /main\.less$/,
                loaders: ['style-loader','css-loader','less-loader']
            },
            {
                test: /\.less$/,
                exclude: /main\.less$/,
                loader: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','less-loader?sourceMap']
                })
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env'],
                        plugins: ['syntax-dynamic-import']
                    },

                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
            {
                test: /\.(woff?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },

        ]
    },
    plugins:[
        new ExtractTextPlugin({
            filename: 'main.css',
            ignoreOrder: true
        }),

        new htmlWebpackPlugin({
            template:"./src/index.html",
            filename:"index.html",
            favicon:'./src/favicon.ico', //favicon路径
        }),
        new CopyWebpackPlugin([
            {from:"./src/assets",to:"assets"}
        ]),
        new webpack.HotModuleReplacementPlugin()
    ],
    resolve: {
        alias: {
            'vue': 'vue/dist/vue.common.js',
            'assets':resolve('./src/assets')
        },
        extensions: ['.js', '.vue','.css'],
    },


    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 1008,
        inline: true,//实时刷新
        hot: true//自动刷新
    },

}