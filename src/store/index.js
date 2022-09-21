import Vue from 'vue'
import Vuex from 'vuex'
import request from "../api/index"
import { setItemToken, setItemUserInfo, getItemToken, getItemUserInfo, removeItemTokenUserInfo } from "../utils/auto"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: getItemToken() || "",        //utils/auto.js里封装的获取token方法
    userinfo: getItemUserInfo() || ""   //utils/auto.js里封装的获取userinfo方法
  },
  getters: {
    token(state) {
      return state.token
    },
    userInfo(state) {
      return state.userinfo
    }
  },
  mutations: {
    // token
    SET_TOKEN(state, token) {
      state.token = token
      // utils/auto.js里封装的存储token方法
      setItemToken(token)
    },
    // userinfo
    SET_USERINFO(state, userinfo) {
      state.userinfo = userinfo
      // utils/auto.js里封装的存储userinfo方法
      setItemUserInfo(userinfo)
    }
  },
  actions: {
    // 登录方法
    async queryLogin({ commit }, loginForm) {
      try {
        const response = await request.getLogin(loginForm) //登录
        // 将token存至vuex
        commit('SET_TOKEN', response.token)
        console.log(response, '登录');
        return response.token
      } catch (error) {
        console.log(error.message);
      }
    },
    // 获取用户信息
    async queryUserInfo({ commit }) {
      try {
        const response = await request.getInfoAdmin()//用户信息
        console.log(response, '获取用户信息');
        // userinfo存至vuex
        commit('SET_USERINFO', response)
        return response
      } catch (error) {
        console.log(error.message);
      }
    }
  },
  modules: {
  }
})
