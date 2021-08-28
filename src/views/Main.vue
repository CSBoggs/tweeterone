<template>
	<div>
		<TweeterNav />
		<MainViewport />
	</div>
</template>

<script>
import TweeterNav from "../components/TweeterNav.vue";
import MainViewport from "../components/MainViewport.vue";
export default {
	name: "Main",
	components: {
		TweeterNav,
		MainViewport,
	},
	// beforeCreate() {
	// 	this.$store.dispatch("authCheck");
	// },
};
</script>
