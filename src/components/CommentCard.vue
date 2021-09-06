<template>
	<div>
		<!-- remainder of Vuetify component to create expansion panels on eacth tweet for existing comments -->
		<v-expansion-panel>
			<v-expansion-panel-header color="cyan darken-1">{{
				comment.username + " says " + commentPreview
			}}</v-expansion-panel-header>
			<v-expansion-panel-content color="cyan darken-1">
				<v-container>
					<v-row justify="center">"{{ comment.content }}"</v-row>
					<!-- subcomponent calls to refresh after and edited and liked comment -->
					<v-row justify="space-between">
						<EditComment
							:comment="comment"
							@refreshComments="$emit('refreshComments')"
						/>
						<LikeComment
							:comment="comment"
							:tweetId="tweetId"
							@refreshComments="$emit('refreshComments')"
						/>
					</v-row>
				</v-container>
			</v-expansion-panel-content>
		</v-expansion-panel>
	</div>
</template>

<script>
import EditComment from "../components/EditComment.vue";
import LikeComment from "../components/LikeComment.vue";
export default {
	name: "CommentCard",
	components: {
		EditComment,
		LikeComment,
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
		tweetId: {
			type: Number,
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
