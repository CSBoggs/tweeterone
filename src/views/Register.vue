<template>
  <div class="register">
    <form action="">
      <fieldset>
        <legend>register an account with tweeter</legend>
        <label for="email">Email</label>
        <input
          name="email"
          type="text"
          v-model="userReg.email"
        />
        <label for="username">Username</label>
        <input
          name="username"
          type="text"
          v-model="userReg.username"
        />
        <label for="password">Password</label>
        <input
          name="password"
          type="password"
          v-model="userReg.password"
        />
        <label for="birthdate">Birthdate</label>
        <div class="mb-6">Active picker: <code>{{ activePicker || 'null' }}</code></div>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Birthday date"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            :active-picker.sync="activePicker"
            :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
            min="1950-01-01"
            @change="save"
          ></v-date-picker>
        </v-menu>
        <label for="biography"></label>
        <input
          name="biography"
          type="text"
          v-model="userReg.biography">
        <button @click="userRegistration()"></button>
      </fieldset>
    </form>
  </div>
</template>

<script>
  export default {
    name: "Register",
    data: () => {
      return {
        userReg: {
          email: "",
          username: "",
          password: "",
          birthdate: "",
        },
        activePicker: null,
        date: null,
        menu: false,
      }
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      },
    },
    methods: {
      save (date) {
        this.$refs.menu.save(date)
      },
      userRegistration() {
        this.$store.dispatch("registration", this.input)
      }
    }
  }
</script>

<style scoped>

</style>