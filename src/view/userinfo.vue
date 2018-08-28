<template>
  <div class="mui-content">
    <router-view></router-view>
    <header>
      <a>个人中心</a>
    </header>
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
          <li class="mui-table-view-cell"
              id="exit">
            <a class="mui-navigate-right">
              <i class="iconfont icon-setup_icon"></i>退出登录</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>

import { Loading } from 'element-ui'
export default {
  data() {
    return {
      item: {
      },
      industry: '',
      sheetVisible: false,
      fullHeight: document.documentElement.clientHeight,
      actions: [
        { name: '公民', method: function() { console.log(1) } },
        { name: '医疗行业', method: function() { console.log(2) } },
        { name: '金融行业', method: function() { console.log(3) } },
        { name: '交通', method: function() { console.log(4) } },
        { name: '电信', method: function() { console.log(5) } }
      ]
    }
  },
  mounted() {
    const container = document.querySelector('.mui-content')
    window.onresize = () => {
      return (() => {
        console.log(document.documentElement.clientHeight)
        container.style.height = document.documentElement.clientHeight + 'px'
        // container.style.height = window.fullHeight
      })()
    }

    var loadinginstace = Loading.service({ fullscreen: true })
    this.$api.userinfo.getUserInfo()
      .then(res => {
        loadinginstace.close()
        this.item = res.data.data
        this.industr = this.item.career.name
        // console.log(this.item.career.name)
      })
  },
  watch: {
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
  }
}
</script>


<style scoped src="@css/userinfo/index.css">

</style>

<style scoped>
.mui-content {
  height: 100vh;
  /* overflow: hidden; */
}

.li-item {
  display: list-item;
}

.mui-navigate-right {
  color: #000 !important;
}
</style>

<style>
/* 此处为子组件通用样式 */
.container {
  background-color: #efefef;
  position: absolute;
  height: 100%;
  width:100%;
}

.mui-bar-nav.mui-bar .mui-icon {
  margin-top:0;
}
</style>