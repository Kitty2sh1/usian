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
    path: '/',
    name: 'home',
    redirect: 'index',
    component: () => import('../layout'),
    children: [
      {
        path: 'index',
        name: 'index',
        component: () => import('../views/home'),
        meta: {
          title: '首页'
        }
      },
      {
        path: 'member',
        name: 'member',
        component: () => import('../views/member'),
        meta: {
          title: '会员管理'
        }
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('../views/supplier'),
        meta: {
          title: '供应商管理'
        }
      },
      {
        path: 'goods',
        name: 'goods',
        component: () => import('../views/goods'),
        meta: {
          title: '商品管理'
        }
      },
      {
        path: 'staff',
        name: 'staff',
        component: () => import('../views/staff'),
        meta: {
          title: '员工管理'
        }
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
