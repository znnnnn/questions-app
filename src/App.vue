<template>
  <div id="app">
    <router-view></router-view>
    <Tabs></Tabs>
  </div>
</template>

<script>

import Tabs from './components/tabs.vue'

export default {
  el: '#app',
  components: {
    Tabs
  },
  mounted() {
    // (function($, doc) {
    //   $.init()

    //   mui('#bar').on('tap', 'a', function(e) {
    //     console.log(111)
    //   })
    // }(mui, document))
  },
  methods: {
  }
}
</script>

<style lang="css">

</style>

