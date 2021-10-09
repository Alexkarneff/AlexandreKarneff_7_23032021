<template>
<!-- eslint-disable  -->
	<h1>Inscrivez vous </h1>

	<form v-on:submit.prevent="createUser">
		<label for="email"></label>
		<input type="text" v-model="email" placeholder="Enter your email" id="email" ref="firstField"><br/>

		<label for="firstName"></label>
		<input type="text" v-model="firstName" id="firstName" placeholder="Enter your first name"><br/>
		
		<label for="lastName"></label>
		<input type="text" v-model="lastName" id="lastName" placeholder="Enter your last name"><br/>

		<label for="password"></label>
		<input type="text" v-model="password" id="password" placeholder="Choose a password"><br/>

		<label for="account">Account</label><br/>
		<select v-model="account" id="account">
			<option v-for="account in accountTypes" :value="account.value" :key="account.id">{{ account.name }}</option>
		</select><br/>
		
		<button :disabled="!isFormValid">Create account</button>
	</form>
	
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
	name: "SignUp",
	setup() {
		const email = ref("");
		const lastName = ref("");
		const firstName = ref("");
		const password = ref("");
		const accountTypes = ref([
			{
				id: 1,
				name: 'Default',
				value: 0
			},
			{
				id: 2,
				name: 'Admin',
				value: 1
			}
		]);
		const account = ref("");
		const firstField = ref(null);

		onMounted( () => {
			firstField.value.focus();
		})




		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'create account'
		const isFormValid = computed(() => {
			if (email.value !== "" && firstName.value !== "" && lastName.value !== "" && password.value !== "" && account.value !== "") {
				return true;
			} else {
				return false;
			}
		})

    const createUser = () => { 
        axios.post ('http://localhost:3000/api/auth/signup', {
				email : email.value,
				lastName : lastName.value,
				firstName : firstName.value,
				password : password.value,
				admin : account.value
			}) .then(function (data) {
                console.log(data);
					resetForm();
                })
                .catch(function (error) {
                    console.log(error) ;
                    });
	}

			function resetForm() {
			email.value = "",
			firstName.value = "",
			lastName.value = "",
			password.value = "",
			// Focus sur le 1er input après submit
			firstField.value.focus();
		}

    return { email, firstField, lastName, firstName, password, accountTypes, account, isFormValid, createUser };
    }
};

</script>

<style lang="scss" scoped>
	h1 {
		width: 85%;
		margin: 20px auto 30px;
		text-align: left;
		color: #182D80;
	}
	form {
		width: 85%;
		margin: 10px auto;
		text-align: left;
		// border: 1px solid black;

		label {
			font-size: 16px;
		}

		input, select {
			width: 250px;
			height: 35px;
			margin: 10px auto 20px;
			padding-left: 2%;
			outline: none;
		}
		button {
			width: 180px;
			margin: 30px auto 0;
			height: auto;
			padding: 3.5% 2%;
			background-color: #AB1F03;
			color: white;
			border: none;
			font-weight: bold;
			font-size: 18px;
			cursor: pointer;
			&:hover {
				opacity: 0.8;
				
			}
		}
	}


	@media screen and (max-width: 1200px) {
		h1 {
			font-size: 24px;
			margin: 15px auto;
		}
		form {
			input, select, option {
				width: 450px;
				font-size: 12px;
			}

			button {
				width: 200px;
				font-size: 16px;
				margin-top: 20px;
			}
		}
	}
	@media screen and (max-width: 599px) {
		form {
			text-align: center;
			input, select, option {
				width: 200px;
				font-size: 12px;
				height: 30px;
			}

			button {
				width: 200px;
				font-size: 16px;
				margin-top: 20px;
			}
		}
	}
</style>