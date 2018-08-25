import Vue from 'vue'
import Router from 'vue-router'

import homePage from '@views/index.vue'
import integral from '@views/integral.vue'
import ranking from '@views/ranking.vue'
import userinfo from '@views/userinfo.vue'

// 二级路由
import common from '@views/answer/common.vue'
import indexIndustry from '@views/answer/indexIndustry.vue'
import answer from '@views/answer/answer.vue'

import industry from '@views/userinfo/industry.vue'
import newPwd from '@views/userinfo/newPwd.vue'
import feedback from '@views/userinfo/feedback.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  component: homePage,
  children: [
    {
      path: '/answer/common',
      component: common
    },
    {
      path: '/answer/indexIndustry',
      component: indexIndustry
    },
    {
      path: '/answer/answer',
      component: answer
    }
  ]
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
