<template>
	<div>
		<v-expansion-panel>
			<v-expansion-panel-header color="#26c6da">{{
				comment.username + " says " + commentPreview
			}}</v-expansion-panel-header>
			<v-expansion-panel-content color="#26c6da">
				<v-container>
					<v-row justify="center">"{{ comment.content }}"</v-row>

					<v-row justify="space-between">
						<EditComment
							:comment="comment"
							@refreshComments="$emit('refreshComments')"
						/>
						<LikeComment
							:comment="comment"
							:tweetId="tweetId"
							@refreshComments="$emit('refreshComments')"
						/>
					</v-row>
				</v-container>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</div>
</template>

<script>
import EditComment from "../components/EditComment.vue";
import LikeComment from "../components/LikeComment.vue";
export default {
	name: "CommentCard",
	components: {
		EditComment,
		LikeComment,
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
		commentPreview() {
			let length = 30;
			let myString = this.comment.content;
			return '"' + myString.substring(0, length) + '..."';
		},
	},
	props: {
		comment: {
			type: Object,
		},
		tweetId: {
			type: Number,
		},
	},
	methods: {
		all() {
			this.panel = [...Array(this.items).keys()].map((k, i) => i);
		},
		none() {
			this.panel = [];
		},
	},
	data: () => {
		return {
			panel: [],
			items: 3,
		};
	},
};
</script>

<style scoped></style>
