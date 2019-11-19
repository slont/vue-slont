const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
  productionSourceMap: 'prod' !== process.env.VUE_APP_ENV,
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/assets/sass/common.sass"`
      }
    }
  },
  configureWebpack: {
    plugins: process.env.VUE_ANALYZE ? [new BundleAnalyzerPlugin()] : []
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true
    }
  }
}
