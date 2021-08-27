<template>
	<div class="register">
		<TweeterNav />
		<v-form action="" ref="form">
			<fieldset>
				<legend>register an account with tweeter</legend>
				<label for="email">Email</label>
				<v-text-field
					name="email"
					type="text"
					v-model="userReg.email"
				/>

				<label for="username">Username</label>
				<v-text-field
					name="username"
					type="text"
					v-model="userReg.username"
				/>

				<label for="password">Password</label>
				<v-text-field
					name="password"
					type="password"
					v-model="userReg.password"
				/>

				<label for="biography">Biography</label>
				<v-text-field
					name="biography"
					type="text"
					v-model="userReg.bio"
				/>

				<label for="birthdate">Birthdate</label>
				<v-menu
					ref="menu"
					v-model="menu"
					:close-on-content-click="false"
					transition="scale-transition"
					offset-y
					min-width="auto"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="userReg.birthdate"
							label="Birthday date"
							prepend-icon="mdi-calendar"
							readonly
							v-bind="attrs"
							v-on="on"
						></v-text-field>
					</template>
					<v-date-picker
						v-model="userReg.birthdate"
						:active-picker.sync="activePicker"
						:max="
							new Date(
								Date.now() -
									new Date().getTimezoneOffset() * 60000
							)
								.toISOString()
								.substr(0, 10)
						"
						min="1950-01-01"
						@change="save"
					></v-date-picker>
				</v-menu>

				<v-btn
					@click="userRegistration()"
					depressed
					elevation="2"
					raised
					>Register</v-btn
				>
			</fieldset>
		</v-form>
	</div>
</template>

<script>
export default {
	name: "Register",
	data: () => {
		return {
			userReg: {
				email: "",
				username: "",
				password: "",
				birthdate: "",
				bio: "",
			},
			activePicker: null,
			menu: false,
		};
	},
	watch: {
		menu(val) {
			val && setTimeout(() => (this.activePicker = "YEAR"));
		},
	},
	methods: {
		save(date) {
			this.$refs.menu.save(date);
		},
		userRegistration() {
			this.$store.dispatch("userRegistration", this.userReg);
		},
		getUsers() {
			this.$store.dispatch("getUsers");
		},
	},
};
</script>

<style scoped></style>
