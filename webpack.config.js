'use strict';

var HappyPack = require('happypack')
var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  devtool: 'inline-source-map',
  entry: './src/index.ts',
  output: { filename: './index.js' },
  target: 'node',
  resolve: {
    extensions: [ '.ts', '.tsx', 'js' , 'json']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader?id=ts',
        options: {
          transpileOnly: true // IMPORTANT! use transpileOnly to speed-up compilation
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'happypack/loader?id=js',
      },
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true }),
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      loaders: [
        {
          id: 'js',
          loader: 'babel-loader',
          query: { presets: [ '@babel/preset-env' ] }
        },
      ]
    }),
    new HappyPack({
      // 3) re-add the loaders you replaced above in #1:
      loaders: [
        {
          id: 'ts',
          loader: 'ts-loader',
          query: { happyPackMode: true }
        },
      ]
    })
  ]
};
