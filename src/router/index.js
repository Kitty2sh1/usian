import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'

Vue.use(VueRouter)

const routes = [
  // 登录页面
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // 主页
  {
    path:'/',
    name:'home',
    component:()=>import('../home')
  }
]

const router = new VueRouter({
  routes
})

export default router
