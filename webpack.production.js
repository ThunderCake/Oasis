const path = require('path');
const webpack = require('webpack');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
        entry: ['./app/src/index.js'],
        output: {
            path: path.resolve(__dirname, './public/dist/'),
            filename: 'bundle.js',
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify('production') }
            }),
            new MiniCSSExtractPlugin({
                filename: "[name].css",
                chunkFilename: "[id].css"
            })
        ],
        module: {
            rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCSSExtractPlugin.loader, 
                    { 
                        loader: 'css-loader', 
                        options: {
                            sourceMap: true,
                            modules: true,
                            localIdentName: "[local]___[hash:base64:5]"
                        }
                    }, 
                    'sass-loader'
                ]
            }
            ]
        }
}