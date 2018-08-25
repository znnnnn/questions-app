<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/"
                   class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">XXXX类</h1>
    </header>
    <router-link to="/answer/answer">
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
      <p>点我跳转答题页面</p>
    </router-link>
    <router-view></router-view>
  </div>
</template>

<style scoped>
.indexContainer {
  padding-top: 44px;
  position: absolute;
  z-index: 99;
  height: 100%;
  width: 100%;
  background-color: #fdfaff;
}
</style>
