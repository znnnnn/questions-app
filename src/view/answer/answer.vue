<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/answer/indexIndustry" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">正在答题</h1>
      <button id="submit" class="mui-btn mui-btn-link mui-pull-right">交卷</button>
    </header>
    <div class="header">
      <a class="desc">共{{data.length}}题，总计100分</a>
      <a class="schedule"><span class="pre">1</span>/<span class="totle">{{data.length}}</span></a>
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
import {test} from '../../../js/iconfont.js'
export default {
  data() {
    return {
      options: {
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        menu: '#menu',
        // anchors: ['page1', 'page2', 'page3'],
        anchors: [],
        // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
      },
      data: [
        {
          title: 1,
          selects: [1.1,1.2,1.3,1.4]
        },
        {
          title: 2,
          selects: [2.1,2.2,2.3,2.4]
        },
        {
          title: 3,
          selects: [3.1,3.2,3.3,3.4]
        },
      ],
      status: [

      ],
    }
  },
  mounted() {
    test();
    var len = this.data.length;
    // for (let i = 1; i <= len; i++) {
    //   let name = 'page' + i;
    //   this.options.anchors.push(name);
    // }
    // console.log(this.options.anchors)
  },
  
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