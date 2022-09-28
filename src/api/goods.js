import request from "../utils/request"

// 获取商品列表  查询
const getGoods=(currentPage, pageSize, data)=>{
    return request({
        url:`/goods/list/search/${currentPage}/${pageSize}`,
        method:"POST",
        data
    })
}
// 删除
const getRemoveGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "delete"
    })
}

// 查询单个商品
const getQueryGoods = (id) => {
    return request({
        url: `/goods/${id}`,
        method: "GET"
    })
}

// 新增商品
const getAddGoods = (data) => {
    return request({
        url: "/goods",
        method: "POST",
        data
    })
}

// 编辑商品
const getEditGoods = (data, id) => {
    return request({
        url: `/goods/${id}`,
        method: "PUT",
        data
    })
}

export default{
    getGoods,     // 获取商品列表  查询
    getRemoveGoods,      //删除
    getQueryGoods,       // 查询单个商品
    getAddGoods,         // 新增商品
    getEditGoods,        // 编辑商品
}

