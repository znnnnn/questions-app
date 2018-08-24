import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../view/index.vue'
import integral from '../view/integral.vue'
import ranking from '../view/ranking.vue'
import userinfo from '../view/userinfo.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  component: homePage
}, {
  path: '/integral',
  component: integral
}, {
  path: '/ranking',
  component: ranking
},
{
  path: '/userinfo',
  component: userinfo
}]

export default new Router({
  routes,
  mode: 'history'
})
