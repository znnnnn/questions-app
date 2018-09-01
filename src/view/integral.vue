<template>
  <div>
    <header class="header">
      <a>积分兑换</a>
    </header>

    <div class="container">
      <div class="box">
        <div class="oCircle">
          <div class="textBox">
            <h3>我的积分</h3>
            <h3 class="score">{{score}}</h3>
          </div>
        </div>
        <div class="btnBox">
          <el-row>
            <el-button round class="go" @click="go">立即兑换</el-button>
            <p>注：1000积分兑换1个学分</p>
          </el-row>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'

export default {
  data() {
    return {
      score: 567
    }
  },
  mounted() {
  },
  methods: {
    go() {
      MessageBox({
        title: '提示',
        message: '确认兑换吗？',
        showCancelButton: true
      })
        .then(() => {
          MessageBox.alert('兑换成功！', '恭喜')
        })
    }
  }
}
</script>


<style scoped src="@css/ranking/index.css">
</style>

<style scoped src="@css/integral.css">
</style>
