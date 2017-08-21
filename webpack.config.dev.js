const path = require('path'),
      webpack = require('webpack'),
      HtmlWebpackPlugin = require('html-webpack-plugin'),
      eslintFormatter = require('react-dev-utils/eslintFormatter');

const publicPath = './';

module.exports = {
    entry: [
      require.resolve('react-dev-utils/webpackHotDevClient'),
      // We ship a few polyfills by default:
      // require.resolve('./polyfills'),
      // Errors should be considered fatal in development
      // require.resolve('react-error-overlay'),
      // Finally, this is your app's code:
      path.resolve(__dirname, './app/app.js')
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        // Add /* filename */ comments to generated require()s in the output.
        pathinfo: true,
        // This does not produce a real file. It's just the virtual path that is
        // served by WebpackDevServer in development. This is the JS bundle
        // containing code from all our entry points, and the Webpack runtime.
        filename: 'js/bundle.js',
        // There are also additional JS chunk files if you use code splitting.
        chunkFilename: 'js/[name].chunk.js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
    },
    devtool: 'cheap-module-source-map',
    module: {
      rules: [
        // {
        //   test: /\.(js|jsx)$/,
        //   use: [
        //     {
        //       options: {
        //         formatter: eslintFormatter,
        //         eslintPath: require.resolve('eslint'),
        //         // @remove-on-eject-begin
        //         baseConfig: {
        //           extends: [require.resolve('eslint-config-react-app')],
        //         },
        //         ignore: false,
        //         useEslintrc: false,
        //         // @remove-on-eject-end
        //       },
        //       loader: require.resolve('eslint-loader'),
        //     },
        //   ],
        //   include: path.resolve(__dirname, 'app'),
        // },
        {
          oneOf: [
            {
              test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'media/[name].[hash:8].[ext]',
              },
            },
            {
              test: /\.(js|jsx)$/,
              include: path.resolve(__dirname, 'app'),
              loader: require.resolve('babel-loader'),
              options: {
                cacheDirectory: true,
                presets: ['react']
              },
            },
            // "postcss" loader applies autoprefixer to our CSS.
            // "css" loader resolves paths in CSS and adds assets as dependencies.
            // "style" loader turns CSS into JS modules that inject <style> tags.
            // In production, we use a plugin to extract that CSS to a file, but
            // in development "style" loader enables hot editing of CSS.
            {
              test: /\.css$/,
              use: [
                require.resolve('style-loader'),
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                  },
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            },
            // "file" loader makes sure those assets get served by WebpackDevServer.
            // When you `import` an asset, you get its (virtual) filename.
            // In production, they would get copied to the `build` folder.
            // This loader don't uses a "test" so it will catch all modules
            // that fall through the other loaders.
            {
              // Exclude `js` files to keep "css" loader working as it injects
              // it's runtime that would otherwise processed through "file" loader.
              // Also exclude `html` and `json` extensions so they get processed
              // by webpacks internal loaders.
              exclude: [/\.js$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'media/[name].[hash:8].[ext]',
              },
            },
          ],
        }
      ]
    },
    devServer: {
      contentBase: path.join(__dirname, "build"),
      hot: true,
      port: 9000
    },
    plugins: [
      new HtmlWebpackPlugin({template: 'app/index.html'}),
      new webpack.HotModuleReplacementPlugin()
    ]
};
