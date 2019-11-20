import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import mixin from './mixins/common'

Vue.config.productionTip = false

Vue.use({install: vue => vue.mixin(mixin)})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
