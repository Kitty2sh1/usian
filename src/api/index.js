import request from "@/utils/request";
// 登录
const getLogin = (data) => {
    return request({
        url: "/admin/login",
        method: "POST",
        data
    })
}
// 用户信息
const getInfoAdmin=(params)=>{
    return request({
        url:"/admin/getUserInfo",
        method:"GET",
        params,
    })
}
// 退出登录
const getLogout=()=>{
    return request({
        url:"/admin/logout",
        method:"POST"
    })
}

export default {
    getLogin,
    getInfoAdmin,
    getLogout
}