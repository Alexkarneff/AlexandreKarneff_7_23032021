<template>
	<body>
		<div class="signupForm">
			<div class="signFormContainer">
				<Signup/>
				<p class="toLogIn">Vous avez déja un compte ?
					<router-link to="/login">Se connecter</router-link>
				</p>
			</div>
		</div>
	</body>
</template>

<script>
import Signup from "@/components/Signup.vue";

export default {
	name: "SignUp",
	components: {
		Signup
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
	
	div.signupForm {
		width: 100%;	
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}


	.signFormContainer {
		height: 600px;
		width: 500px;
		margin: 5% auto;
		background-color: white;
		border-radius: 25px;
		padding: 2% 0;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	p.toLogIn {
		width: 85%;
		margin: 40px auto 0;
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
			height: 100vh;
	
			.logoContainer {
				position: absolute;
				top: 3%;
				width: 110px;
			}
			.signupForm {
				width: 100%;
				position: absolute;
				top: 20%;

				.signFormContainer {
					height: 550px;
					width: 550px;
					position: relative;
					top: 0;
					left: 0;
					margin: 0;
				}
			}

			p.toLogIn {
				width: 80%;
				// margin: 20px auto 0;
			}
		}
	}

</style>