import vue from 'vue'

// 登陆接口
const login = params => vue.axios.post("/auth/login/", params)

// 退出
const logout = params => vue.axios.delete("/auth/logout/", params)

// 获取当前用户信息
const getCurrUserInfo = () => vue.axios.get("/auth/profile/")

//修改密码
const change = params => vue.axios.put("/auth/password/", params)

const register = params => vue.axios.post("/admin/users/", params)

export {
    login,
    logout,
    getCurrUserInfo,
    change,
    register
}