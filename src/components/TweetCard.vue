<template>
	<div>
		<!-- Vuetify Card Component -->
		<v-card
			elevation="5"
			shaped
			class="mx-auto"
			color="#26c6da"
			dark
			max-width="500"
		>
			<v-card-title>
				<v-icon medium left> mdi-twitter </v-icon>
				<span class="text-h6 font-weight-light">Tweeter</span>
			</v-card-title>

			<v-card-text class="text-h5 font-weight-bold">
				" {{ tweet.content }} "
			</v-card-text>

			<v-card-actions>
				<v-list-item class="grow">
					<v-list-item-content>
						<v-list-item-title>
							<!-- Username and link to profile -->
							<router-link :to="'/profile/' + this.tweet.userId">
								{{ tweet.username }}
							</router-link>
							<span class="mr-2">·</span>
							<v-icon class="mr-2" large>
								mdi-account-multiple-plus
							</v-icon>
						</v-list-item-title>
					</v-list-item-content>
					<v-row align="center" justify="end">
						<!-- Like/unlike logic -->
						<v-icon v-if="tweet.userId == userId" class="mr-1">
							mdi-heart-outline
						</v-icon>
						<button
							@click.prevent="likeToggle()"
							v-else-if="!loadingLike"
						>
							<v-icon :class="{ fill: isLiked }" class="mr-1">
								mdi-heart
							</v-icon>
						</button>
						<span class="subheading mr-2">
							{{ totalLikes }}
						</span>
						<span class="mr-2">·</span>
						<v-icon class="mr-2" medium>
							mdi-comment-text-multiple
						</v-icon>
						<div class="text-center">
							<!-- Overlay to edit or delete tweet with ownership -->
							<v-btn
								v-if="tweet.userId == userId"
								color="primary"
								class="mx-3"
								fab
								x-small
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
										cols="60"
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
							@click.prevent="deleteTweet"
							class="mx-1"
							color="error"
							fab
							x-small
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
import axios from "axios";
export default {
	name: "TweetCard",
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
		tweet: {
			username: "",
			content: "",
			userId: "",
			tweetId: "",
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
		likeToggle() {
			this.loadingLike = true;
			if (this.isLiked) {
				this.$store
					.dispatch("unlikeTweet", this.tweet.tweetId)
					.then(() => {
						this.refreshLikes();
					});
			} else {
				this.$store
					.dispatch("likeTweet", this.tweet.tweetId)
					.then(() => {
						this.refreshLikes();
					});
			}
		},
		refreshLikes() {
			axios
				.request({
					url: "/tweet-likes",
					method: "GET",
					params: { tweetId: this.tweet.tweetId },
				})
				.then((response) => {
					this.isLikedBy = response.data.map((user) => user.userId);
				})
				.then(() => {
					this.loadingLike = false;
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
		editText: "",
		isLikedBy: [],
		loadingLike: false,
	}),
};
</script>

<style scoped>
.fill {
	color: crimson;
}
</style>
