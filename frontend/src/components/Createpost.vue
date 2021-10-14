<template>
<!-- eslint-disable  -->
	<body>
	<form v-on:submit.prevent="createPost">
		<label for="title"></label>
		<input type="text" v-model="title" placeholder="Titre" id="title" ref="firstField"><br/>

		<label for="content"></label>
		<input type="text" class="contentArea" v-model="content" id="content" placeholder="Votre post"><br/>

    		<div class="container">
      				<label for="file">Une image pour votre post :
        				<input type="file" id="file" ref="file" name="postImage" accept="image/*" @change="onFileSelected"/>
     				 </label>
  			</div>
		<button :disabled="!isFormValid">Poster !</button>
	</form>
	</body>
</template>

<script>
import {ref, computed } from 'vue';
import {useStore} from 'vuex';

export default {
	name: "createPost",
	emits: ['createPost'],
	setup(props, {emit}) {
		const store = useStore();
		const title = ref("");
		const content = ref("");
		const file = ref("");
		const firstField = ref(null);
		


		const postFormData = new FormData();
		
		const postData = {
			title : '',
			content: ''
		};
		// Si une image est ajoutée
		function onFileSelected(event) {
			file.value = event.target.files[0];
			postFormData.set('imageURL', file.value, file.value.name);
		}

		// Ajouter les donées du formulaire au post
		function addPostDataToPost() {
			postData.title = title.value;
			postData.content = content.value;
			postData.id = store.state.user.id;
			return postData;
		}
		// Création du post
		function createPost() {
			const postData = addPostDataToPost();

			for (let e in postData) {
				postFormData.set(e, postData[e]);
			}
				emit('createPost', postFormData);
				resetForm();
		}
			
		const isFormValid = computed(() => {
			if (title.value !== "") {
				return true;
			} else {
				return false;
			}
		});

		function resetForm() {
			title.value = "";
			content.value = "";
			file.value = "";
			firstField.value.focus();
		}

    return {title,content,file,firstField,onFileSelected,isFormValid,createPost };
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
		.contentArea {
			width: 90%; 
			height: 350px; 
			border: 1px solid #999999; 
			padding: 5px;
		}
		button {
			width: 180px;
			margin: 70px auto 0;
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
				width: 400px;
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
				width: 150px;
				font-size: 12px;
				height: 30px;
			}
			.container {
				label {
					font-size: 12px;
				}
			}

			button {
				width: 150px;
				font-size: 15px;
				margin-top: 20px;
			}
		}
	}
</style>