const path = require('path');
const webpack = require('webpack');

module.exports = ({
        mode: 'development',
        entry: ['./app/src/index.js', 'webpack-hot-middleware/client'],
        output: {
            path: path.resolve(__dirname, './public/dist/'),
            filename: 'bundle.js',
            publicPath: '/public/dist/'
        },
        plugins: [
            new webpack.NamedModulesPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin({
                'process.env': { NODE_ENV: JSON.stringify('development') }
            }),
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
                    'style-loader',
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
    })
