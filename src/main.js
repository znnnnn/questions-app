import Vue from 'vue'
// import App from './App' /* 引入App这个组件*/
import router from './router' /* 引入路由配置*/
import Tabs from './components/tabs'
Vue.config.productionTip = false

Vue.component('button-tab', Tabs)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router
  //   render: h => h(App)
})
