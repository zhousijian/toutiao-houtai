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
          <VueEditor :config="config" v-if="myarticle.type==1" />
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
          <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            v-if="myarticle.type==2"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传视频文件</div>
          </el-upload>
        </el-form-item>

        <!-- 按钮 -->
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
// 引入富文本，下面两个
import VueEditor from 'vue-word-editor'
import 'quill/dist/quill.snow.css'
export default {
  data () {
    return {
      myarticle: {
        title: '',
        content: '',
        categories: [],
        cover: [],
        type: 1
      },
      config: {
        // 上传图片的配置
        uploadImage: {
          url: 'http://localhost:3000/upload',
          name: 'file',
          // res是结果，insert方法会把内容注入到编辑器中，res.data.url是资源地址
          uploadSuccess (res, insert) {
            insert('http://localhost:3000' + res.data.url)
          }
        },

        // 上传视频的配置
        uploadVideo: {
          url: 'http://localhost:3000/upload',
          name: 'file',
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
  }
}
</script>

<style lang="less" scoped>
.box-card {
  margin-top: 50px;
}
</style>
