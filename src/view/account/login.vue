<template>
  <div class="mui-content">
    <header class="mui-title">
      <a>网络安全答题平台</a>
    </header>

    <div class="login-form">
      <form id='login-form'
            class="mui-input-group">
        <div class="mui-input-row">
          <label class="phone"></label>
          <input id='account'
                 type="text"
                 class="mui-input-clear mui-input"
                 placeholder="请输入手机号"
                 maxlength="11"
                 v-model="phone">
        </div>
        <div class="mui-input-row"
          id="pwdBox"
          v-if="this.mode === 'primary'">
          <label class="pwd"></label>
          <input id='password'
                 type="password"
                 class="mui-input-clear mui-input"
                 placeholder="请输入6-14位密码"
                 maxlength="14"
                 v-model="password">
        </div>
        <div class="mui-input-row" v-else>
          <label class="pwd"></label>
          <input id='code'
                 type="text"
                 class="mui-input-clear mui-input"
                 placeholder="请输入验证码"
                 maxlength="6"
                 v-model="code">
                 <sendsms :phone="this.phone"></sendsms>
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='login'
                class="mui-btn mui-btn-block mui-btn-primary"
                @click="login"
                @keyup.enter="login">立即登录</button>

        <div class="link-area">
          <a id="change" v-if="this.mode === 'primary'" @click="mode = 'code'">用短信验证码登录</a>
          <a id="change" v-else @click="mode = 'primary'">用密码登录登录</a>
          <router-link to="/account/register" id='reg'>新用户注册</router-link>
          <router-link to="/account/forgotPassword" id='forgetPassword'>忘记密码</router-link>
        </div>
      </div>

    </div>
    <div class="mui-content-padded oauth-area mui-hidden">
    </div>
    <div class="service">
      登录即代表阅读并同意
      <a>服务条款</a>
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
      password: '',
      code: '',
      mode: 'primary'
    }
  },
  mounted() {
    this.autoResize()
    // window.onresize = () => {
    //   this.autoResize()
    // }
  },
  methods: {
    autoResize() {
      const container = document.querySelector('.mui-content')
      container.style.height = document.documentElement.clientHeight + 'px'
      container.style.width = document.documentElement.clientWidth + 'px'
    },
    login() {
      if (this.mode === 'primary') {
        if (!this.$reg.checkPhone(this.phone)) {
          this.$message({
            message: '手机号格式错误',
            type: 'error',
            center: 'true'
          })
        } else if (!this.$reg.checkPwd(this.password)) {
          this.$message({
            message: '密码格式错误',
            type: 'error',
            center: 'true'
          })
        } else {
          this.loginRequest('primary')
        }
      } else if (this.mode === 'code') {
        if (!this.$reg.checkPhone(this.phone)) {
          this.$message({
            message: '手机号格式错误',
            type: 'error',
            center: 'true'
          })
        } else {
          this.loginRequest('code', this.code)
        }
      }
    },
    // 登录请求
    loginRequest(mode, code) {
      this.$api.login.login(this.phone, this.password, mode, code)
        .then(res => {
          if (res.data.status === 0) {
            this.$message({
              message: '恭喜你，登录成功！',
              type: 'success',
              center: true
            // /////////////下一步  判断密码错误
            })
            this.$store.commit('resetToken', res.data.data.api_token)
            this.$router.push({ path: '/' })
          } else if (res.data.message === '账号或密码不正确') {
            this.$message({
              message: '账号或密码不正确',
              type: 'error',
              center: true
            })
          } else if (res.data.status === 3) {
            this.$message({
              message: '验证码错误',
              type: 'error',
              center: true
            })
          }
        }
        )
    }
  }

}

</script>


<style scoped src="@css/style.css">
</style>
<style scoped src="@css/common-css.css">
</style>
<style scoped src="@css/mui.min.css">
</style>

<style scoped>
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
</style>
