import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/Home.vue";
import signUp from "../views/Signup.vue";
import logIn from "../views/Login.vue";
import posts from "../views/Posts.vue";
import createPost from "../views/Createpost.vue";
import logout from "../views/Logout.vue";
import myAccount from "../views/Myaccount.vue";

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
		path: "/",
		redirect: {
		name: "Home"
		}
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
  },
  {
		path: "/myaccount",
		name: "myAccount",
		component: myAccount,
		meta: { auth: true}
	},
  {
    path: "/logout",
    name: "logout",
    component: logout,
    meta: { auth: true },
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
