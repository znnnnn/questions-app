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
					<li :class="active?'active':''" @click="liClick(0)"><a>{{fName}}</a></li>
					<li :class="active?'':'active'" @click="liClick(1)"><a>全部行业</a></li>
					<!-- <li><a>选择行业</a></li> -->
				</ul>
			</div>
		</div>
    <div class="mui-scroll-wrapper box wrapper">
			<div class="mui-scroll content">
				<div :class="status?'choose':'mui-hidden'">
					<div class="choose-list">
            <a v-for="(item,index) in selects" :class="index==pre?'active':''" :key="index" @click="changeId(index,item.id,$event)">{{item.name}}</a>
					</div>
				</div>
        <ul class="level" v-for="(item,index) in data" @click="checkLimit($event)" :class="status?'mui-hidden':'levels'" :key="index" :data-cateId="item.cate_id?item.cate_id:item.pivot.category_id" :data-groupId="item.id">
          <li>
            <a class="title">{{item.name}}</a>
          </li>
          <li>
            <a class="time">{{item.start_time?item.start_time:item.pivot.start_time}}/{{item.expire_time?item.expire_time:item.pivot.expire_time}}</a>
            <a class="lable">{{item.mark?item.mark:'公民'}}</a>
          </li>
        </ul>
				<!-- <ul class="process">
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
				</ul> -->
			</div>
		</div>
    </div>
</template>

<script>
/* eslint-disable */
import { Loading } from 'element-ui'
import { Toast } from 'mint-ui'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      title: '',
      selects: null, // 行业选择
      data: null,
      pre: 0,
      cateId: null,
      fName: '',
      status: true,
      seccateId: null,
      active: true
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
          _this.seccateId = res.data.data[0].id
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
    liClick(id) {
      var _this = this
      // console.log(this.active)
      var loadinginstace = Loading.service({ fullscreen: true })
      if (id === 0) {
        _this.active = true
        _this.$api.levels.getLevels(_this.seccateId)
          .then(res => {
            loadinginstace.close()
            _this.data = res.data.data
            _this.$nextTick(function() {
              _this.checkData()
              // _this.loadScroll()
            })
          })
          .catch(error => {
            loadinginstace.close()
            console.log(error)
          })
      } else {
        _this.active = false
        _this.$api.levels.getAllLevels(_this.cateId)
          .then(res => {
            loadinginstace.close()
            _this.data = res.data.data
            // console.log(_this.data)
            _this.$nextTick(function() {
              _this.checkData()
              // _this.loadScroll()
            })
          })
          .catch(error => {
            loadinginstace.close()
            console.log(error)
          })
      }
    },
    changeId(index, id, e) {
      this.pre = index
      this.fName = e.target.innerText
      this.seccateId = id
    },
    choose() {
      this.active = true
      this.status = false
      var _this = this
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.levels.getLevels(_this.seccateId)
        .then(res => {
          loadinginstace.close()
          _this.data = res.data.data
          // console.log(res.data)
          _this.$nextTick(function() {
            _this.checkData()
            // _this.loadScroll()
          })
        })
        .catch(error => {
          loadinginstace.close()
          console.log(error)
        })
    },
    checkData() {
      var _this = this
      var Uls = document.querySelectorAll('.level')
      var len = Uls.length
      var time = new Date().getTime()
      for (let i = 0; i < len; i++) {
        var sTime = this.data[i].start_time ? this.data[i].start_time : this.data[i].pivot.start_time
        // sTime = sTime ? sTime : 0
        var eTime = this.data[i].expire_time ? this.data[i].expire_time : this.data[i].pivot.expire_time
        // eTime = eTime ? eTime : 0
        var nsTime = new Date(sTime).getTime()
        var neTime = new Date(eTime).getTime()
        if (time < nsTime) {
          Uls[i].setAttribute('data-statu','0')
          Uls[i].className = 'level levels nostart'
        } else if (time < neTime) {
          Uls[i].className = 'level levels process'
          Uls[i].setAttribute('data-statu','1')
        } else {
          Uls[i].className = 'level levels lock'
          Uls[i].setAttribute('data-statu','2')
        }
      }
    },
    checkLimit(e) {
      var obj = e.currentTarget
      var cId = obj.getAttribute('data-cateId')
      var gId = obj.getAttribute('data-groupId')
      var statu = obj.getAttribute('data-statu')
      if(statu == 0){
        Toast('答题未开始')
        return
      }
      if(statu == 2){
        Toast('答题已结束，请到个人中心查看最终成绩')
        return
      }
      this.$api.answer.getAnswer(cId, gId)
        .then(res => {
          // console.log(res) 
          if (res.data.status === 21 || res.data.status === 22) {
            Toast('该身份不允许参加')
          } else if (res.data.status === 0) {
            this.linkAnswer(this.seccateId, gId)
          } else {
            console.log('意外的错误')
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    linkAnswer(a, b) {
      this.$router.push({
        path: '/answer/answer',
        query: {
          cateId: this.cateId,
          seccateid: a,
          groupid: b
        }
      })
    },
    loadScroll() {
      var scroll = new BScroll('.wrapper', {
        scrollY: true,
        click: true
        // probeType: 2
      })
    }
  }
}
</script>


<style scoped src="@css/index/index-common.css"></style>
<style scoped>
  .mui-scroll-wrapper {
    position: fixed;
    top: 94px;
    bottom: 69px;
  }
  .mui-content.nav {
    width: 100%;
    position: fixed;
    top: 44px;
    padding: 0!important;
    height: 50px;
  }
  .mui-scroll {
    height: 100%;
    overflow: auto;
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
    width: 50%;
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