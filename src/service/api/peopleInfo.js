import vue from 'vue'

// 人员列表
const peopleList = params => vue.axios.get(`/personinfo/?userid=${params}` )

// 人员详细信息
const peopleInfo = params => vue.axios.get(`/personinfo/${params.id}/?userid=${params.userid}` )

// 搜索人员
const searchPeople = params => vue.axios.get(`/personinfo/?search=${params.search}&userid=${params.userid} `)
export {
    peopleList,
    peopleInfo,
    searchPeople
}