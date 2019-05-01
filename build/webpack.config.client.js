const webpack = require('webpack')
const path = require('path')
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin')

const HTMLPlugin = require('html-webpack-plugin')
const {
  VueLoaderPlugin
} = require('vue-loader')

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const isDev = process.env.NODE_ENV === 'development'

const defaultPlugins = [
  // make sure to include the plugin for the magic
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new VueLoaderPlugin(),
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
]

let config
const devServer = {
  // 很重要
  useLocalIp: true,
  host: '0.0.0.0',
  historyApiFallback: {
    index: '/public/index.html'
  },
  port: '8000',
  overlay: {
    errors: true
  },
  // 自动打开浏览器
  open: true,
  // 热更新
  hot: true,
  proxy: {
    '/api': {
      // target: 'http://101.132.141.130:82/api/',
      target: 'http://aqzsjs.j2eeall.com/api/',
      pathRewrite: { '^/api': '' }
    }
  }
}
if (isDev) {
  config = merge(baseConfig, {
    output: {
      publicPath: '/public/'
    },
    // devtool = '#cheap-module-eval-source-map',
    module: {
      rules: [{
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }]
    },
    devServer,
    plugins: [new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: isDev ? '"development"' : '"production"'
        }
      }),
      new VueLoaderPlugin(),
      new HTMLPlugin({
        template: path.join(__dirname, 'template.html')
      })
    ]
  })
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/main.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    // historyApiFallback: {
    //   index: '/public/index.html'
    // },
    module: {
      rules: [{
        test: /\.css$/,
        use: ExtractTextWebapckPlugin.extract({
          use: 'css-loader'
        })
      }]
    },
    plugins: defaultPlugins.concat([
      new ExtractTextWebapckPlugin('styles.[md5:contenthash:hex:20].css')
    ]),
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            chunks: 'initial',
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0
          },
          vendor: {
            test: /node_modules/,
            chunks: 'initial',
            name: 'vendor',
            name: 'runtime', // eslint-disable-line no-alert
            priority: 10,
            enforce: true
          }
        }
      }
    }
  })
}

module.exports = config
