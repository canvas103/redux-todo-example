/**
 * Created by chenghuijin on 11/9/2016.
 */
const webpack = require('webpack');
const resolve = require('path').resolve;
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const isProd = process.env.NODE_ENV === 'production';
// const isTest = process.env.NODE_ENV === 'test';

module.exports = env => {
    const addPlugin = (add, plugin) => add ? plugin : undefined;
    const ifProd = plugin=>addPlugin(env.prod, plugin);
    const removeEmpty = array =>array.filter(i=>!!i);
    return {
        entry: {
            app: './js/app.js',
            vender: ['lodash', 'jquery', 'react', 'react-redux']
        },
        output: {
            filename: 'bundle.[name].js',
            path: resolve(__dirname, 'dist'),
            pathinfo: !env.prod,
        },
        context: resolve(__dirname, 'src'),
        devtool: env.prod ? 'source-map' : 'eval',
        bail: env.prod,
        module: {
            loaders: [{
                test: /\.js$/,
                loader: 'babel!eslint',
                exclude: /node_modules/

            }, {
                test: /\.css$/,
                loader: 'style!css'
            },
                // {
                //     test: require.resolve('non_node_module'),
                //     loaders:[ 'imports?window=>{}','exports?non_node_module']
                // }
            ]
        },
        plugins: removeEmpty([
            ifProd(new webpack.optimize.DedupePlugin()),
            ifProd(new webpack.LoaderOptionsPlugin({
                minimize: true,
                debug: false,
            })),
            ifProd(new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"',
                }
            })),
            ifProd(new webpack.optimize.UglifyJsPlugin({
                compress: {
                    screw_ie8: true, //eslint-disable-line
                    warnings: false,
                }
            })),
            new HtmlWebpackPlugin({
                template: './index.html'
            }),
            env.test ? undefined : new webpack.optimize.CommonsChunkPlugin({
                name: 'common',
                filename: 'bundle.common.js'
            }),
            env.test ? undefined : new webpack.optimize.CommonsChunkPlugin({
                name: 'vender',
                chunks: ['app', 'vender']
            })
        ])
    }
}

