/* eslint no-unused-vars: 0 */
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

/**
 * @type {boolean}
 * @description Checks if process is running in development mode.
 */
const devMode = process.env.NODE_ENV === 'development';

/**
 * @type {HtmlWebpackPlugin}
 * @description Webpack plugin configured to generate html index template.
 */
const generateHtml = new HtmlWebpackPlugin({
  filename: 'index.html',
  template: './public/index.html',
  chunksSortMode: 'none',
});

/**
 * @type {?string}
 * @description Describe what kind of devtools webpack should use.
 */
const devtool = devMode ? 'source-map' : undefined;

/**
 * @type {object}
 * @description Webpack configuration object.
 */
const config = {
  devtool,

  /**
   * @type {object}
   * @description webpack-dev-server configuration.
   */
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    compress: true,
    overlay: true,
    port: 1234,
    hot: true,
    contentBase: path.resolve(__dirname, 'public'),
  },

  /**
   * @type {string}
   * @description Application entry point.
   */
  entry: {
    main: './src/index.jsx',
  },

  /**
   * @type {object}
   * @description Webpack output path, bundle and chunks name configuration.
   */
  output: {
    filename: 'bundle.[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
    path: path.resolve(__dirname, 'dist'),
  },

  /**
   * @type {object}
   * @description Webpack resolve configuration.
   */
  resolve: {
    modules: [path.resolve(__dirname), 'node_modules'],
    extensions: ['.js', '.jsx', '.json'],

    /**
     * @type {object}
     * @description Alias to easily import files.
     */
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

    /**
     *
     */
    new Dotenv({
      path: './.env',

      /**
       * @description Load '.env.example' to verify the '.env' variables are all set.
       */
      safe: true,

      /**
       * @description Load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
       */
      systemvars: true,
    }),

    /**
     * @description Detects circular dependencies.
     */
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/,
      failOnError: true,
      allowAsyncCycles: false,
      cwd: process.cwd(),
      /**
       * `onStart` is called before the cycle detection starts
       */
      onStart({ compilation }) {
        console.log('start detecting webpack modules cycles');
      },
      /**
       * `onDetected` is called for each module that is cyclical
       */
      onDetected({ module: webpackModuleRecord, paths, compilation }) {
        /**
         * `paths` will be an Array of the relative module paths that make up the cycle
         * `module` will be the module record generated by webpack that caused the cycle
         */
        compilation.errors.push(new Error(paths.join(' -> ')));
      },
      /**
       * `onEnd` is called before the cycle detection ends
       */
      onEnd({ compilation }) {
        console.log('end detecting webpack modules cycles');
      },
    }),

    /**
     * @description Generate a service worker script that will precache,
     * and keep up to date, the HTML & assets that are part of the Webpack build.
     */
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
      navigateFallback: `${process.env.PUBLIC_URL}/index.html`,
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    }),
  ],

  /**
   * @type {object}
   * @description All webpack module configuration.
   */
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src/'),
        exclude: /node_modules/,
        use: {
          loader: 'eslint-loader',
          options: {
            emitWarning: true,
            failOnError: true,
          },
        },
      },
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
              'transform-class-properties',
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
        test: /\.(sa|sc)ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              includePaths: [
                path.resolve(__dirname, 'src', 'scss'),
                path.resolve(__dirname, 'public'),
              ],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            minimize: true,
            removeComments: false,
            collapseWhitespace: false,
          },
        },
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
};

module.exports = config;
