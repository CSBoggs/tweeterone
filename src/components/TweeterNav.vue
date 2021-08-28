<template>
	<div>
		<span v-if="isLoggedIn">
			<v-btn @click="userLogout" color="error">Logout</v-btn>
			<v-btn torouter-link to="/profile" v-if="useRoute != '/profile'"
				>Profile</v-btn
			>
		</span>
		<span v-else>
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

<style lang="scss" scoped></style>
