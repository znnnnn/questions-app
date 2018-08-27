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

