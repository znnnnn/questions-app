<template>
  <div class="container">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/userinfo" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">意见反馈</h1>
    </header>
		<div class="mui-content">
			<div class="mui-content-padded">
				<div class="mui-inline">问题和意见</div>
			</div>
			<div class="row mui-input-row">
				<textarea id='question' class="mui-input-clear question" placeholder="请详细描述你的问题和意见..."></textarea>
			</div>
			<p>图片(选填,提供问题截图,总大小10M以下)</p>
			<div id='image-list' class="row image-list"></div>
			<p>QQ/邮箱</p>
			<div class="mui-input-row">
				<input id='contact' type="text" class="mui-input-clear contact" placeholder="(选填,方便我们联系你 )" />
			</div>
			<div class="sub">
				<button id="submit" class="mui-btn mui-btn-blue mui-btn-link">立即提交</button>
			</div>
		</div>
  </div>
</template>

<style scoped src="@css/userInfo/feedback.css">

</style>

<style scoped>
  /* 仅本组件可用的样式 */
* {
  z-index: 98; 
}
</style>