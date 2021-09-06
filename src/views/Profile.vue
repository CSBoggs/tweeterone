<template>
	<div id="mainDiv">
		<div id="profileContent">
			<span class="text-h3 font-weight-light pb-10 hidden-sm-and-down"
				>{{ userInfo.username }}'s profile:</span
			>
			<v-simple-table>
				<template v-slot:default>
					<tbody>
						<tr>
							<td>Username:</td>
							<td>
								{{ userInfo.username }}
							</td>
							<td>
								<EditProfile
									v-if="isEditable"
									@profileUpdated="refreshProfile()"
									label="username"
									displayLabel="Username"
									:currentValue="userInfo.username"
								/>
							</td>
						</tr>
						<tr>
							<td>Birthdate:</td>
							<td>
								{{ userInfo.birthdate }}
							</td>
							<td>
								<EditProfile
									v-if="isEditable"
									@profileUpdated="refreshProfile()"
									label="birthdate"
									displayLabel="Birthdate in Year-Month-Day (2020-01-01)"
									:currentValue="userInfo.birthdate"
								/>
							</td>
						</tr>
						<tr>
							<td>Email:</td>
							<td>{{ userInfo.email }}</td>
							<td>
								<EditProfile
									v-if="isEditable"
									@profileUpdated="refreshProfile()"
									label="email"
									displayLabel="Email"
									:currentValue="userInfo.email"
								/>
							</td>
						</tr>
						<tr>
							<td>Biography:</td>
							<td>{{ userInfo.bio }}</td>
							<td>
								<EditProfile
									v-if="isEditable"
									@profileUpdated="refreshProfile()"
									label="bio"
									displayLabel="Biography"
									:currentValue="userInfo.bio"
								/>
							</td>
						</tr>
						<tr>
							<td v-if="userInfo.userId == userId && isEditable">
								Delete my profile:
							</td>
							<td>
								<v-btn
									v-if="
										userInfo.userId == userId && isEditable
									"
									class="mx-1"
									color="error"
									fab
									small
									@click="overlay = !overlay"
								>
									<v-icon light> mdi-delete-outline </v-icon>
								</v-btn>

								<v-overlay :value="overlay" :opacity="opacity">
									<v-btn icon @click="overlay = false">
										<v-icon dark>mdi-close</v-icon>
									</v-btn>
									<v-container fluid>
										<v-textarea
											counter
											:rules="rules"
											clearable
											cols="60"
											rows="4"
											clear-icon="mdi-close-circle"
											label="To delete your user account, please enter your password"
											v-model="deletePassword"
										></v-textarea>
										<v-btn
											@click.prevent="deleteUser()"
											class="white--text"
											color="error"
											depressed
											>Delete User</v-btn
										>
									</v-container>
								</v-overlay>
							</td>
						</tr>
					</tbody>
				</template>
			</v-simple-table>
			<button
				@click.prevent="toggleEdit()"
				v-if="userInfo.userId == userId"
			>
				<v-chip class="ma-2" color="primary" label text-color="white">
					<v-icon left medium> mdi-account-circle </v-icon>
					Edit Profile
				</v-chip>
			</button>
		</div>

		<MainTweetsFlow :tweets="tweets" :key="$store.getters.getLoginToken" />
		<span
			id="userTweetTitle"
			class="text-h3 font-weight-light hidden-sm-and-down"
			>{{ userInfo.username }}'s tweets:</span
		>
	</div>
</template>

<script>
import EditProfile from "../components/EditProfile.vue";
import MainTweetsFlow from "../components/MainTweetsFlow.vue";
import axios from "axios";
axios.defaults.headers.common["X-Api-Key"] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/";

export default {
	name: "Profile",
	components: {
		EditProfile,
		MainTweetsFlow,
	},
	data: () => {
		return {
			userInfo: {
				username: "",
				content: "",
				userId: "",
				tweetId: "",
				loginToken: "",
				bio: "",
				birthdate: "",
				email: "",
				imageUrl: "",
			},
			overlay: false,
			opacity: 0.9,
			rules: [(v) => v.length <= 140 || "Max 140 characters"],
			editText: "",
			deletePassword: "",
			tweets: [],
			isEditable: false,
		};
	},
	methods: {
		refreshProfile() {
			axios
				.get("/users", {
					params: { userId: this.$route.params.userId },
				})
				.then((response) => {
					if (response.status === 200) {
						this.userInfo.email = response.data[0].email;
						this.userInfo.username = response.data[0].username;
						this.userInfo.birthdate = response.data[0].birthdate;
						this.userInfo.bio = response.data[0].bio;
						this.userInfo.userId = response.data[0].userId;
					}
				})
				.then(() => {
					axios
						.request({
							url: "/tweets",
							method: "GET",
							params: { userId: this.$route.params.userId },
						})
						.then((response) => {
							this.tweets = response.data;
						});
				})
				.catch(() => {
					console.error("no user found");
				});
		},
		deleteUser() {
			this.$store.dispatch("removeUser", this.deletePassword).then(() => {
				this.$store.dispatch("userLogout");
			});
		},
		toggleEdit() {
			this.isEditable
				? (this.isEditable = false)
				: (this.isEditable = true);
		},
	},
	mounted() {
		this.refreshProfile();
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
};
</script>

<style scoped>
#profileContent {
	display: grid;

	width: 90vw;
	padding-top: 10vh;
	padding-left: 5vw;
}
@media screen and (min-width: 1000px) {
	#mainDiv {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: 1fr;
		align-items: start;
	}
	#tweeterNav {
		display: grid;
		grid-column: 1/3;
		grid-row: 1;
	}
	#userTweetTitle {
		display: grid;
		grid-column: 2/3;
		grid-row: 2;
		padding-bottom: 4vh;
		padding-top: 15vh;
	}
	#profileContent {
		display: grid;
		grid-column: 1/2;
		grid-row: 2;
		max-width: 35vw;
		padding-top: 15vh;
		padding-left: 5vw;
	}
	#tweetLayout {
		display: grid;
		grid-column: 2/3;
		grid-row: 2;
		padding-top: 25vh;
	}
	.ma-2 {
		width: 100px;
	}
}
</style>
