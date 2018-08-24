import Vue from 'vue'
import App from './app.vue'
import router from './router' /* 引入路由配置*/

import '../css/mui.min.css'
import '../css/common-css.css'
import '../css/main.css'
import '../css/mui.picker.min.css'

// import '../js/mui.min.js'
// import '../js/.js'

// require('../js/mui.min')
// require('../js/common')
// require('../app')
// require('../mui.picker.min')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
