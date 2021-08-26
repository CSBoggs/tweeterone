import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies";
import router from "../router";

axios.defaults.headers.common['X-Api-Key'] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/users";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAuth: false,
    userName: "",
    userID: "",
    loginToken: "",
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
      state.userID = payload;
    },
    setAuthStatus(state, payload) {
      state.loginToken = payload;
    },
  },
  actions: {
    userLogin({ commit }, payload) {
      axios
        .post("/login", payload)
        .then((response) => {
          if (response.status === 201) {
            commit("setUserName", response.data.username);
            commit("setUserID", response.data.userId);
            commit("setAuthStatus", response.data.loginToken);
            commit("setLoggedIn", true);
            this.dispatch("redirect", "/");
          } else {
            console.error("user registration error");
          }
        })
        .catch(() => {
            console.error("user registration error");
        });
    },
    registration({ commit }, payload) {
      axios
        .post("/users", payload)
        .then((response) => {
          if (response.status === 201) {
            commit("setUserName", response.data.username);
            commit("setUserID", response.data.userId);
            commit("setAuthStatus", response.data.loginToken);
            commit("setLoggedIn", true);
            this.dispatch("redirect", "/");
          } else {
            console.error("user registration error");
          }
        })
        .catch(() => {
            console.error("user registration error");
        });
    },
    userLogout() {
      cookies.remove("setAuthStatus");
      this.commit("setLoggedOut");
      this.dispatch("redirect", "/login");
    },
    userStatus() {
      if (cookies.get("loginToken") == "QpwL5tke4Pnpja7X4") {
        this.commit("setLoggedIn");
      } else {
        this.commit("setLoggedOut");
      }
    },
    redirect(state, route) {
      if (router.currentRoute != route) {
        router.push(route).catch((error) => {
          console.log(error);
        });
      }
    },
    authCheck({ dispatch }) {
      if (this.getters.getAuthStatus) {
        dispatch("redirect", "/");
      } else {
        if (router.currentRoute != "/login") {
          dispatch("userLogout");
        }
      }
    },
  },
  getters: {
    getAuthStatus(state) {
      return state.userAuth;
    },
  },
});
