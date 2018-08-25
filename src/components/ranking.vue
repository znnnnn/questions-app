<template>
  <div id="rank">
    <div class="user-rank-info">
      <div class="rank-info">
        <a>我</a>
        <a>
          <span>{{items.my.phone}}</span>
          <span>第{{items.my.rank}}名</span>
        </a>
        <a>{{items.my.sum_score}}</a>
      </div>
      <div></div>
    </div>
    <div class="top-ten">
      <ul>
        <li v-for="(item, index) in items['rank']"
            :key="index">
          <div class="rank-info">
            <a>{{item.rank}}</a>
            <a>{{item.phone}}</a>
            <a>{{item.sum_score}}</a>
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
  }
}
</script>

<style scoped src="@css/ranking/index.css">
</style>
