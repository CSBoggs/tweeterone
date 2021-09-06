<template>
	<!-- remainder of Vuetify component for navigation app bar -->
	<v-list nav>
		<v-list-item-group
			v-model="group"
			active-class="deep-blue--text text--accent-9"
		>
			<!-- show Tweets page only if logged in and link to root -->
			<v-list-item v-show="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-home</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn outlined torouter-link to="/">Tweets</v-btn>
				</v-list-item-title>
			</v-list-item>
			<!-- show followed tweets page only if logged in and link to followed -->
			<v-list-item v-show="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-group</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn outlined torouter-link to="/followed"
						>Followed</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<!-- show discover page and link to same -->
			<v-list-item>
				<v-list-item-icon>
					<v-icon>mdi-animation</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						outlined
						torouter-link
						to="/discover"
						v-if="useRoute != '/discover'"
						>Discover</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<!-- show user profile page only if logged in and link to same via string concatenation -->
			<v-list-item v-show="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						color="primary"
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
			<!-- show logout button only if logged in and redirects to login-->
			<v-list-item v-show="isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-arrow-right</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn @click.prevent="userLogout" color="error"
						>Logout</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<!-- show Login page only if not logged in and not currently on login page -->
			<v-list-item v-show="!isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-key</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						color="primary"
						torouter-link
						to="/login"
						v-if="useRoute != '/login'"
						>Login</v-btn
					>
				</v-list-item-title>
			</v-list-item>
			<!-- show Registration link if not logged in -->
			<v-list-item v-show="!isLoggedIn">
				<v-list-item-icon>
					<v-icon>mdi-account-details</v-icon>
				</v-list-item-icon>
				<v-list-item-title>
					<v-btn
						v-show="useRoute != '/register'"
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
			this.refreshStatus();
		},
		registerBtn() {
			this.$router.push("/register");
		},
		refreshStatus() {
			location.reload();
		},
	},
	data() {
		return {
			drawer: false,
			group: null,
			loggedIn: "",
		};
	},
};
</script>

<style scoped></style>
