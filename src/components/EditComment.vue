<template>
	<div>
		<v-btn
			v-if="comment.userId == userId"
			color="primary"
			class="mx-0"
			rounded
			x-small
			@click="overlay = !overlay"
		>
			<v-icon light> mdi-pencil </v-icon>
		</v-btn>
		<v-btn
			v-if="comment.userId == userId"
			@click.prevent="deleteComment()"
			class="mx-0"
			color="error"
			rounded
			x-small
		>
			<v-icon light> mdi-delete-outline </v-icon>
		</v-btn>
		<v-overlay :value="overlay" :opacity="opacity" :z-index="zIndex">
			<v-btn icon @click="overlay = false">
				<v-icon dark>mdi-close</v-icon>
			</v-btn>
			<v-container fluid>
				<v-textarea
					counter
					:rules="rules"
					rounded
					cols="60"
					rows="4"
					label="Edit Comment"
					value=""
					v-model="editCommentContent"
				></v-textarea>
				<v-btn
					@click.prevent="editComment()"
					class="white--text"
					color="primary"
					depressed
					>Submit</v-btn
				>
			</v-container>
		</v-overlay>
	</div>
</template>

<script>
import axios from "axios";
export default {
	name: "EditComment",
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	props: {
		comment: {
			type: Object,
		},
	},
	methods: {
		editComment() {
			axios
				.request({
					url: "/comments",
					method: "PATCH",
					data: {
						loginToken: this.$store.getters.getLoginToken,
						commentId: this.comment.commentId,
						content: this.editCommentContent,
					},
				})
				.then(() => {
					this.$emit("refreshComments");
					this.overlay = false;
				});
		},
		deleteComment() {
			axios
				.request({
					url: "/comments",
					method: "DELETE",
					data: {
						loginToken: this.$store.getters.getLoginToken,
						commentId: this.comment.commentId,
					},
				})
				.then(() => {
					this.$emit("refreshComments");
				});
		},
	},
	data: () => ({
		overlay: false,
		opacity: 0.9,
		rules: [(v) => v.length <= 140 || "Max 140 characters"],
		editCommentContent: "",
		zIndex: 2,
	}),
	mounted() {
		this.editCommentContent = this.comment.content;
	},
};
</script>

<style scoped></style>
