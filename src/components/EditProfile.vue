<template>
	<div>
		<!-- buttons to toggle overlay to edit user registration value if it matches current user -->
		<v-btn
			v-if="userInfo.userId == userId"
			color="primary"
			class="mx-3"
			fab
			x-small
			@click="overlay = !overlay"
		>
			<v-icon light> mdi-pencil </v-icon>
		</v-btn>
		<v-overlay :value="overlay" :opacity="opacity">
			<v-btn icon @click="overlay = false">
				<v-icon dark>mdi-close</v-icon>
			</v-btn>
			<v-container fluid>
				<!-- dynamic labels for parent component -->
				<v-textarea
					counter
					:rules="rules"
					clearable
					cols="40"
					rows="4"
					clear-icon="mdi-close-circle"
					:label="displayLabel"
					:value="currentValue"
					v-model="newValue"
				></v-textarea>
				<v-btn
					@click.prevent="editInfo()"
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
axios.defaults.headers.common["X-Api-Key"] = process.env.VUE_APP_API_KEY;
axios.defaults.baseURL = "https://tweeterest.ml/api/";

export default {
	name: "EditProfile",
	props: {
		label: String,
		displayLabel: String,
		currentValue: String,
	},
	data: () => {
		return {
			userInfo: {
				userId: "",
			},
			overlay: false,
			opacity: 0.9,
			rules: [(v) => v.length <= 140 || "Max 140 characters"],
			newValue: "",
		};
	},
	methods: {
		editInfo() {
			this.$store
				.dispatch("editInfo", {
					label: this.label,
					newValue: this.newValue,
				})
				.then(() => {
					this.overlay = false;
				})
				.then(() => {
					this.$emit("profileUpdated");
				});
		},
	},
	computed: {
		userId() {
			return this.$store.getters.getUserId;
		},
	},
	mounted() {
		axios
			.get("/users", {
				params: { userId: this.$route.params.userId },
			})
			.then((response) => {
				if (response.status === 200) {
					this.userInfo.userId = response.data[0].userId;
				}
			})
			.catch(() => {
				console.error("no user found");
			});
	},
};
</script>

<style scoped></style>
