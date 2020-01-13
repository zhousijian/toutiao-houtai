// 引入vue
import Vue from 'vue'

// 引入vue-router
import VueRouter from 'vue-router'

// 引入路由所需要映射的文件
import Login from '@/views/login.vue' // 登录页面
import Index from '@/views/index.vue' // 首页
import Welcome from '@/views/welcome.vue' // 欢迎页
import Articles from '@/views/articles.vue' // 文章列表
import ArticleFB from '../views/articleFB.vue' // 文章发布

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
    },
    {
      name: 'index',
      path: '/index',
      component: Index,
      // 添加重定向，显示欢迎信息
      redirect: { name: 'welcome' },
      children: [
        {
          name: 'welcome',
          path: 'welcome',
          component: Welcome
        },
        {
          name: 'articles',
          path: 'articles',
          component: Articles
        },
        {
          name: 'articleFB',
          path: 'articleFB',
          component: ArticleFB
        }
      ]
    }
  ]
})

// 设置导航守卫
router.beforeEach((to, from, next) => {
  //   console.log(to)
  if (to.path === '/login') {
    next()
  } else {
    let token = localStorage.getItem('tokenht')
    if (token) {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

// 暴露
export default router
