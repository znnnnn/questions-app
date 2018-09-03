<template>
  <div>
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/userinfo" class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">参与的行业答题</h1>
    </header>

    <div class="mui-content">
      <div class="mui-scroll-wrapper">
        <div class="mui-scroll">
          <div>
            <div v-for="(item, index) in item" :key="index" class="box">
              <div>
                <a class="title">{{item.name}}</a>
                <a class="grade">最高成绩：{{item.max_get_score}}</a>
                <a></a>
              </div>
              <div class="box-bottom">
                时间：
                <a>{{item.start_time ? item.start_time : 'undefined'}}---{{item.expire_time ? item.expire_time : 'undefined'}}</a>
                <a class="lable">{{item.mark}}</a>
              </div>
            </div>
            <!-- <div class="box off">
              <div>
                <a class="title">的撒大祭祀啊大家</a>
                <a class="grade">最高成绩：2222</a>
                <a></a>
              </div>
              <div class="box-bottom">
                时间：
                <a>2018/07/17---2018/07/17</a>
                <a class="lable">dhauis</a>
              </div>
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
// import { Loading } from 'element-ui'
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      item: []
    }
  },
  mounted() {
    this.$api.userinfoIndustry.getUserinfoIndustry()
      .then(res => {
        for (let index = 0; index < res.data.data.length; index++) {
          this.$set(this.item, index, res.data.data[index])
        }
        this.checkData()
        // console.log(i)
        // console.log(this.item)
        // this.items = res
      })
  },
  created() {

  },
  methods: {
    checkData() {
      if (this.item.length === '') {
        return
      }
      var _this = this
      var boxs = document.querySelectorAll('.box')
      var len = boxs.length
      var time = new Date().getTime()
      for (let i = 0; i < len; i++) {
        // var sTime = this.item[i].start_time ? this.item[i].start_time : this.item[i].pivot.start_time
        // sTime = sTime ? sTime : 0
        var eTime = this.item[i].expire_time ? this.item[i].expire_time : this.item[i].pivot.expire_time
        // eTime = eTime ? eTime : 0
        // var nsTime = new Date(sTime).getTime()
        var neTime = new Date(eTime).getTime()
        if (time < neTime) {
          // boxs[i].addEventListener('click', function() {
          //   Toast('1')
          // })
        } else {
          boxs[i].classList.add('off')
          // boxs[i].addEventListener('click', function() {
          //   Toast('答题已结束')
          // })
        }
      }
    }
  }
}
</script>



<style scoped src="@css/userinfo/industry.css">

</style>


<style scoped>
.mui-scroll-wrapper {
  background-color: #efefef;
}

.mui-bar-nav.mui-bar .mui-icon {
  margin-top:0;
}

.mui-scroll {
  display:flex;
  justify-content: space-around;
  align-items: center;
}

.mui-scroll>div{
  width:100%;
}

.box {
  width: 48% !important;
}

</style>

