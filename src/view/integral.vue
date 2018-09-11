<template>
  <div class="main">
    <header class="header">
      <a>积分兑换</a>
    </header>

    <div class="container">
      <el-button type="text"
                 @click="rule"
                 id="rule">积分规则</el-button>
      <div class="box">
        <div class="oCircle">
          <div class="textBox">
            <h3>我的积分</h3>
            <h3 class="score">{{score}}</h3>
          </div>
        </div>
        <div class="btnBox">
          <el-input placeholder="请输入手机号"
                    v-model="phone"
                    id="integralPhone"
                    clearable>
          </el-input>
          <el-row>
            <el-button round
                       class="go"
                       @click="preGo">立即兑换</el-button>
            <p>注：1000积分兑换15元话费</p>
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
      score: 1567,
      phone: ''
    }
  },
  mounted() {
    // var Oinput = document.getElementById('phone')
    // // console.log(Oinput)
    // Oinput.style.marginBottom = 0 + 'px'
    // Oinput.style.borderRadius = 10 + 'px'
  },
  methods: {
    preGo() {
      if (!this.$reg.checkPhone(this.phone)) {
        this.$message({
          message: '手机号格式不正确',
          type: 'error',
          center: true
        })
      } else {
        this.go()
      }
    },
    go() {
      MessageBox({
        title: '提示',
        message: '确认兑换吗？',
        showCancelButton: true
      })
        .then(action => {
          if (action === 'confirm' && this.score >= 1000) { // 确认的回调
            this.score -= 1000
            this.$message({
              message: '兑换成功！',
              type: 'success',
              center: true
            })
          } else if (action === 'confirm' && this.score < 1000) {
            this.$message({
              message: '当前积分不足',
              type: 'error',
              center: true
            })
          } else if (action === 'cancel') {
            this.$message({
              message: '取消兑换',
              center: true
            })
          }
        })
    },
    rule() {
      this.$alert('<strong>这是 <i>积分规则</i> 片段</strong>', '积分规则', {
        dangerouslyUseHTMLString: true,
        center: true
      })
    }
  }
}

</script>


<style scoped src="@css/ranking/index.css">
</style>

<style scoped src="@css/integral.css">
</style>

<style>
.main {
  width: 100%;
  position: relative;
  height: 100%;
}
#integralPhone {
  width: 200px;
  background-color: #fff;
  border: 1px solid #0097a8;
  border-radius: 10px;
  color: #0097a8;
  margin-bottom: 0;
}

.go:active,
#integralPhone:active {
  background-color: #eee;
  border: 1px solid #008190;
  color: #008190;
}

#integralPhone:focus,
#integralPhone:hover {
  color: #008190;
  border-color: #a0ced3;
  background-color: #d9eaec;
}

#integralPhone:focus,
#integralPhone:hover {
  color: #008190;
  border-color: #a0ced3 !important;
}

#rule {
  position: absolute;
  z-index: 100;
  top: 60px;
  right: 12px;
}

.el-message-box {
  width: 50vh !important;
}

#rule {
  color: #008190;
}

#rule:hover {
  border: 0px solid #fff;
  background-color: transparent;
}

header {
  position: relative;
}
</style>
