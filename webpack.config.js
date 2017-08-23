const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
      app: path.resolve(__dirname, 'app/app.js'),
      verdor: ['react', 'react-dom', 'react-router']
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(bmp|gif|jpe?g|png)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'images/[name].[ext]'
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
          test: /\.sass$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader' },
            { loader: 'sass-loader' }
          ]
        }
      ]
    },
    // devServer: {
    //   contentBase: path.join(__dirname, "build"),
    //   hot: true,
    //   port: 9000
    // },
    plugins: [
      new HtmlWebpackPlugin({template: 'app/index.html'}),
      new webpack.HotModuleReplacementPlugin()
    ]
};