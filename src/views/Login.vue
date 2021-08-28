<template>
	<div>
		<form @submit="submitLogin()">
			<label for="username">Username</label>
			<v-text-field
				name="username"
				max
				type="text"
				v-model="userInfo.username"
			/>
			<label for="password">Password</label>
			<v-text-field
				name="password"
				type="password"
				v-model="userInfo.password"
			/>
			<v-btn type="submit" depressed elevation="2" raised color="primary"
				>Login</v-btn
			>
		</form>
		<TweeterNav />
	</div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";

export default {
	name: "Login",
	components: {
		TweeterNav,
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
	computed: {
		isLoggedIn: function () {
			return this.$store.getters.getLoginToken != "";
		},
	},
};
</script>

<style scoped>
div {
	display: grid;
	place-items: center;
	padding-top: 3.5vh;
}
form {
	display: grid;
	place-items: center;
	padding-top: 25vh;
	width: 60vw;
}
</style>
