import {createRouter,createWebHashHistory} from 'vue-router'
//为什么js文件中引入vue文件时vscode不会给出选项框了，在vue文件中会给备选项？

const Router=createRouter({
  history:createWebHashHistory(),
  routes:[
    {
      path:'/loginPlus',
      name :'loginPlus',
      component:()=> import('../views/loginPlus') //路由懒加载
    },
    {path:'/',redirect:'/joinOrganization'},
    {
      path: '/joinOrganization',
      name: 'joinOrganization',
      component: ()=> import('../views/joinOrganization.vue')
      },
    {
      path: '/dataManage',
      name: 'dataManage',
      component: ()=> import('../views/dataManage.vue'),
      // children:[
      //   {
      //   path:'dataManageView',
      //   name:'dataManageView',
      //   component:dataManageView,
      // },
      // {
      //   path:'dataManageHome',
      //   name:'dataManageHome',
      //   component:dataManageHome,
      // }
        // ]
      },
  ]
})
Router.beforeEach((to,from,next)=>{
  const token=sessionStorage.getItem('token');
  if(to.path==='/dataManage'&&!token){
    next(false);
    // next('/login');
    alert("未完成后台登录，跳转失败");
  }
  else{
    next();
  }
  // 导航守卫
})
export default Router