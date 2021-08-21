<template>
    <div>
      <TweeterNav/>
      <span v-if="isLoggedIn">
        <a @click="userLogout">Logout</a>
        <router-link to="/main"/>
      </span>
      <span v-else>
        <router-link to="/">Login</router-link>
        <router-link to="/register">Register</router-link>
      </span>
      <form action="">
        <label for="username">Username</label>
        <input
          name="username"
          type="text"
          v-model="userInfo.username"
          placeholder="eve.holt@reqres.in"
          />
        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          v-model="userInfo.password"
          placeholder="cityslicka"
          />
      <button @click.prevent="submitLogin()">Submit</button>
    </form>
    </div>
</template>

<script>
import TweeterNav from '../components/TweeterNav.vue';

  export default {
      name:"Login",
      components: {
        TweeterNav
      },
      computed: {
        isLoggedIn: function() {
          return this.$store.getters.getAuthStatus
        }
      },
      methods: {
        async userLogout() {
            await this.$store.dispatch('userLogout');
            this.$router.push('/');
        },
        submitLogin() {
          this.$store.dispatch('userLogin', this.userInfo);
        }
      },
      data: () => {
        return {
          userInfo: {
            username: "",
            password: "",
          }
        }
      }
  }
</script>
