<template>
  <div id="app">
    <router-view></router-view>
    <Tabs></Tabs>
  </div>
</template>

<script>
import Tabs from './components/tabs.vue'
export default {
  components: {
    Tabs
  },
  created() {
    // *
    // 初始化过程中
    // 如果window.localStorage.token 存在，则修改vuex中token的状态
    // *
    if (window.localStorage.getItem('token')) {
      this.$store.commit('resetToken', window.localStorage.getItem('token'))
    }
  },
  mounted() {
  },
  methods: {
  }
}
</script>
 <style lang="css">
  /* #app {
    height: 100%;
  } */
</style>

