<template>
	<div>
		<TweeterNav />
		<form @submit="submitLogin()">
			<label for="username">Username</label>
			<v-text-field
				name="username"
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
	// beforeCreate() {
	// 	this.$store.dispatch("authCheck");
	// },
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
