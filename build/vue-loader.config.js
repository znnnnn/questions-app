// const docsLoader = require.resolve('./doc-loader')

module.exports = (isDev) => {
  return {
    preserveWhitespace: true,
    extractCss: !isDev,
    cssModules: {
      localIdentName: '[path]-[name]-[hash:base64:5]',
      camelCase: true
    }
    // hotReload: false //根据环境变量生成
    // loaders: {
    //   'docs': docsLoader
    // }
    // preLoader: {

    // }
  }
}
