<template>
	<div>
		<v-container>
			<v-form ref="form">
				<v-text-field
					v-model="tweetContent"
					:counter="max"
					:rules="rules"
					label="Create a new Tweet"
					>Tweet</v-text-field
				>
				<v-btn
					@click="postTweet"
					color="primary"
					depressed
					elevation="2"
					>Post Tweet</v-btn
				>
				<v-btn @click="getTweets()" depressed elevation="2" raised
					>Check</v-btn
				>
			</v-form>
		</v-container>
	</div>
</template>

<script>
export default {
	name: "CreateTweet",
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
			tweetContent: "",
		};
	},
	methods: {
		postTweet() {
			this.$store.dispatch("createTweet", this.tweetContent);
			let userId = this.$store.getters.getUserId;
			this.$store.dispatch("getTweetsById", userId);
		},
		getTweets() {
			this.$store.dispatch("getTweets");
		},
	},
};
</script>

<style scoped></style>
