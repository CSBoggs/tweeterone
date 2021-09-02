<template>
	<div>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header>
					<v-icon class="mr-2" medium>
						mdi-comment-text-multiple
					</v-icon>
					({{ comments.length }})
				</v-expansion-panel-header>
				<v-expansion-panel-content>
					<CreateComment
						:tweetId="tweetId"
						@refreshComments="fetchTweetComments"
					/>
					<CommentCard
						v-for="(comment, id) in comments"
						:key="id"
						:comment="comment"
						@refreshComments="fetchTweetComments"
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
