<template>
<body>
	<Navbar/>
	<div class="home">
		<h1>
			Hello {{ $store.state.user.firstName }}
		</h1>

		<h2>Bienvenue sur le réseau social de Groupomania.</h2>
		<h3>Partagez avec la communauté ! </h3>

		<div class="userActionsContainer">
			<button v-on:click="goToCreatePost" title="Write a post">Créer un post</button>
		</div>

			<div class="postsContainer">
			<div class="post" v-for="post in posts" :key="post.id">
				<Posts :authorFirstName="post.User.firstName" :authorLastName="post.User.lastName" :imageURL="post.imageURL" :publicationDate="post.createdAt" :postText="post.publicationText" :postTitle="post.title" :authorId="post.userId" :postId="post.id" @deletePost="postToDelete">
				</Posts>
			</div>
		</div>

	</div>
	</body>
</template>

<script>

// import Posts from "@/components/Posts.vue";
import {useRoute, useRouter} from 'vue-router';
import {useStore} from 'vuex';
import { computed } from 'vue';
import Navbar from "@/components/Navbar.vue";
import Posts from "@/components/Posts.vue";

export default {
	name: "post",
	components : {
		Navbar,
		Posts
	},
	setup() {
		
		const route = useRoute();
		const router = useRouter();
		const store = useStore();
		const posts = computed(() => store.state.posts);

		async function getPosts() {
			await store.dispatch('fetchGetAllPosts');
		}
		getPosts();

		const goToCreatePost = () => {
			const redirectPost = route.query.redirect || '/createPost';
			router.push(redirectPost);
			};
		
		return {goToCreatePost, posts };
	}
};
</script>

<style lang="scss" scoped>
.home {
	width: 75%;
	margin: 0 auto;
	z-index: -1000;
	padding: 3%;
    box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
}
h1 {
	text-align: center;
	margin: 0 auto 50px;

	img {
		width: 30px;
		margin-right: 10px;
	}
}

h3 {
	letter-spacing: 1px;
	font-weight: normal;
	line-height: 40px;
}

.userActionsContainer {
	font-size: 16px;
	width: 90%;
	margin: 80px auto 60px;

	.filterBox {
		font-size: 16px;
		width: 300px;
		height: 40px;
		outline: none;
		border: none;
		border-radius: 3px;
		padding-left: 1%;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
	}

	button {
		width: 200px;
		font-size: 18px;
		padding: 12px;
		background-color: #AB1F03;
		color: white;
		border: none;
		font-weight: bold;
		border-radius: 3px;
		box-shadow: 1px 1px 4px  rgba(0, 0, 0, 0.4);
		cursor: pointer;
	}
}


.postsContainer {
	width: 60%;
	margin: 10px auto 40px;
	padding: 2% 0;
	// border: 1px solid black;

	.post {
		margin-bottom: 40px;
	}
}

@media screen and (max-width: 1200px) {
	.home {
		width: 100%;
		padding: 50px 0;

		h2, h3 {
			width: 80%;
			margin: 20px auto;
		}

		.userActionsContainer {
			width: 75%;
		}

		.postsContainer {
			width: 70%;
		}
	}
}

@media screen and (max-width: 599px) {
	.home {
		width: 100%;
		padding: 30px 0;

		h1 {
			margin: 0 auto 30px;
			font-size: 24px;

			img {
				width: 15px;
			}
		}

		h2, h3 {
			width: 90%;
			margin: 10px auto;
			line-height: 20px;
		}

		h2 {
			font-size: 18px;
		}
		h3 {
			font-size: 16px;
		}

		.userActionsContainer {
			width: 80%;

			.filterBox {
				width: 200px;
				font-size: 14px;
				height: 30px;
			}

			button {
				width: 120px;
				font-size: 14px;
			}
		}


		.postsContainer {
			width: 80%;
		}
	}
}

</style>