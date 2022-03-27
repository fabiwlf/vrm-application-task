import { createRouter, createWebHistory } from "vue-router";
import { VRMLoginLocalStorage } from "../auth";
import LoginView from "../views/LoginView.vue";
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
      //lazy load
      component: () => import("../views/DetailsView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
      async beforeEnter(to, from, next) {
        if (await VRMLogin.isLoggedIn()) {
          next({ name: "details" });
        } else next();
        // next((await VRMLogin.isLoggedIn()) ? { name: "details" } : {});
      },
    },
  ],
});
//check user login
router.beforeEach(async ({ matched, meta }) => {
  if (matched.some(({ meta }) => meta.requiresAuth)) {
    if (!(await VRMLogin.isLoggedIn())) {
      router.push({ name: "login" });
    } else {
      meta.isLoggedIn = true;
    }
  }
});
export default router;
