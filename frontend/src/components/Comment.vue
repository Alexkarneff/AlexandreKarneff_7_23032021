<template>
	<div class="commentContainer">

		<div class="commentContent">
			<div class="commentContent__header">
				<p>{{ authorFirstName }} {{ authorLastName }}</p>
				<div class="rightSideHeader" v-show="authorIsUser || $store.state.user.admin">
				<button class="button" @click="deleteAComment">Supprimer</button>
				</div>
			</div>
			<p class="commentContent__text">{{ commentText }}</p>
			
		</div>

	</div>
</template>

<script>
import { useStore } from 'vuex';
import { ref } from 'vue';

export default {
	name: 'Comment', 
	props: {
		'commentId': Number,
		'authorId': Number,
		'authorFirstName': String,
		'authorLastName': String,
		'commentText': String,
		'imageURL': String
	},
	emits: ['deleteComment'],

	setup(props, context) {
		// Données et variables
		const store = useStore();
		let authorIsUser = ref(false);

		// Bouton Supprimer un commentaire
		if (props.authorId === store.state.user.id) {
			authorIsUser.value = true;
		}

		// Supprimer un commentaire
		function deleteAComment() {
			const id = props.commentId;
			context.emit('deleteComment', id);
		}

		return { authorIsUser, deleteAComment};


	},
}
</script>


<style lang="scss" scoped>
	.commentContainer {
		display: flex;
		justify-content: flex-start;
		align-items: flex-start;
		margin: 25px auto;
		width: 90%;
	}

	.commentContent {
		margin-left: 5px;
		width: 90%;
		padding: 10px 15px;
		min-height: 50px;
		border-radius: 25px;
		background-color: rgba(161, 154, 154, 0.6);
		position: relative;

		&__header {
			display: flex;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: 10px;
			position: relative;

			p {
				margin: 0;
				font-size: 12px;
				font-weight: bold;
			}

			.rightSideHeader {
				display: flex;
				justify-content: center;
				align-items: center;

                button {
				border-radius: 3px;
				color: white;
				height: 35px;
				z-index: 1;
				cursor: pointer;
				border: none;
				font-weight: bold;
				background-color: rgba(0, 0, 0, 0.5);
				box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
			}

			}
		}

		&__text {
			margin: 0;
			height: auto;
			display: flex;
			flex-wrap: wrap;
		}
	}
	.orange {
		color: #AB1F03;
	}


	@media screen and (max-width: 599px) {

		.commentContent {
			width: 70%;

		}
			.rightSideHeader {

                button {
				font-size: 10px;
				width: 55px;
				padding: 0;
				margin-left: 5px;
			}}
	}
</style>