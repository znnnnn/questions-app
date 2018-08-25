<template>

  <div>
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
      selected: '首页'
    }
  }
}
</script>


<style>
.tab-item {
  display: inline-block;
  width: 25%;
  text-align: center;
}

.mint-tab-item .mint-tab-item-label{
  color: #5c5c5c !important;
}

.mint-tabbar {
  z-index: 99;
  position: fixed !important;
}
</style>