<template>
	<div>
		<!-- Form to recieve and submit user password and username -->
		<form @submit.prevent="submitLogin()">
			<label for="username">Username</label>
			<v-text-field
				name="username"
				max
				type="text"
				v-model="userInfo.username"
				outlined
				solo
			/>
			<label for="password">Password</label>
			<v-text-field
				name="password"
				type="password"
				v-model="userInfo.password"
				outlined
				solo
			/>
			<v-btn type="submit" depressed elevation="2" raised color="primary"
				>Login</v-btn
			>
		</form>
		<!-- Preview only tweets filtered to only show first 4 on page -->
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
		// get and splice tweet array to first 4 tweets on preview
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
form {
	width: 90vw;
	padding-left: 10vw;
	padding-top: 12vh;
}

@media screen and (min-width: 1000px) {
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
		padding-top: 15vh;
	}
}
</style>
