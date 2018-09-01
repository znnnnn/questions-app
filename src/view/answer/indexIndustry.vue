<template>
  <div class="indexContainer industry ">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 :class="status?'mui-title':'mui-hidden'">选择行业</h1>
      <h1 :class="status?'mui-hidden':'mui-title'">行业类</h1>
      <a :class="status?'mui-pull-right btn':'mui-hidden'" @click="choose">确定</a>
      <a :class="status?'mui-hidden':'mui-pull-right btn'" @click="status=true">选择行业</a>
    </header>
    <div :class="status?'mui-hidden':'mui-content nav'">
			<div class="knowledge-category list">
				<ul>
					<li class="active"><a>{{fName}}</a></li>
					<li><a>全部行业</a></li>
					<!-- <li><a>选择行业</a></li> -->
				</ul>
			</div>
		</div>
    <div class="mui-scroll-wrapper box">
			<div class="mui-scroll">
				<div :class="status?'choose':'mui-hidden'">
					<div class="choose-list">
            <a v-for="(item,index) in selects" :class="index==pre?'active':''" @click="changeId(index,item.id,$event)">{{item.name}}</a>
					</div>
				</div>
        <router-link :class="status?'mui-hidden':'levels'" to="/answer/answer">
          <ul class="process">
            <li>
              <a class="title">医疗行业大苏打的</a>
            </li>
            <li>
              <a class="time">时间dsadsadasd</a>
              <a class="lable">行业标签</a>
            </li>
          </ul>
        </router-link>
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
    </div>
</template>

<script>
import { Loading } from 'element-ui'
export default {
  data() {
    return {
      title: '',
      selects: null, // 行业选择
      data: null,
      pre: 0,
      cateId: null,
      fName: '',
      status: true
    }
  },
  created() {
    this.cateId = this.$route.query.cateid
    var _this = this
    function refresh() {
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.levels.getNav(_this.cateId)
        .then(res => {
          loadinginstace.close()
          _this.selects = res.data.data
          _this.fName = res.data.data[0].name
          console.log(res)
          _this.$nextTick(function() {
          })
        })
        .catch(error => {
          loadinginstace.close()
          console.log(error)
        })
    }
    refresh()
  },
  mounted() {

  },
  methods: {
    changeId(index, id, e) {
      this.pre = index
      this.cateId = id
      this.fName = e.target.innerText
      console.log(id)
    },
    choose() {
      this.status = false
      console.log(this.cateId)
    }
  }
}
</script>


<style scoped src="@css/index/index-common.css"></style>
<style scoped>
  .mui-scroll-wrapper {
    position: absolute;
    top: 94px;
    bottom: 0;
  }
  .mui-content.nav {
    padding: 0!important;
    height: 50px;
  }
  .mui-scroll {
    height: 100%;
  }
  .mui-bar .mui-title {
    left: 80px;
    right: 80px;
  }
  .btn {
    display: block;
    height: 44px;
    line-height: 44px;
  }
  .list li {
    overflow: hidden;
    width: 33.333333%;
  }
  .list li a {
    display: block;
    width: 100%;
    height: 100%;
    overflow: hidden;
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