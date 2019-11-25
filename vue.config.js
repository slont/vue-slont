const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  productionSourceMap: 'prod' !== process.env.VUE_APP_ENV,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass/variables.sass"`
      }
    }
  },
  configureWebpack: {
    plugins: 'true' === process.env.VUE_ANALYZE ? [new BundleAnalyzerPlugin()] : []
  },
  pwa: {
    name: 'My App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    skipWaiting: true,
    clientsClaim: true
  }
}
