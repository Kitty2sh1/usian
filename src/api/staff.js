import request from "../utils/request"

// 获取员工列表  查询
const getStaff = (currentPage, pageSize, data) => {
    return request({
        url: `/staff/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    })
}

// 删除
const getRemoveStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "delete"
    })
}

// 查询单个员工
const getQueryStaff = (id) => {
    return request({
        url: `/staff/${id}`,
        method: "GET"
    })
}

// 新增员工
const getAddStaff = (data) => {
    return request({
        url: "/staff",
        method: "POST",
        data
    })
}

// 编辑员工
const getEditStaff = (data, id) => {
    return request({
        url: `/staff/${id}`,
        method: "PUT",
        data
    })
}
export default {
    getStaff,            // 获取员工列表  查询
    getRemoveStaff,      //删除
    getQueryStaff,       // 查询单个员工
    getAddStaff,         // 新增员工
    getEditStaff,        // 编辑员工
}