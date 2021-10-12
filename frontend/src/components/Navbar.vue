<template>
	<header>
		<div class="navbarContainer">
			<nav>
				<div class="linkTo">
					<router-link to="/post">
						Les Posts
					</router-link>
				</div>
				<div class="linkTo">
						<router-link to="/myAccount">
						Mon Compte
					</router-link>
				</div>

                <div class="linkTo">
                    <router-link to="/logout" @click="logOutUser">
                    Déconnexion
                    </router-link>
                </div>       					
			</nav>
		</div>
	</header>
</template>

<script>
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';



export default {
	name: "navBar",
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();

        const goToLogOutPage = () => {
			const redirectLogOut = route.query.redirect || '/logout';
			router.push(redirectLogOut);
		}

        function logOutUser() {			
			store.commit('CLEAR_STORE');
			if (!store.state.userLogged) {
				goToLogOutPage();
			}
		}
		return {logOutUser};
	}
}
</script>

<style lang="scss" scoped>

header {
	display: flex;
	align-items: center;
	height: 80px;
	z-index: 5000;
	background-color: white;
	// border: 1px blue solid;

	.navbarContainer {
		width: 100%;

		display: flex;
		justify-content: space-between;
		align-items: center;
	}
}

nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	text-align: center;

	.linkTo {
		color: black;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-left: 15px;
		position: relative;

		a {
			text-decoration: none;
			color: black;
			margin-left: 5px;

			&:hover {
				color: #AB1F03;
			}
		}
		
		&:hover {
			color: #AB1F03;
		}

		.router-link-active {
			color: #AB1F03;
		}
	}
}

@media screen and (max-width: 1200px) {
	.logoContainer img {
		width: 220px;
	}
}

@media screen and (max-width: 599px) {
	header {
		height: 50px;
		.navbarContainer {
			width: 100%;
			margin: 0;
			height: 100%;
		}

		.logoContainer img {
			width: 130px;
		}

	}
	nav {
		position: relative;
		text-align: center;
		clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%);
		transition: all 0.4s ease-in-out;
	}
}
</style>