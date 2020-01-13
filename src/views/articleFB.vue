<template>
  <div class="articleFB">
    <!-- 面包屑 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>文章管理</el-breadcrumb-item>
      <el-breadcrumb-item>文章发布</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- card卡片 -->
    <el-card class="box-card">
      <!-- form表单 -->
      <el-form ref="form" :model="myarticle" label-width="80px">
        <!-- 标题 -->
        <el-form-item label="标题：">
          <el-input v-model="myarticle.title"></el-input>
        </el-form-item>

        <!-- 单选框 -->
        <!-- 单选按钮组
        label：当用户选择某个单选按钮的时候，会获取到这个label值，它相当于这个单选按钮的实际值
        v-model：当用户选择某个单选按钮之后，会自动的将label的值赋值给v-model所绑定的属性
        -->
        <el-form-item label="类型：">
          <el-radio-group v-model="myarticle.type">
            <el-radio :label="1">文章</el-radio>
            <el-radio :label="2">视频</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- 富文本框和upload文件上传 -->
        <el-form-item label="内容：">
          <!-- 富文本 -->
          <VueEditor :config="config" v-if="myarticle.type==1" ref="fuwenben" />
          <!-- upload点击文件上传 -->
          <!-- class="upload-demo"// 样式
           action="https://jsonplaceholder.typicode.com/posts/"// 处理文件上传的服务器路径
           :on-preview="handlePreview"// 预览
           :on-remove="handleRemove"//移除文件所触发的事件
           :before-remove="beforeRemove"// 移除文件前所触发的事件
           multiple // 可以选择多个文件
           :limit="3" // 数量限制
           :on-exceed="handleExceed"// 超出数量限制时所触发的事件
           :file-list="fileList"// 当前用户所选择文件列表
          -->
          <!-- upload文件上传 -->
          <el-upload
            class="upload-demo"
            action="http://localhost:3000/upload"
            v-if="myarticle.type==2"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>

        <!-- indeterminate 复选框组 -->
        <!-- 1.el-checkbox的常见属性和事件
         :indeterminate="isIndeterminate":说明当前没有全选也没有全不选
         v-model="checkAll"：标记是否是全选状态，值为true/false
         @change="handleCheckAllChange":切换全选和全不选状态
         ----------------------------------------
         2.el-checkbox-group的常见属性和事件
         v-model="数组"：包含着默认选中的复选框数据，这个数据是当前复选框所代表的实际值
         @change="handleCheckedCitiesChange"：单击复选框组中的某个复选框所触发的事件
        :label="实际值"：这是复选框组中单个复选框的属性，它代表当前复选框的实际值，并且：
        当这个复选框被选中之后，它的label值会自动的添加到当前复选框组v-model所绑定的数组中
        -->
        <el-form-item label="栏目：">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <div style="margin: 15px 0;"></div>
          <el-checkbox-group v-model="myarticle.categories" @change="handleCheckedCitiesChange">
            <el-checkbox v-for="(v,i) in cateList" :label="v.id" :key="i">{{v.name}}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <!-- 照片墙 -->
        <el-form-item label="封面：">
          <el-upload action="http://localhost:3000/upload" list-type="picture-card" :headers="getToken()" :on-success="sccg" :on-remove="yccg">
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary" @click="FBarticle">发布文章</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本，下面两个
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
//
import { catelist } from '../apis/category'
import { articleFB } from '../apis/article'
export default {
  data () {
    return {
      myarticle: {
        // 下面五个是发布文章需要的数据
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      checkAll: false,
      isIndeterminate: false,
      cateList: [],
      config: {
        // 上传图片的配置
        uploadImage: {
          // 指定处理文件上传的服务器的接口址
          url: 'http://localhost:3000/upload',
          // 后台所需要的参数的名称
          name: 'file',
          // 传递token
          headers: this.getToken(),
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          // 指定处理文件上传的服务器的接口址
          url: 'http://localhost:3000/upload',
          // 后台所需要的参数的名称
          name: 'file',
          // 传递token
          headers: this.getToken(),
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        }
      }
    }
  },
  components: {
    // 注册富文本
    VueEditor
  },
  async mounted () {
    let res = await catelist()
    // console.log(res)
    this.cateList = res.data.data.splice(2)
  },
  methods: {

    // 图片上传成功的回调
    sccg (response) {
      console.log(response)
      if (response.message === '文件上传成功') {
        this.myarticle.cover.push(response.data.id)
      }
    },

    // 图片删除的回调
    yccg (file, fileList) {
    //   console.log(file)
    //   console.log(fileList)
      this.myarticle.cover = fileList.map(value => {
        return value.response.data.id
      })
    },

    // 获取token设置
    getToken () {
      let token = localStorage.getItem('tokenht')
      return { Authorization: token }
    },

    handleCheckAllChange (val) {
    //   console.log(val)

      this.myarticle.categories = val ? this.cateList.map(value => {
        return value.id
      }) : []
      //   console.log(this.myarticle.categories)

      this.isIndeterminate = false
    },
    handleCheckedCitiesChange (value) {
    //   console.log(value)

      let checkedCount = value.length
      this.checkAll = checkedCount === this.cateList.length
      this.isIndeterminate =
          checkedCount > 0 && checkedCount < this.cateList.length
    },
    async FBarticle () {
      // eslint-disable-next-line eqeqeq
      if (this.myarticle.type == 1) {
        this.myarticle.content = this.$refs.fuwenben.editor.root.innerHTML
      }

      this.myarticle.categories = this.myarticle.categories.map(value => {
        return { id: value }
      })
      this.myarticle.cover = this.myarticle.cover.map(value => {
        return { id: value }
      })

      //   console.log(this.myarticle)

      let res = await articleFB(this.myarticle)
      console.log(res)
    //   if (res.data.message === '文章发布成功') {
    //     this.$message.success(res.data.message)
    //     this.$router.push({ name: 'articles' })
    //   }
    }
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
}
</style>
