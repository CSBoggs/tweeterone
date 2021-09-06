<template>
	<div>
		<!-- toggles and styles like heart icon, styles users own as outline so you cannot like your own -->
		<v-icon
			v-if="comment.userId == userId"
			class="mr-1"
			large
			color="rgb(223, 96, 138)"
		>
			mdi-heart-outline
		</v-icon>
		<!-- Like/unlike logic -->
		<button
			@click.prevent="likeCommentToggle()"
			v-if="comment.userId != userId"
		>
			<v-icon :class="{ fill: isLiked }" class="mr-1" large>
				mdi-heart
			</v-icon>
		</button>
		<!-- Total likes counter -->
		<span class="mr-2">
			{{ totalLikes }}
		</span>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "LikeComment",
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
		isLiked() {
			return this.isLikedBy.includes(parseInt(this.userId));
		},
		totalLikes() {
			return this.isLikedBy.length;
		},
	},
	props: {
		tweetId: {
			type: Number,
		},
		comment: {
			type: Object,
		},
	},
	methods: {
		likeCommentToggle() {
			this.loadingLike = true;
			if (this.isLiked) {
				axios
					.request({
						url: "/comment-likes",
						method: "DELETE",
						data: {
							loginToken: this.$store.getters.getLoginToken,
							commentId: this.comment.commentId,
						},
					})
					.then(() => {
						this.$emit("refreshComments");
					})
					.then(() => {
						this.refreshLikes();
					});
			} else {
				axios
					.request({
						url: "/comment-likes",
						method: "POST",
						data: {
							loginToken: this.$store.getters.getLoginToken,
							commentId: this.comment.commentId,
						},
					})
					.then(() => {
						this.$emit("refreshComments");
					})
					.then(() => {
						this.refreshLikes();
					});
			}
		},
		refreshLikes() {
			axios
				.request({
					url: "/comment-likes",
					method: "GET",
					params: { commentId: this.comment.commentId },
				})
				.then((response) => {
					this.isLikedBy = response.data.map((user) => user.userId);
				});
		},
	},
	mounted() {
		this.refreshLikes();
	},
	data: () => ({
		overlay: false,
		opacity: 0.9,
		rules: [(v) => v.length <= 140 || "Max 140 characters"],
		isLikedBy: [],
		comments: [],
	}),
};
</script>

<style scoped>
.fill {
	color: rgb(223, 96, 138);
}
</style>
