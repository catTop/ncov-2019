import Vue from 'vue'
import Router from 'vue-router'
import ListName from '../pages/listName.vue'
import AddPeople from '../pages/addPeople.vue'
import SearchName from '../pages/searchName.vue'
import Me from '../pages/me.vue'
import PeopleForm from '../pages/peopleForm.vue'
import Main from '../pages/main.vue'
import Login from '../pages/login.vue'
import Register from '../pages/register.vue'
import ChangePWD from '../pages/changePWD.vue'
import OpenAddPeople from '../pages/openAddPeople.vue'
import OpenAddVisit from '../pages/openAddVisit.vue'

import FirstPage from '../pages/firstPage.vue'
import Success from '../pages/success.vue'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path:"/",
      redirect:"/main"
    },
    {
      path: "/main",  // 必须登陆后，才可以访问这块
      component: Main,
      redirect:"/main/listName",
      children:[
        {
          path: '/main/listName', component: ListName  //人员列表页
        }, {
          path: '/main/addPeople', component: AddPeople  // 登陆后的登记人员页
        }, {
          path: '/main/searchName', component: SearchName // 搜索页
        }, {
          path: '/main/me', component: Me // 我的页
        },
      ],
      
    },
    {
      path: '/peopleForm', component: PeopleForm //登陆后，查看某个人员的详细信息页
    },
    {
      path: '/login', component: Login // 登陆
    },
    {
      path: '/register', component: Register  // 注册
    },
    {
      path: '/changePWD', component: ChangePWD  // 登陆后，修改密码
    },
    {
      path: '/openAddPeople', component: OpenAddPeople // 不用登陆，就可以填表的页面
    },
    {
      path: '/openAddVisit', component: OpenAddVisit  // 不用登陆，就可以填表的页面
    },
    {
      path: '/firstPage', component: FirstPage  // 不用登陆，就可以填表的页面
    },
    {
      path: '/success', component: Success // 登陆和不登录，都可以访问的页面
    }

  ]
})
