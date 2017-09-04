const path = require('path'),
      // require current project root folder's absolute path string
      buildPath = path.resolve('.'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      CleanWebpackPlugin = require('clean-webpack-plugin'),
      ExtractTextPlugin = require('extract-text-webpack-plugin'),
      StyleExtHtmlWebpackPlugin = require('style-ext-html-webpack-plugin');

// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// extract base css rules into a file
const extractBaseCSS = new ExtractTextPlugin('base.[hash:8].css');
// extract pages' css rules into a file
const extractPagesCSS = new ExtractTextPlugin('css/pages.[hash:8].css');

module.exports = {
    entry: {
      app: path.resolve(__dirname, 'app/app.js')
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'js/[name].[chunkhash:8].js'
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
          include: path.resolve(__dirname, 'app/style'),
          use: extractBaseCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader?sourceMap']
          })
        },
        {
          test: /\.scss$/,
          include: path.resolve(__dirname, 'app/pages'),
          use: extractPagesCSS.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader?sourceMap'],
            publicPath: '../'
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
        },
        HTTP_BASE_URL: JSON.stringify('https://www.domain.com/api/')
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
      extractBaseCSS,
      // trans base.css into inline style
      new StyleExtHtmlWebpackPlugin(),
      // use link tag to load page css file
      extractPagesCSS
      // new BundleAnalyzerPlugin()
    ]
};
