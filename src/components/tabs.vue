<template>

  <div>
    <mt-tabbar v-model="selected">
      <router-link to="/" class="mint-tab-item">
        <mt-tab-item id="首页">
          <img slot="icon">
          首页
        </mt-tab-item>
      </router-link>
      <router-link to="/integral" class="mint-tab-item">
      <mt-tab-item id="积分兑换">
        <img slot="icon"> 积分兑换
      </mt-tab-item>
      </router-link>
      <router-link to="/ranking" class="mint-tab-item">
      <mt-tab-item id="排行榜">
        <img slot="icon"> 排行榜
      </mt-tab-item>
      </router-link>
      <router-link to="/userinfo" class="mint-tab-item">
      <mt-tab-item id="我">
        <img slot="icon"> 我
      </mt-tab-item>
      </router-link>
    </mt-tabbar>
  </div>
</template>

<style scoped>
/* @import url("../../fonts/iconfont.css"); */

.tab-item {
  display: inline-block;
  width: 25%;
  text-align: center;
}
</style>