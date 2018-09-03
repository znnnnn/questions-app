<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <a @click="$router.back(-1)" class="mui-icon mui-icon-left-nav mui-pull-left"></a>
      <!-- <router-link to="/" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link> -->
      <h1 class="mui-title" id="timer"></h1>
      <button id="submit" class="mui-btn mui-btn-link mui-pull-right" @click="submit">交卷</button>
    </header>
    <div class="header">
      <a class="desc">共{{index.queLen}}题，总计100分</a>
      <!-- <a class="schedule"><span class="pre">{{index.pre+1}}</span>/<span class="totle">{{index.queLen}}</span></a> -->
    </div>
    <div class="nav">
      <ul>
        <li v-for="(item,idx) in ques" v-bind:class="[index.pre==idx ? 'active' : '']" :key="idx" @click="linkQue(idx)">{{idx+1}}</li>
      </ul>
    </div>
    <div id="answer-body" class="answer-body">
      <div :id="fullpage?'fullpage':''">
        <!-- <full-page ref="fullpage" :options="options" id="fullpage"> -->
        <div class="section" v-for="(item,queId) in ques" :key="queId">
          <a class="answer-title"><span>{{queId+1}}.</span>{{item.question}}<span v-if="item.ismany==1">(多选)</span></a>
          <ul class="answer-list" data-presel="">
            <li v-for="(select,selId) in item.selects" :key="select" :data-queid="queId" :data-selid="selId">
              <svg v-if="selId==0" class="icon" aria-hidden="true"><use xlink:href="#icon-0"></use></svg>
              <svg v-if="selId==1" class="icon" aria-hidden="true"><use xlink:href="#icon-1"></use></svg>
              <svg v-if="selId==2" class="icon" aria-hidden="true"><use xlink:href="#icon-2"></use></svg>
              <svg v-if="selId==3" class="icon" aria-hidden="true"><use xlink:href="#icon-3"></use></svg>
              <svg v-if="selId==4" class="icon" aria-hidden="true"><use xlink:href="#icon-4"></use></svg>
              <svg v-if="selId==5" class="icon" aria-hidden="true"><use xlink:href="#icon-5"></use></svg>
              <a>{{select}}</a>
            </li>
          </ul>
        </div>
        </div>
      <!-- </full-page> -->
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Loading } from 'element-ui'
import { test } from '../../../js/iconfont.js'
import { MessageBox } from 'mint-ui'
import { Toast } from 'mint-ui'
export default {
  data() {
    return {
      options: { //屏滚配置
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
        // anchors: ['page1', 'page2', 'page3'],
        onLeave: this.onLeave
      },
      data: [],
      ques: null, //题目数据
      answers: {}, //答题记录
      subanswers: {}, //提交答题记录
      index: {
        timer: null,
        num: 0,
        pre: 0,
        answersNum: 0, //记录答题数量
        queLen: 0, //记录题目数量
        cateId: null, //顶级分类id
        seccateid: null, //二级分类id
        groupid: null, //关卡id,
        index: null,
        title: null
      },
      fullpage: true
    }
  },
  created() {
    this.index.cateId = this.$route.query.cateId
    this.index.seccateid = this.$route.query.seccateid
    this.index.groupid = this.$route.query.groupid
    this.index.index = this.$route.query.index
    this.index.title = this.$route.query.title
    console.log(this.index.seccateid)
    console.log(this.index.groupid)
    var _this = this
    function refresh() {
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.answer.getAnswer(_this.index.seccateid,_this.index.groupid)
        .then(res => {
          loadinginstace.close()
          _this.ques = res.data.data
          console.log(res)
          var len = res.data.data.length
          if (len === 0) {
            return
          }
          _this.$nextTick(function() {
            new fullpage('#fullpage', {
              licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
              onLeave: this.onLeave
            })
            _this.index.queLen = len
            _this.statusSet()
            _this.timeSet()
            for (let i = 0; i < len; i++) {
              _this.answers[i]= []
            }
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
    test() //加载icon js文件
  },
  beforeRouteLeave (to, from, next) {
    if (this.index.queLen === 0) {
      next()
      return
    }
    MessageBox({
      message: '答题未完成，确认退出吗？',
        showCancelButton: true
      }).then(action => {
        if( action =='confirm'){
          fullpage_api.destroy()
          next()
        }
      });
  },
  methods: {
    onLeave(origin, destination, direction) {
      var leavingSection = this
      var last = origin.index
      if (direction =='down'){
        this.index.pre++
      }
      else if (direction == 'up'){
        this.index.pre--
      }
      // console.log(this.index.pre)
    },
    back() {
      // if(this.index.queLen==0){
      //   this.$router.back(-1)
      //   return
      // }
      
    },
    statusSet() { //设置选择点击事件
      var lis = document.querySelectorAll('#answer-body li')
      var len = lis.length
      var _this = this;
      for (let i = 0; i < len; i++) {
        lis[i].addEventListener('click',function() {
          var queid = this.getAttribute('data-queid')
          var selid = this.getAttribute('data-selid')
          if (selid) {
            _this.setAnswers(queid,selid,this,_this.ques[queid].ismany)
          }
        })
      }
    },
    setAnswers(queid,selid,obj,ismany) { //设置答题记录
      var presel = obj.parentNode.getAttribute('data-presel')
      if (ismany==1) {
        // console.log('多选')
        if (obj.classList[0] == 'active') {
          obj.classList.remove('active')
          this.answers[queid].splice( this.answers[queid].indexOf(parseInt(selid)+1,1))
          return
        }
        this.answers[queid].push(parseInt(selid) + 1)
        obj.classList.add('active')
      }else if(ismany==0) {
        // console.log('单选')
        if (presel) {
          obj.parentNode.children[presel].classList.remove('active')
        }
        obj.parentNode.setAttribute('data-presel',selid)
        obj.classList.add('active')
        this.answers[queid] = [parseInt(selid) + 1]
      }
      // console.log(this.answers)
    },
    submit() { //提交答卷
      var num = 0
      var arr = Object.keys(this.answers);
      var len = arr.length
      for (let i = 0; i < len; i++) {
        if (this.answers[i]!='') {
          num++
        }
      }
      // if(num==0){ //无答题记录不允许提交
        // return
      // }else 
      if (num!=len) { //触发答题未完成事件
        MessageBox({
          title: '交卷提示',
          message: '未完成所有题目，确认交卷吗？',
          showCancelButton: true
        }).then(action => {
          if( action =='confirm'){
            this.onSubmit()
          }
        })
      }else {
        MessageBox({
          title: '交卷提示',
          message: '已完成所有题目确认交卷吗？',
          showCancelButton: true
        }).then(action => {
          if( action =='confirm'){
            this.onSubmit()
          }
        })
      }
      
    },
    onSubmit() {
      var arr = Object.keys(this.answers);
      var len = arr.length
      for (let i = 0; i < len; i++) {
        if (this.answers[i]=='') {
          this.subanswers[i] = ''
        }
         this.subanswers[i] = this.answers[i].join('|')
      }
      var loadinginstace = Loading.service({ fullscreen: true })
      this.$api.answer.submitone(this.subanswers,this.index.seccateid,this.index.groupid)
        .then(res => {
          loadinginstace.close()
          if(res.data.status==0){
            this.aftersubmit(res.data.data)
          }
          // this.$nextTick(function() {
            
          // })
        })
        .catch(error => {
          loadinginstace.close()
          console.log(error)
        })
    },
    aftersubmit(data) {
      var score = data.get_score
      if (data.is_pass==1) {
        MessageBox({
          title: '最终成绩',
          message: '恭喜你！成绩合格' + '<br/>' + '最终成绩' + score + '分',
          showCancelButton: true,
          cancelButtonText: '再答一次'
        }).then(action => {
          if( action =='confirm'){
            this.$router.back(-1)
          }else {
            location.reload()
          }
        })
      }else {
        MessageBox({
          title: '最终成绩',
          message: '很遗憾！成绩不合格' + '<br/>' + '最终成绩' + score + '分',
          showCancelButton: true,
          cancelButtonText: '再答一次'
        }).then(action => {
          if( action =='confirm'){
            this.$router.back(-1)
          }else {
            location.reload()
          }
        })
      }
    },
    linkQue(id) { //题目跳转
      fullpage_api.moveTo(id+1);
      this.index.pre = id
    },
    timeSet() {
      var timer = document.querySelector('#timer')
      timer.innerText = '00:00:00'
      // 答题倒计时
      var time = 0
      this.index.timer = setInterval(jishi, 1000) // 1000毫秒
      function jishi() {
        time++
        timer.innerText = calTime(time)
      }
      var	spit = ':'
      var	hour = '00'
      var	second = '00'
      var	min = '00'
      var	result = ''
      function calTime(time) {
        if (time % 60 !== 0) { // 秒
          if (time % 60 > 9) {
            second = time % 60
          } else {
            second = '0' + time % 60
          }
        }
        if (parseInt(time / 60) !== 0) { // 分
          if (parseInt(time / 60) > 9) {
            min = parseInt(time / 60)
          } else {
            min = '0' + parseInt(time / 60)
          }
        }
        if (parseInt(time / 3600) !== 0) { // 时
          if (parseInt(time / 3600) > 9) {
            hour = parseInt(time / 3600)
          } else {
            hour = '0' + parseInt(time / 3600)
          }
        }
        result = hour + spit + min + spit + second
        return result
      }
    }
  },
  watch: {
    
  },
  destroyed () {
      
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
  .icon {
    width: 1em; height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    position: absolute;
    top: 9px;
    left: 5px;
    /* color: #0097a8; */
    color: #a6a6a6;
    font-size: 1.4em;
  }
</style>
<style type="text/css">
</style>