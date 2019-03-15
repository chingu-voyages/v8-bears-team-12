const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV;
const DEBUG = mode !== 'production';

console.log(`Webpack mode: ${mode}`);

module.exports = {
  mode,
  entry: {
    main: [
      '@babel/polyfill',
      './client/src/index.js',
      DEBUG ? 'webpack-hot-middleware/client' : null,
    ].filter(e => e),
  },
  output: {
    path: path.resolve(__dirname, 'client', 'build'),
    filename: '[name].js',
    //publicPath: '/dist',
  },
  plugins: [
    new CleanWebpackPlugin(),
    DEBUG ? null : new MiniCssExtractPlugin({filename: '[name].css'}),
    DEBUG ? new webpack.HotModuleReplacementPlugin() : null,
  ].filter(e => e),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          DEBUG ? null : {loader: MiniCssExtractPlugin.loader},
          DEBUG ? 'style-loader' : null,
          'css-loader',
        ].filter(e => e),
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
};
