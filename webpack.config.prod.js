const path = require('path'),
      // require current project root folder's absolute path string
      buildPath = path.resolve('.'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractPageSass = new ExtractTextPlugin({
    filename: "styles/base.[hash:8].css"
});

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: {
      app: path.resolve(__dirname, 'app/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[hash:8].js'
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        {
          test: /\.(bmp|gif|jpg|jpeg|png|svg)$/,
          use: [{
            loader: 'url-loader',
            options: {
              limit: 10240,
              name: 'images/[name].[hash:8].[ext]'
            }
          }, {
            loader: 'img-loader'
          }]
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
          use: extractPageSass.extract({
              use: [{
                  loader: "css-loader"
              }, {
                  loader: "sass-loader"
              }],
              // use style-loader in development
              fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [
      // clean up build directory
      new CleanWebpackPlugin(['build'], {
        root: buildPath,
        verbose: true,
        dry: false
      }),
      // inject resource into html file
      new HtmlWebpackPlugin({template: 'app/index.html'}),
      // using product version
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      // uglify js files
      new webpack.optimize.UglifyJsPlugin({
        sourceMap: true
      }),
      // splict vendor files
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: module => module.context && module.context.indexOf('node_modules') !== -1
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "common"
      }),
      extractPageSass,
      // new BundleAnalyzerPlugin()
    ]
};
