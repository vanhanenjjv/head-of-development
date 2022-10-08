const path = require('path')

const nodeExternals = require('webpack-node-externals')

const BannerPlugin = require('webpack').BannerPlugin
const CopyPlugin = require('copy-webpack-plugin')

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  target: 'node',
  entry: './src/index.ts',
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: 'host',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new BannerPlugin({
      banner: '#!/usr/bin/env node',
      raw: true
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/images', to: 'images' }        
      ]
    })
  ]
}
