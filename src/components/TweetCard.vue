<template>
	<div>
		<v-card
			elevation="3"
			shaped
			class="mx-auto"
			color="#26c6da"
			dark
			min-width="400"
			max-width="500"
		>
			<v-card-title>
				<v-icon medium left> mdi-twitter </v-icon>
				<span class="text-h6 font-weight-light">Tweeter</span>
			</v-card-title>

			<v-card-text class="text-h4 font-weight-bold">
				"{{ tweet.content }}"
			</v-card-text>

			<v-card-actions>
				<v-list-item class="grow">
					<v-list-item-content>
						<v-list-item-title>{{
							tweet.username
						}}</v-list-item-title>
					</v-list-item-content>
					<v-row align="center" justify="end">
						<v-icon class="mr-1"> mdi-heart </v-icon>
						<span class="subheading mr-2">256</span>
						<span class="mr-1">·</span>
						<v-icon class="mr-1"> mdi-share-variant </v-icon>
						<span class="subheading">45</span>
						<div class="text-center">
							<v-btn
								v-if="tweet.userId == userId"
								color="primary"
								class="mx-3"
								fab
								small
								@click="overlay = !overlay"
							>
								<v-icon light> mdi-pencil </v-icon>
							</v-btn>
							<v-overlay :value="overlay" :opacity="opacity">
								<v-btn icon @click="overlay = false">
									<v-icon dark>mdi-close</v-icon>
								</v-btn>
								<v-container fluid>
									<v-textarea
										counter
										:rules="rules"
										clearable
										rows="4"
										clear-icon="mdi-close-circle"
										label="Edit Tweet"
										value=""
										v-model="editText"
									></v-textarea>
									<v-btn
										@click.prevent="editTweet()"
										class="white--text"
										color="primary"
										depressed
										>Submit</v-btn
									>
								</v-container>
							</v-overlay>
						</div>
						<v-btn
							v-if="tweet.userId == userId"
							@click="deleteTweet"
							class="mx-1"
							color="error"
							fab
							small
						>
							<v-icon light> mdi-delete-outline </v-icon>
						</v-btn>
					</v-row>
				</v-list-item>
			</v-card-actions>
		</v-card>
	</div>
</template>

<script>
export default {
	name: "TweetCard",
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	props: {
		tweet: {
			username: "",
			content: "",
			userId: "",
			tweetId: "",
			loginToken: "",
		},
	},
	methods: {
		deleteTweet() {
			this.$store.dispatch("removeTweet", this.tweet.tweetId).then(() => {
				this.$store.dispatch("refreshTweets");
			});
		},
		editTweet() {
			this.$store
				.dispatch("editTweet", {
					tweetId: this.tweet.tweetId,
					editText: this.editText,
				})
				.then(() => {
					this.overlay = false;
				})
				.then(() => {
					this.$store.dispatch("refreshTweets");
				});
		},
	},
	data: () => ({
		overlay: false,
		opacity: 0.9,
		rules: [(v) => v.length <= 140 || "Max 140 characters"],
		editText: "",
	}),
};
</script>

<style scoped></style>
