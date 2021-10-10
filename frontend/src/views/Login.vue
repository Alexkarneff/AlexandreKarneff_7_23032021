<template>
	<body>
		<div class="loginContainer">
			<div class="logFormContainer">
				<Login @loginUser="userLogged"/>
				<p class="toSignUp">Vous n'avez pas encore de compte? 
					<router-link to="/signup">Rejoignez nous</router-link>
					
				</p>
			</div>
		</div>


	</body>
</template>

<script>
import Login from "@/components/Login.vue";
//import {useRoute, useRouter} from 'vue-router';

export default {
	name: "LogIn",
	components: {
		Login
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
		display: flex;
		align-content: center;
	}

	div.loginContainer {
		width: 100%;	
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.logFormContainer {
		height: 400px;
		width: 500px;
		background-color: white;
		border: white;
		border-radius: 25px;
		padding: 2% 0;
        box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	p.toLogIn, p.toSignUp {
		width: 85%;
		margin: 20px auto;
		text-align: left;

		a {
			text-decoration: underline;
			color: #AB1F03;
			font-weight: bold;
			cursor: pointer;
		}
	}
	
	@media screen and (max-width: 1200px) {
		body {
			display: flex;
			justify-content: center;
			align-items: center;

			.logoContainer {
				position: absolute;
				top: 3%;
				width: 110px;
			}
			.loginContainer {
				width: 100%;
				.logFormContainer {
					position: relative;
					top: 0;
					left: 0;
				}
			}
		}
	}

	@media screen and (max-width: 599px) {
		.logFormContainer {
			height: 400px;
			width: 300px;
			// margin: 5% auto;
		}
	}
</style>