
const routes = [
  {
    path: "/login",
    name: 'login',
    component: () => import("@/pages/User/login.vue"),
  },
  {
    path: "/register",
    name: 'register',
    component: () => import("@/pages/User/register.vue"),
  },
  {
    path: "/password",
    name: 'password',
    component: () => import("@/pages/User/password.vue"),
  },
  {
    path: "/forgotPassword",
    name: 'forgotPassword',
    component: () => import("@/pages/User/forgotPassword.vue"),
  },
  {
    path: "/person",
    name: 'person',
    component: () => import("@/pages/User/person.vue"),
  },
];

export default routes
