<template>
  <div>
    <TweeterNav />
    <span v-if="isLoggedIn">
      <a @click="userLogout">Logout</a>
      <router-link to="/login" />
    </span>
    <span v-else>
      <router-link to="/register">Register</router-link>
    </span>
    <h1>This is the main feed page</h1>
    <MainViewport />
  </div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";
import MainViewport from "../components/MainViewport.vue";
export default {
  name: "Main",
  components: {
    TweeterNav,
    MainViewport,
  },
  beforeCreate() {
    this.$store.dispatch("authCheck");
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
  },
};
</script>
