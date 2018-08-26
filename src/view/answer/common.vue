<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/"
                   class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">XXXX类</h1>
    </header>
    <div class="mui-content">
			<div class="knowledge-category list">
				<ul>
					<li class="active"><a>个人信息安全</a></li>
					<li><a>防电信诈骗</a></li>
					<li><a>网络安全法</a></li>
				</ul>
				
			</div>

      <div class="mui-scroll-wrapper levels">
        <div class="mui-scroll">
          <router-link to="/answer/answer">
            <ul>
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第xxxx关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
        </div>
      </div>
		</div>
		
		
    <router-view></router-view>
  </div>
</template>

<style scoped src="@css/index/index-common.css"></style>
<style scoped>
.mui-content {
  padding-top: 0!important;
}
.indexContainer {
  padding-top: 48px!important;
}
.levels {
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
