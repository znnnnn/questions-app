import Vue from 'vue'
import App from './app.vue'
import router from './router' /* 引入路由配置*/
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '../fonts/iconfont.css'
import '../css/common-css.css'
import '../css/mui.min.css'
import '../css/main.css'
// import '../css/mui.picker.min.css'
import 'mint-ui/lib/style.css'

Vue.use(MintUI)
Vue.use(ElementUI)
// import mui from '../js/mui.min.js'

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
