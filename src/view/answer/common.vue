<template>
  <div class="indexContainer">
    <header class="mui-bar mui-bar-nav cblue">
      <a @click="$router.back(-1)" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
      <h1 class="mui-title">{{title}}</h1>
    </header>
    <div class="mui-content">
			<div class="knowledge-category list">
				<ul>
					<li v-for="(item,index) in nav" :class="index==0?'active nav':'nav'" :key="index" :data-index="index" :data-id="item.id"><a>{{item.name}}</a></li>
				</ul>
			</div>

      <div class="mui-scroll-wrapper levels wrapper">
        <div class="mui-scroll content">
          <router-link v-for="(item,index) in levels" :key="index" :to="{
            path: item.able==1?'/answer/answer':'',
            query: {
              cateId: cateId,
              seccateid: secCateId,
              groupid: item.id,
              title: title,
              index: index
            }
          }">
            <ul :class="item.able==0?'lock':''">
              <li>
                <svg :class="item.difficulty>0?'icon active':'icon'" aria-hidden="true"><use class="ic" xlink:href="#icon-xunzhang"></use></svg>
                <svg :class="item.difficulty>1?'icon active':'icon'" aria-hidden="true"><use class="ic" xlink:href="#icon-xunzhang"></use></svg>
                <svg :class="item.difficulty>2?'icon active':'icon'" aria-hidden="true"><use class="ic" xlink:href="#icon-xunzhang"></use></svg>
              </li>
              <li>
                <a>{{item.name}}</a>
                <a>{{item.grade==null?0:item.grade}}</a>
              </li>
            </ul>
          </router-link>
          <div class="msg">{{message}}</div>
          <!-- <router-link to="/answer/answer">
            <ul>
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link>
          <router-link to="/answer/answer">
            <ul class="lock">
              <li>
                <i class="iconfont icon-xunzhang active"></i>
                <i class="iconfont icon-xunzhang"></i>
                <i class="iconfont icon-xunzhang"></i>
              </li>
              <li>
                <a>第一关</a>
                <a>1000</a>
              </li>
            </ul>
          </router-link> -->
        </div>
      </div>
		</div>
    <router-view></router-view>
  </div>
</template>
<script>
/* eslint-disable */
import { test } from '../../../js/iconfont.js'
import { Loading } from 'element-ui'
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      levels: null,
      title: '',
      nav: null,
      cateId: null,
      secCateId: null,
      preNav: 0,
      index: null,
      message: null
    }
  },
  created() {
    this.cateId = this.$route.query.cateid
    this.title = this.$route.query.title
    this.index = this.$route.query.index
    var _this = this
    function refresh() {
      var loadinginstace = Loading.service({ fullscreen: true })
      _this.$api.levels.getNav(_this.cateId)
        .then(res => {
          loadinginstace.close()
          if (res.data.data=='') {
            _this.message = '暂无数据'
            return
          }
          _this.nav = res.data.data
          _this.secCateId = res.data.data[0].id
          _this.$nextTick(function() {
            _this.navClick()
          })
          _this.$api.levels.getLevels(_this.secCateId)
            .then(res => {
              loadinginstace.close()
              _this.levels = res.data.data
              // _this.$nextTick(function() {
              //   _this.loadScroll()
              // })
            })
            .catch(error => {
              loadinginstace.close()
              console.log(error)
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
    this.loadScroll()
  },
  methods: {
    navClick: function() {
      var nav = document.querySelectorAll('li.nav')
      var len = nav.length
      var _this = this
      for (let i = 0; i < len; i++) {
        nav[i].addEventListener('click', function() {
          var loadinginstace = Loading.service({ fullscreen: true })
          var id = this.getAttribute('data-id')
          _this.secCateId = id
          nav[_this.preNav].classList.remove('active')
          _this.preNav = this.getAttribute('data-index')
          this.classList.add('active')
          _this.$api.levels.getLevels(id)
            .then(res => {
              loadinginstace.close()
              _this.levels = res.data.data
            })
            .catch(error => {
              loadinginstace.close()
              console.log(error)
            })
        })
      }
    },
    example: function() {
      this.$nextTick(function() {
      })
    },
    loadScroll: function() {
      var scroll = new BScroll('.wrapper',{
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
  top: 50px;
}
.mui-content {
  width: 100%;
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto;
  padding-top: 0!important;
}
.levels {
  overflow: auto;
}
.list {
  width: 100%;
  position: absolute;
  /* top: 44px; */
}
.indexContainer {
  /* padding-top: 44px; */
  position: absolute;
  z-index: 99;
  width: 100%;
  top: 0;
  bottom: 0;
  background-color: #fdfaff;
}
.msg {
  color: #cccccc;
  font-size: 120%;
  text-align: center;
}
</style>
