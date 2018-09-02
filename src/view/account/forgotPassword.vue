<template>
  <div>
    <header class="mui-bar mui-bar-nav cblue">
			<router-link to="/account/login" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
			<h1 class="mui-title">忘记密码</h1>
		</header>
		<div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label class="phone"></label>
					<input id='phone' type="text" class="mui-input-clear mui-input" placeholder="请输入常用手机号" maxlength="11" v-model="phone">
				</div>
				<div class="mui-input-row">
					<label class="code"></label>
					<input id='code' type="text" class="mui-input-clear mui-input" placeholder="请输入验证码" maxlength="6" v-model="code">
					<sendsms :phone="this.phone"></sendsms>
				</div>
				<div class="mui-input-row">
					<label class="pwd"></label>
					<input id='pwd' type="password" class="mui-input-clear mui-input" placeholder="请输入6-14位密码" maxlength="14" v-model="pwd">
				</div>
			</form>
			<div class="mui-content-padded">
				<button id='reg' class="mui-btn mui-btn-block mui-btn-primary" @click="forgotPassword">确定</button>
			</div>
		</div>
  </div>
</template>

<script>
// 引入发送验证码组件
import sendsms from '@components/sendsms.vue'
export default {
  components: {
    sendsms
  },
  data() {
    return {
      phone: '',
      code: '',
      pwd: ''
    }
  },
  mounted() {

  },
  methods: {
    forgotPassword() {
      if (!this.$reg.checkPhone(this.phone)) {
        this.$message({
          message: '手机号格式错误',
          type: 'error',
          center: 'true'
        })
      } else if (!this.$reg.checkPwd(this.pwd)) {
        this.$message({
          message: '密码格式错误, 请输入六位以上数组加密码',
          type: 'error',
          center: 'true'
        })
      } else {
        this.Request()
      }
    },
    Request() {
      this.$api.forgotPassword.forgotPassword(this.code, this.phone, this.pwd)
        .then(res => {
          console.log(res.data)
          if (res.data.message === '验证码未填写') {
            this.$message({
              message: '请填写验证码',
              type: 'error',
              center: true
            })
            return
          } else if (res.data.message === '验证码错误') {
            this.$message({
              message: '验证码错误',
              type: 'error',
              center: true
            })
            return
          } else if (res.data.status === 5) {
            this.$message({
              message: '用户不存在',
              type: 'error',
              center: true
            })
            return
          } else if (res.data.status === 0) {
            this.$message({
              message: '修改密码成功成功',
              type: 'success',
              center: true
            })
            // res.data.data.api_token    token结构保存
            this.$router.push({ path: '/account/login' })
          }
        })
        .catch((error) => {
          // console.log(error.data)
          // console.log(error.data.errors.phone[0])
          if (error.data.errors.phone[0] === 'The phone format is invalid.') {
            this.$message({
              message: '手机号格式错误',
              type: 'error',
              center: true
            })
            return
          } else if (error.data.errors.password[0] === 'The password must be at least 6 characters.') {
            this.$message({
              message: '密码至少为6位',
              type: 'error',
              center: true
            })
            return
          }
        })
    }
  }
}
</script>


<style scoped src="@css/common-css.css">
</style>
<style scoped src="@css/mui.min.css">
</style>
<style scoped src="@css/reg-forgetPwd-common.css">
</style>

<style scoped>

header {
	z-index: 101 !important;
}

.mui-content {
  background: url("~@img/login-bg.png");
  background-color: #efeff4;
  height: 100%;
  width: 100%;
  background-size: 50%;
  background-repeat: no-repeat;
  background-position: center 25%;
  z-index: 100;
  position: absolute;
}

.mui-input-row label {
  width: 22%;
  padding: 25px 15px;
}

.mui-input-row label ~ input {
  width: 78%;
  height: 50px;
  color: #ffffff !important;
}

#getCode {
  top:15px;
}

</style>
