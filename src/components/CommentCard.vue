<template>
	<div>
		<v-expansion-panels v-model="panel" multiple>
			<v-expansion-panel>
				<v-expansion-panel-header>{{
					comment.username + " says " + commentPreview
				}}</v-expansion-panel-header>
				<v-expansion-panel-content>
					"{{ comment.content }}"
					<EditComment :comment="comment" />
				</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>
import EditComment from "../components/EditComment.vue";
export default {
	name: "CommentCard",
	components: {
		EditComment,
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
		commentPreview() {
			let length = 30;
			let myString = this.comment.content;
			return '"' + myString.substring(0, length) + '..."';
		},
	},
	props: {
		comment: {
			type: Object,
		},
	},
	methods: {
		all() {
			this.panel = [...Array(this.items).keys()].map((k, i) => i);
		},
		none() {
			this.panel = [];
		},
	},
	data: () => {
		return {
			panel: [],
			items: 3,
		};
	},
};
</script>

<style scoped></style>
