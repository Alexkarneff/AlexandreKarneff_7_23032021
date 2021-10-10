<template>
<!-- eslint-disable  -->

	<form v-on:submit.prevent="createPost">
		<label for="title"></label>
		<input type="text" v-model="title" placeholder="Titre" id="title" ref="firstField"><br/>

		<label for="content"></label>
		<input type="text" v-model="content" id="content" placeholder="Votre post"><br/>

        	<label for="image"></label>
		<input type="img" v-model="image" id="image" placeholder="Votre image (si nécessaire)"><br/>
		
		
		<button :disabled="!isFormValid">Poster !</button>
	</form>
	
</template>

<script>
import { ref, onMounted, computed } from 'vue';
import axios from 'axios';

export default {
	name: "createPost",
	setup() {
		const title = ref("");
		const content = ref("");
        const image = ref("");
		const firstField = ref(null);

		onMounted( () => {
			firstField.value.focus();
		})
		//Validation des champs: calculer la valeur isFormValid pour enable le bouton 'create account'
		const isFormValid = computed(() => {
			if (title.value !== "") {
				return true;
			} else {
				return false;
			}
		})

    const createPost = () => { 
        axios.post ('http://localhost:3000/api/posts', {
				title : title.value,
				content : content.value,
			}) .then(function (data) {
                console.log(data);
					resetForm();
                })
                .catch(function (error) {
                    console.log(error) ;
                    });
	}

			function resetForm() {
			title.value = "",
			content.value = "",
			firstField.value.focus();
		}

    return {title, content, image, isFormValid, createPost };
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