<template>
  <div>
    <header class="mui-bar mui-bar-nav cblue">
      <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">修改密码</h1>
    </header>
    <div class="mui-content">
      <form class="mui-input-group">

        <div class="mui-input-row">
          <label class="phone"></label>
          <input id='account'
                 type="text"
                 class="mui-input-clear mui-input"
                 maxlength="11"
                 placeholder="请输入注册手机号">
        </div>

        <div class="mui-input-row">
          <label class="code"></label>
          <input id='code'
                 type="text"
                 class="mui-input-clear mui-input"
                 maxlength="6"
                 placeholder="请输入验证码">
          <div id="getCode"></div>
        </div>

        <div class="mui-input-row">
          <label class="pwd"></label>
          <input id='newPwd'
                 type="password"
                 class="mui-input-clear mui-input"
                 maxlength="14"
                 placeholder="请输入6-14位新密码">
        </div>
      </form>
      <div class="mui-content-padded">
        <button id='sub'
                class="mui-btn mui-btn-block mui-btn-primary">确定</button>
      </div>
    </div>
  </div>
</template>

<style scoped src="@css/userinfo/newPwd.css">

</style>
