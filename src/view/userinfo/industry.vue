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
            <div v-for="(item, index) in item" :key="index" v-bind:class="['box',item.is_pass === '1' ? 'on' : 'off']">
              <div>
                <a class="title">{{item.name}}</a>
                <a class="grade">{{item.max_get_score}}</a>
                <a></a>
              </div>
              <div class="box-bottom">
                时间：
                <a>{{item.start_time ? item.start_time : 'undefined'}}---{{item.expire_time ? item.expire_time : 'undefinedundefined'}}</a>
                <a class="lable">{{item.mark}}</a>
              </div>
            </div>
            <!-- <div class="box off">
              <div>
                <a class="title">的撒大祭祀啊大家</a>
                <a class="grade">2222</a>
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
        console.log(res.data)
        // console.log(i)
        console.log(this.item)
        // this.items = res
      })
  },
  created() {

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

