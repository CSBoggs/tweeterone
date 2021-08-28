<template>
	<div>
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
div {
	display: grid;
	grid-template-columns: auto;
	gap: 2vh;
}
</style>
