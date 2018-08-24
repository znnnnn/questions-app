<template>
  <nav id="bar"
       class="mui-bar mui-bar-tab">
    <router-link to="/" class="tab-item">
        <i class="mui-icon iconfont icon-shouye"></i>
        <span class="mui-tab-label">首页</span>
    </router-link>
    <router-link to="/integral" class="tab-item">
        <i class="mui-icon iconfont icon-jifen"></i>
        <span class="mui-tab-label">积分兑换</span>
    </router-link>
    <router-link to="/ranking" class="tab-item">
        <i class="mui-icon iconfont icon-paixing"></i>
        <span class="mui-tab-label">排行榜</span>
    </router-link>
    <router-link to="/userInfo" class="tab-item">
        <i class="mui-icon iconfont icon-wode"></i>
        <span class="mui-tab-label">我</span>
    </router-link>
  </nav>
</template>

<style>
/* @import url("../../fonts/iconfont.css"); */

.tab-item {
  display: inline-block;
  width: 25%;
  text-align: center
}

</style>