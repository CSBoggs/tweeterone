<template>
	<div>
		<MainViewport />
	</div>
</template>

<script>
import MainViewport from "../components/MainViewport.vue";
export default {
	name: "Main",
	components: {
		MainViewport,
	},
	beforeCreate() {
		this.$store.dispatch("authCheck");
	},
	data() {
		return {
			drawer: false,
			group: null,
		};
	},
};
</script>

<style scoped></style>
