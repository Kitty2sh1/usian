import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 配置element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 页面鉴权
import './authentication'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
