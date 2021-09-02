<template>
	<div></div>
</template>

<script>
export default {
	name: "CommentCard",
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	props: {
		comment,
	},
	methods: {},
};
</script>

<style scoped></style>
