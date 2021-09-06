import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies";
import router from "../router";

axios.defaults.headers.common["X-Api-Key"] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		userAuth: false,
		userName: "",
		userId: "",
		loginToken: "",
		tweets: [],
		follows: [],
	},
	mutations: {
		setLoggedIn(state) {
			state.userAuth = true;
		},
		setLoggedOut(state) {
			state.userAuth = false;
		},
		setUserName(state, payload) {
			state.userName = payload;
		},
		setUserID(state, payload) {
			state.userId = payload;
		},
		setLoginToken(state, payload) {
			state.loginToken = payload;
		},
		setUserTweets(state, payload) {
			state.tweets = payload;
		},
		setUserFollows(state, payload) {
			state.follows = payload;
		},
	},
	actions: {
		userLogin({ commit, dispatch }, payload) {
			axios
				.post("/login", payload)
				.then((response) => {
					if (response.status === 201) {
						commit("setUserName", response.data.username);
						commit("setUserID", response.data.userId);
						commit("setLoginToken", response.data.loginToken);
						commit("setLoggedIn", true);
						cookies.set("loginToken", response.data.loginToken);
						cookies.set("userId", response.data.userId);
						location.reload();
					} else {
						alert(
							"username and/or password are invalid, please try again"
						);
					}
				})
				.then(() => {
					dispatch("authCheck");
				})
				.catch(() => {
					alert(
						"username and/or password are invalid, please try again"
					);
				});
		},
		userRegistration({ commit }, payload) {
			axios
				.post("/users", payload)
				.then((response) => {
					console.log(response);
					if (response.status === 201) {
						commit("setUserName", response.data.username);
						commit("setUserID", response.data.userId);
						commit("setLoginToken", response.data.loginToken);
						commit("setLoggedIn", true);
						cookies.set("loginToken", response.data.loginToken);
						cookies.set("userId", response.data.userId);
						this.dispatch("redirect", "/");
					} else {
						alert(
							"there was a registration error, please try again"
						);
					}
				})
				.catch(() => {
					alert(
						"username and/or password are invalid, please try again"
					);
				});
		},
		getUsers() {
			axios
				.get("/users")
				.then((response) => {
					console.log(response);
				})
				.catch(() => {
					console.error("user registration error");
				});
		},
		getTweets() {
			axios
				.get("/tweets")
				.then((response) => {
					console.log(response);
				})
				.catch(() => {
					console.error("no tweets found");
				});
		},
		getTweetsById(userId) {
			axios
				.get("/tweets", userId)
				.then((response) => {
					this.commit("setUserTweets", response.data);
				})
				.catch(() => {
					console.error("no tweets found");
				});
		},
		getUserById(userId) {
			axios
				.get("/users", userId)
				.then((response) => {
					return this(response.data);
				})
				.catch(() => {
					console.error("no user found");
				});
		},
		userLogout() {
			cookies.remove("loginToken");
			cookies.remove("userId");
			this.commit("setLoggedOut");
			this.dispatch("redirect", "/login");
		},
		redirect(state, route) {
			if (router.currentRoute != route) {
				router.push(route);
			}
		},
		// destructured parameter to accept dispatch
		authCheck({ dispatch }) {
			if (cookies.get("loginToken") && cookies.get("userId")) {
				dispatch("redirect", "/").catch(() => {});
			} else {
				if (router.currentRoute != "/login") {
					dispatch("userLogout");
				}
			}
		},
		// destructured to get getters and payload into post object
		createTweet({ getters }, content) {
			axios
				.post("/tweets", {
					loginToken: getters.getLoginToken,
					content: content,
				})
				.catch((response) => console.log(response));
		},
		// destructured to get getters and payload into post object
		removeTweet({ getters }, tweetId) {
			axios.delete("/tweets", {
				data: {
					loginToken: getters.getLoginToken,
					tweetId: tweetId,
				},
			});
		},
		// destructured to get getters and payload into post object
		removeUser({ getters }, deletePassword) {
			axios.delete("/users", {
				data: {
					loginToken: getters.getLoginToken,
					password: deletePassword,
				},
			});
		},
		// destructured to get getters and payload into post object
		editTweet({ getters }, payload) {
			axios.patch("/tweets", {
				loginToken: getters.getLoginToken,
				tweetId: payload.tweetId,
				content: payload.editText,
			});
		},
		// destructured to get getters and payload into post object
		editInfo({ getters }, payload) {
			axios.patch("/users", {
				loginToken: getters.getLoginToken,
				[payload.label]: payload.newValue,
			});
		},
		// destructured to get getters and payload into post object
		refreshTweets({ getters, dispatch }) {
			let userId = getters.getUserId;
			dispatch("getTweetsById", userId);
		},
		// destructured to get getters and payload into post object
		likeTweet({ getters }, payload) {
			axios.request({
				url: "/tweet-likes",
				method: "POST",
				data: {
					loginToken: getters.getLoginToken,
					tweetId: payload,
				},
			});
		},
		// destructured to get getters and payload into post object
		unlikeTweet({ getters }, payload) {
			axios.request({
				url: "/tweet-likes",
				method: "DELETE",
				data: {
					loginToken: getters.getLoginToken,
					tweetId: payload,
				},
			});
		},
	},
	getters: {
		getAuthStatus(state) {
			return state.userAuth;
		},
		getLoginToken() {
			return cookies.get("loginToken");
		},
		getUserId() {
			return cookies.get("userId");
		},
		getTweetsArray(state) {
			return state.tweets;
		},
		getFollowsArray(state) {
			return state.follows;
		},
	},
});
