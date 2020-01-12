import Vue from 'vue'
import App from './App.vue'

// 全局引入ElementUI后台框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
