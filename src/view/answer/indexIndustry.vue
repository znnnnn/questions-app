<template>
  <div class="indexContainer industry ">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">选择行业</h1>
      <a class="mui-pull-right btn">确定</a>
    </header>
    <div class="mui-scroll-wrapper box">
			<div class="mui-scroll">
				<div class="choose">
					<div class="choose-list">
            <a>11111</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
            <a>1</a>
					</div>
				</div>
				<!--<ul class="process">
					<li>
						<a class="title">医疗行业大苏打的</a>
					</li>
					<li>
						<a class="time">时间dsadsadasd</a>
						<a class="lable">行业标签</a>
					</li>
				</ul>
				<ul class="nostart">
					<li>
						<a class="title">医疗行业大苏打的</a>
					</li>
					<li>
						<a class="time">时间dsadsadasd</a>
						<a class="lable">行业标签</a>
					</li>
				</ul>
				<ul class="lock">
					<li>
						<a class="title">医疗行业大苏打的</a>
					</li>
					<li>
						<a class="time">时间dsadsadasd</a>
						<a class="lable">行业标签</a>
					</li>
				</ul>-->
			</div>
		</div>
    <router-link class="mui-hidden" to="/answer/answer">
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
      <p>点我跳转industry答题页面</p>
    </router-link>
    </div>
</template>

<script>
export default {
  data() {
    return {
      selects: null, // 行业选择
      data: null
    }
  }
}
</script>


<style scoped src="@css/index/index-common.css"></style>
<style scoped>
  .mui-scroll-wrapper {
    position: absolute;
    top: 44px;
    bottom: 0;
  }
  .mui-scroll {
    height: 100%;
  }
  .btn {
    display: block;
    height: 44px;
    line-height: 44px;
  }
  .choose-list {
    height: 100%;
    overflow: auto;
  }
  .indexContainer {
    padding-top: 44px;
    position: absolute;
    z-index: 99;
    height: 100%;
    width: 100%;
    background-color: #fdfaff;
  }
</style>