<template>
	<div>
		<span v-if="isLoggedIn">
			<v-btn
				color="secondary"
				torouter-link
				:to="'/profile/' + this.$store.getters.getUserId"
				:v-if="useRoute !== '/profile/' + this.$store.getters.getUserId"
				>my Profile</v-btn
			>
			<v-btn color="secondary" torouter-link to="/" v-if="useRoute != '/'"
				>Tweets</v-btn
			>
			<v-btn @click="userLogout" color="error">Logout</v-btn>
		</span>
		<span v-else>
			<v-btn
				color="secondary"
				torouter-link
				to="/login"
				v-if="useRoute != '/login'"
				>Login</v-btn
			>
			<v-btn
				v-if="useRoute != '/register'"
				@click="registerBtn"
				color="primary"
				depressed
				elevation="2"
				right
				>Register</v-btn
			>
		</span>
	</div>
</template>

<script>
import cookies from "vue-cookies";

export default {
	name: "TweeterNav",
	computed: {
		isLoggedIn: function () {
			return cookies.get("loginToken") ? true : false;
		},
		useRoute() {
			return this.$router.history.current.path;
		},
	},
	methods: {
		async userLogout() {
			await this.$store.dispatch("userLogout");
			this.$router.push("/login");
		},
		registerBtn() {
			console.log(this.useRoute);
			this.$router.push("/register");
		},
	},
};
</script>

<style scoped>
div {
	display: grid;
	place-items: center;
}
</style>
