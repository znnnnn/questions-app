import Vue from 'vue'
import App from './app.vue'
import router from './router' /* 引入路由配置*/

import '../css/common-css.css'
import '../css/main.css'
import '../css/mui.picker.min.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
