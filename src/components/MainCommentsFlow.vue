<template>
	<div>
		<v-expansion-panels>
			<v-expansion-panel>
				<v-expansion-panel-header color="cyan darken-3">
					<v-row align="center" justify="start">
						<v-icon class="mr-2" medium>
							mdi-comment-text-multiple
						</v-icon>
						<span class="mr-2">
							Comments: ({{ comments.length }})</span
						>
					</v-row>
				</v-expansion-panel-header>

				<v-expansion-panel-content color="cyan darken-3">
					<CreateComment
						:tweetId="tweetId"
						@refreshComments="fetchTweetComments"
					/>
					<v-expansion-panels
						v-model="panel"
						multiple
						popout
						id="individualComment"
					>
						<div id="comments">
							<CommentCard
								v-for="(comment, id) in comments"
								:key="id"
								:tweetId="tweetId"
								:comment="comment"
								@refreshComments="fetchTweetComments"
							/>
						</div>
					</v-expansion-panels>
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
			panel: [],
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

<style scoped>
#comments {
	display: flex;
	flex-direction: column;
	gap: 1rem;
	width: 100%;
}
</style>
