<template>
	<header>
		<div class="navbarContainer">
			<nav :class="{responsive: isBars}">
				<div class="linkTo">
					<router-link to="/home">
						Home
					</router-link>
				</div>
                <div class="linkTo">
                    <router-link to="/logout">
                    Déconnexion
                    </router-link>
                </div>       					
			</nav>
		</div>
	</header>
</template>

<script>
import {ref} from 'vue';
import {useStore} from 'vuex';
import {useRoute, useRouter} from 'vue-router';



export default {
	name: "navBar",
    data() {
        return {
            loggedIn:false
        };
    },
	setup() {
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const isBars = ref(false);

		function addResponsiveClass() {
			if (isBars.value == false) {
				isBars.value = true;
			} else {
				isBars.value = false;
			}
		}
		

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

		return {addResponsiveClass, isBars, logOutUser};

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
		
		.linkTo {
			display: none;
		}

		.iconNav {
			width: 50px;
			z-index: 1;
			display: block;
			right: 0.5rem;
			cursor: pointer;
			color: #373737;
			font-size: 2rem!important;
		}
	}

	nav.responsive {
		// height: 400px;
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		position: absolute;
		top: 0;
		// bottom: 0;

		.linkTo {
			width: 100%;
			height: 50px;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;
			background: #F0EAd6;
			margin: 0;
			position: relative;
			top: 5rem;
			// font-size: 3rem;
		}

	}

}
</style>