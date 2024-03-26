// 引入需要的模块
import { createRouter, createWebHistory } from "vue-router";
import NotFound from '@/pages/NotFound.vue'
import blog from './blog'
import user from './user'

// import Home from "@/pages/Home/index.vue";

// // 下面使用了es6的对象增强写法，命名必须是routes
// const routes = [
//   {
//     //默认展示，这是主页面路由必须加斜杠 /
//     path: "/",
//     component: Home,
//   },
//   {
//     path: "/goods",
//     //路由懒加载
//     component: () => import("@/pages/Goods/index.vue"),
//   },
//   {
//     path: "/detail",
//     component: () => import("@/pages/Detail/index.vue"),
//   },
//   {
//     path: "/login",
//     component: () => import("@/pages/Login/index.vue"),
//   },
// ];

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/:catchAll(.*)', //carch其他所有路由路径重定向到404，必须放到路由表最后
      component: NotFound,
      meta: {
        title: '404',
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
