import request from "@/utils/request";

const getLogin = (data) => {
    return request({
        url: "/user/login",
        method: "POST",
        data
    })
}

const getInfoAdmin=(params)=>{
    return request({
        url:"/user/info/admin",
        method:"GET",
        params,
    })
}
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