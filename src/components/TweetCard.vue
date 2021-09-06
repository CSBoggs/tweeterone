<template>
	<div>
		<!-- Vuetify Card Component -->
		<v-card
			elevation="5"
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
				<!-- Overlay to edit or delete tweet with ownership -->
				<v-btn
					v-if="tweet.userId == userId && !isPreview"
					style="z-index: 1"
					color="primary"
					class="mx-9"
					fab
					absolute
					right
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
							cols="60"
							rows="4"
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
				<!-- Delete tweet with ownership -->
				<v-btn
					v-if="tweet.userId == userId && !isPreview"
					@click.prevent="deleteTweet"
					style="z-index: 1"
					class="mx-0"
					color="error"
					absolute
					fab
					right
					x-small
				>
					<v-icon light> mdi-delete-outline </v-icon>
				</v-btn>
			</v-card-title>

			<v-card-text class="text-h5 font-weight-bold">
				" {{ tweet.content }} "
			</v-card-text>

			<v-card-actions>
				<v-list-item class="grow">
					<v-list-item-content>
						<v-list-item-title>
							<!-- Username and link to profile -->
							<router-link
								id="usernameLink"
								:to="'/profile/' + this.tweet.userId"
							>
								<v-icon x-large> mdi-account-circle </v-icon>
								{{ tweet.username }}
							</router-link>
						</v-list-item-title>
					</v-list-item-content>
					<v-row align="center" justify="end">
						<FollowUser
							v-if="!isPreview"
							:tweetUserId="tweet.userId"
							@refreshLikes="refreshLikes"
						/>
						<!-- Like/unlike logic -->
						<v-icon
							v-if="tweet.userId == userId"
							class="mr-1"
							large
							color="rgb(223, 96, 138)"
						>
							mdi-heart-outline
						</v-icon>
						<button
							:disabled="isPreview"
							@click.prevent="likeToggle()"
							v-else-if="!loadingLike"
						>
							<v-icon
								:class="{ fill: isLiked }"
								class="mr-1"
								large
							>
								mdi-heart
							</v-icon>
						</button>
						<!-- Total likes counter -->
						<span class="subheading mr-2">
							{{ totalLikes }}
						</span>
						<div class="text-center"></div>
					</v-row>
				</v-list-item>
			</v-card-actions>
			<MainCommentsFlow
				:tweetId="parseInt(tweet.tweetId)"
				v-if="!isPreview"
			/>
		</v-card>
	</div>
</template>

<script>
import axios from "axios";
import cookies from "vue-cookies";
import MainCommentsFlow from "./MainCommentsFlow.vue";
import FollowUser from "./FollowUser.vue";
export default {
	components: { MainCommentsFlow, FollowUser },
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
		isPreview() {
			return !cookies.get("loginToken");
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
		comments: [],
		loadingLike: false,
		loadingComment: false,
	}),
};
</script>

<style scoped>
.fill {
	color: #f06292;
}
#usernameLink {
	font-weight: 400;
	font-size: larger;
	text-decoration: none;
	color: #ffffff;
}
</style>
