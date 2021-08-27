<template>
	<div>
		<CreateTweet />
		<MainTweetsFlow :tweets="tweets" />
		<DiscoverTweetsFlow />
	</div>
</template>

<script>
import CreateTweet from "./CreateTweet.vue";
import DiscoverTweetsFlow from "./DiscoverTweetsFlow.vue";
import MainTweetsFlow from "./MainTweetsFlow.vue";
import { mapState } from "vuex";

export default {
	components: {
		MainTweetsFlow,
		CreateTweet,
		DiscoverTweetsFlow,
	},
	name: "MainViewport",
	mounted() {
		let userId = this.$store.getters.getUserId;
		this.$store.dispatch("getTweetsById", userId);
	},
	computed: {
		...mapState({
			tweets: (state) => state.tweets,
		}),
	},
};
</script>

<style scoped></style>
