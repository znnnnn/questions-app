<template>

  <div :class="hidshow?'':'mui-hidden '">
    <mt-tabbar v-model="selected">
      <router-link to="/" class="mint-tab-item">
        <mt-tab-item id="首页">
          <img slot="icon" src="~@img/tab-1.png">
          首页
        </mt-tab-item>
      </router-link>
      <router-link to="/integral" class="mint-tab-item">
      <mt-tab-item id="积分兑换">
        <img slot="icon" src="~@img/tab-2.png"> 积分兑换
      </mt-tab-item>
      </router-link>
      <router-link to="/ranking" class="mint-tab-item">
      <mt-tab-item id="排行榜">
        <img slot="icon" src="~@img/tab-3.png"> 排行榜
      </mt-tab-item>
      </router-link>
      <router-link to="/userinfo" class="mint-tab-item">
      <mt-tab-item id="我">
        <img slot="icon" src="~@img/tab-4.png"> 我
      </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '首页',
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidshow: true // 显示或者隐藏footer
    }
  },
  mounted() {
    window.onresize = () => {
      return (() => {
        this.showHeight = document.body.clientHeight
      })()
    }
  },
  watch: {
    showHeight: function() {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    }
  }
}
</script>


<style scoped>
.tab-item {
  display: inline-block;
  width: 25%;
  text-align: center;
}

.mint-tab-item {
  color: #5c5c5c !important;
  background-color: #efefef;
}

.router-link-exact-active .mint-tab-item{
  color: #0097a8 !important;
}

.mint-tabbar {
  z-index: 99;
  position: fixed !important;
}
</style>