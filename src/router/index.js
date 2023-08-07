import { createRouter, createWebHistory } from "vue-router";
import { auth } from "../firebase/config";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    // path: "/destinations/:id/:slug",
    path: "/destinations",
    name: "Destinations",
    component: () => import("../views/Destinations.vue"),
    // props: (route) => ({ id: parseInt(route.params.id) }),
    // beforeEnter: (to) => {
    //   const exists = sourceData.destinations.find(
    //     destination => destination.id === parseInt(to.params.id)
    //   )
    //   if(!exists) return {name: 'NotFound'}
    // },
    // children: [
    //   {
    //     path: 'destination',
    //     name: 'Destination',
    //     component: () => import("../views/Destination.vue"),
    //     props: (route) => ({ ...route.params, id: parseInt(route.params.id)})
    //   }
    // ]
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: () => import("../views/Dashboard.vue"),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../views/Signup.vue"),
  },
  {
    path: "/login/:message?",
    name: "Login",
    component: () => import("../views/Login.vue"),
    props: true,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(savedPosition) {
    return (
      savedPosition ||
      new Promise((resolve) => {
        setTimeout(() => resolve({ top: 0, behavior: "smooth" }), 300);
      })
    );
  },
});

router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.currentUser) {
    return { name: "Login", query: { redirect: to.fullPath } };
  }
});

export default router;
