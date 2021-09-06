<template>
	<v-app>
		<v-main>
			<div>
				<!-- Vuetify App Bar component, remainder in TweeterNav component -->
				<v-card class="mx-auto overflow-hidden" min-height="100vh">
					<v-app-bar
						color="cyan"
						dark
						shaped
						fixed
						collapse-on-scroll
					>
						<v-app-bar-nav-icon
							@click="drawer = true"
						></v-app-bar-nav-icon>
						<v-icon medium right class="mx-2"> mdi-twitter </v-icon>
						<v-toolbar-title>Tweeter</v-toolbar-title>
					</v-app-bar>
					<v-navigation-drawer v-model="drawer" absolute temporary>
						<TweeterNav />
					</v-navigation-drawer>
					<router-view :key="$route.fullPath" />
				</v-card>
			</div>
		</v-main>
	</v-app>
</template>

<script>
import TweeterNav from "./components/TweeterNav.vue";
export default {
	name: "App",
	components: {
		TweeterNav,
	},
	data() {
		return {
			drawer: false,
			group: null,
		};
	},
};
</script>
