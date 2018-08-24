const path = require('path')
const {
  VueLoaderPlugin
} = require('vue-loader')
const HTMLPlugin = require('html-webpack-plugin')
const ExtractTextWebapckPlugin = require('extract-text-webpack-plugin')

const webpack = require('webpack')

const isDev = process.env.NODE_ENV === 'development'

const config = {
  target: 'web',
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader'
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
      test: /\.(gif|jpg|jpeg|png|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 1024,
          name: '[name].[ext]'
        }
      }]
    }
    ]
  },
  plugins: [
    // make sure to include the plugin for the magic
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new VueLoaderPlugin(),
    new HTMLPlugin()
  ],
  mode: 'development'
}

if (isDev) {
  config.module.rules.push({
    test: /\.css$/,
    use: [
      'vue-style-loader',
      'css-loader'
    ]
  })
  config.devtool = '#cheap-module-eval-source-map'
  config.devServer = {
    // 很重要
    useLocalIp: true,
    host: '0.0.0.0',
    port: '9797',
    overlay: {
      errors: true
    },
    // 自动打开浏览器
    open: true,
    // 热更新
    hot: true
    // historyFallback: {}
  }
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )
} else {
  config.entry = {
    app: path.join(__dirname, 'src/main.js'),
    vendor: ['vue']
  }
  config.output.filename = '[name].[chunkhash:8].js'
  config.module.rules.push({
    test: /\.css$/,
    use: ExtractTextWebapckPlugin.extract({
      use: 'css-loader'
    })

  })
  config.plugins.push(
    new ExtractTextWebapckPlugin('styles.[md5:contenthash:hex:20].css')),
  config.optimization = {
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
          name: 'runtime',
          priority: 10,
          enforce: true
        }
      }
    }
  }
}

module.exports = config
