const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');



module.exports = {
    entry: './client/src/index.js',
    output: {
        path: path.resolve(__dirname, './client/dist'),
        publicPath: '/',
        filename: 'my-first-webpack.bundle.js'
    },
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        historyApiFallback: true,
        contentBase: './client/dist'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use:{
                    loader: 'babel-loader',
                    options: {
                        presets:['@babel/preset-react']
                    }
                }
            },
            {
                test: /\.css$/,
                use:['style-loader', 'css-loader']         
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './client/src/index.html'
        }),
        new CleanWebpackPlugin
    ]
};