<template>
	<div>
		<button @click.prevent="toggleFollow()">
			<v-icon
				v-if="tweetUserId != userId"
				:class="{ fill: isFollowed }"
				class="mr-5"
				large
			>
				mdi-account-multiple-plus
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
		follows: {
			type: Array,
		},
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
		isFollowed() {
			return this.isFollowedBy.includes(parseInt(this.userId));
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
							followId: this.follows.followId,
						},
					})
					.then(() => {
						this.$emit("refreshLikes");
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
							followId: this.follows.followId,
						},
					})
					.then(() => {
						this.$emit("refreshLikes");
					})
					.then(() => {
						this.refreshLikes();
					});
			}
		},
		refreshFollows() {
			this.$store
				.dispatch("getFollowsById", this.userId)
				.then((response) => {
					this.follows = response.data;
					this.isFollowedBy = response.data.map(
						(user) => user.userId
					);
				});
		},
	},
	data: () => ({
		isFollowedBy: [],
		follows: [],
	}),
	mounted() {
		this.refreshFollows();
	},
};
</script>

<style scoped>
.fill {
	color: rgb(37, 255, 190);
}
</style>
