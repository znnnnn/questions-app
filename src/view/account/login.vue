<template>
  <div>
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
                 maxlength="11">
        </div>
        <div class="mui-input-row"
             id="pwdBox">
          <label class="pwd"></label>
          <input id='password'
                 type="password"
                 class="mui-input-clear mui-input"
                 placeholder="请输入6-14位密码"
                 maxlength="14">
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
                class="mui-btn mui-btn-block mui-btn-primary">立即登录</button>

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

<style scoped src="@css/style.css">
</style>
<style scoped src="@css/common-css.css">
</style>
<style scoped src="@css/mui.min.css">
</style>
