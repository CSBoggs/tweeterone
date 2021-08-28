<template>
	<div>
		<TweeterNav />
		<v-simple-table>
			<template v-slot:default>
				<tbody>
					<tr>
						<td>Username:</td>
						<td>
							{{ userInfo.username }}
							<div class="text-center">
								<v-btn
									v-if="userInfo.userId == userId"
									color="primary"
									class="mx-3"
									fab
									small
									@click="overlay = !overlay"
								>
									<v-icon light> mdi-pencil </v-icon>
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
											rows="4"
											clear-icon="mdi-close-circle"
											label="Edit Tweet"
											value=""
											v-model="editText"
										></v-textarea>
										<v-btn
											@click.prevent="editInfo()"
											class="white--text"
											color="primary"
											depressed
											>Submit</v-btn
										>
									</v-container>
								</v-overlay>
							</div>
						</td>
					</tr>
					<tr>
						<td>Birthdate:</td>
						<td>{{ userInfo.birthdate }}</td>
					</tr>
					<tr>
						<td>Email:</td>
						<td>{{ userInfo.email }}</td>
					</tr>
					<tr>
						<td>Biography:</td>
						<td>{{ userInfo.bio }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";
import axios from "axios";
axios.defaults.headers.common["X-Api-Key"] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/";

export default {
	name: "Profile",
	components: {
		TweeterNav,
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
		};
	},
	mounted() {
		axios
			.get("/users", {
				params: { userId: this.$store.getters.getUserId },
			})
			.then((response) => {
				if (response.status === 200) {
					this.userInfo.email = response.data[0].email;
					this.userInfo.username = response.data[0].username;
					this.userInfo.birthdate = response.data[0].birthdate;
					this.userInfo.bio = response.data[0].bio;
				}
			})
			.catch(() => {
				console.error("no user found");
			});
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	methods: {
		editInfo() {
			this.$store
				.dispatch("editTweet", {
					tweetId: this.tweet.tweetId,
					editText: this.editText,
				})
				.then(() => {
					this.overlay = false;
				})
				.then(() => {
					this.$store.dispatch("refreshTweets");
				});
		},
	},
};
</script>

<style scoped>
div {
	display: grid;
	place-items: center;
	padding-bottom: 3.5vh;
}
</style>
