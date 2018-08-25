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
        <ranking :items="items"></ranking>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4"
                 :title="'测试 ' + n"
                 :key=n />
        <!-- <ranking :items="items"></ranking> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6"
                 :title="'选项 ' + n"
                 :key=n />
        <!-- <ranking :items="items"></ranking> -->
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 6"
                 :title="'选项 ' + n"
                 :key=n />
        <!-- <ranking :items="items"></ranking> -->
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
      items: {
        // 排名
        'rank': [
          {
            'user_id': 1,
            // 手机号
            'phone': '15305875281',
            // 总分（百分比总分）
            'sum_score': 210,
            'rank': 1
          },
          {
            'user_id': 2,
            'phone': '15305875280',
            'sum_score': 160,
            'rank': 2
          },
          {
            'user_id': 3,
            'phone': '15305875280',
            'sum_score': 150,
            'rank': 3
          },
          {
            'user_id': 4,
            'phone': '15305875280',
            'sum_score': 140,
            'rank': 4
          }
        ],
        // 我的排名
        'my': {
          'user_id': 1,
          'phone': '15305875280',
          'sum_score': 160,
          // 排名
          'rank': 2
        }},
      selected: '1',
      title: ''
    }
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
