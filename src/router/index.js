import Vue from 'vue'
import Router from 'vue-router'

import homePage from '../view/index'
import integral from '../view/integral'
import ranking from '../view/ranking'
import userinfo from '../view/userinfo'

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
  routes
})
