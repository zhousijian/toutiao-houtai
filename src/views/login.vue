<template>
  <div class="login">
    <div class="container">
        <img class="avatar" src="../assets/avatar.jpg" alt="">
      <!--
        model:整个表单的数据对象，里面的每一个表单元素分别绑定这个对象中的某个属性
        rules:验证规则，它是一个对象，里面的每组键值对就是一条规则，一条规则就是一个数据属性的规则
        ref:当前表单的标识
        label-width：标签的宽度
      -->
      <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
        <!--
        label:设置标签的文本内容
        prop:设置当前表单元素所需要使用的验证规则，属性名称，prop属性的值和验证规则一般完全一样
        v-model:数据绑定，绑定为form所指定的对象的成员
        -->
        <!-- 账号框 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon='icon-user'></el-input>
        </el-form-item>
        <!-- 密码框 -->
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" placeholder="请输入密码" prefix-icon='icon-key' @keyup.enter.native='Login'></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" @click="Login">登录</el-button>
        </el-form-item>
      </el-form>

    </div>

  </div>
</template>

<script>
import { login } from '@/apis/user'
export default {
  data () {
    return {
      loginForm: {
        username: '12345',
        password: '123'
      },
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' }
          // required:必填项
          // 如果不符合规则提示的信息
          // 触发时机
          // partten:正则
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 16, message: '长度在3到16位密码', trigger: 'blur' }
          //
        ]
      }
    }
  },
  methods: {
    // 登录
    Login () {
      this.$refs.loginForm.validate(async valid => {
        if (valid) {
          let res = await login(this.loginForm)
          //   console.log(res)
          if (res.data.message === '登录成功') {
            localStorage.setItem('tokenht', res.data.data.token)
            // this.$message.success(res.data.message)
            this.$router.push({ name: 'index' })
          } else {
            this.$message.error(res.data.message)
          }
        } else {
          this.$message.error('数据填写不合法')
          return false
        }
      })
      //   console.log(111)
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;
  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
