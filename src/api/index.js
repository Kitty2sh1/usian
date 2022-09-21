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
export default {
    getLogin,
    getInfoAdmin
}