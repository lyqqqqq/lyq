const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require ('extract-text-webpack-plugin');
const glob = require('glob');
const PurifyCSSPlugin = require("purifycss-webpack");
const entry = require("./entry_webpack.js");
var CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode:'development',
    entry:entry,
    output:{
        path:path.resolve(__dirname,'dist'),
        filename:'[name].js',
        publicPath:'http://localhost:8081/'
    },
    // module:{
    //     rules:[{
    //         test:/\.css$/i,
    //         use:ExtractTextPlugin.extract({
    //             fallback:"style-loader",
    //             use:[{
    //                 loader:'css-loader',
    //                 options:{importLoaders:1}
    //             },'postcss-loaders']
    //         })
    //     }]
    module: {
        rules: [{
            test: /\.css$/i,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: [{
                    loader: 'css-loader',
                    options: {importLoaders: 1}
                }, 'postcss-loader']
            })
        },
            {
                test: /\.(png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 5,
                        outputPath: 'images/'
                    }
                }]
            },
            {
                test: /\.(html|htm)$/i,
                loader: 'html-withimg-loader'
            },
            {
                test: /\.scss$/i,
                use: [{
                    loader: 'style-loader',
                },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader',
                    }]

            },{
                test:/\.(jsx|js)$/,
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            "es2015","react"
                        ]
                    }
                },
                exclude:/node_modules/
            }]
    },





    plugins:[
        new CopyWebpackPlugin([{
            from:__dirname + '/src/public',
            to:'./public'
        }]),
        new webpack.ProvidePlugin({
            $:"jquery"
        }),
        new PurifyCSSPlugin({
            paths:glob.sync(path.join(__dirname,'src/*.html')),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new HtmlPlugin({
            minify:{
                removeAttributeQuotes:true
            },
            hash:true,
            template:'./src/index.html'
        }),
        new ExtractTextPlugin ("css/index.css")
        // new HtmlPlugin({
        //     filename:'a.html',
        //     title:'index1-title',
        //     chunks:['index'],
        //     minify:{
        //         removeAttributeQuotes:true
        //     },
        //     hash:true,
        //     template:'./src/index.html'
        //
        // }),
        // new HtmlPlugin({
        //     filename:'b.html',
        //     title:'index2-title',
        //     chunks:['index'],
        //     minify:{
        //         removeAttributeQuotes:true
        //     },
        //     hash:true,
        //     template:'./src/index2.html'
        //
        // })
    ],

    devServer:{
    contentBase:path.resolve(__dirname,'dist'),
        host:'localhost',
        compress:true,
        port:8081,
        open:true,
        hot:true
}
};