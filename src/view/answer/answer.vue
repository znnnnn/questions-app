<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <a @click="$router.back(-1)" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title" id="timer"></h1>
      <button id="submit" class="mui-btn mui-btn-link mui-pull-right" @click="submit">交卷</button>
    </header>
    <div class="header">
      <a class="desc">共{{index.queLen}}题，总计100分</a>
      <a class="schedule"><span class="pre">{{index.pre+1}}</span>/<span class="totle">{{index.queLen}}</span></a>
    </div>
    <div class="nav">
      <ul>
        <li v-for="(item,idx) in data" v-bind:class="[index.pre==idx ? 'active' : '']" @click="linkQue(idx)">{{idx+1}}</li>
      </ul>
    </div>
    <div id="answer-body" class="answer-body">
      <!-- <div id="fullpage"> -->
        <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section" v-for="(item,queId) in data">
          <a class="answer-title"><span>{{queId+1}}.</span>{{item.question}}<span v-if="item.ismany==1">(多选)</span></a>
          <ul class="answer-list" data-presel="">
            <li v-for="(select,selId) in item.selects" ref="select" class="select" :key="select" :data-queid="queId" :data-selid="selId">
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
        <!-- </div> -->
      </full-page>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import { Loading } from 'element-ui'
import { test } from '../../../js/iconfont.js'
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      options: { //屏滚配置
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
        // anchors: ['page1', 'page2', 'page3'],
        onLeave: this.onLeave
      },
      data: [
        {
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        },{
          id: '',
          question: '',
          ismany: '',
          selects: []
        }
      ],
      ques: null,
      answers: {}, //答题记录
      index: {
        timer: null,
        num: 0,
        pre: 0,
        answersNum: 0, //记录答题数量
        queLen: 0,
        seccateid: null,
        groupid: null
      }
    }
  },
  created() {
    this.seccateid = this.$route.query.seccateid
    this.groupid = this.$route.query.groupid
    var _this = this
    function refresh() {
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.answer.getAnswer(_this.seccateid,_this.groupid)
        .then(res => {
          loadinginstace.close()
          _this.data = res.data.data
          _this.ques = res.data.data
          var len = res.data.data.length
          _this.index.queLen = len
          // new fullpage('#fullpage', {
          //   options: {
          //     'licenseKey': 'OPEN-SOURCE-GPLV3-LICENSE'
          //   },
          //   onLeave: this.onLeave
          // })
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
    
    this.statusSet()
    // var lis = this.$ref.select
    // var len = this.data.length
    // for (let i = 1; i <= len; i++) {
    //   var name = 'page' + i
    //   this.options.anchors.push(name)
    //   this.answers[i-1]= []
    // }
    // this.timeSet()
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
    statusSet() { //设置选择点击事件
      // console.log(this.index.num)
      // this.index.num++
      // if (this.index.num>2) {
      //   return
      // }
      var lis = document.getElementsByClassName('select')
      var newLis = this.makeArray(lis)
      var arr = Object.keys(lis)
      var len = arr.length
      // console.log(newLis)
      var _this = this;
      for (let i = 0; i < len; i++) {
        lis[i].addEventListener('click',function() {
          var queid = this.getAttribute('data-queid')
          var selid = this.getAttribute('data-selid')
         if (selid) {
          // _this.setAnswers(queid,selid,this,_this.data[queid].ismany)
         }
        })
      }
    },
    makeArray(arr){ 
    if(arr.item){ 
      var len = arr.length
      var array = []
      while(len--){ 
        array[len] = arr[len]
      } 
      return array
      } 
      return Array.prototype.slice.call(arr)
    },
    setAnswers(queid,selid,obj,ismany) { //设置答题记录
      
      // var presel = obj.parentNode.getAttribute('data-presel')
      // if (ismany) {
      //   // console.log('多选')
      //   if (obj.classList[0]=='active') {
      //     obj.classList.remove('active')
      //     this.answers[queid].splice( this.answers[queid].indexOf(parseInt(selid)+1,1))
      //     return
      //   }
      //   this.answers[queid].push(parseInt(selid) + 1)
      //   obj.classList.add('active')
      // } else {
      //   // console.log('单选')
      //   if (presel) {
      //     obj.parentNode.children[presel].classList.remove('active')
      //   }
      //   obj.parentNode.setAttribute('data-presel',selid)
      //   obj.classList.add('active')
      //   this.answers[queid] = [parseInt(selid) + 1]
      // }
      // console.log(obj.classList)
    },
    submit() { //提交答卷
      // var num = 0
      // var arr = Object.keys(this.answers);
      // var len = arr.length
      // for (let i = 0; i < len; i++) {
      //   if (this.answers[i]!='') {
      //     num++
      //   }
      // }
      // if(num==0){ //无答题记录不允许提交
      //   return
      // }else if (num!=len) { //触发答题未完成事件
      //   MessageBox({
      //     title: '交卷提示',
      //     message: '未完成所有题目，确认交卷吗？',
      //     showCancelButton: true
      //   }).then(({ value, action }) => {
      //     console.log(1)
      //   });
      // }else {
      //   MessageBox({
      //     title: '交卷提示',
      //     message: '已完成所有题目确认交卷吗？',
      //     showCancelButton: true
      //   }).then(({ value, action }) => {
      //     console.log(2)
      //   });
      // }
      // console.log(this.answers)

    },
    linkQue(id) { //题目跳转
      fullpage_api.moveTo(id+1);
      this.index.pre = id
    },
    timeSet() {
      // var timer = document.querySelector('#timer')
      // timer.innerText = '00:00:00'
      // // 答题倒计时
      // var time = 0
      // this.index.timer = setInterval(jishi, 1000) // 1000毫秒
      // function jishi() {
      //   time++
      //   timer.innerText = calTime(time)
      // }
      // var	spit = ':'
      // var	hour = '00'
      // var	second = '00'
      // var	min = '00'
      // var	result = ''
      // function calTime(time) {
      //   if (time % 60 !== 0) { // 秒
      //     if (time % 60 > 9) {
      //       second = time % 60
      //     } else {
      //       second = '0' + time % 60
      //     }
      //   }
      //   if (parseInt(time / 60) !== 0) { // 分
      //     if (parseInt(time / 60) > 9) {
      //       min = parseInt(time / 60)
      //     } else {
      //       min = '0' + parseInt(time / 60)
      //     }
      //   }
      //   if (parseInt(time / 3600) !== 0) { // 时
      //     if (parseInt(time / 3600) > 9) {
      //       hour = parseInt(time / 3600)
      //     } else {
      //       hour = '0' + parseInt(time / 3600)
      //     }
      //   }
      //   result = hour + spit + min + spit + second
      //   return result
      // }
    }
  },
  watch: {
    data: function(){
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