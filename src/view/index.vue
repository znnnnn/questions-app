<template>
	<div class="mui-content">
		<header>
			<img src="~@img/index/poster.png">
		</header>
		<div id="category"
		     class="mui-scroll-wrapper"
		     data-scroll="1">
			<div class="mui-scroll"
			     style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;">
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
										<span class="grade">0</span>/
										<span class="sum">100</span>
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
										<span class="grade">0</span>/
										<span class="sum">100</span>
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
										<span class="grade">0</span>/
										<span class="sum">100</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>

					<div class="lable">
						<a>CTF</a>
					</div>
				</div>
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
										<span class="grade">0</span>/
										<span class="sum">10</span>
									</a>
								</li>
							</ul>
						</li>
					</ul>

					<div class="lable">

					</div>
				</div>
			</div>
			<div class="mui-scrollbar mui-scrollbar-vertical">
				<div class="mui-scrollbar-indicator"
				     style="transition-duration: 0ms; display: block; height: 8px; transform: translate3d(0px, 657px, 0px) translateZ(0px);"></div>
			</div>
		</div>

	</div>
</template>



<style scoped>
header {
  width: 100%;
  position: absolute;
  z-index: 999;
}
header img {
  width: 100%;
}

a,
span {
  color: #ffffff;
}
.mui-content {
  position: relative;
}
/*分类*/
#category {
  background-color: #fdfaff;
  padding-top: 230px;
}
#category div.category {
  border-radius: 15px;
  padding: 15px;
  position: relative;
  cursor: pointer;
}

#category .mui-scroll {
  padding: 10px 35px;
}

#category ul {
  overflow: hidden;
  height: 50px;
}

#category ul li.infor {
  height: 100%;
}

#category ul,
#category div.category > ul > li {
  width: 100%;
}

#category div.category {
  margin-bottom: 10px;
}

#category div.category:first-child {
  background-color: #ffb724;
}
#category div.category:nth-child(2) {
  background-color: #64a6da;
}
#category div.category:nth-child(3) {
  background-color: #e73b37;
}
#category div.category:nth-child(4) {
  background-color: #9d5ac7;
}

#category li.infor {
  margin-bottom: 2px;
}

#category li.infor li {
  display: inline-block;
  height: 100%;
  float: left;
}

#category li.infor li.icon {
  width: 14%;
}
#category li.infor li.icon img {
  width: 70%;
  margin-top: 5px;
}

#category li.infor li.category a {
  display: block;
  font-size: 100%;
  font-weight: bolder;
}
#category li.infor li.category a:nth-child(1) {
  margin-top: 5px;
}
#category li.infor li.category a:nth-child(2) {
  font-size: 75%;
  margin-top: -3px;
}

#category li.infor li.score {
  float: right;
  font-size: 160%;
  line-height: 100%;
}
#category li.infor li.score a {
  display: block;
  height: 100%;
  line-height: 45px;
  font-weight: bolder;
}

#category div.category:nth-child(2) li.icon img {
  width: 80%;
  margin: 4px 3px;
}

#category div.category:nth-child(3) li.icon img {
  width: 80%;
}

#category div.category:nth-child(4) li.icon img {
  width: 35%;
  margin: 5px 10px;
}

#category div.lable {
  position: absolute;
  bottom: 3px;
  right: 20px;
}

#category div.category:nth-child(4) li.category a {
  line-height: 40px;
}

#category div.lable a {
  display: block;
  float: left;
  color: #999999;
  height: 20px;
  background-color: #f1f1f1;
  font-size: 60%;
  margin-left: 2px;
  padding: 0px 7px 0px;
  border-radius: 12px;
  border: 1px solid #b4b4b4;
}

.mui-scroll-wrapper {
  overflow: visible;
}
</style>