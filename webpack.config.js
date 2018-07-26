const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const devMode = process.env.NODE_ENV === 'development'

const publicUrl = devMode
  ? ''
  : 'http://localhost:1234';
const generateHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './public/index.html',
  chunksSortMode: 'none',
})

const devtool = devMode ? 'source-map' : undefined

const config = {
  devtool,
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    compress: true,
    overlay: true,
    port: 1234,
    hot: true,
  },
  output: {
    filename: 'bundle.[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js'],
    alias: {
      src: path.resolve(__dirname, 'src/'),
      tools: path.resolve(__dirname, 'src/tools'),
      store: path.resolve(__dirname, 'src/store'),
      modules: path.resolve(__dirname, 'src/modules'),
      assets: path.resolve(__dirname, 'public/assets'),
      components: path.resolve(__dirname, 'src/components'),
      repositories: path.resolve(__dirname, 'src/repositories'),
      scss: path.resolve(__dirname, 'src/scss'),
    },
  },
  plugins: [
    generateHtml,
    new OptimizeCssAssetsPlugin({}),
    new webpack.HotModuleReplacementPlugin({}),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[hash].css',
      chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      BASE_URL: JSON.stringify('http://localhost:3000'),
    }),
    new SWPrecacheWebpackPlugin({

      /**
       * By default, a cache-busting query parameter is appended to requests
       * used to populate the caches, to ensure the responses are fresh.
       * If a URL is already hashed by Webpack, then there is no concern
       * about it being stale, and the cache-busting can be skipped.
       */
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          /**
           * This message occurs for every build and is a bit too noisy.
           */
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          /**
           * This message obscures real errors so we ignore it.
           * https://github.com/facebookincubator/create-react-app/issues/2612
           */
          return;
        }
        console.log(message);
      },
      minify: true,
      navigateFallback: publicUrl + '/index.html',
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['env', 'react', 'stage-0'],
            plugins: [
              'transform-runtime',
            ],
            env: {
              development: {
                presets: ['react-hmre'],
              },
              production: {
                presets: ['react-optimize'],
              },
            },
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.woff\d?(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/font-woff',
          },
        }],
      },
      {
        test: /\.ttf(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'application/octet-stream',
          },
        }],
      },
      {
        test: /\.eot(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        }],
      },
      {
        test: /\.svg(\?.+)?$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
          },
        }],
      },
      {
        test: /\.png$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/png',
          },
        }],
      },
      {
        test: /\.gif$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/gif',
          },
        }],
      },
    ],
  },
}

module.exports = config