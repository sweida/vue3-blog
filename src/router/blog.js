import Home from "@/pages/Home/index.vue";

// 下面使用了es6的对象增强写法，命名必须是routes
const routes = [
  {
    //默认展示，这是主页面路由必须加斜杠 /
    path: "/",
    name: 'IndexPage',
    meta: {
      title: '首页',
      keepAlive: true,
      requireAuth: true,
      // portal: false
    },
    component: Home,
    // components: {
    //   header: Header,
    //   default: () => import('@/pages/Home/index.vue')
    // }
  },
  {
    path: "/articles",
    meta: {
      title: '文章列表',
      keepAlive: true,
    },
    //路由懒加载
    component: () => import("@/pages/Blog/articles.vue"),
  },
  {
    path: "/articles/:id",
    //路由懒加载
    component: () => import("@/pages/Blog/articles-detail.vue"),
  },
  {
    path: "/about",
    component: () => import("@/pages/Blog/about.vue"),
  },
  {
    path: "/links",
    component: () => import("@/pages/Blog/links.vue"),
  },
  {
    path: "/message",
    component: () => import("@/pages/Blog/message.vue"),
  },
  {
    path: "/detail",
    meta: {
      title: 'detial',
      keepAlive: true,
      requireAuth: true,
      // portal: false
    },
    component: () => import("@/pages/Detail/index.vue"),
  },

];

export default routes
