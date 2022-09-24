import request from "../utils/request"

// 获取供应商列表  查询
const getSupplier = (currentPage, pageSize, data) => {
    return request({
        url: `/supplier/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    })
}

// 删除
const getRemoveSupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "delete"
    })
}

// 查询单个供应商
const getQuerySupplier = (id) => {
    return request({
        url: `/supplier/${id}`,
        method: "GET"
    })
}

// 新增供应商
const getAddSupplier = (data) => {
    return request({
        url: "/supplier",
        method: "POST",
        data
    })
}

// 编辑供应商
const getEditSupplier = (data, id) => {
    return request({
        url: `/supplier/${id}`,
        method: "PUT",
        data
    })
}
export default {
    getSupplier,            // 获取供应商列表  查询
    getRemoveSupplier,      //删除
    getQuerySupplier,       // 查询单个供应商
    getAddSupplier,         // 新增供应商
    getEditSupplier,        // 编辑供应商
}