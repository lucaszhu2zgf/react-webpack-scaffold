const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      // verdor: ['react', 'react-dom', 'react-router'],
      app: path.resolve(__dirname, 'app/app.js'),
      // util: path.resolve(__dirname, 'app/utils')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10240
            }
          }
        },
        {
          test: /\.(js|jsx)$/,
          include: path.resolve(__dirname, 'app'),
          use: {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'es2015']
            }
          }
        },
        {
          test: /\.scss$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'app/index.html'}),
      new webpack.HotModuleReplacementPlugin()
    ]
};
