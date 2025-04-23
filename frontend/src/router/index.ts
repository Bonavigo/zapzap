import { createRouter, createWebHistory } from "vue-router";
import LoginForm from "../components/auth/LoginForm.vue";
import RegisterForm from "../components/auth/RegisterForm.vue";
import ChatDashboard from "../views/ChatDashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginForm,
    },
    {
      path: "/registro",
      name: "registro",
      component: RegisterForm,
    },
    {
      path: "/chat",
      name: "chat",
      component: ChatDashboard,
    },
    // {
    //   path: "/:catchAll(.*)",
    //   name: "not-found",
    //   component: () => import("../views/NotFoundView.vue"),
    // },
  ],
});

export default router;
