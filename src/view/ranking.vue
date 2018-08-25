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
        <!-- <mt-cell v-for="n in 10"
                 :title="'内容 ' + n" :key=n /> -->
        <div id="rank">
          <div class="user-rank-info">
            <div class="rank-info">
              <a>我</a>
              <a>
                <span>3213321321</span>
                <span>第50名</span>
              </a>
              <a>42141</a>
            </div>
            <div></div>
          </div>
          <div class="top-ten">
            <ul>
              <li>
                <div class="rank-info">
                  <a>1</a>
                  <a>123312312</a>
                  <a>123123</a>
                </div>
              </li>
              <li>
                <div class="rank-info">
                  <a>2</a>
                  <a>123312312</a>
                  <a>123123</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        <mt-cell v-for="n in 4"
                 :title="'测试 ' + n"
                 :key=n />
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        <mt-cell v-for="n in 6"
                 :title="'选项 ' + n"
                 :key=n />
      </mt-tab-container-item>
      <mt-tab-container-item id="4">
        <mt-cell v-for="n in 6"
                 :title="'选项 ' + n"
                 :key=n />
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: '1',
      title: ''
    }
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
</style>
