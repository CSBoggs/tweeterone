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
	margin-left: 3.5vw;
	margin-right: 3.5vw;
	padding-top: 5vh;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: auto;
	gap: 2vh;
}
</style>
