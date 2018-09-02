<template>
  <div class="mui-content">
    <router-view></router-view>
    <header>
      <a>个人中心</a>
    </header>
    <div class="userInfoBox">
      <div class="userInfo">
      <div>
        <ul class="mui-table-view">
          <li class="mui-table-view-cell">
            <a>
              <i class="iconfont icon-wo"></i>手机号码
              <span class="phone right">{{item.phone}}</span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a>
              <i class="iconfont icon-jifen"></i>我的积分
              <span class="integral right">{{item.points}}</span>
            </a>
          </li>
        </ul>
        <ul class="mui-table-view">
          <li id="cheIns"
              class="mui-table-view-cell">
            <a class="mui-navigate-right"
               @click="sheetVisible = true">
              <i class="iconfont icon-qizhi"></i>所属行业
              <span class="industry right">{{industry}}</span>
            </a>
            <mt-actionsheet :actions="actions"
                            v-model="sheetVisible">
            </mt-actionsheet>
          </li>
          <router-link to="/userinfo/industry"
                       class="mui-table-view-cell li-item">
            <a class="mui-navigate-right">
              <i class="iconfont icon-plus-questionnaire"></i>参与的行业答题</a>
          </router-link>
        </ul>
        <ul class="mui-table-view">
          <router-link to="/userinfo/feedback"
                       class="mui-table-view-cell li-item">
            <a class="mui-navigate-right">
              <i class="iconfont icon-htmal5icon27"></i>问题反馈</a>
          </router-link>
          <router-link to="/userinfo/newPwd"
                       class="mui-table-view-cell li-item">
            <a class="mui-navigate-right">
              <i class="iconfont icon-xing"></i>修改密码</a>
          </router-link>
          <a class="mui-table-view-cell li-item"
             @click="this.confirmToLeave">
            <a class="mui-navigate-right">
              <i class="iconfont icon-setup_icon"></i>退出登录</a>
          </a>
        </ul>
      </div>
    </div>
    </div>
  </div>
</template>

<script>

import { Loading } from 'element-ui'
import { MessageBox } from 'mint-ui'
// import {
//   mapState,
//   mapGetters,
//   mapActions,
//   mapMutations
//   // mapGetters
// } from 'vuex'

export default {
  data() {
    return {
      item: {
      },
      careerList: {},
      industry: '',
      sheetVisible: false,
      fullHeight: document.documentElement.clientHeight,
      actions: [
        // example
        // { name: '公民', id: 0, method: (_self = this) => { this.selectCareer(_self.id); this.refresh() } },
      ]
    }
  },
  mounted() {
    // 自动适配屏幕高度
    // this.resizeHeight()

    // 初始化页面数据
    var _self = this
    this.refresh = function refresh() {
      // 显示Loading动画
      var loadinginstace = Loading.service({ fullscreen: true })

      // 请求数据
      // console.log(_self.$api.userinfo.init())
      _self.$api.userinfo.init()
        .then(([userInfo, careerList]) => {
          // 关闭loading动画
          loadinginstace.close()

          // 用户信息赋值
          _self.item = userInfo.data.data
          _self.industry = _self.item.career.name

          // 获取行业列表
          // console.log(careerList.data.data)
          _self.actions = careerList.data.data
          for (let index = 0; index < _self.actions.length; index++) {
            // _self.actions[index].id = index

            // 为每一个按钮添加选择行业的方法
            _self.actions[index].method = (_self = this) => {
              this.selectCareer(_self.id); setTimeout(() => {
                this.refresh()
              }, 200)
            }
            // console.log(_self.actions[0])
          }
        })
        .catch(error => {
          console.log(error)
          loadinginstace.close()
        })
    }
    this.refresh()

    // this.$store.commit('resetToken', null)
  },
  watch: {
    // 监控屏幕高度
    fullHeight(val) {
      if (!this.timer) {
        this.fullHeight = val
        this.timer = true
        const that = this
        setTimeout(function() {
          that.timer = false
        }, 400)
      }
    }
  },
  methods: {

    // 选择行业
    selectCareer(career_id) {
      this.$api.userinfo.selectCareer(career_id)
      this.refresh
    },

    // 监控屏幕高度
    // resizeHeight() {
    //   const container = document.querySelector('.mui-content')
    //   window.onresize = () => {
    //     return (() => {
    //       console.log('当前高度为：' + document.documentElement.clientHeight)
    //       container.style.height = document.documentElement.clientHeight + 'px'
    //       // container.style.height = window.fullHeight
    //     })()
    //   }
    // },

    // 确认离开
    confirmToLeave() {
      MessageBox({
        title: '提示',
        message: '确认退出登录吗？',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm') { // 确认的回调
            this.$store.commit('resetToken', null)
            window.localStorage.setItem('token', null)
            this.$router.push({ path: '/account/login' })
            this.$message({
              message: '退出登录成功！',
              type: 'success',
              center: true
              // /////////////下一步  判断密码错误
            })
          } else {
            console.log(2)
          }
        })
    }
  }
}
</script>


<style scoped src="@css/userinfo/index.css">
</style>

<style scoped>
.mui-content {
  height: 100vh;
  justify-content: center;
  /* overflow: hidden; */
}

.li-item {
  display: list-item;
}

.mui-navigate-right {
  color: #000 !important;
}

#app > div.mui-content > header {
  position: fixed;
  left: 50%;
  margin-left: -46px;
  color: #ffffff;
  line-height: 50px;
  /* font-weight: bold; */
  letter-spacing: 2px;
  font-weight: 700;
}
</style>

<style>
/* 此处为子组件通用样式 */
.container {
  background-color: #efefef;
  position: absolute;
  height: 100%;
  width: 100%;
}

.mui-bar-nav.mui-bar .mui-icon {
  margin-top: 0;
}

.mui-table-view-cell {
  padding-left:40px !important;
}

.userInfoBox {
  box-sizing: content-box;
  height: calc(100% - 119px);
  padding-top:50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.userInfo {
  position: relative !important;
  top: auto !important
}

.mui-content {
  overflow: hidden;
  transition: 0.5s all;
}
</style>