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
  meta: {
    title: '首页'
  },
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
  component: integral,
  meta: {
    title: '积分兑换'
  }
}, {
  path: '/ranking',
  component: ranking,
  meta: {
    title: '排行榜'
  }
},
{
  path: '/userinfo',
  component: userinfo,
  children: [
    {
      path: '/userinfo/newPwd',
      component: newPwd,
      meta: {
        title: '修改密码'
      }
    },
    {
      path: '/userinfo/industry',
      component: industry,
      meta: {
        title: '参与的行业答题'
      }
    },
    {
      path: '/userinfo/feedback',
      component: feedback,
      meta: {
        title: '问题反馈'
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
    title: '网络安全答题平台'
  }
},
{
  path: '/account/register',
  component: register,
  meta: {
    title: '注册'
  }
},
{
  path: '/account/forgotPassword',
  component: forgotPassword,
  meta: {
    title: '忘记密码'
  }
}]

export default new Router({
  routes,
  mode: 'history'
})
