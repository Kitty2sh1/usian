import request from "@/utils/request";
// 登录
const getLogin = (data) => {
    return request({
        url: "/user/login",
        method: "POST",
        data
    })
}
// 用户信息
const getInfoAdmin=(params)=>{
    return request({
        url:"/user/info/admin",
        method:"GET",
        params,
    })
}
// 退出登录
const getLogout=()=>{
    return request({
        url:"/user/logout",
        method:"POST"
    })
}

export default {
    getLogin,
    getInfoAdmin,
    getLogout
}