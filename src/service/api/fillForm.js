import vue from 'vue'

// 二维码提交手机号
const submitPhone = params => vue.axios.post("/personinfoiscreate/", params)

// 第一次填表
const submitFir = params => vue.axios.post("/personinfo/", params)

// 第二次填表
const submitSec = params => vue.axios.post("/visitinfo/", params)


export {
    submitPhone,
    submitFir,
    submitSec,
}