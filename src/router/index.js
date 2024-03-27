// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
import NotFound from '@/pages/NotFound.vue'
import blog from './blog'
import user from './user'

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:catchAll(.*)', //carch其他所有路由路径重定向到404，必须放到路由表最后
      name: 'notFound',
      component: NotFound,
      meta: {
        title: '404',
        // 不需要头部和底部
        // notPortal: true
      },
      // redirect: '/404'
    },
    ...blog,
    ...user,
  ],
});

// 登录拦截
// router.beforeEach((to, from, next) => {
//   if (to.path === "/login" || to.path === "/") {
//     next();
//   } else {
//     let login_sucess = localStorage.getItem('login_sucess');
//     if (login_sucess === null || login_sucess === '') {
//       next('/login')
//       // ElMessageBox.alert("请重新登录", "title", {
//       //   confirmButtonText: "OK",
//       //   callback: (action) => {
//       //     next('/login');
//       //   },
//       // })
//     } else {
//       next();
//     }
//   }
// })


// 导出路由
export default router;
