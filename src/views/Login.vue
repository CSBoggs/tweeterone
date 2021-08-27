<template>
  <div>
    <TweeterNav />
    <span v-if="isLoggedIn">
      <a @click="userLogout">Logout</a>
      <v-btn @click="loginBtn" color="primary" depressed elevation="2"
        >Register</v-btn
      >
    </span>
    <span v-else>
      <v-btn @click="registerBtn" color="primary" depressed elevation="2"
        >Register</v-btn
      >
    </span>
    <form action="">
      <label for="username">Username</label>
      <v-text-field name="username" type="text" v-model="userInfo.username" />
      <label for="password">Password</label>
      <v-text-field
        name="password"
        type="password"
        v-model="userInfo.password"
      />
      <v-btn @click.prevent="submitLogin()" depressed elevation="2" raised
        >Submit</v-btn
      >
    </form>
  </div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";

export default {
  name: "Login",
  components: {
    TweeterNav,
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters.getAuthStatus;
    },
  },
  methods: {
    async userLogout() {
      await this.$store.dispatch("userLogout");
      this.$router.push("/login");
    },
    submitLogin() {
      this.$store.dispatch("userLogin", this.userInfo);
    },
    registerBtn() {
      this.$router.push("/register");
    },
    loginBtn() {
      this.$router.push("/login");
    },
  },
  beforeCreate() {
    this.$store.dispatch("authCheck");
  },
  data: () => {
    return {
      userInfo: {
        username: "",
        password: "",
      },
    };
  },
};
</script>
