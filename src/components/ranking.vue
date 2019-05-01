<template>
  <div id="rank">
    <div class="user-rank-info">
      <div class="rank-info">
        <a>我</a>
        <a>
          <span>{{items.my.phone ? items.my.phone : '未作答'}}</span>
          <span v-if="items.my.rank">第{{items.my.rank}}名</span>
          <span v-else>无名次</span>
        </a>
        <a v-if="items.my.sum_score">{{items.my.sum_score}}</a>
        <a v-else>{{'无'}}</a>
      </div>
      <div></div>
    </div>
    <div class="top-ten">
      <ul>
        <li v-for="(item, key, index) in items['rank']"
            :key="index">
          <div class="rank-info">
            <a>{{index + 1}}</a>
            <a>{{item.phone ? item.phone : ''}}</a>
            <a>{{item.sum_score ? item.sum_score : '无'}}</a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      idx: 1
    }
  },
  mounted() {
    // console.log(this.items.rank[0].sum_score)
  }
}
</script>

<style scoped src="@css/ranking/index.css">
</style>

<style scoped>
#rank {
  /* padding-bottom: 50px !important; */
}
</style>
