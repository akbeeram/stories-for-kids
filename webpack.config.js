/**
 * Created by beeraman on 6/30/2017.
 */

var path = require('path');
var webpack = require('webpack');

module.exports = {
    context : path.resolve(__dirname, './app'),
    entry:{
        app:[
            "./js/app/index.js"
        ],
        vendor:[
            'angular',
            'angular-ui-router',
            'angular-sanitize',
            'lodash',
            'bootstrap'
        ]
    },
    output:{        //where and how to save the resulting files
        path:path.join(__dirname, 'build'),     //path tells where to store the files
        //publicPath:'https://yoursite.com',      // used by several Webpack’s plugins to update the URLs inside CSS, HTML files when generating production builds.
        filename:"[name].bundle.js",     //name value comes from entry object's key
        sourceMapFilename : "[name].bundle.js.map"
    },
    module:{
        loaders:[
            {
                test:/\.html$/,
                loader:'html-loader'
            },
            {
                test:/\.png$/,
                loader:'url-loader?limit=1',     //plugins aware of public path
                //query:'{limit:1024}'        //use DataURLs for images less than 1024 bytes and use URL for images that are larger than 1024 bytes
            },
            {
                test: /\.json$/,
                loaders: ['json-loader']
            },
            {
                test: /\.less$/,
                loaders: ['style-loader', 'css-loader', 'less-loader']
            },
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader']
            },
        ]
    },
    devServer:{
        inline:true,
        contentBase:'./build',
        historyApiFallback: true,
        port:4040
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        })
    ],
    watch:true
}
