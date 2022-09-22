
const TOKEN = 'token'
const USERINFO = 'userinfo'

// 存token
export const setItemToken = (token) => {
    localStorage.setItem(TOKEN, token)
}
// 获取token
export const getItemToken = () => {
    return localStorage.getItem(TOKEN)
}
// 存userinfo
export const setItemUserInfo = (userinfo) => {
    localStorage.setItem(USERINFO, JSON.stringify(userinfo))
}
// 获取userinfo
export const getItemUserInfo = () => {
    return JSON.parse(localStorage.getItem(USERINFO) || "{}")
}
// 删除token和userinfo
export const removeItemTokenUserInfo = () => {
    localStorage.removeItem(TOKEN)
    localStorage.removeItem(USERINFO)
}