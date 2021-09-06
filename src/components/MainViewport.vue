<template>
	<div>
		<CreateTweet />
		<MainTweetsFlow :tweets="tweets" :key="$store.getters.getLoginToken" />
	</div>
</template>

<script>
import CreateTweet from "./CreateTweet.vue";
import MainTweetsFlow from "./MainTweetsFlow.vue";
import { mapState } from "vuex";

export default {
	components: {
		MainTweetsFlow,
		CreateTweet,
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
