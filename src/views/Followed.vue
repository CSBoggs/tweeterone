<template>
	<div>
		<span
			id="followTitle"
			class="text-h3 font-weight-light ml-10 hidden-sm-and-down"
			>My followed user's tweets:</span
		>
		<span
			id="followTitle"
			class="text-h5 font-weight-light ml-4 hidden-sm-and-up"
			>My followed user's tweets:</span
		>
		<div id="tweetLayout">
			<TweetCard v-for="(tweet, id) in tweets" :key="id" :tweet="tweet" />
		</div>
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
	name: "Followed",
	mounted() {
		this.getMyFollowed();
	},
	computed: {
		userId() {
			return cookies.get("userId");
		},
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
					this.tweets = response.data.filter((tweet) =>
						this.myFollows.includes(tweet.userId)
					);
				});
		},
		getMyFollowed() {
			axios
				.request({
					url: "/follows",
					method: "GET",
					params: {
						userId: this.userId,
					},
				})
				.then((response) => {
					this.myFollows = response.data.map((user) => user.userId);
				})
				.then(() => {
					this.getFilterTweets();
				});
		},
	},
	data: () => ({
		model: null,
		tweets: [],
		myFollows: [],
	}),
};
</script>

<style scoped>
#tweetLayout {
	display: grid;
	gap: 2vw;
	padding-top: 3.5vh;
	margin-left: 3.5vw;
	margin-right: 3.5vw;
}
#followTitle {
	display: grid;
	padding-top: 15vh;
}
@media screen and (min-width: 1000px) {
	#tweetLayout {
		display: grid;
		margin-left: 13.5vw;
		margin-right: 13.5vw;
		padding-top: 15vh;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: auto;
		gap: 2vh;
	}
	#followTitle {
		display: grid;
		padding-top: 15vh;
	}
}
</style>
