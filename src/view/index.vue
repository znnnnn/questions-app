<template>
	<div class="mui-content">
		<router-view></router-view>
		<header>
			<img src="../assets/images/poster.png" id="banner" >
		</header>
		<div id="category"
		     class="mui-scroll-wrapper"
		     data-scroll="1">
			<div class="mui-scroll" style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
				<router-link v-for="(item,index) in category" class="link" :key="index"
				:to="{
					path: index==3?'/answer/indexIndustry':'/answer/common',
					query: {
						title: item.name+'('+item.mark+')',
						cateid: item.id,
						index: index
					}
				}">
					<div class="category">
						<ul>
							<li class="icon">
								<a>
									<img class="knowledge" v-if="index==0" src="../../images/index/knowledge.png"/>
									<img class="profession" v-else-if="index==1" src="../../images/index/profession.png"/>
									<img class="competition" v-else-if="index==2" src="../../images/index/competition.png"/>
									<img class="industry" v-else src="../../images/index/industry.png"/>
								</a>
							</li>
							<li class="category">
								<a>{{item.name}}</a>
								<a v-if="item.mark!=null">({{item.mark}})</a>
							</li>
							<li class="score"><a><span class="grade">{{item.pass_num}}</span>/<span class="sum">{{item.group_allnum}}</span></a></li>
						</ul>
						<div class="lable">
							<a :class="index==3?'mui-hidden':''" v-for="(tab,sindex) in item.sub" :key="sindex">{{tab.name}}</a>
						</div>
					</div>
				</router-link>
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
    // 初始化读取数据
    this.refresh()
  },
  methods: {
    refresh() {
      var _this = this
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.homepage.getCategory()
        .then(res => {
          loadinginstace.close()
          _this.category = res.data.data
          _this.$nextTick(function() { // dom更新后调用方法
            const banner = document.querySelector('#banner')
            const category = document.getElementById('category')
            category.style.top = banner.offsetHeight + 'px'
          })
        })
        .catch(error => {
          loadinginstace.close()
          console.log(error)
        })
    }
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
  position: absolute;
	padding-top: 0;
	top: 200px;
	bottom: 50px;
	/* padding-bottom: 70px; */
	overflow: auto;
}

#mui-scroll {
  position: relative;
}

.mui-scroll {
	position: relative;
}

.mui-content {
	width: 100%;
	height: auto;
	position: absolute;
	top: 0;
	bottom: 0;
	overflow: auto;
	/* margin-bottom: 69px; */
	/* background-color: #ffffff; */
	/* padding_bottom: 69px; */
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

img.knowledge {
	height: 60%!important;
}
img.profession {
	height: 55%!important;
}
img.competition {
	height: 55%!important;
}
img.industry {
	height: 60%!important;
}
</style>
