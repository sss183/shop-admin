import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import Index from '@/pages/Index'
const Menu =  ()=>import('@/pages/Menu') 
Vue.use(Router)
const router = new Router({
  routes: [
    {
      path:"/login",
      component:Login
    },
    {
      path: '/',
      component: Layout,
      children:[{
        path:"index",
        component:Index
      },{
        path:"menu",
        component:Menu
      },{
        path:"*",
        redirect:"/index"
      }]
    },
  ]
})

router.beforeEach((to,from,next)=>{
  // 获取token 来判断是否登录
  let token = localStorage.getItem("token");
  
  if(token){
    // 已登录
    if(to.path=="/login"){
      next(false);
    }else{
      next();
    }
  }else{
    if(to.path=="/login"){
      next();
    }else{
      next("/login");
    }
  }
})

export default router
