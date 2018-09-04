const path = require('path')
const createVueLoaderOptions = require('./vue-loader.config')

const webpack = require('webpack')
const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.resolve(__dirname, '../src/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/public/dist/'
  },
  resolve: {
    alias: {
      common: require('path').resolve(__dirname, '../src/common'),
      '@src': path.resolve('src'),
      '@components': path.resolve('src/components'),
      '@views': path.resolve('src/view'),
      '@utils': path.resolve('src/utils'),
      '@img': path.resolve('images/'),
      '@css': path.resolve('css/')
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: createVueLoaderOptions(isDev)
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    },
    {
      test: /\.styl/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        },
        'stylus-loader'
      ]
    },
    {
      test: /\.(woff|woff2|eot|ttf)$/,
      loader: 'url-loader?limit=100000'
    },
    {
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: 'url-loader?limit=8962&name=[name]_[hash].[ext]?[hash]=static/img/'
        // options: {
        //   limit: 1024,
        //   name: 'resources/[path][name].[ext]'
        // }
      }]
    }
    ]
  },
  mode: process.env.NODE_ENV || 'production'
}

module.exports = config
