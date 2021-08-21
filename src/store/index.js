import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import cookies from "vue-cookies";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userAuth: true
  },
  mutations: {
    loggedIn(state) {
      state.userAuth = true;
    },
    loggedOut(state) {
      state.userAuth = false;
    }
  },
  actions: {
    userLogin({commit},userInfo) {
      console.log(userInfo);
      axios.request({
        url: 'https://reqres.in/api/login',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "email": userInfo.username,
          "password": userInfo.password
        },
      }).then((response) => {
        cookies.set('loginToken', response.data.token);
        commit("loggedIn");
        cookies.get(response.data.token);
      }).catch((error) => {
        console.error("there was an error: " + error);
      })
    },
    userLogout() {
      cookies.remove('loginToken');
      this.commit('loggedOut');
    },
    userStatus() {
      if (cookies.get('loginToken') == "QpwL5tke4Pnpja7X4") {
        this.commit("loggedIn");
      } else {
        this.commit('loggedOut');
      }
    },
  },
  getters: {
    getAuthStatus(state) {
      return state.userAuth;
    }
  },
});
