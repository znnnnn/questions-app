import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@views/index.vue'
import integral from '@views/integral.vue'
import ranking from '@views/ranking.vue'
import userinfo from '@views/userinfo.vue'

// 二级路由
import industry from '@views/userinfo/industry.vue'
import newPwd from '@views/userinfo/newPwd.vue'
import feedback from '@views/userinfo/feedback.vue'

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
  component: userinfo,
  children: [
    {
      path: '/userinfo/newPwd',
      component: newPwd
    },
    {
      path: '/userinfo/industry',
      component: industry
    },
    {
      path: '/userinfo/feedback',
      component: feedback
    }
  ]
}]

export default new Router({
  routes,
  mode: 'history'
})
