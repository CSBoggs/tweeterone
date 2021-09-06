<template>
	<div>
		<button @click.prevent="toggleFollow()">
			<v-icon
				v-if="tweetUserId != userId && !isFollowed"
				:class="{ fill: isFollowed }"
				class="mr-5"
				large
			>
				mdi-account-multiple-plus
			</v-icon>
			<v-icon
				v-else-if="isFollowed"
				:class="{ fill: isFollowed }"
				class="mr-5"
				large
			>
				mdi-account-multiple-minus
			</v-icon>
		</button>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "FollowUser",
	props: {
		tweetUserId: {
			type: Number,
		},
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
		isFollowed() {
			return this.isFollowedByMe.includes(parseInt(this.tweetUserId));
		},
	},
	methods: {
		toggleFollow() {
			if (this.isFollowed) {
				axios
					.request({
						url: "/follows",
						method: "DELETE",
						data: {
							loginToken: this.$store.getters.getLoginToken,
							followId: String(this.tweetUserId),
						},
					})
					.then(() => {
						this.refreshFollows();
					});
			} else {
				axios
					.request({
						url: "/follows",
						method: "POST",
						data: {
							loginToken: this.$store.getters.getLoginToken,
							followId: String(this.tweetUserId),
						},
					})
					.then(() => {
						this.refreshFollows();
					});
			}
		},
		refreshFollows() {
			axios
				.request({
					url: "/follows",
					method: "GET",
					params: {
						userId: this.userId,
					},
				})
				.then((response) => {
					this.follows = response.data;
					this.isFollowedByMe = response.data.map(
						(user) => user.userId
					);
				});
		},
	},
	data: () => ({
		isFollowedByMe: [],
		follows: [],
	}),
	mounted() {
		this.refreshFollows();
	},
};
</script>

<style scoped>
.fill {
	color: #1565c0;
}
</style>
