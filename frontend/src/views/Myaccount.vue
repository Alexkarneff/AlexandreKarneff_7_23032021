<template>
 <body>
     <Navbar/>
	<div class="account">

		<h1>Your Profile</h1>

		<p id="subscribed">Subscribed on {{ formattedDate }} </p>

		<div class="infoContainer">
			<div class="labelInputContainer">
				<label for="firstName">First Name</label>
				<p> {{ currentUser.firstName }} </p>
			</div>
			
			<div class="labelInputContainer">
				<label for="lastName">Last Name</label>
				<p> {{ currentUser.lastName }} </p>
			</div>

			<div class="labelInputContainer">
				<label for="email">Email</label>
				<p> {{ currentUser.email }} </p>
			</div>
		
			<div class="EndFormButtonsContainer">
				<button id="delete" @click.prevent="deleteAccount" alt="Delete account" title="Delete account">Delete account</button>
			</div>
		</div>

	</div>
     </body>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';


export default {
	components: { Navbar },
	name: "Account",
	setup() {
		// Données et variables

		const store = useStore();
		const route = useRoute();
		const router = useRouter();
		let userId = computed(() => store.state.user.id);
		const subscribed = computed(() => store.state.subscribed);
		console.log("subscribed: ", subscribed.value);
		let account = ref("");
		const formattedDate = moment(subscribed).format('DD/MM/YYYY');
		let currentUser = computed(() => store.state.user);

		const firstField = ref(null);


		// Suppression de compte et redirection vers la page signup
		const redirectToSignUp = route.query.redirect || '/signup';
		async function deleteAccount() {
			const id = route.params.id;
			const accountDeleted = await store.dispatch('fetchDeleteAccount', id);
			if (accountDeleted) {
				router.push(redirectToSignUp);
			}
		}
		return { userId, currentUser, formattedDate, deleteAccount, firstField, confirm, account };
	}
};

</script>

<style lang="scss" scoped>
	.account {
		width: 70%;
		margin: 0 auto;
		padding: 3%;
		text-decoration: none;

		h1 {
			margin: 0 0 50px 0;
			font-weight: lighter;
		}

		#subscribed {
			text-align: center;
			margin-bottom: 50px;
		}
	}

	.infoContainer {
		width: 100%;
		margin: 40px 0 0 0;
		padding-top: 40px;
	

		.labelInputContainer:not(:last-child) {
			width: 500px;
			margin: 0 auto 30px;
			display: flex;
			flex-direction: column;
			
			label {
				margin-bottom: 5px;
			}
			input {
				outline: none;
				height: 40px;
				padding-left: 1%;
				font-size: 16px;
				border: none;
				background-color: white;
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
			}
			
		}

		.EndFormButtonsContainer {
			width: 100%;
			height: 210px;
			display: flex;
			align-items: center;
		}
		
		button {
			height: 50px;
			width: 150px;
			border-radius: 4px;
			margin: auto;
			background-color: #AB1F03;
			color: white;
			border: none;
			font-weight: bold;
			font-size: 16px;
			cursor: pointer;
		}
		#delete {
			color: white;
			border-radius: 0;
			background-color: #AB1F03;
			border: 3px solid black;
		}

	}

	@media screen and (max-width: 1200px) {
		.account {
			width: 90%;
			padding: 3% 0 0;
		}
	}

	@media screen and (max-width: 599px) {
		.account {
			width: 100%;
			padding: 3% 0 0;
			
			h1 {
				width: 80%;
				margin: 0 auto 50px;
				text-align: center;
			}
			p.accountType {
				// text-align: center;
				width: 80%;
				margin: auto;
				font-size: 14px;
			}

			#subscribed {
				font-size: 14px;
			}

			.infoContainer {
				margin-top: 20px;
				font-size: 14px;

				.labelInputContainer:not(:last-child) {
					width: 200px;
					input {
						font-size: 14px;
					}
				}

				#id {
					width: 80%;
					margin: auto;
				}

				.EndFormButtonsContainer {
					width: 85%;
				}
			}
		}
		button {
			width: 50%;
		}
	}
</style>