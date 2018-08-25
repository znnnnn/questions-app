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
export default {
  data() {
    return {
      item: [
        {
          // 这里为赖金威给的测试数据
          'id': 22,
          'user_id': 1,
          'group_id': 16,
          'time': 1,
          'max_get_score': 80,
          'is_pass': '1',
          'created_at': '2018-08-10 16:45:09',
          'updated_at': null,
          'name': '医疗行业防诈骗',
          'mark': '医疗行业',
          'start_time': '2018-08-08 00:00:00',
          'expire_time': '2018-08-20 00:00:00'
        },
        {
          'id': 23,
          'user_id': 1,
          'group_id': 17,
          'time': 1,
          'max_get_score': 60,
          'is_pass': '0',
          'created_at': '2018-08-10 16:45:35',
          'updated_at': null,
          'name': '交通行业防诈骗',
          'mark': '交通行',
          'start_time': '2018-08-10 00:00:00',
          'expire_time': '2018-08-20 00:00:00'
        },
        {
          'id': 24,
          'user_id': 1,
          'group_id': 18,
          'time': 1,
          'max_get_score': 50,
          'is_pass': '0',
          'created_at': '2018-08-10 16:45:37',
          'updated_at': null,
          'name': '金融行业防诈骗',
          'mark': '金融行业',
          'start_time': '2018-08-08 00:00:00',
          'expire_time': '2018-08-09 00:00:00'
        },
        {
          'id': 25,
          'user_id': 1,
          'group_id': 19,
          'time': 1,
          'max_get_score': 90,
          'is_pass': '1',
          'created_at': '2018-08-10 16:45:39',
          'updated_at': null,
          'name': '4电信行业防诈骗',
          'mark': '4电信行业',
          'start_time': null,
          'expire_time': null
        }
      ]
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

