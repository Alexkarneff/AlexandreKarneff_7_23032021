<template>
	<body>

		<div class="loginForm">
			<div class="confirmSignUp" v-show="created">
				<p>Your account has been created.</p>
			</div>

			<div class="signFormContainer">
				<Signup/>
				<p class="toLogIn">Already have an account? 
					<router-link to="/login">Log in</router-link>
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
	},
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
	.logoContainer {
		width: 35%;
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
	
	div.loginForm {
		width: 100%;
		
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		// border-left: 1px red dashed;
	}

	.confirmSignUp {
		height: 40px;
		border: 1px solid #d6e9c6;
		display: flex;
		justify-content: center;
		align-items: center;
		font-style: italic;
		width: 70%;
		margin: 60px auto 50px;

		p {
			display: inline-block;
			font-size: 18px;
			margin: 0 15px 0;
		}

		a {
			font-style: normal;
			color: #AB1F03;

			&:hover {
				font-weight: bold;
				cursor: pointer;
				text-decoration: none;
			}
		}
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
			.loginForm {
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