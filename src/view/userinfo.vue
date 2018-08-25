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
              <span class="phone right"></span>
            </a>
          </li>
          <li class="mui-table-view-cell">
            <a>
              <i class="iconfont icon-jifen"></i>我的积分
              <span class="integral right"></span>
            </a>
          </li>
          <li class="mui-table-view-cell li-item"
              data-hr="userInfo/newPwd.html">
            <a class="mui-navigate-right">
              <i class="iconfont icon-xing"></i>修改密码</a>
          </li>
        </ul>
        <ul class="mui-table-view">
          <li id="cheIns"
              class="mui-table-view-cell">
            <a class="mui-navigate-right" @click="sheetVisible = true">
              <i class="iconfont icon-qizhi"></i>所属行业
              <span class="industry right"></span>
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
          <li class="mui-table-view-cell li-item"
              data-hr="userInfo/feedback.html">
            <a class="mui-navigate-right">
              <i class="iconfont icon-htmal5icon27"></i>问题反馈</a>
          </li>
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
export default {
  data() {
    return {
      sheetVisible: false,
      fullHeight: document.documentElement.clientHeight,
      actions: [
        { name: 1, method: function() { alert(1) } },
        { name: 2, method: function() { alert(2) } },
        { name: 3, method: function() { alert(3) } }
      ]
    }
  },
  mounted() {
    const container = document.querySelector('.mui-content')
    container.style.height = this.fullHeight + 'px'
    const that = this
    window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight
        that.fullHeight = window.fullHeight
      })()
    }
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
.mui-content {
  height: 100vh;
}
</style>

<style scoped>
.li-item {
  display: list-item;
}

.mui-navigate-right {
  color: #000 !important;
}
</style>
