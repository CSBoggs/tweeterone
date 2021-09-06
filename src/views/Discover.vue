<template>
	<div>
		<v-sheet class="mx-auto" elevation="8" width="85vw" height="80vh">
			<span class="text-h4 font-weight-light pb-10 ml-10"
				>Discover other users tweets:</span
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
							class="fill-height"
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
	padding-bottom: 20vh;
}
.v-slide-group__content {
	gap: 1vw;
}
</style>
