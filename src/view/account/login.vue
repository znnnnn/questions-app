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
             id="pwdBox">
          <label class="pwd"></label>
          <input id='password'
                 type="password"
                 class="mui-input-clear mui-input"
                 placeholder="请输入6-14位密码"
                 maxlength="14"
                 v-model="password">
        </div>
        <div class="mui-input-row mui-hidden">
          <label class="pwd"></label>
          <input id='code'
                 type="text"
                 class="mui-input-clear mui-input"
                 placeholder="请输入验证码"
                 maxlength="6">
          <div id="getCode"></div>
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='login'
                class="mui-btn mui-btn-block mui-btn-primary"
                @click="login"
                @keyup.enter="login">立即登录</button>

        <div class="link-area">
          <a id="change">用短信验证码登录</a>
          <a id='reg'>新用户注册</a>
          <a id='forgetPassword'>忘记密码</a>
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
// import { MessageBox } from 'element-ui'

export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  mounted() {
    this.autoResize()
    window.onresize = () => {
      this.autoResize()
    }
  },
  methods: {
    autoResize() {
      const container = document.querySelector('.mui-content')
      container.style.height = document.documentElement.clientHeight + 'px'
      container.style.width = document.documentElement.clientWidth + 'px'
    },
    login() {
      this.$api.login.login(this.phone, this.password)
        .then(res => {
          if (res.data.message === '登录成功') {
            this.$message({
              message: '恭喜你，登录成功！',
              type: 'success',
              center: true
            // /////////////下一步  判断密码错误
            })
            this.$store.commit('resetToken', res.data.data.api_token)
            this.$router.push({ path: '/' })
          } else if (res.data.message === '账号或密码不正确') {
            this.pwdError()
          }
          console.log(res)
        }
        // this.router
        )
        // .catch(error => {
        //   // console.log(error)
        //   if (error.status === '401') {
        //     this.$message({
        //       message: '密码错误',
        //       type: 'error',
        //       center: true
        //     })
        //   }
        // })
    },
    pwdError() {
      this.$message({
        message: '账号或密码不正确',
        type: 'error',
        center: true
      })
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
