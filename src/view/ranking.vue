<template>
  <div style="height:100%">
    <header class="header">
      <a>排行榜</a>
    </header>
    <mt-navbar v-model="selected" id="typeTabs">
      <mt-tab-item id="1" type="1">知识类</mt-tab-item>
      <mt-tab-item id="2" type="2">专业类</mt-tab-item>
      <mt-tab-item id="3" type="3">竞赛类</mt-tab-item>
      <mt-tab-item id="0" type="0">总排行榜</mt-tab-item>
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
      <mt-tab-container-item id="0">
        <ranking v-if="items[0]" :items="items[0]"></ranking>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>

import ranking from '@components/ranking.vue'
import { Loading } from 'element-ui'

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
    // // 一次性全部请求，但会造成闪烁
    // var _this = this
    // var index = 0
    // function getRank(index) {
    //   if (index < 4) {
    //     _this.$api.ranking.getRankingList(index)
    //       .then(res => {
    //       // console.log(i)
    //         _this.$set(_this.items, index, res.data.data)
    //         index += 1
    //         getRank(index)
    //       })
    //   }
    // }
    // getRank(index)

    // 点击tab请求，将四次请求分开
    var loadinginstace = Loading.service({ fullscreen: true })
    this.$api.ranking.getRankingList(1)
      .then(res => {
        //       // console.log(i)
        loadinginstace.close()
        this.$set(this.items, 1, res.data.data)
      })
      .catch(err => {
        console.log('error:', err)
        loadinginstace.close()
      })

    var _this = this
    var type
    const tabsBtnGroup = document.querySelectorAll('#typeTabs .mint-tab-item')
    // console.log(tabsBtnGroup)
    for (const tabItem of tabsBtnGroup) {
      tabItem.addEventListener('click', function() {
        // console.log(tabItem.getAttribute('type'))
        type = tabItem.getAttribute('type')
        _this.$api.ranking.getRankingList(type)
          .then(res => {
            console.log(res)
            _this.$set(_this.items, type, res.data.data)
          })
      })
      // console.log(tabItem)
    }

    // // mock数据测试
    // this.$api.test.test()
    //   .then(res => {
    //     console.log(res)
    //   })
  }
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

.mint-tab-container {
  width: 100%;
  /* position: fixed;
  top: 96px;
  bottom: 69px; */
  overflow: auto;
  padding-top:3px;
}
</style>
