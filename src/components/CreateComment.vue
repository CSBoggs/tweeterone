<template>
	<div>
		<!-- simple text form and submit button to post a new comment on specified tweet -->
		<v-container>
			<v-form ref="form">
				<v-text-field
					outlined
					v-model="commentContent"
					:counter="max"
					:rules="rules"
					label="Comment on this tweet"
					>Tweet</v-text-field
				>
				<v-btn
					@click.prevent="postComment"
					color="primary"
					depressed
					elevation="2"
					>Post Comment</v-btn
				>
			</v-form>
		</v-container>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "CreateComment",
	computed: {
		rules() {
			const rules = [];
			if (this.max) {
				const rule = (v) =>
					(v || "").length <= this.max ||
					`A maximum of ${this.max} characters is allowed`;
				rules.push(rule);
			}
			return rules;
		},
	},
	data: () => {
		return {
			max: 140,
			commentContent: "",
		};
	},
	props: {
		tweetId: {
			type: Number,
		},
	},
	methods: {
		postComment() {
			axios
				.request({
					url: "/comments",
					method: "POST",
					data: {
						loginToken: this.$store.getters.getLoginToken,
						tweetId: this.tweetId,
						content: this.commentContent,
					},
				})
				.then(() => {
					this.$emit("refreshComments");
				});
		},
	},
};
</script>

<style scoped></style>
