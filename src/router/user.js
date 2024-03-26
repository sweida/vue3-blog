
const routes = [
  {
    path: "/login",
    component: () => import("@/pages/User/login.vue"),
  },
  {
    path: "/register",
    component: () => import("@/pages/User/register.vue"),
  },
  {
    path: "/password",
    component: () => import("@/pages/User/password.vue"),
  },
  {
    path: "/forgotPassword",
    component: () => import("@/pages/User/forgotPassword.vue"),
  },
  {
    path: "/person",
    component: () => import("@/pages/User/person.vue"),
  },
];

export default routes
