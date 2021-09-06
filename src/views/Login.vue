<template>
	<div>
		<form @submit.prevent="submitLogin()">
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
		<MainTweetsFlow :tweets="tweets" :key="$store.getters.getLoginToken" />
	</div>
</template>

<script>
import MainTweetsFlow from "../components/MainTweetsFlow.vue";
import axios from "axios";

export default {
	name: "Login",
	components: {
		MainTweetsFlow,
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
			tweets: [],
		};
	},
	computed: {
		isLoggedIn: function () {
			return this.$store.getters.getLoginToken != "";
		},
	},
	mounted() {
		axios
			.request({
				url: "/tweets",
				method: "GET",
				params: { userId: this.$route.params.userId },
			})
			.then((response) => {
				this.tweets = response.data.splice([0], 4);
			});
	},
};
</script>

<style scoped>
div {
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-column: 1/2;
	justify-items: center;
}
form {
	width: 35vw;
	padding-top: 25vh;
	padding-left: 10vw;
}
#tweetLayout {
	display: grid;
	grid-column: 2/3;
	place-items: center;
}
</style>
