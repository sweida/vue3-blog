import Home from "@/pages/Home/index.vue";

/**
 * name字段keepAlive有用
 * 下面使用了es6的对象增强写法，命名必须是routes
*/
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
    name: 'articles',
    meta: {
      title: '文章列表',
      keepAlive: true,
    },
    //路由懒加载
    component: () => import("@/pages/Blog/articles.vue"),
  },
  {
    path: "/articles/:id",
    name: 'articleDetail',
    meta: {
      title: '文章详情',
      keepAlive: false,
    },
    //路由懒加载
    component: () => import("@/pages/Blog/articles-detail.vue"),
  },
  {
    path: "/about",
    name: 'about',
    component: () => import("@/pages/Blog/about.vue"),
  },
  {
    path: "/links",
    name: 'links',
    meta: {
      title: '友链',
      keepAlive: true,
    },
    component: () => import("@/pages/Blog/links.vue"),
  },
  {
    path: "/message",
    name: 'message',
    component: () => import("@/pages/Blog/message.vue"),
  },
  {
    path: "/detail",
    name: 'detail',
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
