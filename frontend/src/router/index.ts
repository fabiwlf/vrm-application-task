import { createRouter, createWebHistory } from "vue-router";
import { VRMLoginLocalStorage } from "../auth";
export const VRMLogin = new VRMLoginLocalStorage();
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      redirect: { name: "login" },
    },
    {
      path: "/details",
      name: "details",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/DetailsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/LoginView.vue"),
      async beforeEnter(to, from, next) {
        if (await VRMLogin.isLoggedIn()) {
          next({ name: "details" });
        } else next();
        // next((await VRMLogin.isLoggedIn()) ? { name: "details" } : {});
      },
    },
  ],
});
router.beforeEach(async (to, from) => {
  // canUserAccess() returns `true` or `false`
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!(await VRMLogin.isLoggedIn())) {
      router.push({ name: "login" });
    }
  }
});
export default router;
