<template>
	<div id="tweetLayout">
		<TweetCard v-for="(tweet, id) in tweets" :key="id" :tweet="tweet" />
	</div>
</template>

<script>
import TweetCard from "./TweetCard.vue";
export default {
	name: "MainTweetsFlow",
	components: {
		TweetCard,
	},
	props: {
		tweets: {
			type: Array,
		},
	},
};
</script>

<style scoped>
#tweetLayout {
	display: grid;
	gap: 2vw;
	padding-top: 2.5vh;
	margin-left: 3.5vw;
	margin-right: 3.5vw;
}
@media screen and (min-width: 1000px) {
	#tweetLayout {
		display: grid;
		margin-left: 13.5vw;
		margin-right: 13.5vw;
		padding-top: 5vh;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
		gap: 2vh;
	}
}
</style>
