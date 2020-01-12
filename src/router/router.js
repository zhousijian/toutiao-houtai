// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from 'vue-router'

// 引入路由所需要映射的文件
import Login from '@/views/login.vue'

// 挂载，让VueRouter管理路由
Vue.use(VueRouter)

// 创建路由对象
let router = new VueRouter({
  // 配置路由
  routes: [
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 暴露
export default router
