<template>
	<div>
		<!-- simple text form and submit button to post a new tweet -->
		<v-container id="createTweet">
			<v-form ref="form">
				<v-row>
					<v-col cols="60">
						<v-text-field
							v-model="tweetContent"
							:counter="max"
							:rules="rules"
							outlined
							solo
							label="Create a new Tweet"
							>Tweet</v-text-field
						>
						<v-btn
							@click.prevent="postTweet()"
							color="primary"
							depressed
							elevation="2"
							>Post Tweet</v-btn
						>
					</v-col>
				</v-row>
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
			this.$nextTick(function () {
				this.$store.dispatch("createTweet", this.tweetContent);
				let userId = this.$store.getters.getUserId;
				this.$store.dispatch("getTweetsById", userId);
			});
		},
		getTweets() {
			this.$store.dispatch("getTweets");
		},
	},
};
</script>

<style scoped>
#createTweet {
	width: 90vw;
	padding-top: 10vh;
	padding-bottom: 7vh;
}

@media screen and (min-width: 1000px) {
	#createTweet {
		max-width: 40vw;
		padding-top: 10vh;
		padding-bottom: 5vh;
	}
}
</style>
