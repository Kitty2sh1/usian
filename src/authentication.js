// 页面鉴权   在main.js中引入
// 引入router/index.js
import routers from "./router"
// 引入store/index.js
import store from "./store"

// to     去哪
// from   从哪来
// next   放行
routers.beforeEach(async (to, from, next) => {
    // 获取token
    const token = store.getters.token
    // 判断token是否存在
    // token存在
    if (token) {
        // token存在不允许跳转login
        // 判断跳转login
        if (to.path === '/login') {
            // 跳转至原页面
            next(from.path)
        }
        else {
            // 获取用户信息userinfo
            let userinfo = store.getters.userinfo
            // typeof判断userinfo类型是否是object
            // 满足条件返回  JSON.stringify(userinfo)
            // 不满足条件返回空字符串''
            userinfo = typeof userinfo === 'object' ? JSON.stringify(userinfo) : userinfo
            //  if判断userinfo===''或==='{}'  userinfo为空值就调用用户信息接口
            if (userinfo === '' || userinfo === '{}') {
                // 用户信息接口
                const response = await store.dispatch('queryUserInfo')
                // 判断接口调用成功
                if (response) {
                    //接口调用成功就放行
                    // 所有页面放行
                    next()
                } else {
                    // 接口调用不成功就跳转到login
                    next('/login')
                }
            } else {
                // userinfo不为空值
                // 所有页面放行
                next()
            }
        }
    } else {
        // token不存在
        // 要跳转的页面是login
        if (to.path === '/login') {
            // 放行
            next()
        } else {
            // 否则  跳转到login
            next('/login')
        }
    }
})