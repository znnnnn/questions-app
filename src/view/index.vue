<template>
	<div class="mui-content">
		<router-view></router-view>
		<header>
			<img src="~@img/index/poster.png">
		</header>
		<div id="category"
		     class="mui-scroll-wrapper"
		     data-scroll="1">
			<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
				<router-link v-for="(item,index) in category" class="link" :to="index==3?'/answer/indexIndustry':'/answer/common'">
					<div class="category">
						<ul>
							<li class="icon">
								<a>
									<img v-if="index==0" src="../../images/index/knowledge.png"/>
									<img v-else-if="index==1" src="../../images/index/profession.png"/>
									<img v-else-if="index==2" src="../../images/index/competition.png"/>
									<img v-else src="../../images/index/industry.png"/>
								</a>
							</li>
							<li class="category">
								<a>{{item.name}}</a>
								<a v-if="item.mark!=null">({{item.mark}})</a>
							</li>
							<li class="score"><a><span class="grade">{{item.pass_num}}</span>/<span class="sum">{{item.quesion_allnum}}</span></a></li>
						</ul>
						<div class="lable">
							<a v-for="(tab,index) in item.sub">{{tab.name}}</a>
						</div>
					</div>
				</router-link>
				<!-- <router-link to="/answer/common">
					<div class="category knowledge"
					     data-cate="知识类(全民普法)">
						<ul>
							<li class="infor">
								<ul>
									<li class="icon">
										<a><img src="../../images/index/knowledge.png"></a>
									</li>
									<li class="category">
										<a>知识类</a>
										<a>(全民普法)</a>
									</li>
									<li class="score">
										<a>
											<span class="grade">0</span>/<span class="sum">100</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>
						<div class="lable">
							<a>个人信息安全</a>
							<a>防电信诈骗</a>
							<a>网络安全法</a>
						</div>
					</div>
				</router-link>
				<router-link to="/answer/common">
					<div class="category profession"
					     data-cate="专业类(检测组)">
						<ul>
							<li class="infor">
								<ul>
									<li class="icon">
										<a><img src="../../images/index/profession.png"></a>
									</li>
									<li class="category">
										<a>专业类</a>
										<a>(检测组)</a>
									</li>
									<li class="score">
										<a>
											<span class="grade">0</span>/<span class="sum">100</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>

						<div class="lable">
							<a>等级保护制度</a>
							<a>CISP题库</a>
							<a>数据分析</a>
						</div>
					</div>
				</router-link>
				<router-link to="/answer/common">
					<div class="category competition"
					     data-cate="竞赛类(安服组)">
						<ul>
							<li class="infor">
								<ul>
									<li class="icon">
										<a><img src="../../images/index/competition.png"></a>
									</li>
									<li class="category">
										<a>竞赛类</a>
										<a>(安服组)</a>
									</li>
									<li class="score">
										<a>
											<span class="grade">0</span>/<span class="sum">100</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>

						<div class="lable">
							<a>CTF</a>
						</div>
					</div>
				</router-link>
				<router-link to="/answer/indexIndustry">
					<div class="category industry"
					     data-cate="行业类">
						<ul>
							<li class="infor">
								<ul>
									<li class="icon">
										<a><img src="../../images/index/industry.png"></a>
									</li>
									<li class="category">
										<a>行业类</a>
									</li>
									<li class="score">
										<a>
											<span class="grade">0</span>/<span class="sum">10</span>
										</a>
									</li>
								</ul>
							</li>
						</ul>

						<div class="lable">

						</div>
					</div>
				</router-link> -->
			</div>
			<div class="mui-scrollbar mui-scrollbar-vertical">
				<div class="mui-scrollbar-indicator"
				     style="transition-duration: 0ms; display: block; height: 8px; transform: translate3d(0px, 657px, 0px) translateZ(0px);"></div>
			</div>
		</div>

	</div>
</template>

<script>

import { Loading } from 'element-ui'

export default {
  data() {
    return {
      category: null
    }
  },
  mounted() {
    var _this = this
    function refresh() {
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.homepage.getCategory()
        .then(res => {
          loadinginstace.close()
          _this.category = res.data.data
          console.log(_this.category)
        })
        .catch(error => {
          loadinginstace.close()
          console.log(error)
        })
    }
    refresh()
  }
}
</script>



<style scoped src="@css/index/index.css">
</style>

<style scoped>
header {
  text-align: center;
  position: relative;
}

#category {
  position: relative;
  padding-top: 0;
}

#mui-scroll {
  position: relative;
}

.mui-scroll {
  position: relative;
}

.mui-content {
  margin-bottom: 69px;
}

#category div.category {
  padding: 13.5px;
}

#category div.lable a {
  font-size: 10px;
}

@media screen and (min-width: 1200px) {
  header > img {
    /* max-height: 500px;
	max-width: auto; */
    width: 500px;
  }
}
</style>
