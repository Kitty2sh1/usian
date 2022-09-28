const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    // //端口号
    // port: 8888,
    // // 主机名
    host: 'localhost',
    // // 是否自动打开浏览器
    open: true,
    // // 是否开启https
    https: false,
    proxy: {
      // VUE_APP_BASE_API='/meng'
      // VUE_APP_URL='http://vue.mengxuegu.com/pro-api/'
      [process.env.VUE_APP_BASE_API]: {
        target: process.env['VUE_APP_URL'],
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      },
      // VUE_APP_BASE_API1='/admin'
      // VUE_APP_URL1='http://ceshi5.dishait.cn/admin'
      [process.env.VUE_APP_BASE_API1]: {
        target: process.env['VUE_APP_URL1'],
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API1]: ''
        }
      }
    }
  }
})
