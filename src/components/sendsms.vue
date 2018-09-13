<template>
  <input type="button"
         id="getCode"
         @click="getCode"
         v-model="getCodeText">
</template>

<script>
import { Loading } from 'element-ui'

export default {
  props: {
    phone: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      getCodeText: '获取验证码',
      time: 60
    }
  },
  methods: {
    getCode() {
      // console.log(this.phone)

      const btn = document.getElementById('getCode')
      btn.setAttribute('disabled', true)
      btn.style.cursor = 'not-allowed'
      // loading层
      var loadinginstace = Loading.service({ fullscreen: true })
      // this.getCodeText = this.time
      // 发送请求
      this.$api.sendsms.sendsms(this.phone)
        .then(res => {
          loadinginstace.close()
          if (!this.$reg.checkPhone(this.phone)) {
            this.$message({
              message: '手机号格式错误',
              type: 'error',
              center: 'true'
            })
            this.btnReset()
          } else {
            // 修改按钮样式
            setInterval(() => {
              this.btnSet()
            }, 1000)
          }
        })
    },
    btnSet() {
      const btn = document.getElementById('getCode')
      if (this.time > 0) {
        this.getCodeText = this.time -= 1
      } else {
        this.getCodeText = '获取验证码'
        this.time = 60
        btn.disabled = false
        btn.style.cursor = 'pointer'
        return
      }
    },
    btnReset() {
      const btn = document.getElementById('getCode')
      this.getCodeText = '获取验证码'
      this.time = 60
      btn.disabled = false
      btn.style.cursor = 'pointer'
    }
  }
}
</script>


<style scoped>
#getCode {
  width: 80px;
  padding: 0 !important;
  line-height: 0 !important;
  height: 50px;
  top: 15px;
  font-size: 75%;
}
</style>
