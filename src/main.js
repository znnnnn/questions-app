// node_modules
import Vue from 'vue'
import App from './app.vue'
import router from './router' /* 引入路由配置*/
import Vuex from 'vuex'
import MintUI from 'mint-ui'
import ElementUI from 'element-ui'
import VueFullPage from 'vue-fullpage.js'


// 自己定义的模块
import api from './api' // 导入api接口
import store from './store/index'

// css
import 'element-ui/lib/theme-chalk/index.css'
// import '../fonts/iconfont.css'
import '../css/common-css.css'
import '../css/mui.min.css'
import '../css/main.css'
// import '../css/mui.picker.min.css'
import 'mint-ui/lib/style.css'

// 注册组件和接口
Vue.prototype.$api = api // 将api挂载到vue的原型上
Vue.use(Vuex)
Vue.use(MintUI)
Vue.use(ElementUI)
Vue.use(VueFullPage)
// const store = createStore()

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
