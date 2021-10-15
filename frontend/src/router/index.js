import { createRouter, createWebHashHistory } from "vue-router";
import home from "../views/Home.vue";
import signUp from "../views/Signup.vue";
import logIn from "../views/Login.vue";
import posts from "../views/Posts.vue";
import createPost from "../views/Createpost.vue";
import logout from "../views/Logout.vue";
import myAccount from "../views/Myaccount.vue";
import store from "../store";


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
    meta: { guest: true },
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
    meta: { guest: true },
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
    meta: { guest: true },
  }

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.auth)) {
      if (store.getters.isUserLogged) {
          next();
          return;
      }
      next("/login");
  } else {
      next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
      if (store.getters.isUserLogged) {
          next("/post");
          return;
      }
      next();
  } else {
      next();
  }
});

export default router;
