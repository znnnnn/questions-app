import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@views/index.vue'
import integral from '@views/integral.vue'
import ranking from '@views/ranking.vue'
import userinfo from '@views/userinfo.vue'
import refresh from '@components/refresh.vue'

// 答题页面路由
import common from '@views/answer/common.vue'
import indexIndustry from '@views/answer/indexIndustry.vue'
import answer from '@views/answer/answer.vue'

// userinfo路由
import industry from '@views/userinfo/industry.vue'
import newPwd from '@views/userinfo/newPwd.vue'
import feedback from '@views/userinfo/feedback.vue'

// account路由
import login from '@views/account/login.vue'
import register from '@views/account/register.vue'
import forgotPassword from '@views/account/forgotPassword.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  base: '/dist/',
  component: homePage,
  children: [
    {
      path: '/answer/common',
      component: common
    },
    {
      path: '/answer/indexIndustry',
      component: indexIndustry,
      meta: {
        navShow: false
      }
    },
    {
      path: '/answer/answer',
      component: answer
    }
  ]
},
{
  path: '/', component: homePage, alias: '/public/dist/index.html'
},
{
  path: '/', component: homePage, alias: '/public/dist/'
}, {
  path: '/integral',
  component: integral
}, {
  path: '/ranking',
  component: ranking
},
{
  path: '/userinfo',
  component: userinfo,
  children: [
    {
      path: '/userinfo/newPwd',
      component: newPwd,
      meta: {
        navShow: false
      }
    },
    {
      path: '/userinfo/industry',
      component: industry,
      meta: {
        navShow: false
      }
    },
    {
      path: '/userinfo/feedback',
      component: feedback,
      meta: {
        navShow: false
      }
    }
  ]
},
{
  path: '/refresh',
  component: refresh
},
{
  path: '/account/login',
  component: login,
  meta: {
    navShow: false
  }
},
{
  path: '/account/register',
  component: register,
  meta: {
    navShow: false
  }
},
{
  path: '/account/forgotPassword',
  component: forgotPassword,
  meta: {
    navShow: false
  }
}]

export default new Router({
  routes
  // mode: 'history'
})
