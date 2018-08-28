<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/answer/common" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title" id="timer"></h1>
      <button id="submit" class="mui-btn mui-btn-link mui-pull-right">交卷</button>
    </header>
    <div class="header">
      <a class="desc">共{{data.length}}题，总计100分</a>
      <a class="schedule"><span class="pre">{{index.pre+1}}</span>/<span class="totle">{{data.length}}</span></a>
    </div>
    <div id="answer-body" class="answer-body">
        <full-page ref="fullpage" :options="options" id="fullpage">
        <div class="section" v-for="item in data">
          <a class="answer-title"><span>12.</span>{{item.title}}</a> 
          <ul class="answer-list">
            <li v-for="select in item.selects">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-A"></use></svg>
              <a>{{select}}</a>
            </li>
          </ul>
        </div>
      </full-page>
    </div>
  </div>
</template>

<script>
import { test } from '../../../js/iconfont.js'
export default {
  data() {
    return {
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
        // anchors: ['page1', 'page2', 'page3'],
        anchors: [],
        onLeave: this.onLeave
        // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
      },
      data: [
        {
          title: 1,
          selects: [1.1, 1.2, 1.3, 1.4]
        },
        {
          title: 2,
          selects: [2.1, 2.2, 2.3, 2.4]
        },
        {
          title: 3,
          selects: [3.1, 3.2, 3.3, 3.4]
        }
      ],
      status: [

      ],
      index: {
        pre: 0
      }
    }
  },
  mounted() {
    test()
    var len = this.data.length
    for (let i = 1; i <= len; i++) {
      var name = 'page' + i
      this.options.anchors.push(name)
    }
    this.timeSet()
  },
  methods: {
    onLeave(origin, destination, direction) {
      // var leavingSection = this
      // var last = origin.index
      // if (direction =='down'){
      //   this.index.pre++
      // }
      // else if (direction == 'up'){
      //   this.index.pre--
      // }
      console.log(this.index.pre)
    },
    timeSet() {
      var timer = document.querySelector('#timer')
      timer.innerText = '00:00:00'
      // 答题倒计时
      var time = 0
      setInterval(jishi, 1000) // 1000毫秒
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