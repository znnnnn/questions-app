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
        <!-- <div class="mui-input-row"
          id="pwdBox"
          v-if="this.mode === 'primary'">
          <label class="pwd"></label>
          <input id='password'
                 type="password"
                 class="mui-input-clear mui-input"
                 placeholder="请输入6-14位密码"
                 maxlength="14"
                 v-model="password">
        </div> -->
        <div class="mui-input-row">
          <label class="pwd"></label>
          <input id='fastCode'
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
          <!-- <a id="change" v-if="this.mode === 'primary'" @click="mode = 'code'">用短信验证码登录</a> -->
          <!-- <a id="change" v-else @click="mode = 'primary'">用密码登录登录</a> -->
          <!-- <router-link to="/account/register" id='reg'>新用户注册</router-link> -->
          <!-- <router-link to="/account/forgotPassword" id='forgetPassword'>忘记密码</router-link> -->
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
import { Message } from 'element-ui'

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
    tips(msg) {
      Message({
        message: msg,
        type: 'error',
        duration: 3000
      })
    },
    autoResize() {
      // console.log(this)
      const container = document.querySelector('.mui-content')
      container.style.height = document.documentElement.clientHeight + 'px'
      container.style.width = document.documentElement.clientWidth + 'px'
    },
    // login() {
    //   if (this.mode === 'primary') {
    //     if (!this.$reg.checkPhone(this.phone)) {
    //       this.tips('手机号格式错误')
    //     } else if (!this.$reg.checkPwd(this.password)) {
    //       this.tips('密码格式错误')
    //     } else {
    //       this.loginRequest('primary')
    //     }
    //   } else if (this.mode === 'code') {
    //     if (!this.$reg.checkPhone(this.phone)) {
    //       this.tips('手机号格式错误')
    //     } else {
    //       this.loginRequest('code', this.code)
    //     }
    //   }
    // },
    login() {
      if (!this.$reg.checkPhone(this.phone)) {
        this.tips('手机号格式错误')
      } else {
        this.loginRequest()
      }
    },
    // 登录请求
    // loginRequest(mode, code) {
    //   this.$api.login.login(this.phone, this.password, mode, code)
    //     .then(res => {
    //       if (res.data.status === 0) {
    //         this.$message({
    //           message: '恭喜你，登录成功！',
    //           type: 'success',
    //           center: true
    //         // /////////////下一步  判断密码错误
    //         })
    //         this.$store.commit('resetToken', res.data.data.api_token)
    //         this.$router.push({ path: '/' })
    //       } else if (res.data.message === '账号或密码不正确') {
    //         this.tips('账号或密码不正确')
    //       } else if (res.data.status === 3) {
    //         this.tips('验证码错误')
    //       }
    //     }
    //     )
    // }

    // 快速登录
    loginRequest() {
      this.$api.login.fastLogin(this.phone, this.code)
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
            this.tips('账号或密码不正确')
          } else if (res.data.status === 3) {
            this.tips('验证码错误')
          }
        }
        )
    }

  }

}

</script>


<style scoped src="@css/style.css">
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
  font-size: 75%;
}
</style>
