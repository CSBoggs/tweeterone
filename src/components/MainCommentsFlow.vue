<template>
	<div>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header>Comments</v-expansion-panel-header>
				<v-expansion-panel-content>
					<CreateComment :tweetId="tweetId" />
					<CommentCard
						v-for="(comment, id) in comments"
						:key="id"
						:comment="comment"
					/>
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import axios from "axios";
import CommentCard from "./CommentCard.vue";
import CreateComment from "./CreateComment.vue";
export default {
	name: "MainCommentsFlow",
	components: {
		CommentCard,
		CreateComment,
	},
	props: {
		tweetId: {
			type: Number,
		},
	},
	data: () => {
		return {
			comments: [],
		};
	},
	methods: {
		fetchTweetComments() {
			axios
				.request({
					url: "/comments",
					method: "GET",
					params: { tweetId: this.tweetId },
				})
				.then((response) => {
					this.comments = response.data;
				});
		},
	},
	mounted() {
		this.fetchTweetComments();
	},
};
</script>

<style scoped></style>
