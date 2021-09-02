<template>
	<div>
		<CommentCard
			v-for="(comment, id) in comments"
			:key="id"
			:comment="comment"
		/>
	</div>
</template>

<script>
import CommentCard from "./CommentCard.vue";
export default {
	name: "MainCommentsFlow",
	components: {
		CommentCard,
	},
	props: {
		tweetId,
	},
	data: () => {
		return {
			comments: [],
		};
	},
	methods: {},
};
</script>

<style scoped></style>
