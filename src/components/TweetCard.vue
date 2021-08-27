<template>
	<div>
		<v-card
			elevation="3"
			shaped
			class="mx-auto"
			color="#26c6da"
			dark
			max-width="400"
		>
			<v-card-title>
				<v-icon large left> mdi-twitter </v-icon>
				<span class="text-h6 font-weight-light">Tweeter</span>
			</v-card-title>

			<v-card-text class="text-h5 font-weight-bold">
				"{{ tweet.content }}"
			</v-card-text>

			<v-card-actions>
				<v-list-item class="grow">
					<v-list-item-avatar color="grey darken-3">
						<v-img class="elevation-6" alt="" src=""></v-img>
					</v-list-item-avatar>

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
					</v-row>
				</v-list-item>

				<v-btn
					v-if="tweet.userId == userId"
					@click="deleteTweet"
					class="mx-4"
					color="red"
					fab
					small
				>
					<v-icon dark> mdi-minus </v-icon>
				</v-btn>
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
			this.$store.dispatch("removeTweet", this.tweet.tweetId);
			let userId = this.$store.getters.getUserId;
			this.$store.dispatch("getTweetsById", userId);
		},
	},
};
</script>

<style scoped></style>
