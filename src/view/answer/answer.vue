<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/answer/indexIndustry" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">正在答题</h1>
    </header>
    <div id="answer-body" class="answer-body">
        <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section">
          <a class="answer-title"><span>12.</span>计算机病毒的预防措施包括毒的的预防措施包括毒的的预防措施包括毒的预防措施包括毒的预防措施包括下列哪项</a> 
						<ul class="answer-list">
							<li class="active"><i class="iconfont icon-A"></i><a>123123123123123123123</a></li>
							<li><i class="iconfont icon-B"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-C"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-D"></i><a>123123123123123123123123123123123123123123123123</a></li>
						</ul>
        </div>
        <div class="section">
          <a class="answer-title"><span>12.</span>计算机病毒的预防措施包括毒的的预防措施包括毒的的预防措施包括毒的预防措施包括毒的预防措施包括下列哪项</a> 
						<ul class="answer-list">
							<li class="active"><i class="iconfont icon-A"></i><a>123123123123123123123</a></li>
							<li><i class="iconfont icon-B"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-C"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-D"></i><a>123123123123123123123123123123123123123123123123</a></li>
						</ul>
        </div>
        <div class="section">
          <a class="answer-title"><span>12.</span>计算机病毒的预防措施包括毒的的预防措施包括毒的的预防措施包括毒的预防措施包括毒的预防措施包括下列哪项</a> 
						<ul class="answer-list">
							<li class="active"><i class="iconfont icon-A"></i><a>123123123123123123123</a></li>
							<li><i class="iconfont icon-B"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-C"></i><a>123123123123123123123123123123123123123123123123</a></li>
							<li><i class="iconfont icon-D"></i><a>123123123123123123123123123123123123123123123123</a></li>
						</ul>
        </div>
      </full-page>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
        anchors: ['page1', 'page2', 'page3'],
        // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
      },
      mounted() {
        
      },
    }
  }
}
</script>
<style scoped src="@css/index/answer.css"></style>
<style scoped>
  .indexContainer {
    padding-top: 44px;
    position: absolute;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: #fdfaff;
  }
</style>