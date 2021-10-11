<template>
	<body>
		<div class="leftSide">
			<h1>Vous êtes maintent déconnecté</h1>

			<h2>A la prochaine !</h2>

            <h3> <router-link to="/login"> Retour à l'écran de connexion </router-link> </h3>
		</div>

		<div class="logoContainer">
			<img src="../assets/icon-above-font.svg" alt="logo de Groupomania">
		</div>

	</body>
</template>

<script>

export default {
	name: "logout",
    components : {
    },
	setup() {
		
	}
};
</script>

<style lang="scss" scoped>
	body {
		margin: 0;
		padding: 0;
		height: 100vh;
		align-content: center;
	}
	.logoContainer {
		width: 100%;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: white;
	}
	img {
		width: 280px;
		height: 100%;
		// border: 1px red dashed;
	}
	
	div.leftSide {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: start;
		h2 {
			font-weight: normal;
		}
	}
	@media screen and (max-width: 599px) {
		div.leftSide {
			width: 100%;
			h1 {
				font-size: 24px;
			}
			h2 {
				font-size: 17px;
			}
		}
		.logoContainer {
			position: absolute;
			top: 5%;
			left: 40%;
			transform-origin: center;
			width: 70px;
		}
	}
</style>