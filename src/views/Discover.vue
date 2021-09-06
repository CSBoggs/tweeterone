<template>
	<div>
		<v-sheet class="mx-auto" elevation="8" width="85vw" height="60vh">
			<v-slide-group
				v-model="model"
				id="cardStyle"
				class="pa-4"
				show-arrows
				multiple
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
import { mapState } from "vuex";
import TweetCard from "../components/TweetCard.vue";

export default {
	components: {
		TweetCard,
	},
	name: "Discover",
	mounted() {
		let userId = this.$store.getters.getUserId;
		this.$store.dispatch("getTweetsById", userId);
	},
	computed: {
		...mapState({
			tweets: (state) => state.tweets,
		}),
	},
	data: () => ({
		model: null,
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
