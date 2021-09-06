<template>
	<v-list nav dense>
		<v-list-item-group
			v-model="group"
			active-class="deep-blue--text text--accent-4"
		>
			<v-list-item v-if="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-home</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn color="light-blue lighten-1" torouter-link to="/"
						>Tweets</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item v-if="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						color="light-blue lighten-1"
						torouter-link
						:to="'/profile/' + this.$store.getters.getUserId"
						:v-if="
							useRoute !==
							'/profile/' + this.$store.getters.getUserId
						"
						>my Profile</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item v-if="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-arrow-right</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn @click="userLogout" color="error">Logout</v-btn>
				</v-list-item-title>
			</v-list-item>
			<v-list-item v-if="!isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-animation</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						color="primary lighten-1"
						torouter-link
						to="/discover"
						v-if="useRoute != '/discover'"
						>Discover</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item v-if="!isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-key</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						color="primary lighten-1"
						torouter-link
						to="/login"
						v-if="useRoute != '/login'"
						>Login</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<v-list-item v-if="!isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-details</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						v-if="useRoute != '/register'"
						@click="registerBtn"
						color="primary"
						depressed
						elevation="2"
						right
						>Register</v-btn
					>
				</v-list-item-title>
			</v-list-item>
		</v-list-item-group>
	</v-list>
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
	data() {
		return {
			drawer: false,
			group: null,
		};
	},
};
</script>

<style scoped></style>
