import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import signUp from "../views/Signup.vue";
import logIn from "../views/Login.vue";

const routes = [
  {
		path: "/home",
		name: "Home",
		component: Home,
	},
  {
    path: "/signup",
    name: "signup",
    component: signUp,
    meta: { auth: false },
  },
  {
    path: "/login",
    name: "login",
    component: logIn,
    meta: { auth: false },
  },


];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
