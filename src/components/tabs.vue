<template>

  <div v-show="$route.meta.navShow !== false">
    <mt-tabbar v-model="selected">
      <router-link to="/" class="mint-tab-item">
        <mt-tab-item id="首页">
          <svg class="icon" aria-hidden="true"><use xlink:href="#icon-shouye"></use></svg>
          首页
        </mt-tab-item>
      </router-link>
      <router-link to="/integral" class="mint-tab-item">
      <mt-tab-item id="积分兑换">
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-jifen"></use></svg>
        积分兑换
      </mt-tab-item>
      </router-link>
      <router-link to="/ranking" class="mint-tab-item">
      <mt-tab-item id="排行榜">
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-paixing"></use></svg>
        排行榜
      </mt-tab-item>
      </router-link>
      <router-link to="/userinfo" class="mint-tab-item">
      <mt-tab-item id="我">
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-wode"></use></svg>
        我
      </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<script>
import { test } from '../../js/iconfont.js'
export default {
  data() {
    return {
      selected: '首页',
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidshow: true, // 显示或者隐藏footer
      index: 0
    }
  },
  mounted() {
    test()
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
.icon {
  display: block;
  width: 25px;
  height: 25px;
  margin: auto;
  margin-bottom: 5px;
  fill: #5c5c5c;
}
.tab-item {
  display: inline-block;
  width: 25%;
  text-align: center;
}

.mint-tab-item {
  color: #5c5c5c !important;
  background-color: #efefef;
}

.router-link-exact-active .mint-tab-item {
  color: #0097a8 !important;
}

.router-link-exact-active .mint-tab-item .icon {
  fill: #0097a8;
}

.mint-tabbar {
  z-index: 99;
  position: fixed !important;
}
</style>