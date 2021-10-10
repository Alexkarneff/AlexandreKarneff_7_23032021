import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/Home.vue";
import signUp from "../views/Signup.vue";
import logIn from "../views/Login.vue";
import posts from "../views/Posts.vue";
import createPost from "../views/Createpost.vue";

const routes = [
  {
		path: "/home",
		name: "Home",
		component: home,
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
  {
		path: "/post",
		name: "post",
		component: posts,
		meta: { auth: true },
	},
  {
    path: "/createPost",
    name: "createPost",
    component: createPost,
    meta: { auth: true },
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
