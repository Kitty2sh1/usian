import request from "@/utils/request";
// 会员信息列表  查询
const getMember = (currentPage, pageSize, data) => {
    return request({
        url: `/member/list/search/${currentPage}/${pageSize}`,
        method: "POST",
        data
    })
}

// 删除
const getRemoveMember = (id) => {
    return request({
        url: `/member/${id}`,
        method: "delete"
    })
}

// 添加会员
const getAddMember = (data) => {
    return request({
        url: "/member",
        method: "POST",
        data,
    })
}

// 会员编辑
const getEditMember=(data,id)=>{
    return request({
        url:`member/${id}`,
        method:"PUT",
        data
    })
}

// 查询单个会员
const getQueryMember=(id)=>{
    return request({
        url:`member/${id}`,
        method:"GET"
    })
}
export default {
    getMember,          //会员信息列表  查询
    getRemoveMember,    //删除
    getAddMember,       //添加会员
    getEditMember,       //会员编辑
    getQueryMember,     //查询单个会员
}