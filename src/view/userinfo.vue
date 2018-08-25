<template>
  <div class="mui-content">
    <header><a>个人中心</a></header>
			<div class="userInfo">
				<div>
					<ul class="mui-table-view">
					    <li class="mui-table-view-cell">
					        <a><i class="iconfont icon-wo"></i>手机号码<span class="phone right"></span></a>
					    </li>
					    <li class="mui-table-view-cell">
					        <a><i class="iconfont icon-jifen"></i>我的积分<span class="integral right"></span></a>
					    </li>
					    <li class="mui-table-view-cell li-item" data-hr = "userInfo/newPwd.html">
					        <a class="mui-navigate-right"><i class="iconfont icon-xing"></i>修改密码</a>
					    </li>
					</ul>
					<ul class="mui-table-view">
					    <li id="cheIns" class="mui-table-view-cell">
					        <a class="mui-navigate-right"><i class="iconfont icon-qizhi"></i>所属行业<span class="industry right"></span></a>
					    </li>
					    <li class="mui-table-view-cell li-item" data-hr = "userInfo/industry.html">
					        <a class="mui-navigate-right"><i class="iconfont icon-plus-questionnaire"></i>参与的行业答题</a>
					    </li>
					</ul>
					<ul class="mui-table-view">
					    <li class="mui-table-view-cell li-item" data-hr = "userInfo/feedback.html">
					        <a class="mui-navigate-right"><i class="iconfont icon-htmal5icon27"></i>问题反馈</a>
					    </li>
					    <li class="mui-table-view-cell" id="exit">
					        <a class="mui-navigate-right"><i class="iconfont icon-setup_icon"></i>退出登录</a>
					    </li>
					</ul>
				</div>
			</div>
  </div>
</template>


<style scoped src="@css/userinfo/index.css">
</style>