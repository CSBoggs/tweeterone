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
						</td>
						<td>
							<EditProfile
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
								@profileUpdated="refreshProfile()"
								label="birthdate"
								displayLabel="Birthdate"
								:currentValue="userInfo.birthdate"
							/>
						</td>
					</tr>
					<tr>
						<td>Email:</td>
						<td>{{ userInfo.email }}</td>
						<td>
							<EditProfile
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
								@profileUpdated="refreshProfile()"
								label="bio"
								displayLabel="Biography"
								:currentValue="userInfo.bio"
							/>
						</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";
import EditProfile from "../components/EditProfile.vue";
import axios from "axios";
axios.defaults.headers.common["X-Api-Key"] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/";

export default {
	name: "Profile",
	components: {
		TweeterNav,
		EditProfile,
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
	methods: {
		refreshProfile() {
			console.log(this.$route.params.userId);
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
				.catch(() => {
					console.error("no user found");
				});
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
div {
	display: grid;
	place-items: center;
	padding-bottom: 3.5vh;
}
</style>
