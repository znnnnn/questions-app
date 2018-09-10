<template>
  <input type="button"
         id="getCode"
         @click="getCode"
         v-model="getCodeText">
</template>

<script>
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
      console.log(this.phone)
      // 发送请求
      this.$api.sendsms.sendsms(this.phone)
        .then(res => {
          if (!this.$reg.checkPhone(this.phone)) {
            this.$message({
              message: '手机号格式错误',
              type: 'error',
              center: 'true'
            })
          } else {
            // 修改按钮样式
            const btn = document.getElementById('getCode')
            const _self = this
            btn.setAttribute('disabled', true)
            btn.style.cursor = 'not-allowed'
            _self.getCodeText = _self.time -= 1
            setInterval(() => {
              if (_self.time > 0) {
                _self.getCodeText = _self.time -= 1
              } else {
                _self.getCodeText = '获取验证码'
                btn.disabled = false
                btn.style.cursor = 'pointer'
              }
            }, 1000)
          }
        })
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
