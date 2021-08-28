<template>
	<div>
		<TweeterNav />
		<v-simple-table>
			<template v-slot:default>
				<thead>
					<tr>
						<th class="text-left">Username</th>
						<th class="text-left">Email</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="item in desserts" :key="item.name">
						<td>{{ item.name }}</td>
						<td>{{ item.calories }}</td>
					</tr>
				</tbody>
			</template>
		</v-simple-table>
	</div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";
export default {
	name: "Profile",
	components: {
		TweeterNav,
	},
	props: {
		tweet: {
			username: "",
			content: "",
			userId: "",
			tweetId: "",
			loginToken: "",
			bio: "",
			birthdate: "",
			email: "",
		},
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
};
</script>

<style lang="scss" scoped></style>
