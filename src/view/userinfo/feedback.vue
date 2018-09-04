<template>
  <div class="container">
    <header class="mui-bar mui-bar-nav cblue">
      <router-link to="/userinfo"
                   class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></router-link>
      <h1 class="mui-title">意见反馈</h1>
    </header>
    <div class="mui-content feedback-content">
      <div class="box">
        <div class="mui-content-padded">
          <div class="mui-inline">问题和意见</div>
        </div>
        <div class="row mui-input-row">
          <textarea id='question'
                    class="mui-input-clear question"
                    placeholder="请详细描述你的问题和意见..."
                    v-model="question"></textarea>
        </div>
        <p>图片(选填,提供问题截图,总大小10M以下)</p>
        <!-- <div id='image-list' class="row image-list"></div> -->
        <el-upload action="http://101.132.141.130:82/api/feedback/create"
                   :before-upload="beforUpload"
                   list-type="picture-card"
                   :file-list="fileList"
                   :on-preview="handlePictureCardPreview"
                   ref="newupload"
                   :on-remove="handleRemove"
                   :multiple="true"
                   id="file">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%"
               :src="dialogImageUrl"
               alt="">
        </el-dialog>
        <p>QQ/邮箱</p>
        <div class="mui-input-row">
          <input id='contact'
                 type="text"
                 class="mui-input-clear contact"
                 placeholder="(选填,方便我们联系你 )"
                 v-model="mail" />
        </div>
        <div class="sub">
          <button id="submit"
                  class="mui-btn mui-btn-blue mui-btn-link"
                  @click="submit">立即提交</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      question: '',
      mail: '',
      imgFileList: [],
      fileList: [
        // {
        //   name: 'food.jpeg',
        //   url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        // }, {
        //   name: 'food2.jpeg',
        //   url: '测试文字'
        // }
      ],
      index: 0,
      docmHeight: document.documentElement.clientHeight // 默认屏幕高度
    }
  },
  mounted() {
    this.autoHeight()
  },
  methods: {
    beforUpload(file) {
      // console.log(this.getObjectURL(file))
      // console.log(this.fileList)
      const imgUrl = this.getObjectURL(file)
      this.fileList.splice(this.fileList.length + 1, 1, this.previewObj(file.name, imgUrl))
      this.imgFileList.push(imgUrl)
      return false
    },
    submit() {
      // this.$refs.newupload.submit()
      // console.log(this.$api.feedback.feedback())
      this.$api.feedback.feedback(this.question, this.imgFileList, this.mail)
        .then(res => {
          // console.log(res)
          if (this.question === '') {
            this.$message({
              message: '内容不能为空',
              type: 'error',
              center: true
            })
          } else if (res.data.status === 2) {
            this.$message({
              message: '图片过多！',
              type: 'error',
              center: true
            })
          } else if (res.data.status === 3) {
            this.$message({
              message: '图片文件太大！',
              type: 'error',
              center: true
            })
          } else if (res.data.status === 0) {
            this.question = ''
            this.mail = ''
            this.fileList = []
            this.imgFileList = []
            this.$message({
              message: '反馈成功！',
              type: 'success',
              center: true
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    handleRemove(file, fileList) {
      // 通过Uid来删除指定图片
      // console.log(file.uid)
      // console.log(fileList)
      // console.log(this.fileList)
      this.fileList.forEach((item, i) => {
        if (item.uid === file.uid) {
          this.fileList.splice(i, 1)
          this.imgFileList.splice(i, 1)
        }
      })
      // console.log($('.el-upload-list__item-delete'))
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    getObjectURL(file) {
      var url = null
      if (window.createObjectURL !== undefined) { // basic
        url = window.createObjectURL(file)
      } else if (window.URL !== undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file)
      } else if (window.webkitURL !== undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file)
      }
      return url
    },
    previewObj(name, url) {
      return {
        name: name,
        url: url
      }
    },
    autoHeight() {
      var con = document.querySelector('.container')
      con.style.height = this.docmHeight + 70 + 'px'
      window.onresize = function() {
        // console.log(document.documentElement.clientHeight)
        con.style.height = document.documentElement.clientHeight + 70 + 'px'
      }
    }
  }
}
</script>


<style scoped src="@css/userInfo/feedback.css">
</style>

<style scoped>
/* 仅本组件可用的样式 */
* {
  z-index: 98;
}

.mui-content {
  background-color: #fdfaff;
  transition: 0.5s all;
  position: relative;
  padding-top: 44px;
}

header {
  z-index: 102;
}

.box {
  padding-top: 44px;
}

.container {
  position: absolute;
  height: auto;
  /* padding-bottom: 50px; */
  z-index: 100;
}

.v-modal {
  z-index: 0 !important ;
}

.mui-bar-nav ~ .mui-content {
}

div.sub {
  padding-top:10px;
}

#contact {
  position: relative;
}

.container {
  min-height: 630px;
}

.feedback-content {
  height: 100% !important;
}

.box {
  margin-top: 50px;
}
</style>