import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../views/Main.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Main",
		component: Main,
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/Register.vue"),
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/Login.vue"),
	},
	{
		// dynamic route matching for user profile
		path: "/profile/:userId",
		name: "Profile",
		component: () => import("../views/Profile.vue"),
	},
	{
		path: "/discover",
		name: "Discover",
		component: () => import("../views/Discover.vue"),
	},
];

const router = new VueRouter({
	mode: "hash",
	routes,
});

export default router;
