<template>
	<div>
		<!-- Vuetify Slide sheets component to browse other users tweets -->
		<v-sheet class="mx-auto" elevation="8">
			<span
				class="text-h3 font-weight-light pb-15 ml-10 hidden-sm-and-down"
				>Discover our users tweets:</span
			>
			<span class="text-h5 font-weight-light pb-15 ml-10 hidden-sm-and-up"
				>Discover our users tweets:</span
			>
			<v-slide-group
				v-model="model"
				id="cardStyle"
				class="pa-4"
				show-arrows
				draggable="true"
			>
				<v-slide-item v-for="(tweet, id) in tweets" :key="id">
					<TweetCard :tweet="tweet" class="mx-2">
						<v-row
							class="fill-width"
							align="center"
							justify="center"
						></v-row>
					</TweetCard>
				</v-slide-item>
			</v-slide-group>
		</v-sheet>
	</div>
</template>

<script>
import axios from "axios";
import TweetCard from "../components/TweetCard.vue";
import cookies from "vue-cookies";
export default {
	components: {
		TweetCard,
	},
	name: "Discover",
	mounted() {
		this.getFilterTweets();
	},
	methods: {
		// gets all tweets and filters them to omit logged in users own tweets
		getFilterTweets() {
			axios
				.request({
					url: "/tweets",
					method: "GET",
				})
				.then((response) => {
					this.tweets = response.data.filter(
						(tweet) =>
							tweet.userId != parseInt(cookies.get("userId"))
					);
				});
		},
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	data: () => ({
		model: null,
		tweets: [],
	}),
};
</script>

<style scoped>
.mx-auto {
	padding-top: 20vh;
	width: 100vw;
	height: 100vh;
}
.v-slide-group__content {
	gap: 1vw;
}

@media screen and (min-width: 1000px) {
	.mx-auto {
		padding-top: 20vh;
		padding-bottom: 20vh;
		width: 90vw;
		max-height: 85vh;
	}
	.v-slide-group__content {
		gap: 1vw;
	}
}
</style>
