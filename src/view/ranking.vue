<template>
  <div>
    <header class="header">
      <a>排行榜</a>
    </header>
    <mt-navbar v-model="selected">
      <mt-tab-item id="1">知识类</mt-tab-item>
      <mt-tab-item id="2">专业类</mt-tab-item>
      <mt-tab-item id="3">竞赛类</mt-tab-item>
      <mt-tab-item id="4">总排行榜</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        <ranking v-if="items[1]" :items="items[1]"></ranking>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <ranking v-if="items[2]" :items="items[2]"></ranking>
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <ranking v-if="items[3]" :items="items[3]"></ranking>
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <ranking v-if="items[0]" :items="items[0]"></ranking>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>

import ranking from '@components/ranking.vue'

export default {
  components: { ranking },
  data() {
    return {
      items: [],
      selected: '1',
      title: ''
    }
  },
  mounted() {
    var _this = this
    var index = 0
    function getRank(index) {
      if (index < 4) {
        _this.$api.ranking.getRankingList(index)
          .then(res => {
          // console.log(i)
            _this.$set(_this.items, index, res.data.data)
            index += 1
            getRank(index)
          })
      }
    }

    getRank(index)
  }
  // mounted() {
  //   console.log(this.item.rank)
  // }
}
</script>


<style scoped src="@css/ranking/index.css">
</style>

<style scoped>
.mint-tab-item {
  background-color: #efefef;
}

.mint-tab-item {
  color: #5c5c5c !important;
}

.mint-navbar .mint-tab-item.is-selected {
  color: #0097a8 !important;
}
</style>
