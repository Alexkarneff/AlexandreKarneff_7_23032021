<template>
	<div class="postContainer">
		<div class="postHeader">
			<div class="leftSideHeader">
				<div class="authorAndDate">
					<p>{{ authorFirstName }} {{ authorLastName }}</p>
                    <p>le {{ formattedPublicationDate }}</p>
				</div>
			</div>

			<div class="rightSideHeader" v-show="authorEQuser || $store.state.user.admin">
				<button class="button" @click="deletePost"> Delete</button>
			</div>
		</div>

		<div class="postContent">
			<p class="postContent__title">{{ postTitle }}</p>
			<p class="postContent__text">{{ postText }}</p>
			<div class="postContent__image" v-show="postHasImage">
				<img alt="posted image" :src=imageURL>
			</div>
		</div>
	</div>
</template>

<script>
import moment from 'moment';
import { useStore } from 'vuex';
import { ref } from 'vue';


export default {
	name: 'Post',
	props: {
		postId: {
            type: Number,
            required: true
            },
        authorId: {
            type: Number,
            required: true
        },
        authorFirstName: {
            type: String,
            required: true
        },
        authorLastName: {
            type: String,
            required: true
        },
        publicationDate: {
            type: Date,
            required: true
        },
        imageURL: {
            type: String,
            required: false
        },
        postTitle: {
            type: String,
            required:true
        },
        postText: {
            type: String,
            required:false
        }
	},
    emits: ['deletePost'],

	setup(props, context) {
		// Données et variables
		const store = useStore();
		const formattedPublicationDate = moment(props.publicationDate).format('DD/MM/YYYY');
		let authorEQuser = ref(false);
		const firstField = ref(null);
		const postHasImage = ref(false);

		if (props.imageURL != null) {
			postHasImage.value = true;
		}

		// Affichage du bouton Supprimer un post
		if (props.authorId === store.state.user.id) {
			authorEQuser.value = true;
		}

        function deletePost() {
			const id = props.postId
			context.emit('deletePost', id);
		}

		return {authorEQuser, firstField, postHasImage, formattedPublicationDate, deletePost };
	}
}
</script>

<style lang="scss" scoped>

	.postContainer {
		padding: 10px 20px;
		border-radius: 5px;
		box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.4);
		background-color: white;
	}

	.postHeader {
		padding: 5px 10px 10px;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.leftSideHeader {
			display: flex;
			justify-content: flex-start;
			align-items: center;

			.userPicContainer {
				width: 50px;
				height: 50px;
				display: flex;
				justify-content: center;
				align-items: center;
				margin: 0 15px 0 0;
				border-radius: 50%;

				img {
					border-radius: 50%;
					width: 100%;
					height: 100%;
					object-fit: cover;
					border: 1px black solid;
				}
			}
	
			.authorAndDate {
				p {
					margin: 0;
					font-size: 14px;
				}
				p:last-child {
					letter-spacing: 1px;
				}
			}
		}

		.rightSideHeader {
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

	.postContent {
		padding: 0 10px;
		margin: 20px auto 30px;


		&__title {
			font-weight: bold;
			margin-top: 0;
		}

		&__text {
			width: 100%;
			display: flex;
			flex-wrap: wrap;
			overflow: auto;
		}

		&__image {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			margin: 0 auto;
			height: auto;
			// border: 1px black solid;
			
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
				// border: 1px red dashed;
			}
		}
	}

	.postActionsContainer, .postNumbers {
		padding-top: 10px;
		width: 100%;
		margin: 0 auto;
		height: 45px;
		border-top: 1px solid grey;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: space-around;

		.likeContainer a, .commentContainer a {
			display: flex;
			align-items: center;
			margin: 0 20px;
			
			p {
				display: inline-block;
				margin: 0;
			}
			.icon-action {
				margin-right: 5px;
			}
			
			&:hover {
				color: #AB1F03;
				cursor: pointer;
			}
		}
	}
	.postNumbers {
		justify-content: space-between;
		p {
			margin: 0 10px;
			.icon {
				margin-right: 8px;
			}
		}
	}
	.orange {
		color: #AB1F03;
	}

	.commentInputContainer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		// border: 1px solid green;

		.userPicContainer {
			width: 35px;
			height: 35px;
			margin: 0;
			border-radius: 50%;
			// border: 1px red dashed;
		}

		input {
			width: 85%;
			height: 35px;
			margin-left: 5px;
			background-color: rgba(21, 158, 122, 0.32);
			font-size: 13px;
			border-radius: 20px;
			border: none;
			outline: none;
			padding-left: 10px;

			&:focus {
				box-shadow: 1px 1px 5px black;
				// border: black 1px solid;
			}
		}

		.iconSendComment {
			width: 35px;
			height: 25px;
			cursor: pointer;
			color: #AB1F03;
		}
	}

</style>