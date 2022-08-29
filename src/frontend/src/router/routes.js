export default [
  {
    path: "/",
    name: "IndexHome",
    component: () => import("../views/Index"),
    meta: {
      layout: "AppLayoutMain",
    },
  },
  {
    path: "/cart",
    name: "Cart",
    component: () => import("../views/Cart"),
  },
  {
    path: "/orders",
    name: "Orders",
    component: () => import("../views/Orders"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("../views/Profile"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login"),
  },
];
